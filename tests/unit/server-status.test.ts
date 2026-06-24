import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GameDig } from "gamedig";

import { serverConfig } from "@/content/site";
import { formatPlayers, isServerHealthy } from "@/lib/server-query/format";
import { getConfiguredOfflineStatus, queryServerStatus } from "@/lib/server-query/status";

vi.mock("gamedig", () => ({
  GameDig: {
    query: vi.fn(),
  },
}));

const originalServerStatusMode = process.env.SERVER_STATUS_MODE;

describe("server status", () => {
  beforeEach(() => {
    vi.mocked(GameDig.query).mockReset();
    process.env.SERVER_STATUS_MODE = originalServerStatusMode;
  });

  afterEach(() => {
    process.env.SERVER_STATUS_MODE = originalServerStatusMode;
  });

  it("formats configured offline status", () => {
    const status = getConfiguredOfflineStatus();

    expect(status.address).toBe(serverConfig.address);
    expect(formatPlayers(status)).toBe("0/0");
    expect(isServerHealthy(status)).toBe(false);
  });

  it("falls back for missing player counts", () => {
    const status = { ...getConfiguredOfflineStatus(), players: { current: null, max: null } };

    expect(formatPlayers(status)).toBe("N/A");
  });

  it("uses configured offline status when auto mode cannot reach the server", async () => {
    process.env.SERVER_STATUS_MODE = "auto";
    vi.mocked(GameDig.query).mockRejectedValueOnce(new Error("server closed"));

    const status = await queryServerStatus();

    expect(GameDig.query).toHaveBeenCalledWith(
      expect.objectContaining({
        host: serverConfig.host,
        port: serverConfig.port,
        givenPortOnly: true,
      }),
    );
    expect(status.state).toBe("offline");
    expect(status.source).toBe("configured");
    expect(status.players).toEqual({ current: 0, max: 0 });
    expect(status.map).toBeNull();
  });
});
