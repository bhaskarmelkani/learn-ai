import type { MDXComponents as MDXComponentsType } from "mdx/types";
import { Callout } from "./Callout";
import { LinearRegressionDemo } from "../interactive/LinearRegressionDemo";
import { NonlinearDemo } from "../interactive/NonlinearDemo";
import { SigmoidDemo } from "../interactive/SigmoidDemo";
import { GradientDescentDemo } from "../interactive/GradientDescentDemo";
import { NeuralNetworkDemo } from "../interactive/NeuralNetworkDemo";
import { TokenPredictionDemo } from "../interactive/TokenPredictionDemo";

export const mdxComponents: MDXComponentsType = {
  h1: (props) => (
    <h1
      className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-2xl md:text-3xl font-bold mt-12 mb-4 text-blue-600 dark:text-blue-300 border-b border-gray-200 dark:border-gray-700 pb-2"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold mt-8 mb-3 text-gray-800 dark:text-gray-200" {...props} />
  ),
  p: (props) => (
    <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed text-lg" {...props} />
  ),
  ul: (props) => (
    <ul className="my-4 ml-6 list-disc text-gray-700 dark:text-gray-300 space-y-2 text-lg" {...props} />
  ),
  ol: (props) => (
    <ol className="my-4 ml-6 list-decimal text-gray-700 dark:text-gray-300 space-y-2 text-lg" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50 dark:bg-gray-800" {...props} />,
  th: (props) => (
    <th className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700" {...props} />
  ),
  td: (props) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800" {...props} />
  ),
  tr: (props) => (
    <tr className="even:bg-gray-50 dark:even:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-500/10 rounded-r-lg px-4 py-3 text-gray-700 dark:text-gray-300 italic [&>p]:my-1"
      {...props}
    />
  ),
  hr: () => <hr className="my-8 border-gray-200 dark:border-gray-700" />,
  strong: (props) => <strong className="text-gray-900 dark:text-gray-100 font-semibold" {...props} />,
  a: (props) => <a className="text-blue-600 dark:text-blue-400 underline hover:text-blue-500 dark:hover:text-blue-300" {...props} />,
  Callout,
  LinearRegressionDemo,
  NonlinearDemo,
  SigmoidDemo,
  GradientDescentDemo,
  NeuralNetworkDemo,
  TokenPredictionDemo,
};
