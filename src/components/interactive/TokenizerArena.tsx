import { useState } from "react";
import { BROWSER_AI_MODELS, useBrowserAI } from "../../lib/browser-ai";
import {
  BrowserAILabFrame,
  BrowserAIModelBadge,
  BrowserAIStatusPanel,
  ControlGrid,
  NoticeList,
  Panel,
  TokenPills,
} from "./BrowserAIPrimitives";
import { formatBrowserAIError } from "./browser-ai-utils";

const SAMPLE_TEXT =
  "Tokenization decides how a model breaks this sentence into pieces, punctuation, and reusable fragments.";

export function TokenizerArena() {
  const tokenizerLab = useBrowserAI("tokenize");
  const [text, setText] = useState(SAMPLE_TEXT);
  const [statusMessage, setStatusMessage] = useState(
    "Compare GPT-style, SmolLM, and BERT-style tokenization on the same sentence. The model files download once, then stay cached in the browser."
  );

  const runAnalysis = async () => {
    try {
      setStatusMessage(
        tokenizerLab.isLoaded
          ? "Comparing how different tokenizers split the same text..."
          : "Loading tokenizer files into the browser cache, then comparing token splits..."
      );
      const result = await tokenizerLab.run({ text });
      setStatusMessage(
        `Compared ${result.comparisons.length} tokenizers. Notice how the split points and token counts change across vocabularies.`
      );
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
    }
  };

  return (
    <BrowserAILabFrame
      eyebrow="Tokenizer Arena"
      title="See how different tokenizers carve up the same text"
      description="Tokenization is not universal. Different models split the same string differently, which changes token counts, context use, and sometimes the shape of downstream behavior."
      badge={
        <BrowserAIModelBadge
          title="Shared browser tokenizer stack"
          detail={`${BROWSER_AI_MODELS.gptTokenizer.label}, ${BROWSER_AI_MODELS.tinyGeneration.label}, and ${BROWSER_AI_MODELS.bertTokenizer.label} all compare in one static lab.`}
        />
      }
    >
      <label className="mt-6 block text-sm font-medium text-stone-800 dark:text-gray-200">
        Text to compare
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="mt-2 min-h-28 w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void tokenizerLab.load()}
          className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
        >
          {tokenizerLab.isLoaded
            ? "Tokenizer tools ready"
            : "Load tokenizer tools"}
        </button>
        <button
          type="button"
          onClick={() => void runAnalysis()}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Compare tokenization
        </button>
      </div>

      <BrowserAIStatusPanel
        message={statusMessage}
        phase={tokenizerLab.phase}
        status={tokenizerLab.status}
      />

      {tokenizerLab.lastResult ? (
        <ControlGrid>
          {tokenizerLab.lastResult.comparisons.map((comparison) => (
            <Panel
              key={comparison.id}
              title={`${comparison.label} · ${comparison.tokenCount} tokens`}
              tone={
                comparison.id === "gpt"
                  ? "cyan"
                  : comparison.id === "smollm"
                    ? "emerald"
                    : "amber"
              }
            >
              <p>
                {comparison.tokenIds.slice(0, 10).join(", ") || "No tokens"}
              </p>
              <TokenPills tokens={comparison.tokens.slice(0, 18)} />
            </Panel>
          ))}
        </ControlGrid>
      ) : null}

      <Panel title="What to notice" tone="cyan">
        <NoticeList
          items={[
            "Different tokenizers choose different reusable pieces, so the same sentence can cost a different number of tokens.",
            "Subword tokenizers often split rare or long words into chunks instead of treating the whole word as one unit.",
            "A model does not see your sentence the way a human reader sees it. It sees the tokenizer's pieces.",
          ]}
        />
      </Panel>
    </BrowserAILabFrame>
  );
}
