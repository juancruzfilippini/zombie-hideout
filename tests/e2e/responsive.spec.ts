import { expect, test } from "@playwright/test";

const pages = ["/es", "/es/donar", "/es/media", "/es/actualizaciones", "/es/contacto"];
const viewports = [
  { name: "small phone", width: 320, height: 720 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "tablet landscape", width: 1024, height: 768 },
  { name: "desktop", width: 1440, height: 900 },
];

test("key pages avoid horizontal overflow across responsive breakpoints", async ({ page }) => {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const path of pages) {
      await page.goto(path, { waitUntil: "domcontentloaded" });

      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(dimensions.scrollWidth, `${viewport.name} ${path}`).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
    }
  }
});
