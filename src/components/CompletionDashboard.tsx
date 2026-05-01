import { Award, CheckCircle2 } from "lucide-react";
import { useLearning, getTrackLabel } from "../learning/LearningContext";
import { getCourse } from "../courses/registry";

const DEFAULT_CONCEPTS_BY_COURSE: Record<string, string[]> = {
  "ai-fundamentals": [
    "Models as functions with learned parameters",
    "Supervised learning and the training loop",
    "Linear regression, loss, and gradient descent",
    "Classification with sigmoid, softmax, and thresholds",
    "Non-linear decision boundaries and hidden features",
    "Neural networks, backpropagation, and overfitting",
    "Tokenization, embeddings, attention, and next-token prediction",
    "Pretraining, alignment, and end-to-end AI product teardown",
  ],
};

export function CompletionDashboard({
  conceptsCovered,
}: {
  conceptsCovered?: string[];
}) {
  const {
    state: { track },
    masterySummary: getMastery,
    reviewQueue: getReviewQueue,
    activeCourseSlug,
  } = useLearning();

  const course = getCourse(activeCourseSlug);
  const masterySummary = getMastery(activeCourseSlug);
  const reviewQueue = getReviewQueue(activeCourseSlug);
  const coveredConcepts =
    conceptsCovered ?? DEFAULT_CONCEPTS_BY_COURSE[activeCourseSlug] ?? [];

  return (
    <div className="premium-panel my-8 rounded-[2rem] p-6 md:p-8">
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          <Award className="h-4 w-4" />
          Course Complete
        </p>
        <h2 className="serif-display mt-3 text-4xl">Congratulations!</h2>
        <p className="mx-auto mt-3 max-w-lg text-lg leading-8 text-stone-600 dark:text-gray-300">
          You have worked through all {course?.chapterCount ?? 0} chapters of{" "}
          {course?.title ?? "this course"}. Here is a summary of what you
          covered.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="learning-card p-5 text-center">
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
        <div className="learning-card p-5 text-center">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            {masterySummary.reviewedChapters}
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
            Chapters reviewed
          </p>
          <p className="mt-1 text-xs text-stone-400 dark:text-gray-500">
            of {course?.chapterCount ?? 0} total
          </p>
        </div>
        <div className="learning-card p-5 text-center">
          <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
            {getTrackLabel(track)}
          </p>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
            Learning track
          </p>
        </div>
      </div>

      {coveredConcepts.length > 0 && (
        <div className="learning-card mt-8 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Concepts you covered
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {coveredConcepts.map((concept) => (
              <div
                key={concept}
                className="flex items-start gap-2 text-sm text-stone-700 dark:text-gray-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                {concept}
              </div>
            ))}
          </div>
        </div>
      )}

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
              <li
                key={item.concept}
                className="flex items-center gap-2 text-sm text-amber-800 dark:text-amber-200"
              >
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
              <li>
                Build a real prototype: pick one capstone scenario and turn it
                into working code.
              </li>
              <li>
                Continue with a hands-on model training resource when you want
                deeper implementation practice.
              </li>
              <li>Revisit any chapters where checkpoints felt uncertain.</li>
            </ul>
          ) : (
            <ul className="space-y-2">
              <li>
                Repeat the capstone teardown on a real AI product you use daily.
              </li>
              <li>
                Share your analysis with a colleague to test your explanation
                skill.
              </li>
              <li>
                Switch to the Builder track and explore the Python notebooks.
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
