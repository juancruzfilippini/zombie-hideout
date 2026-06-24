import { describe, expect, it } from "vitest";

import { processVerifiedPaymentEvent } from "@/lib/payments/records";
import type { VerifiedPaymentEvent } from "@/lib/payments/types";

describe("webhook idempotency", () => {
  it("marks duplicate events", async () => {
    const event: VerifiedPaymentEvent = {
      provider: "mock",
      externalEventId: `evt_${crypto.randomUUID()}`,
      eventType: "mock.payment",
      externalPaymentId: "mock_payment",
      status: "approved",
      amount: 15,
      currency: "USD",
    };

    await expect(processVerifiedPaymentEvent(event, "{}")).resolves.toEqual({
      processed: true,
      duplicate: false,
    });
    await expect(processVerifiedPaymentEvent(event, "{}")).resolves.toEqual({
      processed: false,
      duplicate: true,
    });
  });
});
