import { useState } from "react";
import {
  BROWSER_AI_CONTEXT_BUDGETS,
  BROWSER_AI_OUTPUT_ALLOWANCES,
  useBrowserAI,
} from "../../lib/browser-ai";
import {
  BrowserAILabFrame,
  BrowserAIModelBadge,
  BrowserAIStatusPanel,
  ControlGrid,
  Panel,
} from "./BrowserAIPrimitives";
import { formatBrowserAIError } from "./browser-ai-utils";

const DEFAULT_SYSTEM_PROMPT =
  "You are a helpful study assistant. Be concise, cite uncertainty, and avoid inventing facts.";
const DEFAULT_EXAMPLE =
  "Example answer:\nQuestion: What changed in the release?\nAnswer:\n- Decision: beta moves to April 18.\n- Blocker: CRM export still pending.";
const DEFAULT_USER_PROMPT =
  "Summarize the launch notes for a busy product manager using bullets for decisions, blockers, and next steps.";

export function ContextBudgetLab() {
  const budgetLab = useBrowserAI("countTokens");
  const [contextBudget, setContextBudget] = useState<number>(
    BROWSER_AI_CONTEXT_BUDGETS[1]
  );
  const [outputAllowance, setOutputAllowance] = useState<number>(
    BROWSER_AI_OUTPUT_ALLOWANCES[1]
  );
  const [systemPrompt, setSystemPrompt] = useState(DEFAULT_SYSTEM_PROMPT);
  const [example, setExample] = useState(DEFAULT_EXAMPLE);
  const [userPrompt, setUserPrompt] = useState(DEFAULT_USER_PROMPT);
  const [statusMessage, setStatusMessage] = useState(
    "Prompt cost is not just the user message. Chat wrappers, system instructions, examples, and output allowance all spend the same context budget."
  );

  const analyzeBudget = async () => {
    try {
      setStatusMessage(
        budgetLab.isLoaded
          ? "Calculating prompt budget across tokenizer styles..."
          : "Loading tokenizer files, then calculating prompt budget and chat overhead..."
      );
      const result = await budgetLab.run({
        contextBudget,
        example,
        outputAllowance,
        systemPrompt,
        userPrompt,
      });
      const tightest = [...result.breakdowns].sort(
        (left, right) => left.remaining - right.remaining
      )[0];
      setStatusMessage(
        tightest.fits
          ? `This prompt still fits, but the tightest tokenizer leaves only ${tightest.remaining} tokens of spare room.`
          : `This prompt overruns the ${tightest.contextBudget}-token budget for ${tightest.tokenizerLabel} by ${tightest.truncatedBy} tokens.`
      );
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
    }
  };

  return (
    <BrowserAILabFrame
      eyebrow="Context Budget Lab"
      title="See where the token budget actually goes"
      description="A chat prompt spends context on every section: the system instruction, few-shot examples, user text, chat-template overhead, and the output you still want the model to produce."
      badge={
        <BrowserAIModelBadge
          title="Budget-aware static lab"
          detail="This lab compares GPT-style chat counting with the local tiny-model tokenizer so learners can see that prompt budgets are model-specific."
        />
      }
    >
      <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-stone-800 dark:text-gray-200">
            Context budget
            <select
              value={contextBudget}
              onChange={(event) => setContextBudget(Number(event.target.value))}
              className="mt-2 w-full rounded-[1rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
            >
              {BROWSER_AI_CONTEXT_BUDGETS.map((budget) => (
                <option key={budget} value={budget}>
                  {budget} tokens
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium text-stone-800 dark:text-gray-200">
            Output allowance
            <select
              value={outputAllowance}
              onChange={(event) =>
                setOutputAllowance(Number(event.target.value))
              }
              className="mt-2 w-full rounded-[1rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
            >
              {BROWSER_AI_OUTPUT_ALLOWANCES.map((budget) => (
                <option key={budget} value={budget}>
                  {budget} tokens
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void budgetLab.load()}
              className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
            >
              {budgetLab.isLoaded
                ? "Tokenizer tools ready"
                : "Load budget tools"}
            </button>
            <button
              type="button"
              onClick={() => void analyzeBudget()}
              className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Analyze budget
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-stone-800 dark:text-gray-200">
            System instruction
            <textarea
              value={systemPrompt}
              onChange={(event) => setSystemPrompt(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
            />
          </label>
          <label className="block text-sm font-medium text-stone-800 dark:text-gray-200">
            Example / few-shot message
            <textarea
              value={example}
              onChange={(event) => setExample(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
            />
          </label>
          <label className="block text-sm font-medium text-stone-800 dark:text-gray-200">
            User prompt
            <textarea
              value={userPrompt}
              onChange={(event) => setUserPrompt(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
            />
          </label>
        </div>
      </div>

      <BrowserAIStatusPanel
        message={statusMessage}
        phase={budgetLab.phase}
        status={budgetLab.status}
      />

      {budgetLab.lastResult ? (
        <ControlGrid>
          {budgetLab.lastResult.breakdowns.map((breakdown) => (
            <Panel
              key={breakdown.tokenizerId}
              title={`${breakdown.tokenizerLabel} · ${breakdown.promptTokens} prompt tokens`}
              tone={breakdown.fits ? "emerald" : "rose"}
            >
              <p>
                System: {breakdown.systemTokens} · Example:{" "}
                {breakdown.exampleTokens} · User: {breakdown.userTokens}
              </p>
              <p className="mt-2">
                Chat overhead: {breakdown.chatOverhead} · Output allowance:{" "}
                {breakdown.outputAllowance}
              </p>
              <p className="mt-2">
                Total with output: {breakdown.totalWithOutput} /{" "}
                {breakdown.contextBudget}
              </p>
              <p className="mt-2">
                {breakdown.fits
                  ? `${breakdown.remaining} tokens remain for extra context or safety margin.`
                  : `The prompt would need to shrink by ${breakdown.truncatedBy} tokens.`}
              </p>
            </Panel>
          ))}
        </ControlGrid>
      ) : null}
    </BrowserAILabFrame>
  );
}
