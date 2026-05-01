import type { TokenBudgetBreakdown } from "./types";

export function summarizeTokenBudget({
  contextBudget,
  exampleTokens,
  outputAllowance,
  promptTokens,
  systemTokens,
  tokenizerId,
  tokenizerLabel,
  userTokens,
}: Omit<
  TokenBudgetBreakdown,
  "chatOverhead" | "fits" | "remaining" | "totalWithOutput" | "truncatedBy"
>) {
  const sectionTotal = systemTokens + exampleTokens + userTokens;
  const chatOverhead = Math.max(0, promptTokens - sectionTotal);
  const totalWithOutput = promptTokens + outputAllowance;
  const remaining = contextBudget - totalWithOutput;

  return {
    chatOverhead,
    contextBudget,
    exampleTokens,
    fits: remaining >= 0,
    outputAllowance,
    promptTokens,
    remaining: Math.max(0, remaining),
    systemTokens,
    tokenizerId,
    tokenizerLabel,
    totalWithOutput,
    truncatedBy: remaining < 0 ? Math.abs(remaining) : 0,
    userTokens,
  } satisfies TokenBudgetBreakdown;
}
