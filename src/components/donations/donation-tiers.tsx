import Image from "next/image";

import { Panel, PanelBody } from "@/components/ui/panel";
import { donationTiers } from "@/content/donations";
import type { Locale } from "@/i18n/config";
import { formatCurrency } from "@/lib/utils";

export function DonationTiers({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {donationTiers.map((tier) => (
        <Panel key={tier.id} className="overflow-hidden">
          <div className="relative h-20 border-b border-white/10 bg-black">
            <Image
              src={tier.banner}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <PanelBody>
            <p className="text-lg font-black uppercase text-zinc-50">{tier.label[locale]}</p>
            <p className="mt-3 font-mono text-lg text-[#b9ff46] xl:text-xl">
              {tier.amount ? formatCurrency(tier.amount, tier.currency, locale) : "A CONFIGURAR"}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{tier.description[locale]}</p>
            <ul className="mt-4 grid gap-2 text-xs uppercase tracking-[0.08em] text-zinc-500">
              {tier.benefits[locale].map((benefit) => (
                <li key={benefit} className="border-l border-[#b9ff46]/40 pl-2">
                  {benefit}
                </li>
              ))}
            </ul>
          </PanelBody>
        </Panel>
      ))}
    </div>
  );
}
