export function Path({
  current,
  next,
  prev,
}: {
  current: string;
  next?: { title: string; hint: string };
  prev?: { title: string; hint: string };
}) {
  return (
    <div className="my-8 rounded-[1.5rem] border border-stone-200 bg-stone-50 px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
        Course Path
      </p>
      <p className="mt-2 text-sm text-stone-600 dark:text-gray-400">{current}</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {prev ? (
          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950/70">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Coming from
            </p>
            <p className="mt-1 text-sm font-medium text-stone-900 dark:text-white">{prev.title}</p>
            <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-gray-400">{prev.hint}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950/70">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Starting point
            </p>
            <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Begin with the simplest possible question: what is a model?
            </p>
          </div>
        )}
        {next ? (
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 dark:border-cyan-500/20 dark:bg-cyan-500/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              Next up
            </p>
            <p className="mt-1 text-sm font-medium text-cyan-950 dark:text-white">{next.title}</p>
            <p className="mt-1 text-sm leading-6 text-cyan-800/90 dark:text-cyan-100/80">{next.hint}</p>
          </div>
        ) : (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-500/20 dark:bg-emerald-500/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              End of path
            </p>
            <p className="mt-1 text-sm leading-6 text-emerald-900 dark:text-emerald-100">
              The final destination is not memorizing facts. It is seeing the whole chain from model to LLM.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
