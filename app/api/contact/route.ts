import { ZodError } from "zod";

import { sendContactMessage } from "@/lib/email/contact-provider";
import { prisma } from "@/lib/db";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rate-limit";
import { contactMessageSchema } from "@/lib/validation/contact";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const rate = checkRateLimit(getRateLimitKey(request, "contact"), 4, 60_000);
  if (!rate.allowed) {
    return Response.json({ message: "Too many requests" }, { status: 429 });
  }

  try {
    const input = contactMessageSchema.parse(await request.json());
    if (prisma) {
      await prisma.contactMessage.create({
        data: {
          name: input.name,
          email: input.email,
          steamId: input.steamId || null,
          subject: input.subject,
          message: input.message,
          locale: input.locale,
          status: "new",
        },
      });
    }
    await sendContactMessage(input);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return Response.json({ message: "Invalid contact message" }, { status: 400 });
    }
    console.error("[contact] failed", error instanceof Error ? error.message : "unknown");
    return Response.json({ message: "Contact delivery failed" }, { status: 500 });
  }
}
