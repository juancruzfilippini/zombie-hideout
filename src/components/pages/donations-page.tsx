import Image from "next/image";

import { DonationForm } from "@/components/donations/donation-form";
import { DonationTiers } from "@/components/donations/donation-tiers";
import { SectionHeader } from "@/components/shared/section-header";
import { Panel, PanelBody } from "@/components/ui/panel";
import { donationConditions } from "@/content/donations";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPaymentProviderStates } from "@/lib/payments";

export function DonationsPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const providers = getPaymentProviderStates();
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="SUPPORT CHANNEL"
        title={dict.donations.title}
        lead={dict.donations.lead}
      />
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <Panel>
          <PanelBody>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#b9ff46]">
              VIP / VIP Plus / Admin / Admin Plus
            </p>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-zinc-200">
              {locale === "es"
                ? "La tienda queda preparada para mostrar precios definitivos cuando el servidor confirme valores, permisos y métodos de activación."
                : "The shop is ready to show final prices once the server confirms values, permissions, and activation methods."}
            </p>
          </PanelBody>
        </Panel>
        <div className="relative min-h-72 overflow-hidden border border-white/10 bg-black/40">
          <Image
            src="/assets/generated/zombie-vip-vendor.jpg"
            alt={locale === "es" ? "Zombie presentando rangos VIP" : "Zombie presenting VIP ranks"}
            fill
            className="object-cover object-top"
            sizes="320px"
          />
        </div>
      </div>
      <DonationTiers locale={locale} />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <DonationForm locale={locale} dict={dict} providers={providers} />
        <Panel>
          <PanelBody>
            <h2 className="text-xl font-black uppercase text-zinc-50">Terms</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-zinc-300">
              {donationConditions.map((condition) => (
                <li key={condition.en} className="border-l-2 border-[#f08a24]/60 pl-3">
                  {condition[locale]}
                </li>
              ))}
            </ul>
          </PanelBody>
        </Panel>
      </div>
    </section>
  );
}
