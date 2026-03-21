import { Moon, SunMedium } from "lucide-react";
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
  const themeActionLabel = dark ? "Light mode" : "Dark mode";
  const ThemeIcon = dark ? SunMedium : Moon;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.08),_transparent_22%),linear-gradient(180deg,#f8f5ef_0%,#f2ede5_100%)] text-stone-900 dark:bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.1),_transparent_22%),linear-gradient(180deg,#0b1220_0%,#111827_100%)] dark:text-gray-50">
      <header className="border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-xl dark:border-gray-800/80 dark:bg-gray-950/90">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-stone-500 dark:text-gray-500">
              Learn AI
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-stone-900 dark:text-white">
              Course Catalog
            </h1>
          </div>
          <button
            onClick={() => setDark((value) => !value)}
            className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:border-stone-300 hover:text-stone-900 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-700 dark:hover:text-gray-100"
            aria-label={themeActionLabel}
          >
            <ThemeIcon className="h-3.5 w-3.5" />
            {themeActionLabel}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 md:px-8">
        <section className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-700 dark:text-cyan-300">
            Beginner-first AI courses
          </p>
          <h2 className="mt-4 text-[clamp(2.8rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-stone-950 dark:text-white [font-family:var(--font-content)]">
            Learn AI through calm, narrative courses.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600 dark:text-gray-300">
            Pick a course, choose your preferred track, and resume exactly where
            you left off.
          </p>
          <p className="mt-5 text-sm text-stone-500 dark:text-gray-400">
            {courses.length} course{courses.length === 1 ? "" : "s"},{" "}
            {totalChapters} chapters, {totalMinutes} minutes of guided study.
          </p>
        </section>

        <section className="mt-10 rounded-[1.75rem] border border-stone-200/80 bg-white/82 p-4 shadow-sm backdrop-blur dark:border-gray-800/80 dark:bg-gray-900/78">
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
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
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
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
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

        <section className="mt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 dark:text-gray-500">
                Courses
              </p>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-stone-950 dark:text-white [font-family:var(--font-content)]">
                Choose your next chapter.
              </h3>
            </div>
            <p className="text-sm text-stone-500 dark:text-gray-400">
              {filtered.length} match{filtered.length === 1 ? "" : "es"} the
              current filters.
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-8 rounded-[1.75rem] border border-stone-200/80 bg-white/80 px-6 py-12 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900/80">
              <p className="text-sm text-stone-500 dark:text-gray-400">
                No courses match the current filters. Try broadening your
                selection.
              </p>
            </div>
          ) : (
            <div
              className={`mt-8 grid gap-6 ${
                filtered.length === 1 ? "max-w-3xl" : "md:grid-cols-2"
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
    <article className="flex min-h-[20rem] flex-col rounded-[1.75rem] border border-stone-200/80 bg-white/88 p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-800/80 dark:bg-gray-900/84">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600 dark:bg-gray-800 dark:text-gray-400">
          {PROFESSION_LABELS[course.profession]}
        </span>
        {course.featured && (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-medium text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
            Featured
          </span>
        )}
      </div>

      <h4 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.03em] text-stone-950 dark:text-white [font-family:var(--font-content)]">
        {course.title}
      </h4>
      <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-gray-300">
        {course.subtitle}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-[0.14em] text-stone-500 dark:text-gray-500">
        <span>{course.chapterCount} chapters</span>
        {course.estimatedMinutes && <span>~{course.estimatedMinutes} min</span>}
      </div>

      <p className="mt-3 text-sm text-stone-500 dark:text-gray-400">
        Available in Conceptual and Builder tracks.
      </p>

      {hasStarted && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500 dark:text-gray-500">
            <span>Progress</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-stone-200 dark:bg-gray-800">
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
          onNavigate(course.slug, hasStarted ? progress.lastChapter : undefined)
        }
        className="mt-auto inline-flex w-fit items-center justify-center rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
      >
        {hasStarted ? "Continue learning" : "Start course"}
      </button>
    </article>
  );
}
