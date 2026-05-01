/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Route,
} from "lucide-react";
import { courses } from "../courses/registry";
import { type AudienceTrack, getTrackLabel } from "../learning/LearningContext";

const STORAGE_KEY = "learn-ai-onboarded";

export function useOnboarding() {
  const [onboarded, setOnboarded] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(STORAGE_KEY) === "true";
  });

  const completeOnboarding = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setOnboarded(true);
  };

  return { onboarded, completeOnboarding };
}

export function WelcomeScreen({
  track,
  onSelectTrack,
  guidedMode,
  onToggleGuidedMode,
  onStart,
}: {
  track: AudienceTrack;
  onSelectTrack: (track: AudienceTrack) => void;
  guidedMode: boolean;
  onToggleGuidedMode: () => void;
  onStart: () => void;
}) {
  const [step, setStep] = useState(0);
  const featuredCourse =
    courses.find((course) => course.featured) ?? courses[0];
  const totalChapters = courses.reduce(
    (count, course) => count + course.chapterCount,
    0
  );
  const totalMinutes = courses.reduce(
    (sum, course) => sum + (course.estimatedMinutes ?? 0),
    0
  );

  return (
    <div className="app-shell fixed inset-0 z-50 overflow-y-auto">
      <div className="mx-auto grid min-h-full w-full max-w-6xl items-center gap-8 px-4 py-8 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <section className="hidden md:block">
          <p className="accent-overline">Learn AI</p>
          <h1 className="serif-display mt-5 max-w-[11ch] text-[clamp(3.4rem,6.5vw,5.9rem)] leading-[0.94]">
            Build AI intuition you can use.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-stone-600 dark:text-gray-300">
            Narrative chapters, interactive labs, and track-aware practice for
            people who want durable AI understanding, not tool trivia.
          </p>
          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              { label: "Courses", value: courses.length },
              { label: "Chapters", value: totalChapters },
              { label: "Minutes", value: totalMinutes },
            ].map((item) => (
              <div key={item.label} className="learning-card p-4">
                <p className="text-2xl font-semibold text-stone-950 dark:text-white">
                  {item.value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 dark:text-gray-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto w-full max-w-xl">
          {step === 0 && (
            <div className="premium-panel rounded-[2rem] p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="accent-overline">Start here</p>
                  <h2 className="serif-display mt-3 text-4xl leading-none">
                    A learning path that respects your attention.
                  </h2>
                </div>
                <span className="hidden rounded-full border border-cyan-200 bg-cyan-50 p-3 text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-200 sm:inline-flex">
                  <Compass className="h-5 w-5" />
                </span>
              </div>
              <p className="mt-4 text-base leading-8 text-stone-600 dark:text-gray-300">
                Learn the mental models behind AI through concise lessons,
                working demos, checkpoints, and optional builder labs.
              </p>
              <div className="mt-6 grid gap-3">
                <div className="learning-card flex items-start gap-3 p-4">
                  <BookOpen className="mt-1 h-5 w-5 text-cyan-700 dark:text-cyan-300" />
                  <span className="text-sm leading-6 text-stone-700 dark:text-gray-300">
                    {courses.length} course{courses.length === 1 ? "" : "s"} and{" "}
                    {totalChapters} chapters with a shared progress system.
                  </span>
                </div>
                <div className="learning-card flex items-start gap-3 p-4">
                  <Route className="mt-1 h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  <span className="text-sm leading-6 text-stone-700 dark:text-gray-300">
                    Conceptual and Builder tracks let each lesson match your
                    preferred depth.
                  </span>
                </div>
                <div className="learning-card flex items-start gap-3 p-4">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-amber-700 dark:text-amber-300" />
                  <span className="text-sm leading-6 text-stone-700 dark:text-gray-300">
                    Featured path: {featuredCourse?.title ?? "AI Foundations"}.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="primary-button mt-6 w-full"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="premium-panel rounded-[2rem] p-6 md:p-8">
              <p className="accent-overline">Quick setup</p>
              <h2 className="serif-display mt-3 text-4xl leading-none">
                Choose how you want to learn.
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-gray-400">
                You can change these anytime from the course sidebar.
              </p>

              <div className="mt-6 grid gap-3">
                {(["conceptual", "builder"] as AudienceTrack[]).map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onSelectTrack(option)}
                      className={`w-full rounded-[1.35rem] border px-5 py-4 text-left transition-[background-color,border-color,box-shadow] ${
                        option === track
                          ? "border-cyan-300 bg-cyan-50 shadow-[0_18px_40px_-32px_rgba(8,145,178,0.65)] dark:border-cyan-500/30 dark:bg-cyan-500/10"
                          : "border-stone-200 bg-stone-50/80 hover:border-stone-300 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:border-gray-700"
                      }`}
                    >
                      <p className="font-semibold text-stone-900 dark:text-white">
                        {getTrackLabel(option)}
                      </p>
                      <p className="mt-1 text-sm text-stone-600 dark:text-gray-400">
                        {option === "conceptual"
                          ? "High-level intuition first. Fewer implementation details and no code labs."
                          : "Lower-level explanations, more mechanics, and editable Python labs."}
                      </p>
                    </button>
                  )
                )}
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={onToggleGuidedMode}
                  className={`w-full rounded-[1.35rem] border px-5 py-4 text-left transition-[background-color,border-color] ${
                    guidedMode
                      ? "border-amber-200 bg-amber-50 dark:border-amber-500/20 dark:bg-amber-500/10"
                      : "border-stone-200 bg-stone-50 dark:border-gray-800 dark:bg-gray-950/60"
                  }`}
                >
                  <p className="font-semibold text-stone-900 dark:text-white">
                    Guided mode {guidedMode ? "on" : "off"}
                  </p>
                  <p className="mt-1 text-sm text-stone-600 dark:text-gray-400">
                    {guidedMode
                      ? "Predict first, then unlock the interactive controls."
                      : "Open exploration. Demos unlock immediately."}
                  </p>
                </button>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(0)}
                  className="soft-button"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={onStart}
                  className="primary-button flex-1"
                >
                  Start learning
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
