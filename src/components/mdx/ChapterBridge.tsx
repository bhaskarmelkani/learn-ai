import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import {
  useLearning,
  getTrackLabel,
  type AudienceTrack,
} from "../../learning/LearningContext";

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
    <section className="my-7 rounded-2xl border border-stone-200/85 bg-stone-50/65 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950/45 md:p-6">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.86fr]">
        <div>
          <p className="accent-overline">Why This Chapter Matters</p>
          <p className="mt-3 max-w-[58ch] text-[0.9rem] leading-7 text-stone-900 dark:text-gray-100 md:text-[0.98rem] md:leading-8">
            {why}
          </p>
        </div>
        <div className="hidden border-t border-stone-200/80 pt-4 dark:border-gray-800 sm:block lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
            Concept path
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            {map.map((step, index) => (
              <Fragment key={step}>
                <span className="learning-chip text-[0.58rem]">{step}</span>
                {index < map.length - 1 && (
                  <ChevronRight className="h-4 w-4 text-stone-400 dark:text-gray-600" />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <dl className="mt-5 grid gap-x-8 gap-y-4 border-t border-stone-200/75 pt-4 dark:border-gray-800 md:grid-cols-2">
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
            Builds on
          </dt>
          <dd className="mt-1.5 text-[0.88rem] leading-7 text-stone-800 dark:text-gray-200">
            {buildsOn}
          </dd>
        </div>
        <div>
          <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
            Next unlock
          </dt>
          <dd className="mt-1.5 text-[0.88rem] leading-7 text-stone-800 dark:text-gray-200">
            {unlocks}
          </dd>
        </div>
      </dl>
      <div className="mt-5 rounded-xl border border-cyan-200/75 bg-cyan-50/45 px-4 py-3 dark:border-cyan-500/20 dark:bg-cyan-500/5">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
          {getTrackLabel(track)} lens
        </p>
        <p className="mt-1.5 text-[0.88rem] leading-7 text-stone-900 dark:text-gray-100">
          {trackFocus[track] ??
            "Stay with the core mental model first, then use the demos to make it feel concrete."}
        </p>
      </div>
    </section>
  );
}
