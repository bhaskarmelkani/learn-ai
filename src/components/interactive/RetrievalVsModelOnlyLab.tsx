import { useState } from "react";
import { RETRIEVAL_SCENARIOS, useBrowserAI } from "../../lib/browser-ai";
import {
  BrowserAILabFrame,
  BrowserAIModelBadge,
  BrowserAIStatusPanel,
  ControlGrid,
  NoticeList,
  Panel,
  ScenarioPills,
} from "./BrowserAIPrimitives";
import { formatBrowserAIError } from "./browser-ai-utils";

export function RetrievalVsModelOnlyLab() {
  const retrieveLab = useBrowserAI("retrieve");
  const generateLab = useBrowserAI("generate");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "This lab compares two workflows: answer from the tiny model alone, then answer after retrieval adds the most relevant sources."
  );
  const [comparison, setComparison] = useState<{
    groundedAnswer: string;
    modelOnlyAnswer: string;
    retrievedTitles: string[];
  } | null>(null);

  const scenario = RETRIEVAL_SCENARIOS[scenarioIndex];
  const phase =
    generateLab.phase === "running" || retrieveLab.phase === "running"
      ? "running"
      : generateLab.phase === "loading" || retrieveLab.phase === "loading"
        ? "loading"
        : generateLab.phase === "error" || retrieveLab.phase === "error"
          ? "error"
          : generateLab.phase === "offline" || retrieveLab.phase === "offline"
            ? "offline"
            : generateLab.phase === "unsupported" ||
                retrieveLab.phase === "unsupported"
              ? "unsupported"
              : generateLab.isLoaded || retrieveLab.isLoaded
                ? "ready"
                : "idle";

  const combinedStatus = {
    ...generateLab.status,
    loadedTasks: Array.from(
      new Set([
        ...generateLab.status.loadedTasks,
        ...retrieveLab.status.loadedTasks,
      ])
    ),
  };

  const runComparison = async () => {
    try {
      setStatusMessage(
        "Retrieving the best evidence first, then comparing a model-only answer with a grounded answer..."
      );
      const retrieved = await retrieveLab.run({
        documents: scenario.documents,
        query: scenario.question,
        topK: 2,
      });

      const modelOnly = await generateLab.run({
        maxNewTokens: 96,
        prompt: `Answer this question in 3 short sentences. If you are unsure, say that clearly.\n\nQuestion: ${scenario.question}`,
        temperature: 0.7,
        topK: 40,
      });

      const groundedPrompt = `Answer the question using only the retrieved evidence. If the evidence is missing, say that clearly.\n\nQuestion: ${scenario.question}\n\nRetrieved evidence:\n${retrieved.matches
        .map((match, index) => `${index + 1}. ${match.title}: ${match.text}`)
        .join("\n")}`;
      const grounded = await generateLab.run({
        maxNewTokens: 120,
        prompt: groundedPrompt,
        temperature: 0.3,
        topK: 30,
      });

      setComparison({
        groundedAnswer: grounded.text,
        modelOnlyAnswer: modelOnly.text,
        retrievedTitles: retrieved.matches.map((match) => match.title),
      });
      setStatusMessage(`Comparison complete. ${scenario.expectedSourceHint}`);
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
    }
  };

  return (
    <BrowserAILabFrame
      eyebrow="Retrieval vs Model-Only"
      title="Compare guessing from prior patterns with answering from retrieved evidence"
      description="The same tiny model can look much more useful when the workflow retrieves the right source first. This is the practical intuition behind retrieval-augmented generation."
      badge={
        <BrowserAIModelBadge
          title="Two-step browser lab"
          detail="Retrieval and tiny-model generation both stay local to the browser, so learners can inspect the whole flow with no backend."
        />
      }
    >
      <ScenarioPills
        activeIndex={scenarioIndex}
        items={RETRIEVAL_SCENARIOS.map((item) => item.name)}
        onSelect={setScenarioIndex}
      />

      <Panel title="Question under test" tone="stone">
        <p>{scenario.question}</p>
      </Panel>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void retrieveLab.load()}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {retrieveLab.isLoaded ? "Embedder ready" : "Load retrieval model"}
        </button>
        <button
          type="button"
          onClick={() => void generateLab.load()}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {generateLab.isLoaded ? "Tiny LLM ready" : "Load tiny LLM"}
        </button>
        <button
          type="button"
          onClick={() => void runComparison()}
          className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
        >
          Run comparison
        </button>
      </div>

      <BrowserAIStatusPanel
        message={statusMessage}
        phase={phase}
        status={combinedStatus}
      />

      <ControlGrid>
        <Panel title="Model-only answer" tone="amber">
          <p>
            {comparison?.modelOnlyAnswer ??
              "Run the comparison to see how the tiny model answers without retrieved evidence."}
          </p>
        </Panel>
        <Panel title="Retrieved-evidence answer" tone="emerald">
          <p>
            {comparison?.groundedAnswer ??
              "Run the comparison to see the answer after retrieval adds evidence."}
          </p>
        </Panel>
      </ControlGrid>

      <ControlGrid>
        <Panel title="Retrieved source titles" tone="cyan">
          {comparison ? (
            <ul className="space-y-2">
              {comparison.retrievedTitles.map((title) => (
                <li key={title}>{title}</li>
              ))}
            </ul>
          ) : (
            <p>The top source titles will appear here after retrieval runs.</p>
          )}
        </Panel>
        <Panel title="What to notice" tone="cyan">
          <NoticeList
            items={[
              "The model-only answer can sound fluent while staying generic or wrong.",
              "Retrieval does not make the model omniscient. It gives the model better evidence to condition on.",
              "The workflow quality now depends on both ranking quality and answer-generation quality.",
            ]}
          />
        </Panel>
      </ControlGrid>
    </BrowserAILabFrame>
  );
}
