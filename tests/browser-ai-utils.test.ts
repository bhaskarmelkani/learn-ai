import { rankBySimilarity, summarizeTokenBudget } from "../src/lib/browser-ai";

describe("browser AI utilities", () => {
  it("calculates token budgets including chat overhead", () => {
    expect(
      summarizeTokenBudget({
        contextBudget: 128,
        exampleTokens: 12,
        outputAllowance: 32,
        promptTokens: 78,
        systemTokens: 10,
        tokenizerId: "gpt",
        tokenizerLabel: "GPT-4o tokenizer",
        userTokens: 40,
      })
    ).toEqual({
      chatOverhead: 16,
      contextBudget: 128,
      exampleTokens: 12,
      fits: true,
      outputAllowance: 32,
      promptTokens: 78,
      remaining: 18,
      systemTokens: 10,
      tokenizerId: "gpt",
      tokenizerLabel: "GPT-4o tokenizer",
      totalWithOutput: 110,
      truncatedBy: 0,
      userTokens: 40,
    });
  });

  it("reports overflow when the prompt exceeds the budget", () => {
    const result = summarizeTokenBudget({
      contextBudget: 64,
      exampleTokens: 10,
      outputAllowance: 24,
      promptTokens: 58,
      systemTokens: 8,
      tokenizerId: "smollm",
      tokenizerLabel: "SmolLM tokenizer",
      userTokens: 32,
    });

    expect(result.fits).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.truncatedBy).toBe(18);
  });

  it("ranks retrieval documents by cosine similarity", () => {
    const ranked = rankBySimilarity(
      [1, 0],
      [
        [0.9, 0.1],
        [0.2, 0.8],
        [0.75, 0.25],
      ],
      [
        { id: "a", text: "Vacation policy", title: "Handbook" },
        { id: "b", text: "Travel policy", title: "Travel" },
        { id: "c", text: "Pricing page", title: "Pricing" },
      ],
      2
    );

    expect(ranked).toHaveLength(2);
    expect(ranked[0].id).toBe("a");
    expect(ranked[1].id).toBe("c");
    expect(ranked[0].score).toBeGreaterThan(ranked[1].score);
  });
});
