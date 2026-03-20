import { useLearning, getTrackLabel, type AudienceTrack } from "../../learning/LearningContext";

type TrackFocus = Partial<Record<AudienceTrack, string>>;

export function ChapterBridge({
  why,
  buildsOn,
  unlocks,
  map,
  trackFocus,
}: {
  why: string;
  buildsOn: string;
  unlocks: string;
  map: string[];
  trackFocus: TrackFocus;
}) {
  const {
    state: { track },
  } = useLearning();

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-gradient-to-br from-white via-stone-50 to-cyan-50 p-5 shadow-sm dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-cyan-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
        Why This Chapter Matters
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Why now
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-700 dark:text-gray-200">{why}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Builds on
              </p>
              <p className="mt-1 text-sm text-stone-700 dark:text-gray-200">{buildsOn}</p>
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 shadow-sm dark:bg-gray-900">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Unlocks next
              </p>
              <p className="mt-1 text-sm text-stone-700 dark:text-gray-200">{unlocks}</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-2xl border border-cyan-200 bg-white px-4 py-3 shadow-sm dark:border-cyan-500/20 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Concept map
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {map.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-200">
                    {step}
                  </span>
                  {index < map.length - 1 && (
                    <span className="text-sm text-stone-400 dark:text-gray-500">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">
              {getTrackLabel(track)} lens
            </p>
            <p className="mt-1">
              {trackFocus[track] ??
                "Stay with the core mental model first, then use the tools and labs to deepen it."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
