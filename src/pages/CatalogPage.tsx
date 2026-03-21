import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../courses/registry";
import { useLearning } from "../learning/LearningContext";
import type { CourseManifest, CourseProfession } from "../courses/types";
import type { AudienceTrack } from "../learning/LearningContext";

const PROFESSION_LABELS: Record<CourseProfession, string> = {
  engineering: "Engineering",
  product: "Product",
  business: "Business",
  general: "General",
};

function getInitialTheme() {
  if (typeof window === "undefined") return false;
  const saved = window.localStorage.getItem("learn-ai-theme");
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function CatalogPage() {
  const navigate = useNavigate();
  const { getCourseProgress, state } = useLearning();
  const [professionFilter, setProfessionFilter] =
    useState<CourseProfession | "all">("all");
  const [trackFilter, setTrackFilter] = useState<AudienceTrack | "all">("all");
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("learn-ai-theme", dark ? "dark" : "light");
  }, [dark]);

  const filtered = courses.filter((c) => {
    if (professionFilter !== "all" && c.profession !== professionFilter)
      return false;
    if (trackFilter !== "all" && !c.supportedTracks.includes(trackFilter))
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 dark:bg-gray-950 dark:text-gray-50">
      {/* Header */}
      <header className="border-b border-stone-200 bg-stone-50/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Learn AI
            </p>
            <h1 className="mt-1 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 bg-clip-text text-2xl font-bold text-transparent">
              Course Catalog
            </h1>
          </div>
          <button
            onClick={() => setDark((d) => !d)}
            className="rounded-lg p-2 text-stone-500 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Intro */}
      <div className="mx-auto max-w-6xl px-4 pt-8 md:px-8">
        <p className="max-w-2xl text-lg leading-8 text-stone-600 dark:text-gray-300">
          Interactive, beginner-first courses that build real intuition for how
          AI works. Pick a course and learn at your own pace.
        </p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 dark:text-gray-500">
              Audience
            </span>
            {(["all", "engineering", "product", "business", "general"] as const).map(
              (opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setProfessionFilter(opt)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    professionFilter === opt
                      ? "bg-cyan-600 text-white"
                      : "bg-white text-stone-600 hover:bg-stone-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  {opt === "all" ? "All" : PROFESSION_LABELS[opt]}
                </button>
              ),
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500 dark:text-gray-500">
              Track
            </span>
            {(["all", "conceptual", "builder"] as const).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setTrackFilter(opt)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  trackFilter === opt
                    ? "bg-cyan-600 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-200 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                }`}
              >
                {opt === "all"
                  ? "All"
                  : opt === "conceptual"
                    ? "Conceptual"
                    : "Builder"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course grid */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 md:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white px-6 py-12 text-center dark:border-gray-800 dark:bg-gray-900">
            <p className="text-sm text-stone-500 dark:text-gray-400">
              No courses match the current filters. Try broadening your
              selection.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                progress={getCourseProgress(course.slug)}
                userTrack={state.track}
                onNavigate={(slug, chapter) =>
                  navigate(
                    chapter
                      ? `/courses/${slug}/${chapter}`
                      : `/courses/${slug}`,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CourseCard({
  course,
  progress,
  userTrack,
  onNavigate,
}: {
  course: CourseManifest;
  progress: { lastChapter: number; reviewedChapters: Record<number, boolean> };
  userTrack: AudienceTrack;
  onNavigate: (slug: string, chapter?: number) => void;
}) {
  const reviewed = Object.values(progress.reviewedChapters).filter(
    Boolean,
  ).length;
  const pct =
    course.chapterCount > 0
      ? Math.round((reviewed / course.chapterCount) * 100)
      : 0;
  const hasStarted = progress.lastChapter > 1 || reviewed > 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Color accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500" />

      <div className="flex flex-1 flex-col p-5">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600 dark:bg-gray-800 dark:text-gray-400">
            {PROFESSION_LABELS[course.profession]}
          </span>
          {course.supportedTracks.map((t) => (
            <span
              key={t}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                t === userTrack
                  ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-500/10 dark:text-cyan-200"
                  : "bg-stone-100 text-stone-500 dark:bg-gray-800 dark:text-gray-500"
              }`}
            >
              {t === "conceptual" ? "Conceptual" : "Builder"}
            </span>
          ))}
          {course.featured && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
              Featured
            </span>
          )}
        </div>

        {/* Title + subtitle */}
        <h3 className="mt-3 text-lg font-bold text-stone-900 dark:text-gray-100">
          {course.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-stone-600 dark:text-gray-400">
          {course.subtitle}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center gap-4 text-xs text-stone-500 dark:text-gray-500">
          <span>{course.chapterCount} chapters</span>
          {course.estimatedMinutes && (
            <span>~{course.estimatedMinutes} min</span>
          )}
        </div>

        {/* Progress bar */}
        {hasStarted && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 dark:text-gray-500">
              <span>Progress</span>
              <span>{pct}%</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-stone-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-[width] duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() =>
              onNavigate(
                course.slug,
                hasStarted ? progress.lastChapter : undefined,
              )
            }
            className="w-full rounded-2xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
          >
            {hasStarted ? "Continue learning" : "Start course"}
          </button>
        </div>
      </div>
    </div>
  );
}
