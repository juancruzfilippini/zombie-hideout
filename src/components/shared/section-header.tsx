import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  action?: ReactNode;
};

export function SectionHeader({ eyebrow, title, lead, action }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <Badge variant="green">{eyebrow}</Badge>
        <h2 className="mt-4 text-3xl font-black uppercase leading-tight text-zinc-50 md:text-5xl">
          {title}
        </h2>
        {lead ? <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}
