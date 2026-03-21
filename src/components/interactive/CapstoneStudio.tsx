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

const API_KEY_STORAGE = "learn-ai-api-key";

function loadApiKey(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(API_KEY_STORAGE) ?? "";
}

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
  const [apiKey, setApiKey] = useState(loadApiKey);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const scenario = SCENARIOS[scenarioIndex];
  const completedCount = useMemo(
    () => Object.values(answers).filter((value) => value.trim().length > 10).length,
    [answers]
  );

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    if (typeof window !== "undefined") {
      if (key) {
        window.localStorage.setItem(API_KEY_STORAGE, key);
      } else {
        window.localStorage.removeItem(API_KEY_STORAGE);
      }
    }
  };

  const getFeedback = async () => {
    if (!apiKey.trim()) {
      setError("Please enter your Anthropic API key first.");
      return;
    }
    if (completedCount < 3) {
      setError("Fill in at least 3 sections before requesting feedback.");
      return;
    }

    setLoading(true);
    setError("");
    setFeedback("");

    const prompt = `You are an AI education coach evaluating a learner's product teardown for the scenario: "${scenario.name}" (target user: ${scenario.user}, core risk: ${scenario.coreRisk}).

The learner's answers:
- What goes in: ${answers.input || "(empty)"}
- What should come out: ${answers.output || "(empty)"}
- Model family/structure: ${answers.model || "(empty)"}
- Training/feedback signal: ${answers.signal || "(empty)"}
- Failure mode: ${answers.failure || "(empty)"}
- Human oversight: ${answers.humanLoop || "(empty)"}

Rubric criteria:
${RUBRIC.map((r, i) => `${i + 1}. ${r}`).join("\n")}

Give brief, encouraging feedback (3-5 bullet points). For each rubric item, say whether it was addressed and give one specific suggestion to strengthen it. Keep the tone supportive and educational. Do not repeat the answers back. Be concise.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 600,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(response.status === 401 ? "Invalid API key." : `API error: ${text}`);
      }

      const data = await response.json();
      const text = data.content?.[0]?.text ?? "No feedback received.";
      setFeedback(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get feedback.");
    } finally {
      setLoading(false);
    }
  };

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

          <div className="rounded-[1.5rem] border border-violet-200 bg-violet-50 p-4 dark:border-violet-500/20 dark:bg-violet-500/10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-800 dark:text-violet-200">
              AI Feedback (optional)
            </p>
            <p className="mt-1 text-sm text-violet-700 dark:text-violet-300">
              Paste your Anthropic API key to get lightweight rubric feedback on your answers. The key is stored locally and never sent anywhere except the Anthropic API.
            </p>
            <div className="mt-3 flex gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="sk-ant-..."
                className="flex-1 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-stone-800 outline-none transition-colors placeholder:text-stone-400 focus:border-violet-400 dark:border-violet-500/30 dark:bg-gray-900 dark:text-gray-100"
              />
              <button
                type="button"
                onClick={getFeedback}
                disabled={loading || completedCount < 3}
                className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? "Thinking..." : "Get feedback"}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p>
            )}
            {feedback && (
              <div className="mt-3 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm leading-6 text-stone-800 dark:border-violet-500/20 dark:bg-gray-900 dark:text-gray-100">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
                  Feedback
                </p>
                <div className="mt-2 whitespace-pre-wrap">{feedback}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
