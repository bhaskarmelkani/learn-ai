import {
  COURSE_LEVEL_LABELS,
  PROFESSION_LABELS,
  type CourseLevel,
  type LearningTrack,
} from "../content";

export function TrackBlueprintView({
  track,
  level,
}: {
  track: LearningTrack;
  level: CourseLevel;
}) {
  const blueprint = track.levels[level];
  const scaffoldCommand = `npm run scaffold:track -- --track-id ${track.id} --title "${track.title}" --profession ${track.profession} --level ${level}`;
  const destinationPath = `src/content/tracks/${track.id}/${level}`;

  return (
    <div className="chapter-content mx-auto max-w-5xl px-4 py-8 pb-28 md:px-8 md:py-10">
      <div className="rounded-[2rem] border border-stone-200 bg-white px-6 py-8 shadow-sm dark:border-gray-800 dark:bg-gray-900/70 md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500 dark:text-gray-500">
          {PROFESSION_LABELS[track.profession]} track
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 dark:text-gray-50 md:text-4xl">
          {track.title}
        </h1>
        <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          {COURSE_LEVEL_LABELS[level]} blueprint
        </p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-stone-600 dark:text-gray-400 md:text-lg">
          {blueprint.description}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[1.75rem] border border-stone-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/70">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
            Who this is for
          </p>
          <p className="mt-3 text-[1.05rem] leading-8 text-stone-700 dark:text-gray-300">
            {blueprint.audience}
          </p>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
            Learning outcomes
          </p>
          <ul className="mt-3 space-y-3 text-[1.02rem] leading-7 text-stone-700 dark:text-gray-300">
            {blueprint.outcomes.map((outcome) => (
              <li key={outcome} className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 dark:border-gray-800 dark:bg-gray-950/60">
                {outcome}
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-[1.75rem] border border-cyan-200 bg-cyan-50 px-6 py-6 shadow-sm dark:border-cyan-500/20 dark:bg-cyan-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-800 dark:text-cyan-200">
            Contribution brief
          </p>
          <p className="mt-3 text-sm leading-7 text-cyan-950 dark:text-cyan-50/90">
            This level is scaffolded but not fully authored yet. Treat it as a contribution-ready brief for a coding agent.
          </p>
          <p className="mt-4 text-sm leading-7 text-cyan-900/90 dark:text-cyan-100/80">
            {blueprint.contributionPrompt}
          </p>
          <div className="mt-5 rounded-2xl border border-cyan-200/80 bg-white/80 px-4 py-4 text-xs dark:border-cyan-400/20 dark:bg-gray-950/40">
            <p className="font-semibold uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-200">
              Suggested path
            </p>
            <p className="mt-3 text-stone-700 dark:text-gray-300">
              Publish chapters in <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-gray-900">{destinationPath}</code>
            </p>
            <p className="mt-3 text-stone-700 dark:text-gray-300">
              Scaffold starters with <code className="rounded bg-stone-100 px-1.5 py-0.5 dark:bg-gray-900">{scaffoldCommand}</code>
            </p>
          </div>
        </aside>
      </div>

      <section className="mt-8 rounded-[1.75rem] border border-stone-200 bg-white px-6 py-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/70">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
          Planned modules
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {blueprint.plannedModules.map((module, index) => (
            <article
              key={module.title}
              className="rounded-2xl border border-stone-200 bg-stone-50 px-5 py-4 dark:border-gray-800 dark:bg-gray-950/70"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Module {index + 1}
              </p>
              <h2 className="mt-2 text-lg font-semibold text-stone-900 dark:text-gray-50">
                {module.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-stone-600 dark:text-gray-400">
                {module.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
