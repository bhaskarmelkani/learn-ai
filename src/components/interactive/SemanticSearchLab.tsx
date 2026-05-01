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

export function SemanticSearchLab() {
  const searchLab = useBrowserAI("retrieve");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [query, setQuery] = useState(RETRIEVAL_SCENARIOS[0].question);
  const [statusMessage, setStatusMessage] = useState(
    "Semantic search ranks by meaning, not exact keyword overlap. That is why embeddings matter for retrieval."
  );

  const scenario = RETRIEVAL_SCENARIOS[scenarioIndex];

  const runSearch = async () => {
    try {
      setStatusMessage(
        searchLab.isLoaded
          ? "Ranking the document chunks by embedding similarity..."
          : "Loading the embedding model, then ranking document chunks in-browser..."
      );
      const result = await searchLab.run({
        documents: scenario.documents,
        query,
        topK: scenario.documents.length,
      });
      setStatusMessage(`Search complete. ${scenario.expectedSourceHint}`);
      return result;
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
      return null;
    }
  };

  const selectScenario = (index: number) => {
    setScenarioIndex(index);
    setQuery(RETRIEVAL_SCENARIOS[index].question);
  };

  return (
    <BrowserAILabFrame
      eyebrow="Semantic Search Lab"
      title="Retrieve the right evidence before the model answers"
      description="This lab embeds a small set of document chunks in-browser and ranks them against a query. The goal is to show why retrieval is usually a search problem before it becomes a generation problem."
      badge={
        <BrowserAIModelBadge
          title="Static retrieval stack"
          detail="Embeddings, cosine similarity, and document ranking all happen on-device, so the demo stays GitHub Pages-safe."
        />
      }
    >
      <ScenarioPills
        activeIndex={scenarioIndex}
        items={RETRIEVAL_SCENARIOS.map((item) => item.name)}
        onSelect={selectScenario}
      />

      <label className="mt-6 block text-sm font-medium text-stone-800 dark:text-gray-200">
        Search query
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="mt-2 min-h-24 w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
        />
      </label>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void searchLab.load()}
          className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
        >
          {searchLab.isLoaded ? "Embedder ready" : "Load embedder"}
        </button>
        <button
          type="button"
          onClick={() => void runSearch()}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Run search
        </button>
      </div>

      <BrowserAIStatusPanel
        message={statusMessage}
        phase={searchLab.phase}
        status={searchLab.status}
      />

      <ControlGrid>
        <Panel title="Document set" tone="stone">
          <div className="space-y-3">
            {scenario.documents.map((document) => (
              <div
                key={document.id}
                className="rounded-[1rem] border border-stone-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900"
              >
                <p className="font-medium text-stone-900 dark:text-white">
                  {document.title}
                </p>
                <p className="mt-2 text-stone-700 dark:text-gray-300">
                  {document.text}
                </p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Ranked matches" tone="emerald">
          {searchLab.lastResult?.matches.length ? (
            <div className="space-y-3">
              {searchLab.lastResult.matches.map((match, index) => (
                <div
                  key={match.id}
                  className="rounded-[1rem] border border-emerald-200/70 bg-white/70 px-4 py-3 dark:border-emerald-500/20 dark:bg-gray-900/60"
                >
                  <p className="font-medium text-stone-900 dark:text-white">
                    {index + 1}. {match.title}
                  </p>
                  <p className="mt-2">{match.text}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Similarity {match.score.toFixed(3)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Run a search to see the ranked chunks.</p>
          )}
        </Panel>
      </ControlGrid>

      <Panel title="What to notice" tone="cyan">
        <NoticeList
          items={[
            "The highest-ranked chunk is the chunk the model should probably see before it answers.",
            "Keyword overlap is not the only signal. Queries and documents can still match semantically.",
            "In a real RAG system, retrieval quality often matters more than clever prompting.",
          ]}
        />
      </Panel>
    </BrowserAILabFrame>
  );
}
