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
import { CompletionDashboard } from "../CompletionDashboard";
import { useLearning } from "../../learning/LearningContext";

const LazyLinearRegressionNotebook = lazy(async () => ({
  default: (await import("../interactive/LinearRegressionNotebook")).LinearRegressionNotebook,
}));
const LazyClassificationNotebook = lazy(async () => ({
  default: (await import("../interactive/ClassificationNotebook")).ClassificationNotebook,
}));
const LazyNeuralNetworkNotebook = lazy(async () => ({
  default: (await import("../interactive/NeuralNetworkNotebook")).NeuralNetworkNotebook,
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
      <p className="text-xs font-semibold uppercase tracking-[0.22em]">Builder Lab</p>
      <p className="mt-2">
        The editable <strong>{title}</strong> is hidden in Conceptual mode so the lesson stays high-level.
        Switch to the Builder track whenever you want the lower-level Python walkthrough.
      </p>
    </div>
  );
}

export const mdxComponents: MDXComponentsType = {
  h1: (props) => (
    <h1
      className="mb-2 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-12 mb-4 border-b border-stone-200 pb-2 text-2xl font-bold text-cyan-700 dark:border-gray-800 dark:text-cyan-300 md:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-8 mb-3 max-w-4xl text-xl font-semibold text-stone-800 dark:text-gray-200" {...props} />
  ),
  p: (props) => (
    <p
      className="my-4 max-w-3xl text-[1.16rem] leading-8 text-stone-700 dark:text-gray-300 [font-family:var(--font-content)]"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="my-4 ml-6 max-w-3xl list-disc space-y-2 text-[1.12rem] leading-8 text-stone-700 dark:text-gray-300 [font-family:var(--font-content)]"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-4 ml-6 max-w-3xl list-decimal space-y-2 text-[1.12rem] leading-8 text-stone-700 dark:text-gray-300 [font-family:var(--font-content)]"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-stone-50 dark:bg-gray-800" {...props} />,
  th: (props) => (
    <th className="border-b border-stone-200 px-4 py-3 text-sm font-semibold text-stone-800 dark:border-gray-700 dark:text-gray-200" {...props} />
  ),
  td: (props) => (
    <td className="border-b border-stone-100 px-4 py-3 text-sm text-stone-700 dark:border-gray-800 dark:text-gray-300" {...props} />
  ),
  tr: (props) => (
    <tr className="transition-colors even:bg-stone-50 dark:even:bg-gray-800/50 hover:bg-stone-100 dark:hover:bg-gray-800/80" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 max-w-3xl rounded-r-xl border-l-4 border-cyan-500 bg-cyan-50 px-4 py-3 italic text-stone-700 dark:bg-cyan-500/10 dark:text-gray-300 [&>p]:my-1"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-stone-200 dark:border-gray-800" />,
  strong: (props) => <strong className="font-semibold text-stone-950 dark:text-gray-100" {...props} />,
  a: (props) => <a className="text-cyan-700 underline decoration-cyan-300 underline-offset-4 hover:text-cyan-600 dark:text-cyan-400 dark:decoration-cyan-500 dark:hover:text-cyan-300" {...props} />,
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
