import { describe, expect, it } from "vitest";

import { getDictionary } from "@/i18n/dictionaries";
import { getLocalizedRoute } from "@/i18n/routes";

describe("i18n", () => {
  it("provides localized primary metadata", () => {
    expect(getDictionary("es").meta.title).toContain("Servidor Zombie Mod");
    expect(getDictionary("en").meta.title).toContain("Zombie Mod Server");
  });

  it("maps localized routes", () => {
    expect(getLocalizedRoute("updates", "es")).toBe("/es/actualizaciones");
    expect(getLocalizedRoute("updates", "en")).toBe("/en/updates");
  });
});
