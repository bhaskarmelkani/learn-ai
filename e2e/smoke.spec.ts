import { expect, test } from "@playwright/test";

test("first-run onboarding lands on the catalog", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /interactive ai courses for curious learners/i,
    }),
  ).toBeVisible();

  await page.getByRole("button", { name: /get started/i }).click();
  await page.getByRole("button", { name: /start learning/i }).click();

  await expect(
    page.getByRole("heading", { name: /course catalog/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /^AI In-tuition$/i }).first(),
  ).toBeVisible();
});

test("catalog start opens the first chapter", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("learn-ai-onboarded", "true");
  });

  await page.goto("/");
  await page.getByRole("button", { name: /start course/i }).click();

  await expect(page).toHaveURL(/\/courses\/ai-fundamentals\/1$/);
  await expect(
    page.getByRole("heading", { name: /what is a model/i }),
  ).toBeVisible();
});

test("continue resumes the saved chapter and next navigation updates the url", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("learn-ai-onboarded", "true");
    window.localStorage.setItem(
      "learn-ai-learning-state-v3",
      JSON.stringify({
        track: "conceptual",
        guidedMode: true,
        courseProgress: {
          "ai-fundamentals": {
            checkpoints: {},
            reviewedChapters: { 1: true, 2: true, 3: true },
            lastChapter: 4,
          },
        },
      }),
    );
  });

  await page.goto("/");
  await page.getByRole("button", { name: /continue learning/i }).click();

  await expect(page).toHaveURL(/\/courses\/ai-fundamentals\/4$/);
  await page.getByRole("button", { name: /^Next →/ }).click();
  await expect(page).toHaveURL(/\/courses\/ai-fundamentals\/5$/);
});
