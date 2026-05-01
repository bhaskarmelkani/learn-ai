import { useLearning, getTrackLabel, type AudienceTrack } from "../../learning/LearningContext";

type CaseCardItem = {
  title: string;
  product: string;
  modelIdea: string;
  failureMode: string;
  trackPrompt?: Partial<Record<AudienceTrack, string>>;
};

export function CaseCards({
  title = "Real-World Cases",
  cards,
}: {
  title?: string;
  cards: CaseCardItem[];
}) {
  const {
    state: { track },
  } = useLearning();

  return (
    <details className="my-8 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <summary className="cursor-pointer list-none px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
              Real-world examples
            </p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900 dark:text-white">{title}</h3>
            <p className="mt-1 text-sm leading-6 text-stone-600 dark:text-gray-400">
              Open this when you want a product example and the failure mode that makes the concept matter.
            </p>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
            {getTrackLabel(track)}
          </span>
        </div>
      </summary>
      <div className="border-t border-stone-200 px-5 py-5 dark:border-gray-800">
        <div className="grid gap-4 lg:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-[1.25rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60"
            >
              <p className="text-sm font-semibold text-stone-900 dark:text-white">{card.title}</p>
              <div className="mt-4 space-y-3 text-sm leading-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
                    Product
                  </p>
                  <p className="mt-1 text-stone-700 dark:text-gray-200">{card.product}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
                    Model idea
                  </p>
                  <p className="mt-1 text-stone-700 dark:text-gray-200">{card.modelIdea}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-rose-700 dark:text-rose-300">
                    Failure mode
                  </p>
                  <p className="mt-1 text-stone-700 dark:text-gray-200">{card.failureMode}</p>
                </div>
                {card.trackPrompt?.[track] && (
                  <div className="rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-900 dark:border-emerald-500/20 dark:bg-gray-900 dark:text-emerald-100">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em]">
                      {getTrackLabel(track)} note
                    </p>
                    <p className="mt-1">{card.trackPrompt[track]}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </details>
  );
}
