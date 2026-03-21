import { useState } from "react";

const SCENARIOS = [
  {
    name: "Vacation policy",
    question: "How many vacation days do new employees get in their first year?",
    modelOnly:
      "Many companies offer around 10 to 15 vacation days in the first year, but it depends on the employer.",
    grounded:
      "According to the handbook excerpt, new employees get 12 vacation days in year one, accrued monthly.",
    source:
      "Employee handbook excerpt: Full-time employees receive 12 vacation days in their first year, accrued at 1 day per month.",
  },
  {
    name: "Product pricing",
    question: "Does the Pro plan include SSO?",
    modelOnly:
      "SSO is often included only on business or enterprise plans, though some Pro plans do include it.",
    grounded:
      "The pricing page says SSO is available on the Business plan, not Pro.",
    source:
      "Pricing excerpt: Pro includes unlimited projects and API access. Business adds SSO, audit logs, and admin controls.",
  },
  {
    name: "Customer support",
    question: "When does the warranty expire for order #A17?",
    modelOnly:
      "Warranties are commonly one year from purchase, so it likely expires next spring.",
    grounded:
      "The support record says order #A17 was purchased on July 9, 2025 and has a 24-month warranty, expiring on July 9, 2027.",
    source:
      "CRM excerpt: Order #A17 purchased July 9, 2025. Warranty term: 24 months from purchase.",
  },
] as const;

export function GroundingLab() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const scenario = SCENARIOS[scenarioIndex];

  return (
    <div className="my-8 rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">
            Grounding Lab
          </p>
          <h3 className="mt-2 text-xl font-semibold text-stone-900 dark:text-white">
            Compare a generic answer with a grounded one
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600 dark:text-gray-400">
            Grounding helps when the answer depends on your documents, not just
            general world patterns. The real upgrade is not more eloquence. It
            is better evidence.
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

      <div className="mt-6 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
          User question
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-800 dark:text-gray-200">
          {scenario.question}
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-200">
            Model-only answer
          </p>
          <p className="mt-3 text-sm leading-6 text-amber-950 dark:text-amber-100">
            {scenario.modelOnly}
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-500/20 dark:bg-emerald-500/10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
            Grounded answer
          </p>
          <p className="mt-3 text-sm leading-6 text-emerald-950 dark:text-emerald-100">
            {scenario.grounded}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[1.5rem] border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-500/20 dark:bg-cyan-500/10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800 dark:text-cyan-200">
          Source that made grounding possible
        </p>
        <p className="mt-2 text-sm leading-6 text-cyan-950 dark:text-cyan-100">
          {scenario.source}
        </p>
      </div>
    </div>
  );
}
