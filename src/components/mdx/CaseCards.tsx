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
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            Case Cards
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">{title}</h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            Tie the toy example back to a real product, then look at the failure mode that makes this concept matter.
          </p>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
          Track: {getTrackLabel(track)}
        </span>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60"
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
                    {getTrackLabel(track)} prompt
                  </p>
                  <p className="mt-1">{card.trackPrompt[track]}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
