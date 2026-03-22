/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { Callout } from "./Callout";
import { Exercise } from "./Exercise";
import { Checkpoint } from "./Checkpoint";
import { ChapterBridge } from "./ChapterBridge";
import { CaseCards } from "./CaseCards";
import { ChapterRecap } from "./ChapterRecap";
import { ConceptMatcher } from "../interactive/ConceptMatcher";
import { LinearRegressionDemo } from "../interactive/LinearRegressionDemo";
import { LinearRegressionOutlierDemo } from "../interactive/LinearRegressionOutlierDemo";
import { NonlinearDemo } from "../interactive/NonlinearDemo";
import { NonlinearComparisonDemo } from "../interactive/NonlinearComparisonDemo";
import { SigmoidDemo } from "../interactive/SigmoidDemo";
import { ClassificationLab } from "../interactive/ClassificationLab";
import { SoftmaxDemo } from "../interactive/SoftmaxDemo";
import { GradientDescentDemo } from "../interactive/GradientDescentDemo";
import { DecisionBoundaryBridgeDemo } from "../interactive/DecisionBoundaryBridgeDemo";
import { NeuralNetworkDemo } from "../interactive/NeuralNetworkDemo";
import { XorDemo } from "../interactive/XorDemo";
import { TrainingCurveDemo } from "../interactive/TrainingCurveDemo";
import { TokenPredictionDemo } from "../interactive/TokenPredictionDemo";
import { AttentionHeatmap } from "../interactive/AttentionHeatmap";
import { TokenizerPlayground } from "../interactive/TokenizerPlayground";
import { CapstoneStudio } from "../interactive/CapstoneStudio";
import { PromptComparison } from "../interactive/PromptComparison";
import { GroundingLab } from "../interactive/GroundingLab";
import { GenAICapstoneStudio } from "../interactive/GenAICapstoneStudio";
import { BrowserLLMLab } from "../interactive/BrowserLLMLab";
import { TokenizerArena } from "../interactive/TokenizerArena";
import { ContextBudgetLab } from "../interactive/ContextBudgetLab";
import { EmbeddingSimilarityLab } from "../interactive/EmbeddingSimilarityLab";
import { SemanticSearchLab } from "../interactive/SemanticSearchLab";
import { RetrievalVsModelOnlyLab } from "../interactive/RetrievalVsModelOnlyLab";
import { CompletionDashboard } from "../CompletionDashboard";
import { useLearning } from "../../learning/LearningContext";

const LazyLinearRegressionNotebook = lazy(async () => ({
  default: (await import("../interactive/LinearRegressionNotebook"))
    .LinearRegressionNotebook,
}));
const LazyClassificationNotebook = lazy(async () => ({
  default: (await import("../interactive/ClassificationNotebook"))
    .ClassificationNotebook,
}));
const LazyNeuralNetworkNotebook = lazy(async () => ({
  default: (await import("../interactive/NeuralNetworkNotebook"))
    .NeuralNetworkNotebook,
}));

function NotebookFallback() {
  return (
    <div className="my-8 rounded-[1.5rem] border border-stone-200 bg-white px-5 py-6 text-sm text-stone-500 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
      Loading notebook runtime...
    </div>
  );
}

function BuilderOnlyNotebook({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const {
    state: { track },
  } = useLearning();

  if (track === "builder") {
    return <>{children}</>;
  }

  return (
    <div className="my-8 rounded-[1.5rem] border border-cyan-200 bg-cyan-50 px-5 py-5 text-sm leading-6 text-cyan-900 shadow-sm dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
      <p className="text-xs font-semibold uppercase tracking-[0.22em]">
        Builder Lab
      </p>
      <p className="mt-2">
        The editable <strong>{title}</strong> is hidden in Conceptual mode so
        the lesson stays high-level. Switch to the Builder track whenever you
        want the lower-level Python walkthrough.
      </p>
    </div>
  );
}

export const mdxComponents: MDXComponentsType = {
  h1: (props) => (
    <h1
      className="mb-6 max-w-[34ch] text-pretty text-[clamp(1.62rem,2.5vw,2.42rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-stone-950 dark:text-stone-50 [font-family:var(--font-content)]"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mb-4 mt-14 w-full border-t border-stone-200/80 pt-7 text-pretty text-[clamp(1.24rem,1.5vw,1.58rem)] font-semibold leading-[1.16] tracking-[-0.018em] text-stone-900 dark:border-gray-800 dark:text-stone-100 [font-family:var(--font-content)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mb-3 mt-8 w-full text-pretty text-[1.02rem] font-semibold leading-[1.24] tracking-[-0.01em] text-stone-900 dark:text-stone-100 [font-family:var(--font-content)] md:text-[1.1rem]"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="my-4 w-full max-w-none text-pretty text-[0.97rem] font-[415] leading-[1.95] tracking-[0.002em] text-stone-800 dark:text-gray-100/92 md:text-[1.03rem] [font-family:var(--font-content)]"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-4 ml-5 w-full max-w-none list-disc space-y-2 text-[0.95rem] leading-[1.9] text-stone-800 dark:text-gray-100/92 md:text-[1rem] [font-family:var(--font-content)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 ml-5 w-full max-w-none list-decimal space-y-2 text-[0.95rem] leading-[1.9] text-stone-800 dark:text-gray-100/92 md:text-[1rem] [font-family:var(--font-content)]"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  table: (props) => (
    <div className="my-8 overflow-x-auto rounded-[1.5rem] border border-stone-200/80 bg-stone-50/80 shadow-sm dark:border-gray-800 dark:bg-gray-950/70">
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-white/80 dark:bg-gray-900/90" {...props} />
  ),
  th: (props) => (
    <th
      className="border-b border-stone-200/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-stone-700 dark:border-gray-800 dark:text-gray-200"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-stone-200/60 px-4 py-3 text-sm text-stone-700 dark:border-gray-800 dark:text-gray-300"
      {...props}
    />
  ),
  tr: (props) => (
    <tr
      className="transition-colors even:bg-white/60 dark:even:bg-gray-900/60 hover:bg-stone-100/80 dark:hover:bg-gray-800/80"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-7 w-full max-w-none rounded-[1.35rem] border border-stone-200/80 bg-stone-50/92 px-5 py-4 text-stone-800 shadow-sm dark:border-gray-800 dark:bg-gray-950/70 dark:text-gray-100/92 [&>p]:my-1"
      {...props}
    />
  ),
  hr: () => (
    <hr className="my-8 w-full border-stone-200 dark:border-gray-800" />
  ),
  strong: (props) => (
    <strong
      className="font-semibold text-stone-950 dark:text-gray-100"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-cyan-700 underline decoration-cyan-300/80 underline-offset-4 transition-colors hover:text-cyan-600 dark:text-cyan-400 dark:decoration-cyan-500/70 dark:hover:text-cyan-300"
      {...props}
    />
  ),
  Callout,
  Exercise,
  Checkpoint,
  ChapterBridge,
  CaseCards,
  ChapterRecap,
  ConceptMatcher,
  LinearRegressionDemo,
  LinearRegressionOutlierDemo,
  NonlinearDemo,
  NonlinearComparisonDemo,
  SigmoidDemo,
  ClassificationLab,
  SoftmaxDemo,
  GradientDescentDemo,
  DecisionBoundaryBridgeDemo,
  NeuralNetworkDemo,
  XorDemo,
  TrainingCurveDemo,
  TokenPredictionDemo,
  TokenizerPlayground,
  AttentionHeatmap,
  CapstoneStudio,
  PromptComparison,
  GroundingLab,
  GenAICapstoneStudio,
  BrowserLLMLab,
  TokenizerArena,
  ContextBudgetLab,
  EmbeddingSimilarityLab,
  SemanticSearchLab,
  RetrievalVsModelOnlyLab,
  CompletionDashboard,
  LinearRegressionNotebook: () => (
    <BuilderOnlyNotebook title="Linear Regression Notebook">
      <Suspense fallback={<NotebookFallback />}>
        <LazyLinearRegressionNotebook />
      </Suspense>
    </BuilderOnlyNotebook>
  ),
  ClassificationNotebook: () => (
    <BuilderOnlyNotebook title="Classification Notebook">
      <Suspense fallback={<NotebookFallback />}>
        <LazyClassificationNotebook />
      </Suspense>
    </BuilderOnlyNotebook>
  ),
  NeuralNetworkNotebook: () => (
    <BuilderOnlyNotebook title="Neural Network Notebook">
      <Suspense fallback={<NotebookFallback />}>
        <LazyNeuralNetworkNotebook />
      </Suspense>
    </BuilderOnlyNotebook>
  ),
};
