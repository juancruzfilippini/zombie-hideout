import { describe, expect, it } from "vitest";

import { serverConfig } from "@/content/site";
import { formatPlayers, isServerHealthy } from "@/lib/server-query/format";
import { getMockServerStatus } from "@/lib/server-query/status";

describe("server status", () => {
  it("formats mock status", () => {
    const status = getMockServerStatus();

    expect(status.address).toBe(serverConfig.address);
    expect(formatPlayers(status)).toBe("12/64");
    expect(isServerHealthy(status)).toBe(true);
  });

  it("falls back for missing player counts", () => {
    const status = { ...getMockServerStatus(), players: { current: null, max: null } };

    expect(formatPlayers(status)).toBe("N/A");
  });
});
