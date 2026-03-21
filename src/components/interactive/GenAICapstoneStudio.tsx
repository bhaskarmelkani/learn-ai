import { useMemo, useState } from "react";
import { getTrackLabel, useLearning } from "../../learning/LearningContext";

const WORKFLOWS = [
  {
    name: "Research assistant",
    user: "A knowledge worker comparing options quickly",
    risk: "Confident synthesis without reliable sourcing",
  },
  {
    name: "Client communication helper",
    user: "A team drafting customer-facing updates",
    risk: "Polished language that hides ambiguity or sensitive data leakage",
  },
  {
    name: "Personal learning coach",
    user: "A beginner trying to learn faster from notes and questions",
    risk: "Helpful tone without checking whether understanding actually improved",
  },
] as const;

const RUBRIC = [
  "Clear task and user",
  "Right workflow pattern",
  "Grounding or context strategy",
  "One realistic failure mode",
  "Human review or correction plan",
] as const;

export function GenAICapstoneStudio() {
  const {
    state: { track },
  } = useLearning();
  const [workflowIndex, setWorkflowIndex] = useState(0);
  const [answers, setAnswers] = useState({
    task: "",
    workflow: "",
    tools: "",
    grounding: "",
    failure: "",
    review: "",
  });

  const workflow = WORKFLOWS[workflowIndex];
  const completion = useMemo(
    () => Object.values(answers).filter((value) => value.trim().length > 12).length,
    [answers],
  );

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            Capstone Studio
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            Design a useful Gen AI workflow
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            Pick a scenario, then define the task, the workflow pattern, how
            the system gets context, and how a human catches mistakes.
          </p>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700 dark:bg-gray-800 dark:text-gray-300">
          {getTrackLabel(track)} track
        </span>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
              Choose a scenario
            </p>
            <div className="mt-3 space-y-2">
              {WORKFLOWS.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setWorkflowIndex(index)}
                  className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                    workflowIndex === index
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
            <p className="mt-1">{workflow.risk}</p>
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
              ["task", "What exact job is the workflow doing?"],
              ["workflow", "What pattern fits best: chat, extraction, grounding, or automation?"],
              ["tools", "Which tool category would you use and why?"],
              ["grounding", "What documents, memory, or context should it use?"],
              ["failure", "What realistic mistake should you expect?"],
              ["review", "How will a human verify or correct it?"],
            ].map(([key, label]) => (
              <label
                key={key}
                className="block rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60"
              >
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
                  placeholder={`Write your answer for ${label.toLowerCase()} here...`}
                />
              </label>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-900 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-100">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">Completion</p>
            <p className="mt-1">
              You have drafted {completion} of 6 sections for a workflow aimed
              at <strong>{workflow.user}</strong>.
            </p>
            <p className="mt-2">
              A strong answer should make the tool choice feel justified, not
              automatic, and it should explain how someone notices when the
              workflow is wrong.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
