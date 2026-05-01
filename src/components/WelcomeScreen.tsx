/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
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
  const featuredCourse = courses.find((course) => course.featured) ?? courses[0];
  const totalChapters = courses.reduce(
    (count, course) => count + course.chapterCount,
    0,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-100 dark:bg-gray-950">
      <div className="mx-4 w-full max-w-lg">
        {step === 0 && (
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Learn AI
            </p>
            <h1 className="mt-3 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-3xl font-bold text-transparent">
              Interactive AI courses for curious learners
            </h1>
            <p className="mt-4 text-lg leading-8 text-stone-700 dark:text-gray-300">
              Build real intuition for how AI works through concise explanations,
              interactive demos, and track-aware learning paths you can revisit
              at any time.
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
                <span className="mt-0.5 text-cyan-600 dark:text-cyan-400">
                  {courses.length}
                </span>
                <span className="text-sm text-stone-600 dark:text-gray-300">
                  course{courses.length === 1 ? "" : "s"} in one catalog, with a
                  shared track preference across the platform
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
                <span className="mt-0.5 text-cyan-600 dark:text-cyan-400">
                  {totalChapters}
                </span>
                <span className="text-sm text-stone-600 dark:text-gray-300">
                  total chapters with checkpoints, recaps, and interactive demos
                </span>
              </div>
              <div className="flex items-start gap-3 rounded-2xl bg-stone-50 px-4 py-3 dark:bg-gray-950/60">
                <span className="mt-0.5 text-cyan-600 dark:text-cyan-400">
                  {featuredCourse?.title ?? "Start"}
                </span>
                <span className="text-sm text-stone-600 dark:text-gray-300">
                  featured first course for beginner-friendly intuition building
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="mt-6 w-full rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
            >
              Get started
            </button>
          </div>
        )}

        {step === 1 && (
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-lg dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Quick Setup
            </p>
            <h2 className="mt-3 text-2xl font-bold text-stone-900 dark:text-white">
              Choose your learning track
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
              You can change this anytime from the course sidebar, and it
              applies across the whole catalog.
            </p>

            <div className="mt-5 space-y-3">
              {(["conceptual", "builder"] as AudienceTrack[]).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onSelectTrack(option)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition-colors ${
                    option === track
                      ? "border-cyan-300 bg-cyan-50 dark:border-cyan-500/30 dark:bg-cyan-500/10"
                      : "border-stone-200 bg-stone-50 hover:border-stone-300 dark:border-gray-800 dark:bg-gray-950/60 dark:hover:border-gray-700"
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
              ))}
            </div>

            <div className="mt-5">
              <button
                type="button"
                onClick={onToggleGuidedMode}
                className={`w-full rounded-2xl border px-5 py-4 text-left transition-colors ${
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
                className="rounded-2xl border border-stone-200 px-5 py-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Back
              </button>
              <button
                type="button"
                onClick={onStart}
                className="flex-1 rounded-2xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
              >
                Start learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
