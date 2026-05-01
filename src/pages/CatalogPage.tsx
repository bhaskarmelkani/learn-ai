import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Github,
  Moon,
  Sparkles,
  SunMedium,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courses } from "../courses/registry";
import { useThemePreference } from "../hooks/useThemePreference";
import { useLearning } from "../learning/LearningContext";
import type { CourseManifest, CourseProfession } from "../courses/types";
import type { AudienceTrack } from "../learning/LearningContext";

const PROFESSION_LABELS: Record<CourseProfession, string> = {
  engineering: "Engineering",
  product: "Product",
  business: "Business",
  general: "General",
};

export function CatalogPage() {
  const navigate = useNavigate();
  const { getCourseProgress } = useLearning();
  const [professionFilter, setProfessionFilter] = useState<
    CourseProfession | "all"
  >("all");
  const [trackFilter, setTrackFilter] = useState<AudienceTrack | "all">("all");
  const { dark, setDark } = useThemePreference();

  const filtered = courses.filter((course) => {
    if (professionFilter !== "all" && course.profession !== professionFilter)
      return false;
    if (trackFilter !== "all" && !course.supportedTracks.includes(trackFilter))
      return false;
    return true;
  });

  const totalChapters = courses.reduce(
    (count, course) => count + course.chapterCount,
    0
  );
  const totalMinutes = courses.reduce(
    (sum, course) => sum + (course.estimatedMinutes ?? 0),
    0
  );
  const githubRepoUrl = "https://github.com/bhaskarmelkani/learn-ai";
  const themeActionLabel = dark ? "Light mode" : "Dark mode";
  const ThemeIcon = dark ? SunMedium : Moon;

  return (
    <div className="app-shell min-h-screen">
      <header className="border-b border-stone-200/80 bg-white/78 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8">
          <div>
            <p className="overline">Learn AI</p>
            <h1 className="mt-1 text-xl font-semibold text-stone-950 dark:text-white">
              Course Catalog
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="soft-button min-h-9 px-3 text-xs"
              aria-label="Open the Learn AI GitHub repository"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
            <button
              onClick={() => setDark((value) => !value)}
              className="soft-button min-h-9 px-3 text-xs"
              aria-label={themeActionLabel}
            >
              <ThemeIcon className="h-3.5 w-3.5" />
              {themeActionLabel}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-8 md:py-16">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="accent-overline">Beginner-first AI courses</p>
            <h2 className="serif-display mt-4 text-[clamp(2.7rem,6vw,5.4rem)] leading-[0.95]">
              <span className="block">Courses that build</span>
              <span className="block">
                <span className="relative inline-block">
                  <span className="absolute inset-x-1 bottom-[0.14em] h-[0.18em] rounded-full bg-cyan-300/55 dark:bg-cyan-500/18" />
                  <span className="relative">intuition</span>
                </span>{" "}
                for how AI works.
              </span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 dark:text-gray-300">
              Pick a course, choose your preferred track, and resume exactly
              where you left off.
            </p>
          </div>
          <div className="premium-panel rounded-[1.75rem] p-5">
            <p className="overline">Learning system</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Courses", value: courses.length, icon: BookOpen },
                { label: "Chapters", value: totalChapters, icon: CheckCircle2 },
                { label: "Minutes", value: totalMinutes, icon: Sparkles },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="learning-card p-4">
                  <Icon className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                  <p className="mt-3 text-2xl font-semibold text-stone-950 dark:text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-gray-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="premium-panel mt-12 rounded-[1.6rem] p-4 md:p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
              Audience
            </span>
            {(
              ["all", "engineering", "product", "business", "general"] as const
            ).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setProfessionFilter(option)}
                className={`segment-button ${
                  professionFilter === option
                    ? "bg-cyan-600 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {option === "all" ? "All" : PROFESSION_LABELS[option]}
              </button>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-2 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500 dark:text-gray-500">
              Track
            </span>
            {(["all", "conceptual", "builder"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setTrackFilter(option)}
                className={`segment-button ${
                  trackFilter === option
                    ? "bg-cyan-600 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                }`}
              >
                {option === "all"
                  ? "All"
                  : option === "conceptual"
                    ? "Conceptual"
                    : "Builder"}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="overline">Courses</p>
              <h3 className="serif-display mt-2 text-3xl">
                Choose your next chapter.
              </h3>
            </div>
            <p className="text-sm text-stone-500 dark:text-gray-400">
              {filtered.length} match{filtered.length === 1 ? "" : "es"} the
              current filters.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="premium-panel mt-8 rounded-[1.75rem] px-6 py-12 text-center">
              <p className="text-sm text-stone-500 dark:text-gray-400">
                No courses match the current filters. Try broadening your
                selection.
              </p>
            </div>
          ) : (
            <div
              className={`mt-10 grid gap-7 ${
                filtered.length === 1 ? "max-w-3xl" : "lg:grid-cols-2"
              }`}
            >
              {filtered.map((course) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                  progress={getCourseProgress(course.slug)}
                  onNavigate={(slug, chapter) =>
                    navigate(
                      chapter
                        ? `/courses/${slug}/${chapter}`
                        : `/courses/${slug}`
                    )
                  }
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function CourseCard({
  course,
  progress,
  onNavigate,
}: {
  course: CourseManifest;
  progress: { lastChapter: number; reviewedChapters: Record<number, boolean> };
  onNavigate: (slug: string, chapter?: number) => void;
}) {
  const reviewed = Object.values(progress.reviewedChapters).filter(
    Boolean
  ).length;
  const percent =
    course.chapterCount > 0
      ? Math.round((reviewed / course.chapterCount) * 100)
      : 0;
  const hasStarted = progress.lastChapter > 1 || reviewed > 0;

  return (
    <article className="premium-panel group flex min-h-[22rem] flex-col rounded-[1.85rem] p-6 transition-[box-shadow,transform] hover:-translate-y-1 hover:shadow-[0_34px_90px_-54px_rgba(15,23,42,0.55)] md:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="learning-chip">
          {PROFESSION_LABELS[course.profession]}
        </span>
        {course.featured && (
          <span className="learning-chip border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200">
            Featured
          </span>
        )}
      </div>

      <h4 className="serif-display mt-5 text-3xl leading-[1.06]">
        {course.title}
      </h4>
      <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-gray-300">
        {course.subtitle}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-2">
        <span className="learning-chip">{course.chapterCount} chapters</span>
        {course.estimatedMinutes && (
          <span className="learning-chip">~{course.estimatedMinutes} min</span>
        )}
      </div>

      <p className="mt-3 text-sm text-stone-500 dark:text-gray-400">
        Available in Conceptual and Builder tracks.
      </p>

      <div className="mt-auto space-y-5 pt-8">
        {hasStarted && (
          <div className="learning-card px-4 py-4">
            <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-gray-500">
              <span>Progress</span>
              <span>{percent}%</span>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-stone-200 dark:bg-gray-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() =>
            onNavigate(
              course.slug,
              hasStarted ? progress.lastChapter : undefined
            )
          }
          aria-label={`${hasStarted ? "Continue learning" : "Start course"}: ${course.title}`}
          className="primary-button w-fit"
        >
          {hasStarted ? "Continue learning" : "Start course"}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </article>
  );
}
