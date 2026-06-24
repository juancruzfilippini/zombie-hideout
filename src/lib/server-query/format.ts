import type { ServerStatusResponse } from "@/lib/server-query/types";

export function formatPlayers(status: ServerStatusResponse): string {
  const { current, max } = status.players;
  if (current === null || max === null) return "N/A";
  return `${current}/${max}`;
}

export function isServerHealthy(status: ServerStatusResponse): boolean {
  return status.state === "online";
}
