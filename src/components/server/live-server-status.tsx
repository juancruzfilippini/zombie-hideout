"use client";

import { Activity, Loader2, RadioTower } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Panel, PanelBody } from "@/components/ui/panel";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ServerStatusResponse } from "@/lib/server-query/types";

export function LiveServerStatus({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<ServerStatusResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/server-status", { cache: "no-store" });
        if (!response.ok) throw new Error("status failed");
        const data = (await response.json()) as ServerStatusResponse;
        if (active) setStatus(data);
      } catch {
        if (active) setError(true);
      }
    }

    void load();
    const id = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  if (!status && !error) {
    return (
      <Panel className="min-h-44">
        <PanelBody className="flex h-full items-center gap-3 text-zinc-400">
          <Loader2 className="animate-spin" aria-hidden size={18} />
          <span aria-live="polite">{dict.common.loading}</span>
        </PanelBody>
      </Panel>
    );
  }

  if (error || !status || status.state === "unavailable") {
    return (
      <Panel className="min-h-44 border-[#f08a24]/30">
        <PanelBody>
          <Badge variant="orange">{dict.common.unavailable}</Badge>
          <p className="mt-4 text-sm leading-6 text-zinc-400">{dict.server.fallback}</p>
        </PanelBody>
      </Panel>
    );
  }

  const updated = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(status.checkedAt));

  return (
    <Panel className="min-h-44">
      <PanelBody>
        <div className="flex items-center justify-between gap-4">
          <Badge variant={status.state === "online" ? "green" : "red"}>
            <span className="h-2 w-2 rounded-full bg-current" aria-hidden />
            {status.state === "online" ? dict.common.online : dict.common.offline}
          </Badge>
          <RadioTower className="text-[#b9ff46]" aria-hidden size={20} />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-zinc-500">{dict.server.players}</dt>
            <dd className="font-mono text-xl text-zinc-50">
              {status.players.current ?? "?"}/{status.players.max ?? "?"}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict.server.map}</dt>
            <dd className="truncate font-mono text-zinc-100">
              {status.map ?? dict.server.currentMapUnknown}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict.server.ping}</dt>
            <dd className="font-mono text-zinc-100">{status.ping ? `${status.ping}ms` : "N/A"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500">{dict.server.updatedAt}</dt>
            <dd className="font-mono text-zinc-100">{updated}</dd>
          </div>
        </dl>
        <p className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
          <Activity aria-hidden size={14} /> {status.source.toUpperCase()} TELEMETRY
        </p>
      </PanelBody>
    </Panel>
  );
}
