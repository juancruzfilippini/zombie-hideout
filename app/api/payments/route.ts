import { ZodError } from "zod";

import { getPaymentProvider } from "@/lib/payments";
import { PaymentProviderError } from "@/lib/payments/errors";
import { createDonationRecord } from "@/lib/payments/records";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rate-limit";
import { createDonationInputSchema } from "@/lib/validation/donation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rate = checkRateLimit(getRateLimitKey(request, "payments"), 6, 60_000);
  if (!rate.allowed) {
    return Response.json({ message: "Too many requests" }, { status: 429 });
  }

  try {
    const input = createDonationInputSchema.parse(await request.json());
    const provider = getPaymentProvider(input.provider);
    if (!provider.enabled) {
      return Response.json({ message: "Provider disabled" }, { status: 503 });
    }
    const result = await provider.createPayment(input);
    await createDonationRecord(input, result);
    return Response.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ message: "Invalid donation input" }, { status: 400 });
    }
    if (error instanceof PaymentProviderError) {
      return Response.json({ message: error.message }, { status: error.status });
    }
    console.error("[payments] create failed", error instanceof Error ? error.message : "unknown");
    return Response.json({ message: "Payment creation failed" }, { status: 500 });
  }
}
