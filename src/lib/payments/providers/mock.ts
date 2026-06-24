import "server-only";

import type { CreateDonationInput } from "@/lib/validation/donation";
import type {
  CreatePaymentResult,
  PaymentProvider,
  PaymentStatus,
  VerifiedPaymentEvent,
} from "@/lib/payments/types";

export const mockPaymentProvider: PaymentProvider = {
  id: "mock",
  label: "Mock Sandbox",
  enabled: process.env.PAYMENTS_MOCK_ENABLED !== "false",
  async createPayment(input: CreateDonationInput): Promise<CreatePaymentResult> {
    const externalId = `mock_${crypto.randomUUID()}`;
    return {
      provider: "mock",
      externalId,
      status: "created",
      checkoutUrl: `/${input.locale}/donar?status=mock&payment=${externalId}`,
      message: "Mock payment created",
    };
  },
  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    const payload = (await request.json()) as {
      id?: string;
      paymentId?: string;
      status?: PaymentStatus;
    };
    return {
      provider: "mock",
      externalEventId: payload.id ?? crypto.randomUUID(),
      eventType: "mock.payment",
      externalPaymentId: payload.paymentId ?? "mock_unknown",
      status: payload.status ?? "approved",
      amount: null,
      currency: null,
    };
  },
  async getPaymentStatus(): Promise<PaymentStatus> {
    return "approved";
  },
};
