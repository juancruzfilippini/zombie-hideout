import Link from "next/link";

import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { patchNotes } from "@/content/updates";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { getLocalizedRoute } from "@/i18n/routes";
import { PatchNoteEntry } from "@/components/updates/patch-note-entry";

export function PatchNotesPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="CHANGELOG"
        title={dict.sections.updatesTitle}
        action={
          <Button asChild variant="secondary">
            <Link href={getLocalizedRoute("updates", locale)}>{dict.common.readMore}</Link>
          </Button>
        }
      />
      <PatchNoteEntry note={patchNotes[0]} locale={locale} dict={dict} />
    </section>
  );
}
