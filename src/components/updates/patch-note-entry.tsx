import { CalendarDays, Server } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Panel, PanelBody } from "@/components/ui/panel";
import type { PatchNote } from "@/content/updates";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function PatchNoteEntry({
  note,
  locale,
  dict,
}: {
  note: PatchNote;
  locale: Locale;
  dict: Dictionary;
}) {
  const dateLabel = note.confirmedDate
    ? new Intl.DateTimeFormat(locale).format(new Date(note.confirmedDate))
    : note.dateCandidates.join(" / ");

  return (
    <Panel>
      <PanelBody>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge variant="green">{note.dossierCode}</Badge>
            <h3 className="mt-4 text-2xl font-black uppercase text-zinc-50">
              {note.title[locale]}
            </h3>
          </div>
          <button
            type="button"
            className="border border-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-300 transition hover:border-[#b9ff46]/50 hover:text-[#b9ff46]"
          >
            {dict.common.share}
          </button>
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-400">
          <span className="inline-flex items-center gap-2">
            <CalendarDays aria-hidden size={16} /> {dateLabel}
          </span>
          <span className="inline-flex items-center gap-2">
            <Server aria-hidden size={16} /> {note.affectedServer}
          </span>
          <Badge variant="orange">{note.category[locale]}</Badge>
        </div>
        <ul className="mt-6 grid gap-3">
          {note.changes.map((change) => (
            <li key={change.label} className="border-l-2 border-[#b9ff46]/40 pl-4">
              <span className="font-mono text-sm text-[#b9ff46]">[{change.label}]</span>
              <p className="mt-1 text-sm leading-6 text-zinc-300">{change.body[locale]}</p>
            </li>
          ))}
        </ul>
      </PanelBody>
    </Panel>
  );
}
