import "server-only";

import { serverConfig } from "@/content/site";
import type { ServerStatusResponse } from "@/lib/server-query/types";

type GameDigState = {
  name?: string;
  map?: string;
  numplayers?: number;
  maxplayers?: number;
  ping?: number;
  version?: string;
};

type GameDigModule = {
  GameDig: {
    query(input: {
      type: string;
      host: string;
      address: string;
      port: number;
      maxRetries: number;
      socketTimeout: number;
      attemptTimeout: number;
      givenPortOnly: boolean;
      requestPlayers: boolean;
      requestRules: boolean;
    }): Promise<GameDigState>;
  };
};

export function getMockServerStatus(): ServerStatusResponse {
  return {
    serverName: serverConfig.name,
    address: serverConfig.address,
    state: "online",
    players: { current: 12, max: 64 },
    map: "zm_hideout_industrial",
    version: "CSS Zombie Mod",
    ping: 38,
    checkedAt: new Date().toISOString(),
    source: "mock",
  };
}

export async function queryServerStatus(): Promise<ServerStatusResponse> {
  const mode = process.env.SERVER_STATUS_MODE ?? "mock";
  if (mode === "mock") {
    return getMockServerStatus();
  }

  try {
    const timeout = Number(process.env.SERVER_QUERY_TIMEOUT_MS ?? 2500);
    const { GameDig } = (await import("gamedig")) as GameDigModule;
    const state = await GameDig.query({
      type: serverConfig.gameDigType,
      host: serverConfig.host,
      address: serverConfig.host,
      port: serverConfig.port,
      maxRetries: 0,
      socketTimeout: timeout,
      attemptTimeout: timeout + 500,
      givenPortOnly: true,
      requestPlayers: false,
      requestRules: false,
    });

    return {
      serverName: state.name || serverConfig.name,
      address: serverConfig.address,
      state: "online",
      players: {
        current: typeof state.numplayers === "number" ? state.numplayers : null,
        max: typeof state.maxplayers === "number" ? state.maxplayers : null,
      },
      map: state.map || null,
      version: state.version || null,
      ping: typeof state.ping === "number" ? Math.round(state.ping) : null,
      checkedAt: new Date().toISOString(),
      source: "live",
    };
  } catch (error) {
    console.error("[server-status] query failed", {
      message: error instanceof Error ? error.message : "unknown",
    });

    if (mode === "auto") {
      return getMockServerStatus();
    }

    return {
      serverName: serverConfig.name,
      address: serverConfig.address,
      state: "unavailable",
      players: { current: null, max: null },
      map: null,
      version: null,
      ping: null,
      checkedAt: new Date().toISOString(),
      source: "live",
      message: "status_unavailable",
    };
  }
}
