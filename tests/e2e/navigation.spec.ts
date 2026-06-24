import { expect, test } from "@playwright/test";

test("localized landing renders and navigates", async ({ page }) => {
  await page.goto("/es", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: /hideout gaming/i })).toBeVisible();
  await expect(page.locator("#server").getByText("168.100.162.59:27031", { exact: true })).toBeVisible();

  await expect(page.locator('header a[href="/es/actualizaciones"]').first()).toHaveAttribute(
    "href",
    "/es/actualizaciones",
  );
  await page.goto("/es/actualizaciones", { waitUntil: "domcontentloaded" });
  await expect(page).toHaveURL(/\/es\/actualizaciones/);
  await expect(page.getByRole("heading", { name: /registros clasificados/i })).toBeVisible();

  await page.screenshot({ path: "test-results/es-updates.png" });
});

test("mobile menu exposes main navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole("button", { name: /open menu/i }).click({ force: true });
  await expect(page.getByRole("link", { name: "Donations" })).toBeVisible();
  await page.screenshot({ path: "test-results/mobile-menu.png" });
});
