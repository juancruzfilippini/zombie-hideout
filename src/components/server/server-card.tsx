import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Panel, PanelBody, PanelHeader } from "@/components/ui/panel";
import { serverConfig } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function ServerCard({ dict }: { dict: Dictionary }) {
  return (
    <Panel id="server">
      <PanelHeader>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Badge variant="green">{dict.common.online}</Badge>
            <h3 className="mt-3 text-2xl font-black uppercase text-zinc-50">
              {serverConfig.name}
            </h3>
          </div>
          <p className="font-mono text-[#b9ff46]">{serverConfig.address}</p>
        </div>
      </PanelHeader>
      <PanelBody>
        <dl className="grid gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-zinc-500">Game</dt>
            <dd className="mt-1 text-zinc-100">{serverConfig.game}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-zinc-500">Mod</dt>
            <dd className="mt-1 text-zinc-100">{serverConfig.primaryMod}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-zinc-500">Command</dt>
            <dd className="mt-1 font-mono text-zinc-100">{serverConfig.consoleCommand}</dd>
          </div>
        </dl>
        <Button asChild variant="ghost" className="mt-6">
          <a href={serverConfig.steamStoreUrl} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden size={16} />
            Steam
          </a>
        </Button>
      </PanelBody>
    </Panel>
  );
}
