import { notFound } from "next/navigation";

import { AboutSection } from "@/components/home/about-section";
import { Hero } from "@/components/home/hero";
import { MediaPreview } from "@/components/home/media-preview";
import { PatchNotesPreview } from "@/components/home/patch-notes-preview";
import { ZombieExperienceSection } from "@/components/home/zombie-experience-section";
import { ServerCard } from "@/components/server/server-card";
import { UpcomingServerCard } from "@/components/server/upcoming-server-card";
import { SectionHeader } from "@/components/shared/section-header";
import { TeamSection } from "@/components/team/team-section";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const dict = getDictionary(rawLocale);

  return (
    <>
      <Hero dict={dict} />
      <AboutSection locale={rawLocale} dict={dict} />
      <section className="section-shell">
        <SectionHeader eyebrow="A2S-LIVE" title={dict.sections.serverTitle} />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <ServerCard dict={dict} />
          <UpcomingServerCard locale={rawLocale} />
        </div>
      </section>
      <ZombieExperienceSection locale={rawLocale} dict={dict} />
      <PatchNotesPreview locale={rawLocale} dict={dict} />
      <TeamSection locale={rawLocale} dict={dict} />
      <MediaPreview locale={rawLocale} dict={dict} />
    </>
  );
}
