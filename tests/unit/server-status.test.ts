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

const originalEnv = {
  SERVER_STATUS_ALLOW_MOCK_IN_PRODUCTION: process.env.SERVER_STATUS_ALLOW_MOCK_IN_PRODUCTION,
  SERVER_STATUS_MODE: process.env.SERVER_STATUS_MODE,
  VERCEL: process.env.VERCEL,
  VERCEL_ENV: process.env.VERCEL_ENV,
};

function restoreEnv() {
  for (const [key, value] of Object.entries(originalEnv)) {
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
}

describe("server status", () => {
  beforeEach(() => {
    vi.mocked(GameDig.query).mockReset();
    restoreEnv();
  });

  afterEach(() => {
    restoreEnv();
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

  it("ignores accidental mock mode in Vercel production", async () => {
    process.env.SERVER_STATUS_MODE = "mock";
    process.env.VERCEL = "1";
    process.env.VERCEL_ENV = "production";
    vi.mocked(GameDig.query).mockResolvedValueOnce({
      name: serverConfig.name,
      map: "cs_compound",
      numplayers: 17,
      maxplayers: 52,
      ping: 209,
      version: serverConfig.game,
    });

    const status = await queryServerStatus();

    expect(GameDig.query).toHaveBeenCalledOnce();
    expect(status.state).toBe("online");
    expect(status.source).toBe("live");
    expect(status.players).toEqual({ current: 17, max: 52 });
    expect(status.map).toBe("cs_compound");
  });

  it("allows explicit mock mode in Vercel production for maintenance", async () => {
    process.env.SERVER_STATUS_ALLOW_MOCK_IN_PRODUCTION = "true";
    process.env.SERVER_STATUS_MODE = "mock";
    process.env.VERCEL = "1";
    process.env.VERCEL_ENV = "production";

    const status = await queryServerStatus();

    expect(GameDig.query).not.toHaveBeenCalled();
    expect(status.state).toBe("offline");
    expect(status.source).toBe("mock");
  });
});
