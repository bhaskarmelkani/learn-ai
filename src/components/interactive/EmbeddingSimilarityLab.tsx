import { useState } from "react";
import {
  EMBEDDING_TEXT_GROUPS,
  cosineSimilarity,
  useBrowserAI,
} from "../../lib/browser-ai";
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

export function EmbeddingSimilarityLab() {
  const embedLab = useBrowserAI("embed");
  const [groupIndex, setGroupIndex] = useState(0);
  const [anchorIndex, setAnchorIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Embeddings turn text into vectors. Similar meanings land closer together, even when the wording is not identical."
  );

  const group = EMBEDDING_TEXT_GROUPS[groupIndex];
  const anchorVector = embedLab.lastResult?.vectors[anchorIndex] ?? [];
  const rankings = !embedLab.lastResult?.vectors.length
    ? []
    : group.texts
        .map((text, index) => ({
          index,
          score: cosineSimilarity(
            anchorVector,
            embedLab.lastResult?.vectors[index] ?? []
          ),
          text,
        }))
        .sort((left, right) => right.score - left.score);

  const embedGroup = async () => {
    try {
      setStatusMessage(
        embedLab.isLoaded
          ? "Embedding the current text set and comparing vector similarity..."
          : "Loading the tiny embedding model into the browser cache, then embedding this text set..."
      );
      await embedLab.run({ texts: [...group.texts] });
      setStatusMessage(
        "Embedding complete. Pick one sentence and see which other sentences land closest in vector space."
      );
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
    }
  };

  const selectGroup = (index: number) => {
    setGroupIndex(index);
    setAnchorIndex(0);
  };

  return (
    <BrowserAILabFrame
      eyebrow="Embedding Similarity Lab"
      title="Watch semantic neighbors appear from text embeddings"
      description="This lab embeds short phrases directly in the browser, then compares cosine similarity so learners can see how retrieval and clustering start from vector proximity."
      badge={
        <BrowserAIModelBadge
          title="Local embedding model"
          detail="Uses a tiny embedding model in-browser, with simple cosine similarity instead of a server-side vector database."
        />
      }
    >
      <ScenarioPills
        activeIndex={groupIndex}
        items={EMBEDDING_TEXT_GROUPS.map((item) => item.name)}
        onSelect={selectGroup}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void embedLab.load()}
          className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
        >
          {embedLab.isLoaded ? "Embedder ready" : "Load embedder"}
        </button>
        <button
          type="button"
          onClick={() => void embedGroup()}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Embed this set
        </button>
      </div>

      <BrowserAIStatusPanel
        message={statusMessage}
        phase={embedLab.phase}
        status={embedLab.status}
      />

      <ControlGrid>
        <Panel title="Choose the anchor text" tone="stone">
          <div className="space-y-2">
            {group.texts.map((text, index) => (
              <button
                key={text}
                type="button"
                onClick={() => setAnchorIndex(index)}
                className={`w-full rounded-[1rem] border px-4 py-3 text-left text-sm leading-6 transition ${
                  anchorIndex === index
                    ? "border-cyan-500 bg-cyan-50 text-cyan-950 dark:border-cyan-400 dark:bg-cyan-500/10 dark:text-cyan-100"
                    : "border-stone-200 bg-white text-stone-700 hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {text}
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Nearest neighbors" tone="emerald">
          {rankings.length ? (
            <div className="space-y-3">
              {rankings.map((item) => (
                <div
                  key={item.text}
                  className="rounded-[1rem] border border-emerald-200/70 bg-white/70 px-4 py-3 dark:border-emerald-500/20 dark:bg-gray-900/60"
                >
                  <p>{item.text}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-300">
                    Cosine similarity {item.score.toFixed(3)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>
              Load the embedder and run this text set to see which phrases
              cluster together.
            </p>
          )}
        </Panel>
      </ControlGrid>

      <Panel title="What to notice" tone="cyan">
        <NoticeList
          items={[
            "Close neighbors are not always word-overlap matches. They are often concept matches.",
            "Embeddings do not answer the question by themselves. They provide a geometry you can search over.",
            "For small course demos, brute-force cosine similarity is enough. Larger products usually add a vector index on top.",
          ]}
        />
      </Panel>
    </BrowserAILabFrame>
  );
}
