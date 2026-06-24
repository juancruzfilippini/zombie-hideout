import Image from "next/image";
import { Biohazard, Map, Radio, Shield, Zap } from "lucide-react";

import { SectionHeader } from "@/components/shared/section-header";
import { Panel, PanelBody } from "@/components/ui/panel";
import { zombieExperienceCards } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const icons = [Shield, Biohazard, Zap, Map, Radio];

export function ZombieExperienceSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="zombie-mod" className="section-shell">
      <SectionHeader
        eyebrow="INFECTED PROTOCOL"
        title={dict.sections.zombieTitle}
        lead="Humans, infected, custom rounds and editable server systems presented without overpromising unconfirmed features."
      />
      <div className="relative mb-5 min-h-[320px] overflow-hidden border border-white/10 bg-black/40">
        <Image
          src="/assets/community/real-zombies-industrial-yard.jpg"
          alt={
            locale === "es"
              ? "Zombis reales de Zombie Hideout"
              : "Real Zombie Hideout zombie models"
          }
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070907] via-transparent to-transparent" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {zombieExperienceCards.map((card, index) => {
          const Icon = icons[index] ?? Shield;
          return (
            <Panel key={card.id} className="group">
              <PanelBody>
                <Icon className="text-[#f08a24] transition group-hover:text-[#b9ff46]" aria-hidden />
                <h3 className="mt-5 text-lg font-black uppercase text-zinc-50">
                  {card.title[locale]}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{card.body[locale]}</p>
              </PanelBody>
            </Panel>
          );
        })}
      </div>
    </section>
  );
}
