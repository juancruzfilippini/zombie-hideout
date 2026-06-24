import Image from "next/image";

import { Panel, PanelBody } from "@/components/ui/panel";
import type { TeamMember } from "@/content/team";
import type { Locale } from "@/i18n/config";

export function TeamMemberCard({ member, locale }: { member: TeamMember; locale: Locale }) {
  return (
    <Panel>
      <PanelBody>
        <Image
          src={member.avatar}
          alt=""
          width={96}
          height={96}
          className="h-24 w-24 border border-white/10 bg-black/40 object-cover"
        />
        <h3 className="mt-5 text-xl font-black text-zinc-50">{member.name}</h3>
        <p className="mt-1 text-sm font-bold uppercase tracking-[0.12em] text-[#b9ff46]">
          {member.role[locale]}
        </p>
        <p className="mt-4 text-sm leading-6 text-zinc-400">{member.description[locale]}</p>
      </PanelBody>
    </Panel>
  );
}
