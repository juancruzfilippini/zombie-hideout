import "server-only";

import { createHmac } from "node:crypto";

import { ProviderConfigurationError } from "@/lib/payments/errors";
import type { CreateDonationInput } from "@/lib/validation/donation";
import type {
  CreatePaymentResult,
  PaymentProvider,
  PaymentStatus,
  VerifiedPaymentEvent,
} from "@/lib/payments/types";

type BinanceOrderResponse = {
  data?: {
    prepayId?: string;
    checkoutUrl?: string;
    qrcodeLink?: string;
  };
};

function signPayload(payload: string, secret: string): string {
  return createHmac("sha512", secret).update(payload).digest("hex").toUpperCase();
}

function binanceBaseUrl(): string {
  return process.env.BINANCE_PAY_SANDBOX === "true"
    ? "https://bpay.binanceapi.com"
    : "https://bpay.binanceapi.com";
}

export const binanceProvider: PaymentProvider = {
  id: "binance",
  label: "Binance Pay",
  enabled: Boolean(
    process.env.BINANCE_PAY_ENABLED === "true" &&
      process.env.BINANCE_PAY_API_KEY &&
      process.env.BINANCE_PAY_SECRET_KEY &&
      process.env.BINANCE_PAY_MERCHANT_ID,
  ),
  async createPayment(input: CreateDonationInput): Promise<CreatePaymentResult> {
    const apiKey = process.env.BINANCE_PAY_API_KEY;
    const secret = process.env.BINANCE_PAY_SECRET_KEY;
    const merchantId = process.env.BINANCE_PAY_MERCHANT_ID;
    if (!apiKey || !secret || !merchantId) throw new ProviderConfigurationError("Binance Pay");

    const nonce = crypto.randomUUID().replaceAll("-", "");
    const timestamp = Date.now().toString();
    const merchantTradeNo = `bp_${crypto.randomUUID()}`;
    const body = JSON.stringify({
      env: { terminalType: "WEB" },
      merchantTradeNo,
      orderAmount: input.amount,
      currency: input.currency,
      goods: {
        goodsType: "02",
        goodsCategory: "6000",
        referenceGoodsId: "zombie-hideout-donation",
        goodsName: "Zombie Hideout donation",
      },
    });
    const payload = `${timestamp}\n${nonce}\n${body}\n`;

    const response = await fetch(`${binanceBaseUrl()}/binancepay/openapi/v3/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "BinancePay-Timestamp": timestamp,
        "BinancePay-Nonce": nonce,
        "BinancePay-Certificate-SN": apiKey,
        "BinancePay-Signature": signPayload(payload, secret),
      },
      body,
    });

    if (!response.ok) throw new Error("Binance Pay order creation failed");
    const data = (await response.json()) as BinanceOrderResponse;
    return {
      provider: "binance",
      externalId: data.data?.prepayId ?? merchantTradeNo,
      status: "created",
      checkoutUrl: data.data?.checkoutUrl ?? null,
      qrCodeUrl: data.data?.qrcodeLink ?? null,
    };
  },
  async verifyWebhook(request: Request): Promise<VerifiedPaymentEvent> {
    const payload = (await request.json()) as {
      bizId?: string;
      bizType?: string;
      data?: string;
    };

    return {
      provider: "binance",
      externalEventId: payload.bizId ?? crypto.randomUUID(),
      eventType: payload.bizType ?? "binance.payment",
      externalPaymentId: payload.bizId ?? "unknown",
      status: "pending",
      amount: null,
      currency: null,
    };
  },
  async getPaymentStatus(): Promise<PaymentStatus> {
    return "pending";
  },
};
