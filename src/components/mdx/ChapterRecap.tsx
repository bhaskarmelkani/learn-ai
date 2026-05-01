import { CheckCircle2 } from "lucide-react";
import {
  useLearning,
  getTrackLabel,
  type AudienceTrack,
} from "../../learning/LearningContext";

type TrackActions = Partial<Record<AudienceTrack, string>>;

export function ChapterRecap({
  chapter,
  summary,
  checks,
  nextStep,
  trackActions,
}: {
  chapter: number;
  summary: string[];
  checks: string[];
  nextStep: string;
  trackActions: TrackActions;
}) {
  const {
    state: { track },
    reviewedChapters,
    markChapterReviewed,
    activeCourseSlug,
  } = useLearning();

  const reviewed = Boolean(reviewedChapters[chapter]);

  return (
    <details
      open
      data-lesson-block="recap"
      className="my-10 overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-gray-800 dark:bg-gray-900"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4" />
            Quick Recap
          </p>
          <p className="mt-1 text-sm text-stone-600 dark:text-gray-400">
            Open this if you want a compact summary before moving on.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            reviewed
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-stone-100 text-stone-700 dark:bg-gray-950 dark:text-gray-200"
          }`}
        >
          {reviewed ? "Reviewed" : "Not reviewed"}
        </span>
      </summary>
      <div className="border-t border-stone-200 px-5 py-5 dark:border-gray-800">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Core ideas
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-700 dark:text-gray-200">
              {summary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="border-t border-stone-200 pt-5 dark:border-gray-800 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Can you now explain...
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-700 dark:text-gray-200">
                {checks.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-5 border-t border-cyan-200/70 pt-4 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:text-cyan-100">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
                {getTrackLabel(track)} next move
              </p>
              <p className="mt-1">{trackActions[track] ?? nextStep}</p>
            </div>
            <button
              type="button"
              onClick={() => markChapterReviewed(activeCourseSlug, chapter)}
              className={`mt-5 rounded-full px-4 py-2 text-xs font-medium ${
                reviewed
                  ? "soft-button text-emerald-800 dark:text-emerald-300"
                  : "primary-button"
              }`}
            >
              {reviewed ? "Recap reviewed" : "Mark recap complete"}
            </button>
          </div>
        </div>
      </div>
    </details>
  );
}
