import { z } from "zod";

export const paymentProviderSchema = z.enum([
  "mock",
  "mercadopago",
  "paypal",
  "binance",
]);

export type PaymentProviderId = z.infer<typeof paymentProviderSchema>;

export const donationCurrencySchema = z.enum(["USD", "ARS"]);

export const createDonationInputSchema = z.object({
  amount: z.coerce.number().min(1).max(10_000),
  currency: donationCurrencySchema,
  donorAlias: z.string().trim().min(2).max(40),
  steamId: z.string().trim().max(64).optional().or(z.literal("")),
  perkTier: z.string().trim().max(60).optional().or(z.literal("")),
  provider: paymentProviderSchema,
  locale: z.enum(["es", "en"]),
  acceptedTerms: z.literal(true),
});

export type CreateDonationInput = z.infer<typeof createDonationInputSchema>;
