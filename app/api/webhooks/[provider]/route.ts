import { getPaymentProvider } from "@/lib/payments";
import { processVerifiedPaymentEvent } from "@/lib/payments/records";
import { paymentProviderSchema } from "@/lib/validation/donation";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ provider: string }> },
) {
  const { provider: providerId } = await context.params;
  const parsedProvider = paymentProviderSchema.safeParse(providerId);
  if (!parsedProvider.success) {
    return Response.json({ message: "Unknown provider" }, { status: 404 });
  }

  const provider = getPaymentProvider(parsedProvider.data);
  const rawPayload = await request.clone().text();
  const event = await provider.verifyWebhook(request);
  const result = await processVerifiedPaymentEvent(event, rawPayload);

  return Response.json(result);
}
