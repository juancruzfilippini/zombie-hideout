import { describe, expect, it } from "vitest";

import { createDonationInputSchema } from "@/lib/validation/donation";

describe("donation validation", () => {
  it("accepts a valid mock donation", () => {
    const result = createDonationInputSchema.safeParse({
      amount: 15,
      currency: "USD",
      donorAlias: "Operator",
      steamId: "STEAM_0:1:123",
      perkTier: "medium",
      provider: "mock",
      locale: "es",
      acceptedTerms: true,
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid amounts", () => {
    const result = createDonationInputSchema.safeParse({
      amount: 0,
      currency: "USD",
      donorAlias: "Operator",
      provider: "mock",
      locale: "en",
      acceptedTerms: true,
    });

    expect(result.success).toBe(false);
  });

  it("requires accepted terms", () => {
    const result = createDonationInputSchema.safeParse({
      amount: 10,
      currency: "USD",
      donorAlias: "Operator",
      provider: "mock",
      locale: "en",
      acceptedTerms: false,
    });

    expect(result.success).toBe(false);
  });
});
