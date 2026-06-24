"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-controls";
import { Panel, PanelBody } from "@/components/ui/panel";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <Panel>
      <PanelBody>
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);
            const form = new FormData(event.currentTarget);
            const response = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: form.get("name"),
                email: form.get("email"),
                steamId: form.get("steamId"),
                subject: form.get("subject"),
                message: form.get("message"),
                website: form.get("website"),
                locale,
              }),
            });
            const data = (await response.json()) as { message?: string };
            setSubmitting(false);
            setStatus(response.ok ? dict.contact.success : (data.message ?? "Error"));
            if (response.ok) event.currentTarget.reset();
          }}
        >
          <div className="hidden" aria-hidden>
            <Label htmlFor="website">{dict.contact.honeypot}</Label>
            <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="name">{dict.contact.name}</Label>
              <Input id="name" name="name" required minLength={2} />
            </div>
            <div>
              <Label htmlFor="email">{dict.contact.email}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="steamId">{dict.contact.steamId}</Label>
              <Input id="steamId" name="steamId" />
            </div>
            <div>
              <Label htmlFor="subject">{dict.contact.subject}</Label>
              <Input id="subject" name="subject" required minLength={3} />
            </div>
          </div>
          <div>
            <Label htmlFor="message">{dict.contact.message}</Label>
            <Textarea id="message" name="message" required minLength={10} />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "..." : dict.contact.submit}
          </Button>
          <div aria-live="polite" className="text-sm text-[#b9ff46]">
            {status}
          </div>
        </form>
      </PanelBody>
    </Panel>
  );
}
