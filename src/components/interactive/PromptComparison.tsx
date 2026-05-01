import { useMemo, useState } from "react";

const SCENARIOS = [
  {
    name: "Meeting summary",
    vaguePrompt: "Summarize this meeting.",
    betterPrompt:
      "Summarize this meeting for a busy product manager. Use 4 bullets: decisions, blockers, owners, and next steps. Flag anything that still sounds uncertain.",
    input:
      "We agreed to launch the beta on April 18 if legal finishes the revised terms. Priya will update the onboarding checklist. We are still blocked on the CRM export. Dan will confirm whether sales needs a separate email sequence.",
    improvements: [
      "It defines the audience and tone.",
      "It specifies the output structure.",
      "It asks the model to surface uncertainty instead of hiding it.",
    ],
  },
  {
    name: "Research extraction",
    vaguePrompt: "Read this article and tell me the important parts.",
    betterPrompt:
      "Read this article and extract 3 claims, the evidence for each, and one thing the article does not establish. Return a table with columns: claim, evidence, missing proof.",
    input:
      "The article argues that shorter support response times improved renewal rates, citing one quarter of data from enterprise customers and quoting two customer-success managers.",
    improvements: [
      "It turns a vague request into an extraction task.",
      "It defines the schema of the answer.",
      "It asks for what is missing, not just what sounds persuasive.",
    ],
  },
  {
    name: "Drafting an email",
    vaguePrompt: "Write an email about the delay.",
    betterPrompt:
      "Write a calm, direct email to a client explaining a one-week launch delay. Keep it under 140 words, name the cause, explain the impact, and end with one concrete next step.",
    input:
      "A third-party security review found an issue that needs one more week to fix before launch.",
    improvements: [
      "It sets length and audience constraints.",
      "It requests the specific facts the message must include.",
      "It gives the model a clearer success condition than 'write something good.'",
    ],
  },
] as const;

export function PromptComparison() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = SCENARIOS[scenarioIndex];

  const checklist = useMemo(
    () => [
      "Who is this for?",
      "What exact job should the model do?",
      "What should the output look like?",
      "What should the model avoid or flag?",
    ],
    [],
  );

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            Prompt Lab
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            Compare a vague prompt with a better-designed one
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            The goal is not to memorize one perfect phrasing. It is to notice
            what changes when the prompt names the task, audience, structure,
            and uncertainty handling.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {SCENARIOS.map((item, index) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setScenarioIndex(index)}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              scenarioIndex === index
                ? "bg-cyan-600 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700 dark:text-rose-300">
            Vague prompt
          </p>
          <p className="mt-3 text-sm leading-6 text-rose-950 dark:text-rose-100">
            {scenario.vaguePrompt}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Better prompt
          </p>
          <p className="mt-3 text-sm leading-6 text-emerald-950 dark:text-emerald-100">
            {scenario.betterPrompt}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
          Shared input
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-700 dark:text-gray-300">
          {scenario.input}
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
            Design checklist
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700 dark:text-gray-300">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-500/20 dark:bg-cyan-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-200">
            Why the better prompt works
          </p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-cyan-950 dark:text-cyan-100">
            {scenario.improvements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
