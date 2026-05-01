import { useState } from "react";
import {
  BROWSER_AI_MODELS,
  PROMPT_SCENARIOS,
  useBrowserAI,
} from "../../lib/browser-ai";
import { Slider } from "./Slider";
import {
  BrowserAILabFrame,
  BrowserAIModelBadge,
  BrowserAIStatusPanel,
  ControlGrid,
  NoticeList,
  Panel,
  ScenarioPills,
} from "./BrowserAIPrimitives";
import { formatBrowserAIError } from "./browser-ai-utils";

export function BrowserLLMLab() {
  const generationLab = useBrowserAI("generate");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [prompt, setPrompt] = useState(PROMPT_SCENARIOS[0].betterPrompt);
  const [temperature, setTemperature] = useState(0.7);
  const [maxNewTokens, setMaxNewTokens] = useState(72);
  const [output, setOutput] = useState("");
  const [runtimeLabel, setRuntimeLabel] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState(
    "Nothing is loaded yet. Download the tiny local model when you want to try prompts on-device."
  );

  const scenario = PROMPT_SCENARIOS[scenarioIndex];

  const applyScenarioPrompt = (type: "better" | "vague") => {
    setPrompt(type === "vague" ? scenario.vaguePrompt : scenario.betterPrompt);
    setOutput("");
  };

  const selectScenario = (index: number) => {
    setScenarioIndex(index);
    setPrompt(PROMPT_SCENARIOS[index].betterPrompt);
    setOutput("");
  };

  const loadModel = async () => {
    try {
      setStatusMessage(
        "Downloading the tiny model into this browser. The first load can take a while, but later runs should reuse the cache."
      );
      const result = await generationLab.load();
      setRuntimeLabel(result.runtimeLabel);
      setStatusMessage(
        `Tiny model ready in ${result.runtimeLabel}. Weak or awkward answers are part of the lesson because everything is running locally on this device.`
      );
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
    }
  };

  const runPrompt = async () => {
    const trimmed = prompt.trim();
    if (!trimmed) return;

    try {
      setStatusMessage(
        generationLab.isLoaded
          ? "Generating with the tiny local model..."
          : "Loading the tiny local model, then running your prompt..."
      );
      const result = await generationLab.run({
        maxNewTokens,
        prompt: trimmed,
        temperature,
        topK: 40,
      });
      setRuntimeLabel(result.runtimeLabel);
      setOutput(result.text);
      setStatusMessage(
        `Finished on ${result.runtimeLabel}. Compare the vague and structured prompts and notice how much the tiny model depends on clearer task framing.`
      );
    } catch (error) {
      setStatusMessage(formatBrowserAIError(error));
    }
  };

  return (
    <BrowserAILabFrame
      eyebrow="Tiny Browser LLM Lab"
      title="Try a real local model while you learn prompting"
      description="This lab runs a very small instruct model entirely in the browser, with no backend and no API keys. That makes it perfect for GitHub Pages and teaching, but much weaker than a cloud model."
      badge={
        <BrowserAIModelBadge
          title={BROWSER_AI_MODELS.tinyGeneration.label}
          detail={`Model files download once, then stay cached in the browser.${runtimeLabel ? ` Current runtime: ${runtimeLabel}.` : ""}`}
        />
      }
    >
      <ScenarioPills
        activeIndex={scenarioIndex}
        items={PROMPT_SCENARIOS.map((item) => item.name)}
        onSelect={selectScenario}
      />

      <div className="mt-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
          Shared context
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-800 dark:text-gray-200">
          {scenario.context}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => applyScenarioPrompt("vague")}
          className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-900 transition hover:bg-rose-100 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-100 dark:hover:bg-rose-500/20"
        >
          Use vague prompt
        </button>
        <button
          type="button"
          onClick={() => applyScenarioPrompt("better")}
          className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-900 transition hover:bg-emerald-100 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100 dark:hover:bg-emerald-500/20"
        >
          Use better prompt
        </button>
      </div>

      <label className="mt-5 block text-sm font-medium text-stone-800 dark:text-gray-200">
        Prompt
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          className="mt-2 min-h-40 w-full rounded-[1.25rem] border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-6 text-stone-800 outline-none transition focus:border-cyan-400 dark:border-gray-800 dark:bg-gray-950/60 dark:text-gray-100"
        />
      </label>

      <div className="mt-5 grid gap-4 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 dark:border-gray-800 dark:bg-gray-950/60 lg:grid-cols-2">
        <Slider
          label="Temp"
          max={1.2}
          min={0}
          onChange={setTemperature}
          step={0.1}
          value={temperature}
        />
        <div className="flex items-center gap-3">
          <span className="w-20 text-right font-mono text-sm text-gray-500 italic dark:text-gray-400">
            Max
          </span>
          <span className="w-12 text-right font-mono text-sm font-medium text-gray-800 dark:text-gray-200">
            {maxNewTokens}
          </span>
          <input
            type="range"
            min={32}
            max={160}
            step={8}
            value={maxNewTokens}
            onChange={(event) => setMaxNewTokens(Number(event.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-gray-200 accent-blue-500 dark:bg-gray-700"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => void loadModel()}
          className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-cyan-500"
        >
          {generationLab.isLoaded ? "Tiny model ready" : "Load tiny model"}
        </button>
        <button
          type="button"
          onClick={() => void runPrompt()}
          className="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Run prompt
        </button>
      </div>

      <BrowserAIStatusPanel
        message={statusMessage}
        phase={generationLab.phase}
        status={generationLab.status}
      />

      <ControlGrid>
        <Panel title="Local model output" tone="stone">
          <p>
            {output ||
              "Run the prompt to see what the tiny local model produces on this device."}
          </p>
        </Panel>
        <Panel title="What to notice" tone="cyan">
          <NoticeList items={scenario.whatToNotice} />
        </Panel>
      </ControlGrid>
    </BrowserAILabFrame>
  );
}
