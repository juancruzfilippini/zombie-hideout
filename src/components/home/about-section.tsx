import Image from "next/image";

import { SectionHeader } from "@/components/shared/section-header";
import { Panel, PanelBody } from "@/components/ui/panel";
import { communityCopy, communityHistory } from "@/content/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function AboutSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="FILE 2024-HG"
        title={dict.sections.aboutTitle}
        lead={dict.sections.aboutLead}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <Panel className="md:col-span-2">
          <PanelBody>
            <p className="text-xl font-bold text-zinc-50">{communityCopy.intro[locale]}</p>
            <p className="mt-4 leading-7 text-zinc-300">{communityCopy.body[locale]}</p>
          </PanelBody>
        </Panel>
        <Panel>
          <PanelBody>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
              Founded
            </p>
            <p className="mt-3 font-mono text-5xl font-black text-[#b9ff46]">
              {communityHistory.visibleYear}
            </p>
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              Legacy metadata remains configurable until the historical timeline is confirmed.
            </p>
          </PanelBody>
        </Panel>
      </div>
      <div className="mt-5">
        <div className="relative min-h-[360px] overflow-hidden border border-white/10 bg-black/40 lg:min-h-[520px]">
          <Image
            src="/assets/community/real-zombies-industrial-yard.jpg"
            alt={locale === "es" ? "Zombis característicos del servidor" : "Server zombie lineup"}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </div>
    </section>
  );
}
