import { SectionHeader } from "@/components/shared/section-header";
import { teamMembers } from "@/content/team";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { TeamMemberCard } from "@/components/team/team-member-card";

export function TeamSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="team" className="section-shell">
      <SectionHeader eyebrow="CREW MANIFEST" title={dict.sections.teamTitle} />
      <div className="grid gap-4 md:grid-cols-3">
        {teamMembers
          .filter((member) => member.visible)
          .map((member) => (
            <TeamMemberCard key={member.id} member={member} locale={locale} />
          ))}
      </div>
    </section>
  );
}
