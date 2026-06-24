import "server-only";

import type { ContactMessageInput } from "@/lib/validation/contact";

export async function sendContactMessage(input: ContactMessageInput): Promise<void> {
  const mode = process.env.EMAIL_PROVIDER_MODE ?? "log";
  const to = process.env.CONTACT_EMAIL_TO;
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY;

  if (mode === "log" || !to || !apiKey) {
    console.info("[contact] development delivery", {
      to: to || "not configured",
      subject: input.subject,
      locale: input.locale,
    });
    return;
  }

  await fetch("https://api.example-email-provider.invalid/messages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to,
      subject: `[Zombie Hideout] ${input.subject}`,
      text: `${input.name} <${input.email}>\nSteam: ${input.steamId || "N/A"}\n\n${input.message}`,
    }),
  });
}
