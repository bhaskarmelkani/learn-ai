import { useMemo, useState } from "react";
import { useLearning, getTrackLabel } from "../../learning/LearningContext";

const SCENARIOS = [
  {
    name: "AI email triage assistant",
    user: "Operations team",
    coreRisk: "Important customer issues get buried or mislabeled.",
  },
  {
    name: "Healthcare symptom intake tool",
    user: "Patients and clinicians",
    coreRisk: "Urgent cases get under-triaged or false alarms overwhelm staff.",
  },
  {
    name: "Learning coach for AI education",
    user: "Beginners and workshop learners",
    coreRisk: "The product looks helpful but never checks whether understanding actually improved.",
  },
] as const;

const RUBRIC = [
  "Clear input and output definition",
  "Right model family for the job",
  "Meaningful training or feedback signal",
  "One concrete failure mode",
  "How a human notices and corrects that failure",
] as const;

export function CapstoneStudio() {
  const {
    state: { track },
  } = useLearning();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [answers, setAnswers] = useState({
    input: "",
    output: "",
    model: "",
    signal: "",
    failure: "",
    humanLoop: "",
  });

  const scenario = SCENARIOS[scenarioIndex];
  const completedCount = useMemo(
    () => Object.values(answers).filter((value) => value.trim().length > 10).length,
    [answers]
  );

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            End-to-End Capstone
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            Tear down an AI product like a product designer, teacher, or builder
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            Pick a scenario, then describe the model story from inputs to outputs to failure handling. This is where the earlier chapters should connect.
          </p>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
          {getTrackLabel(track)} track
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.75fr_1.25fr]">
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Choose a scenario
            </p>
            <div className="mt-3 space-y-2">
              {SCENARIOS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setScenarioIndex(index)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                    scenarioIndex === index
                      ? "bg-cyan-600 text-white"
                      : "bg-white text-stone-700 hover:bg-stone-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 px-4 py-3 text-sm leading-6 text-rose-900 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Core risk</p>
            <p className="mt-1">{scenario.coreRisk}</p>
          </div>

          <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Rubric</p>
            <ul className="mt-2 space-y-2">
              {RUBRIC.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["input", "What goes in?"],
              ["output", "What should come out?"],
              ["model", "What model family or structure fits this job?"],
              ["signal", "How would it learn or get feedback?"],
              ["failure", "What could go wrong in a realistic way?"],
              ["humanLoop", "How does a human catch or correct mistakes?"],
            ].map(([key, label]) => (
              <label key={key} className="block rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                  {label}
                </p>
                <textarea
                  value={answers[key as keyof typeof answers]}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      [key]: event.target.value,
                    }))
                  }
                  rows={4}
                  className="mt-3 w-full rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition-colors focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100"
                  placeholder={`Write your ${label.toLowerCase()} here...`}
                />
              </label>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Completion</p>
            <p className="mt-1">
              You have drafted {completedCount} of 6 sections. A strong answer should connect the model choice to the risk, not just describe the feature.
            </p>
            <p className="mt-2">
              <strong>{scenario.user}</strong> should be able to understand why the system exists, what it predicts, and what safeguards keep it trustworthy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
