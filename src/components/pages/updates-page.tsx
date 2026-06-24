import { SectionHeader } from "@/components/shared/section-header";
import { PatchNoteEntry } from "@/components/updates/patch-note-entry";
import { patchNotes } from "@/content/updates";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export function UpdatesPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section className="section-shell">
      <SectionHeader
        eyebrow="CLASSIFIED PATCH LOG"
        title={dict.sections.updatesTitle}
        lead={
          locale === "es"
            ? "Expedientes de versión, fechas pendientes de confirmación y cambios del servidor."
            : "Version records, dates pending confirmation, and server changes."
        }
      />
      <div className="grid gap-5">
        {patchNotes.map((note) => (
          <PatchNoteEntry key={note.id} note={note} locale={locale} dict={dict} />
        ))}
      </div>
    </section>
  );
}
