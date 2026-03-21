import { expect, test } from "@playwright/test";

test("loads the learning app", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /what is a model/i })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
});
