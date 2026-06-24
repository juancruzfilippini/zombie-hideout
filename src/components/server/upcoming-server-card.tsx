import { Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody } from "@/components/ui/panel";
import { upcomingServer } from "@/content/site";
import type { Locale } from "@/i18n/config";

export function UpcomingServerCard({ locale }: { locale: Locale }) {
  return (
    <Panel>
      <PanelBody>
        <Badge variant="orange">{upcomingServer.status[locale]}</Badge>
        <h3 className="mt-4 text-2xl font-black uppercase text-zinc-50">
          {upcomingServer.name}
        </h3>
        <p className="mt-2 text-sm uppercase tracking-[0.12em] text-zinc-500">
          {upcomingServer.game}
        </p>
        <p className="mt-4 text-sm leading-6 text-zinc-300">{upcomingServer.description[locale]}</p>
        <Button className="mt-6" variant="ghost" disabled>
          <Lock aria-hidden size={16} />
          {upcomingServer.status[locale]}
        </Button>
      </PanelBody>
    </Panel>
  );
}
