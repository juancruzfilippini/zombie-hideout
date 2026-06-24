import type { CreateDonationInput, PaymentProviderId } from "@/lib/validation/donation";

export type PaymentStatus = "created" | "pending" | "approved" | "rejected" | "expired";

export type CreatePaymentResult = {
  provider: PaymentProviderId;
  externalId: string;
  status: PaymentStatus;
  checkoutUrl: string | null;
  qrCodeUrl?: string | null;
  message?: string;
};

export type VerifiedPaymentEvent = {
  provider: PaymentProviderId;
  externalEventId: string;
  eventType: string;
  externalPaymentId: string;
  status: PaymentStatus;
  amount: number | null;
  currency: string | null;
};

export interface PaymentProvider {
  id: PaymentProviderId;
  label: string;
  enabled: boolean;
  createPayment(input: CreateDonationInput): Promise<CreatePaymentResult>;
  verifyWebhook(request: Request): Promise<VerifiedPaymentEvent>;
  getPaymentStatus(externalId: string): Promise<PaymentStatus>;
}

export type PaymentProviderState = {
  id: PaymentProviderId;
  label: string;
  enabled: boolean;
  reason?: string;
};
