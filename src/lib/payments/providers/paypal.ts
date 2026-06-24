import "server-only";

import { Buffer } from "node:buffer";

import { absoluteUrl } from "@/lib/utils";
import { ProviderConfigurationError } from "@/lib/payments/errors";
import type { CreateDonationInput } from "@/lib/validation/donation";
import type {
  CreatePaymentResult,
  PaymentProvider,
  PaymentStatus,
  VerifiedPaymentEvent,
} from "@/lib/payments/types";

type PayPalOrderResponse = {
  id: string;
  links?: { href: string; rel: string }[];
};

function paypalBaseUrl(): string {
  return process.env.PAYPAL_ENV === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

async function getPayPalToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !secret) throw new ProviderConfigurationError("PayPal");

  const response = await fetch(`${paypalBaseUrl()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) throw new Error("PayPal token request failed");
  const data = (await response.json()) as { access_token: string };
  return data.access_token;
}

export const paypalProvider: PaymentProvider = {
  id: "paypal",
  label: "PayPal",
  enabled: Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET),
  async createPayment(input: CreateDonationInput): Promise<CreatePaymentResult> {
    const token = await getPayPalToken();
    const response = await fetch(`${paypalBaseUrl()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            custom_id: `pp_${crypto.randomUUID()}`,
            amount: {
              currency_code: input.currency,
              value: input.amount.toFixed(2),
            },
          },
        ],
        application_context: {
          brand_name: "Zombie Hideout",
          user_action: "PAY_NOW",
          return_url: process.env.PAYMENT_SUCCESS_URL ?? absoluteUrl(`/${input.locale}/donar`),
          cancel_url: process.env.PAYMENT_FAILURE_URL ?? absoluteUrl(`/${input.locale}/donar`),
        },
      }),
    });

    if (!response.ok) throw new Error("PayPal order creation failed");
    const data = (await response.json()) as PayPalOrderResponse;
    return {
      provider: "paypal",
      externalId: data.id,
      status: "created",
      checkoutUrl: data.links?.find((link) => link.rel === "approve")?.href ?? null,
    };
  },
  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    const payload = (await request.json()) as {
      id?: string;
      event_type?: string;
      resource?: { id?: string; status?: string; amount?: { value?: string; currency_code?: string } };
    };
    return {
      provider: "paypal",
      externalEventId: payload.id ?? crypto.randomUUID(),
      eventType: payload.event_type ?? "paypal.event",
      externalPaymentId: payload.resource?.id ?? "unknown",
      status: payload.resource?.status === "COMPLETED" ? "approved" : "pending",
      amount: payload.resource?.amount?.value ? Number(payload.resource.amount.value) : null,
      currency: payload.resource?.amount?.currency_code ?? null,
    };
  },
  async getPaymentStatus(): Promise<PaymentStatus> {
    return "pending";
  },
};
