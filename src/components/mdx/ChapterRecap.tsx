import { useLearning, getTrackLabel, type AudienceTrack } from "../../learning/LearningContext";

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
    state: { reviewedChapters, track },
    markChapterReviewed,
  } = useLearning();

  const reviewed = Boolean(reviewedChapters[chapter]);

  return (
    <div className="my-10 rounded-[1.75rem] border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-emerald-50 p-6 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-500/10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700 dark:text-emerald-300">
            Chapter Recap
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            Lock in the mental model before moving on
          </h3>
        </div>
        <button
          type="button"
          onClick={() => markChapterReviewed(chapter)}
          className={`rounded-full px-4 py-2 text-xs font-medium ${
            reviewed
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-stone-900 text-white hover:bg-stone-700 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          }`}
        >
          {reviewed ? "Recap reviewed" : "Mark recap complete"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Core ideas
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-700 dark:text-gray-200">
            {summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Can you now explain...
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-stone-700 dark:text-gray-200">
              {checks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              {getTrackLabel(track)} next move
            </p>
            <p className="mt-1">{trackActions[track] ?? nextStep}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
