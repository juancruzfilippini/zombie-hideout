import "server-only";

import { createHash } from "node:crypto";

import { prisma } from "@/lib/db";
import type { CreateDonationInput } from "@/lib/validation/donation";
import type { CreatePaymentResult, VerifiedPaymentEvent } from "@/lib/payments/types";

const processedEventKeys = new Set<string>();

export function hashPayload(payload: string): string {
  return createHash("sha256").update(payload).digest("hex");
}

export async function createDonationRecord(
  input: CreateDonationInput,
  result: CreatePaymentResult,
): Promise<void> {
  if (!prisma) return;

  await prisma.donation.create({
    data: {
      provider: result.provider,
      externalId: result.externalId,
      status: result.status,
      amount: input.amount,
      currency: input.currency,
      donorAlias: input.donorAlias,
      steamId: input.steamId || null,
      perkTier: input.perkTier || null,
      locale: input.locale,
      metadata: {
        checkoutUrl: result.checkoutUrl,
      },
    },
  });
}

export async function processVerifiedPaymentEvent(
  event: VerifiedPaymentEvent,
  rawPayload: string,
): Promise<{ processed: boolean; duplicate: boolean }> {
  const key = `${event.provider}:${event.externalEventId}`;
  if (processedEventKeys.has(key)) {
    return { processed: false, duplicate: true };
  }
  processedEventKeys.add(key);

  if (!prisma) {
    return { processed: true, duplicate: false };
  }

  const donation = await prisma.donation.findUnique({
    where: {
      provider_externalId: {
        provider: event.provider,
        externalId: event.externalPaymentId,
      },
    },
  });

  const existingEvent = await prisma.paymentEvent.findUnique({
    where: {
      provider_externalEventId: {
        provider: event.provider,
        externalEventId: event.externalEventId,
      },
    },
  });

  if (existingEvent) {
    return { processed: false, duplicate: true };
  }

  await prisma.paymentEvent.create({
    data: {
      provider: event.provider,
      externalEventId: event.externalEventId,
      eventType: event.eventType,
      donationId: donation?.id ?? null,
      processed: true,
      payloadHash: hashPayload(rawPayload),
    },
  });

  if (donation) {
    await prisma.donation.update({
      where: { id: donation.id },
      data: { status: event.status },
    });
  }

  return { processed: true, duplicate: false };
}
