import { expect, test } from "@playwright/test";

test("first-run onboarding lands on the catalog", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /interactive ai courses for curious learners/i,
    })
  ).toBeVisible();

  await page.getByRole("button", { name: /get started/i }).click();
  await page.getByRole("button", { name: /start learning/i }).click();

  await expect(
    page.getByRole("heading", { name: /course catalog/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /^AI Foundations$/i }).first()
  ).toBeVisible();
});

test("catalog start opens the first chapter", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("learn-ai-onboarded", "true");
  });

  await page.goto("/");
  const aiFoundationsCard = page.locator("article").filter({
    has: page.getByRole("heading", { name: /^AI Foundations$/i }),
  });
  await aiFoundationsCard
    .getByRole("button", { name: /start course/i })
    .click();

  await expect(page).toHaveURL(/\/courses\/ai-fundamentals\/1$/);
  await expect(
    page.getByRole("heading", { name: /what is a model/i })
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
      })
    );
  });

  await page.goto("/");
  const aiFoundationsCard = page.locator("article").filter({
    has: page.getByRole("heading", { name: /^AI Foundations$/i }),
  });
  await aiFoundationsCard
    .getByRole("button", { name: /continue learning/i })
    .click();

  await expect(page).toHaveURL(/\/courses\/ai-fundamentals\/4$/);
  await page.getByRole("button", { name: /^Next →/ }).click();
  await expect(page).toHaveURL(/\/courses\/ai-fundamentals\/5$/);
});

test("gen ai browser llm lab renders and runs in mock mode", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("learn-ai-onboarded", "true");
    (
      window as Window & { __LEARN_AI_BROWSER_AI_MOCK__?: boolean }
    ).__LEARN_AI_BROWSER_AI_MOCK__ = true;
  });

  await page.goto("/courses/gen-ai-intuition/4");

  await expect(
    page.getByRole("heading", {
      name: /try a real local model while you learn prompting/i,
    })
  ).toBeVisible();
  await page.getByRole("button", { name: /run prompt/i }).click();
  await expect(page.getByText(/mock local answer:/i)).toBeVisible();
});

test("ai foundations browser ai labs render in mock mode", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("learn-ai-onboarded", "true");
    (
      window as Window & { __LEARN_AI_BROWSER_AI_MOCK__?: boolean }
    ).__LEARN_AI_BROWSER_AI_MOCK__ = true;
  });

  await page.goto("/courses/ai-fundamentals/10");

  await expect(
    page.getByRole("heading", {
      name: /see how different tokenizers carve up the same text/i,
    })
  ).toBeVisible();
  await page.getByRole("button", { name: /compare tokenization/i }).click();
  await expect(page.getByText(/GPT-4o tokenizer .* tokens/i)).toBeVisible();
});
