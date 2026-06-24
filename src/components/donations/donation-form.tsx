"use client";

import { useMemo, useState } from "react";

import { PaymentProviderSelector } from "@/components/donations/payment-provider-selector";
import { PaymentStatus } from "@/components/donations/payment-status";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/form-controls";
import { Panel, PanelBody } from "@/components/ui/panel";
import { donationTiers } from "@/content/donations";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { PaymentProviderState } from "@/lib/payments/types";
import type { PaymentProviderId } from "@/lib/validation/donation";

export function DonationForm({
  locale,
  dict,
  providers,
}: {
  locale: Locale;
  dict: Dictionary;
  providers: PaymentProviderState[];
}) {
  const firstEnabledProvider = providers.find((provider) => provider.enabled)?.id ?? "mock";
  const [tier, setTier] = useState("vip");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [provider, setProvider] = useState<PaymentProviderId>(firstEnabledProvider);
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedTier = useMemo(() => donationTiers.find((item) => item.id === tier), [tier]);

  return (
    <Panel>
      <PanelBody>
        <form
          className="grid gap-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setSubmitting(true);
            setStatus(null);
            const form = new FormData(event.currentTarget);
            const response = await fetch("/api/payments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                amount: Number(amount),
                currency,
                donorAlias: form.get("donorAlias"),
                steamId: form.get("steamId"),
                perkTier: tier,
                provider,
                locale,
                acceptedTerms: form.get("acceptedTerms") === "on",
              }),
            });
            const data = (await response.json()) as { checkoutUrl?: string; message?: string };
            setSubmitting(false);
            if (!response.ok) {
              setStatus(data.message ?? "Validation failed");
              return;
            }
            setStatus(dict.donations.success);
            if (data.checkoutUrl) window.location.href = data.checkoutUrl;
          }}
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(8.5rem,1fr))] gap-3">
            {donationTiers.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setTier(item.id);
                  if (item.amount) setAmount(String(item.amount));
                }}
                className={`min-h-32 min-w-0 border p-4 text-left transition ${
                  tier === item.id
                    ? "border-[#b9ff46] bg-[#b9ff46]/10"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <span className="block break-words text-sm font-black uppercase leading-tight text-zinc-50 [overflow-wrap:anywhere]">
                  {item.label[locale]}
                </span>
                <span className="mt-3 block break-words font-mono text-[0.95rem] font-semibold leading-6 text-[#b9ff46] [overflow-wrap:anywhere]">
                  {item.amount ?? dict.common.configuredSoon}
                </span>
              </button>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="amount">{dict.donations.amount}</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min="1"
                max="10000"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                disabled={Boolean(selectedTier?.amount)}
                required
              />
            </div>
            <div>
              <Label htmlFor="currency">{dict.donations.currency}</Label>
              <Select
                id="currency"
                value={currency}
                onChange={(event) => setCurrency(event.target.value)}
              >
                <option value="USD">USD</option>
                <option value="ARS">ARS</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="donorAlias">{dict.donations.alias}</Label>
              <Input id="donorAlias" name="donorAlias" required minLength={2} maxLength={40} />
            </div>
            <div>
              <Label htmlFor="steamId">{dict.donations.steamId}</Label>
              <Input id="steamId" name="steamId" maxLength={64} />
            </div>
            <div>
              <Label htmlFor="provider">{dict.donations.provider}</Label>
              <Select
                id="provider"
                value={provider}
                onChange={(event) => setProvider(event.target.value as PaymentProviderId)}
              >
                <PaymentProviderSelector providers={providers} dict={dict} />
              </Select>
            </div>
          </div>

          <label className="flex gap-3 text-sm text-zinc-300">
            <input name="acceptedTerms" type="checkbox" required className="mt-1" />
            <span>{dict.donations.terms}</span>
          </label>
          <p className="text-sm leading-6 text-zinc-500">{dict.donations.manualTerms}</p>
          <Button type="submit" disabled={submitting}>
            {submitting ? "..." : dict.donations.submit}
          </Button>
          <PaymentStatus message={status} />
        </form>
      </PanelBody>
    </Panel>
  );
}
