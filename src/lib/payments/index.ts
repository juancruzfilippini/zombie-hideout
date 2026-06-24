import "server-only";

import { binanceProvider } from "@/lib/payments/providers/binance";
import { mercadoPagoProvider } from "@/lib/payments/providers/mercadopago";
import { mockPaymentProvider } from "@/lib/payments/providers/mock";
import { paypalProvider } from "@/lib/payments/providers/paypal";
import type { PaymentProvider, PaymentProviderState } from "@/lib/payments/types";
import type { PaymentProviderId } from "@/lib/validation/donation";

const providers = [
  mockPaymentProvider,
  mercadoPagoProvider,
  paypalProvider,
  binanceProvider,
] satisfies PaymentProvider[];

export function getPaymentProviderStates(): PaymentProviderState[] {
  return providers.map((provider) => ({
    id: provider.id,
    label: provider.label,
    enabled: provider.enabled,
    reason: provider.enabled ? undefined : "missing_credentials",
  }));
}

export function getPaymentProvider(id: PaymentProviderId): PaymentProvider {
  const provider = providers.find((item) => item.id === id);
  if (!provider) throw new Error("Unknown payment provider");
  return provider;
}
