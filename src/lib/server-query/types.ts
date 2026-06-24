export type ServerStatusState = "online" | "offline" | "unavailable";

export type ServerStatusResponse = {
  serverName: string;
  address: string;
  state: ServerStatusState;
  players: {
    current: number | null;
    max: number | null;
  };
  map: string | null;
  version: string | null;
  ping: number | null;
  checkedAt: string;
  source: "mock" | "live";
  message?: string;
};
