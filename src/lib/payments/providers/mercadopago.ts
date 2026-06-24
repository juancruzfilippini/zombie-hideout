import "server-only";

import { absoluteUrl } from "@/lib/utils";
import { ProviderConfigurationError } from "@/lib/payments/errors";
import type { CreateDonationInput } from "@/lib/validation/donation";
import type {
  CreatePaymentResult,
  PaymentProvider,
  PaymentStatus,
  VerifiedPaymentEvent,
} from "@/lib/payments/types";

type MercadoPagoPreferenceResponse = {
  id: string;
  init_point?: string;
  sandbox_init_point?: string;
};

export const mercadoPagoProvider: PaymentProvider = {
  id: "mercadopago",
  label: "Mercado Pago",
  enabled: Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN),
  async createPayment(input: CreateDonationInput): Promise<CreatePaymentResult> {
    const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
    if (!token) throw new ProviderConfigurationError("Mercado Pago");

    const externalReference = `mp_${crypto.randomUUID()}`;
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            title: "Zombie Hideout donation",
            quantity: 1,
            unit_price: input.amount,
            currency_id: input.currency,
          },
        ],
        external_reference: externalReference,
        back_urls: {
          success: process.env.PAYMENT_SUCCESS_URL ?? absoluteUrl(`/${input.locale}/donar`),
          pending: process.env.PAYMENT_PENDING_URL ?? absoluteUrl(`/${input.locale}/donar`),
          failure: process.env.PAYMENT_FAILURE_URL ?? absoluteUrl(`/${input.locale}/donar`),
        },
        auto_return: "approved",
        metadata: {
          donorAlias: input.donorAlias,
          steamId: input.steamId || undefined,
          perkTier: input.perkTier || undefined,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Mercado Pago preference creation failed");
    }

    const data = (await response.json()) as MercadoPagoPreferenceResponse;
    return {
      provider: "mercadopago",
      externalId: data.id,
      status: "created",
      checkoutUrl:
        process.env.MERCADOPAGO_SANDBOX === "true"
          ? (data.sandbox_init_point ?? data.init_point ?? null)
          : (data.init_point ?? null),
    };
  },
  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    const payload = (await request.json()) as {
      id?: string;
      type?: string;
      data?: { id?: string };
    };

    return {
      provider: "mercadopago",
      externalEventId: String(payload.id ?? crypto.randomUUID()),
      eventType: payload.type ?? "payment",
      externalPaymentId: String(payload.data?.id ?? "unknown"),
      status: "pending",
      amount: null,
      currency: null,
    };
  },
  async getPaymentStatus(): Promise<PaymentStatus> {
    return "pending";
  },
};
