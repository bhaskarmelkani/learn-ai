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
    <div className="my-8 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
        Why This Chapter Matters
      </p>
      <p className="mt-3 text-sm leading-6 text-stone-700 dark:text-gray-200">{why}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-white px-4 py-3 dark:bg-gray-950/70">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Builds on
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-700 dark:text-gray-200">{buildsOn}</p>
        </div>
        <div className="rounded-2xl bg-white px-4 py-3 dark:bg-gray-950/70">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Next unlock
          </p>
          <p className="mt-1 text-sm leading-6 text-stone-700 dark:text-gray-200">{unlocks}</p>
        </div>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
        Concept path: {map.join(" -> ")}
      </p>
      <div className="mt-3 rounded-2xl border border-cyan-200 bg-white px-4 py-3 text-sm leading-6 text-stone-700 dark:border-cyan-500/20 dark:bg-gray-950/70 dark:text-gray-200">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          {getTrackLabel(track)} lens
        </p>
        <p className="mt-1">
          {trackFocus[track] ??
            "Stay with the core mental model first, then use the demos to make it feel concrete."}
        </p>
      </div>
    </div>
  );
}
