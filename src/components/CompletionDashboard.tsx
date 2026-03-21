import { useLearning, getTrackLabel } from "../learning/LearningContext";

const CONCEPTS_COVERED = [
  "Models as functions with learned parameters",
  "Supervised learning and the training loop",
  "Linear regression — weight and bias",
  "Loss, gradients, and gradient descent",
  "Non-linear models and expressiveness",
  "Classification — sigmoid, softmax, thresholds",
  "Decision boundaries and hidden features",
  "Neural networks — neurons, layers, representations",
  "Backpropagation and overfitting",
  "Tokenization and embeddings",
  "Attention and next-token prediction",
  "Pretraining, alignment, and LLM system layers",
  "End-to-end AI product teardown",
];

export function CompletionDashboard() {
  const {
    state: { track },
    masterySummary,
    reviewQueue,
  } = useLearning();

  return (
    <div className="my-8 rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          Course Complete
        </p>
        <h2 className="mt-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
          Congratulations!
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-lg leading-8 text-stone-600 dark:text-gray-300">
          You have worked through all 13 chapters of AI In-tuition. Here is a summary of what you covered.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">
            {masterySummary.completedChecks}
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
            Checkpoints passed
          </p>
          <p className="mt-1 text-xs text-stone-400 dark:text-gray-500">
            of {masterySummary.attemptedChecks} attempted
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {masterySummary.reviewedChapters}
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
            Chapters reviewed
          </p>
          <p className="mt-1 text-xs text-stone-400 dark:text-gray-500">
            of 13 total
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5 text-center dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
            {getTrackLabel(track)}
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
            Learning track
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
          Concepts you covered
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {CONCEPTS_COVERED.map((concept) => (
            <div key={concept} className="flex items-start gap-2 text-sm text-stone-700 dark:text-gray-300">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {concept}
            </div>
          ))}
        </div>
      </div>

      {reviewQueue.length > 0 && (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-500/20 dark:bg-amber-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">
            Review queue
          </p>
          <p className="mt-2 text-sm text-amber-900 dark:text-amber-100">
            These concepts had missed checkpoints — consider revisiting them:
          </p>
          <ul className="mt-3 space-y-1">
            {reviewQueue.slice(0, 6).map((item) => (
              <li key={item.concept} className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-200 text-xs font-bold text-amber-800 dark:bg-amber-500/20 dark:text-amber-200">
                  {item.misses}
                </span>
                {item.concept} (Chapter {item.chapter})
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 dark:border-cyan-500/20 dark:bg-cyan-500/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-200">
          What's next?
        </p>
        <div className="mt-3 text-sm leading-6 text-cyan-900 dark:text-cyan-100">
          {track === "builder" ? (
            <ul className="space-y-2">
              <li>Build a real prototype: pick one capstone scenario and turn it into working code.</li>
              <li>Try fast.ai or Hugging Face courses for hands-on model training.</li>
              <li>Revisit any chapters where checkpoints felt uncertain.</li>
            </ul>
          ) : (
            <ul className="space-y-2">
              <li>Repeat the capstone teardown on a real AI product you use daily.</li>
              <li>Share your analysis with a colleague to test your explanation skill.</li>
              <li>Switch to the Builder track and explore the Python notebooks.</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
