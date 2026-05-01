import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { SlideView } from "../components/SlideView";
import { NavigationBar } from "../components/NavigationBar";
import { useKeyboardNav } from "../hooks/useKeyboardNav";
import { useThemePreference } from "../hooks/useThemePreference";
import { getTrackLabel, useLearning } from "../learning/LearningContext";
import { getCourse, loadCourseChapters } from "../courses/registry";
import { resolveChapterNumber } from "../courses/navigation";
import type { CourseManifest, CourseChapter } from "../courses/types";

type LessonSection = {
  id: string;
  title: string;
};

type LessonMeta = {
  sections: LessonSection[];
  exercises: number;
  checkpoints: number;
  recaps: number;
};

const STORAGE_KEYS = {
  sidebarCollapsed: "learn-ai-sidebar-collapsed",
};

function getInitialSidebarCollapsed() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEYS.sidebarCollapsed) === "true";
}

export function CourseReader() {
  const { courseSlug, chapterNumber } = useParams<{
    courseSlug: string;
    chapterNumber?: string;
  }>();
  const manifest = courseSlug ? getCourse(courseSlug) : undefined;

  // If course not found, redirect to catalog
  if (!manifest || !courseSlug) {
    return <Navigate to="/" replace />;
  }

  return (
    <CourseReaderInner manifest={manifest} chapterNumber={chapterNumber} />
  );
}

function CourseReaderInner({
  manifest,
  chapterNumber,
}: {
  manifest: CourseManifest;
  chapterNumber?: string;
}) {
  const navigate = useNavigate();
  const {
    state: { track, guidedMode },
    reviewedChapters,
    setTrack,
    setGuidedMode,
    setLastChapter,
    setActiveCourseSlug,
    getCourseProgress,
  } = useLearning();

  const courseSlug = manifest.slug;

  // Set the active course slug for back-compat MDX consumers
  useEffect(() => {
    setActiveCourseSlug(courseSlug);
  }, [courseSlug, setActiveCourseSlug]);

  const [chapters, setChapters] = useState<CourseChapter[]>([]);
  const [loading, setLoading] = useState(true);

  // Load chapters
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadCourseChapters(courseSlug)
      .then((loaded) => {
        if (!cancelled) {
          setChapters(loaded);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setChapters([]);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [courseSlug]);

  // Determine active chapter index
  const courseProgress = getCourseProgress(courseSlug);
  const requestedChapter = chapterNumber ? Number(chapterNumber) : null;
  const resolvedChapterNumber = useMemo(
    () =>
      resolveChapterNumber({
        chapters,
        requestedChapter:
          requestedChapter !== null && !Number.isNaN(requestedChapter)
            ? requestedChapter
            : null,
        resumeChapter: courseProgress.lastChapter,
      }),
    [chapters, requestedChapter, courseProgress.lastChapter]
  );
  const currentIndex = useMemo(() => {
    if (resolvedChapterNumber === null) return -1;
    return chapters.findIndex((c) => c.chapter === resolvedChapterNumber);
  }, [chapters, resolvedChapterNumber]);
  const chapter = currentIndex >= 0 ? chapters[currentIndex] : undefined;

  // Redirect to correct chapter number in URL if needed
  useEffect(() => {
    if (loading || resolvedChapterNumber === null) return;
    const expectedNum = String(resolvedChapterNumber);
    if (chapterNumber !== expectedNum) {
      navigate(`/courses/${courseSlug}/${expectedNum}`, { replace: true });
    }
  }, [loading, resolvedChapterNumber, chapterNumber, courseSlug, navigate]);

  // Save lastChapter on chapter change
  useEffect(() => {
    if (!chapter) return;
    setLastChapter(courseSlug, chapter.chapter);
  }, [chapter, courseSlug, setLastChapter]);

  // Theme + sidebar state
  const { dark, setDark } = useThemePreference();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );
  const [sidebarVisible, setSidebarVisible] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    getInitialSidebarCollapsed
  );
  const [lessonMeta, setLessonMeta] = useState<LessonMeta>({
    sections: [],
    exercises: 0,
    checkpoints: 0,
    recaps: 0,
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIsDesktop = useRef(isDesktop);

  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (prevIsDesktop.current !== isDesktop) {
      setSidebarVisible(isDesktop);
      prevIsDesktop.current = isDesktop;
    }
  }, [isDesktop]);

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEYS.sidebarCollapsed,
      String(sidebarCollapsed)
    );
  }, [sidebarCollapsed]);

  // Navigation
  const goTo = useCallback(
    (i: number) => {
      if (i >= 0 && i < chapters.length) {
        const target = chapters[i];
        navigate(`/courses/${courseSlug}/${target.chapter}`);
        if (!isDesktop) setSidebarVisible(false);
      }
    },
    [chapters, courseSlug, isDesktop, navigate]
  );

  const onNext = useCallback(
    () => goTo(currentIndex + 1),
    [currentIndex, goTo]
  );
  const onPrev = useCallback(
    () => goTo(currentIndex - 1),
    [currentIndex, goTo]
  );
  const onToggleSidebar = useCallback(() => {
    if (isDesktop) {
      setSidebarCollapsed((v) => !v);
      return;
    }
    setSidebarVisible((v) => !v);
  }, [isDesktop]);

  useKeyboardNav({ onNext, onPrev, onToggleSidebar });

  // Scroll to top on chapter change
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [currentIndex]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const root = contentRef.current;
      if (!root) return;
      const headings = Array.from(root.querySelectorAll("article h2"));
      setLessonMeta({
        sections: headings.map((heading, index) => ({
          id: heading.id || `section-${index + 1}`,
          title: heading.textContent?.trim() || `Section ${index + 1}`,
        })),
        exercises: root.querySelectorAll('[data-lesson-block="exercise"]')
          .length,
        checkpoints: root.querySelectorAll('[data-lesson-block="checkpoint"]')
          .length,
        recaps: root.querySelectorAll('[data-lesson-block="recap"]').length,
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentIndex, chapter]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-stone-100 text-stone-500 dark:bg-gray-950 dark:text-gray-400">
        Loading course...
      </div>
    );
  }

  if (!chapter) {
    return <Navigate to="/" replace />;
  }

  const progress = ((currentIndex + 1) / chapters.length) * 100;
  const previousChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="app-shell flex h-screen overflow-hidden">
      <Sidebar
        chapters={chapters}
        current={currentIndex}
        onSelect={goTo}
        visible={sidebarVisible}
        collapsed={isDesktop ? sidebarCollapsed : false}
        dark={dark}
        isDesktop={isDesktop}
        progress={progress}
        onToggleSidebar={onToggleSidebar}
        onToggleTheme={() => setDark((d) => !d)}
        track={track}
        onSelectTrack={setTrack}
        guidedMode={guidedMode}
        onToggleGuidedMode={() => setGuidedMode(!guidedMode)}
        completedChapters={reviewedChapters}
        courseTitle={manifest.title}
        onBackToCatalog={() => navigate("/")}
      />
      {sidebarVisible && !isDesktop && (
        <button
          type="button"
          aria-label="Close chapter navigation"
          onClick={() => setSidebarVisible(false)}
          className="fixed inset-0 z-20 bg-gray-950/50 backdrop-blur-sm lg:hidden"
        />
      )}
      <main
        ref={contentRef}
        className={`relative flex-1 overflow-y-auto transition-[margin] duration-200 ${
          sidebarVisible && isDesktop
            ? sidebarCollapsed
              ? "lg:ml-[4.5rem]"
              : "lg:ml-72"
            : "lg:ml-0"
        }`}
      >
        <div className="sticky top-0 z-10 border-b border-stone-200/70 bg-white/78 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/82">
          <div className="mx-auto flex max-w-[88rem] items-center gap-3 px-4 py-3 md:px-8 md:py-4">
            {!isDesktop && (
              <button
                type="button"
                onClick={onToggleSidebar}
                className="soft-button min-h-9 px-3 text-sm"
              >
                <span className="text-base leading-none">&#8801;</span>
                Chapters
              </button>
            )}
            <div className="min-w-0 flex-1">
              <p className="overline">{manifest.title}</p>
              <p className="mt-1 truncate text-[0.9rem] font-semibold text-stone-800 dark:text-gray-100">
                {chapter.chapter}. {chapter.title}
              </p>
              <p className="hidden truncate text-[0.72rem] text-stone-500 dark:text-gray-400 sm:block">
                {chapter.subtitle ??
                  "Build intuition step by step through concise explanations and live demos."}
              </p>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <div className="learning-chip normal-case tracking-normal">
                {getTrackLabel(track)}
              </div>
              <div
                className={`learning-chip normal-case tracking-normal ${
                  guidedMode
                    ? "border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200"
                    : ""
                }`}
              >
                {guidedMode ? "Guided" : "Open Mode"}
              </div>
            </div>
            <div className="hidden text-right md:block">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Progress
              </p>
              <p className="text-[0.9rem] font-semibold text-stone-700 dark:text-gray-200">
                {currentIndex + 1} / {chapters.length} chapters
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-[88rem] px-4 pb-2 md:px-8 md:pb-3">
            <div className="h-1 w-full rounded-full bg-stone-200/80 dark:bg-gray-900">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-[88rem] gap-5 px-4 md:px-8 xl:grid-cols-[minmax(0,1fr)_16rem]">
          <SlideView key={`${courseSlug}-${currentIndex}`} chapter={chapter} />
          <LessonCompanion
            chapter={chapter}
            totalChapters={chapters.length}
            meta={lessonMeta}
            trackLabel={getTrackLabel(track)}
          />
        </div>
      </main>
      <NavigationBar
        current={currentIndex}
        total={chapters.length}
        onPrev={onPrev}
        onNext={onNext}
        previousTitle={previousChapter?.title}
        nextTitle={nextChapter?.title}
        isDesktop={isDesktop}
        sidebarVisible={sidebarVisible}
        sidebarCollapsed={sidebarCollapsed}
      />
    </div>
  );
}

function LessonCompanion({
  chapter,
  totalChapters,
  meta,
  trackLabel,
}: {
  chapter: CourseChapter;
  totalChapters: number;
  meta: LessonMeta;
  trackLabel: string;
}) {
  return (
    <aside className="sticky top-28 hidden h-fit space-y-4 pt-6 xl:block">
      <section className="rounded-2xl border border-stone-200/85 bg-white/82 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900/82">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="overline">Lesson map</p>
            <p className="mt-2 text-sm font-semibold text-stone-900 dark:text-white">
              Chapter {chapter.chapter} of {totalChapters}
            </p>
          </div>
          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[0.68rem] font-semibold text-cyan-800 dark:border-cyan-500/20 dark:bg-cyan-500/10 dark:text-cyan-200">
            {trackLabel}
          </span>
        </div>

        <ol className="mt-5 space-y-3 border-l border-stone-200 pl-4 dark:border-gray-800">
          <li className="relative text-xs font-medium text-cyan-800 dark:text-cyan-200">
            <span className="absolute -left-[1.42rem] top-1 h-2.5 w-2.5 rounded-full bg-cyan-600 ring-4 ring-cyan-50 dark:bg-cyan-400 dark:ring-gray-900" />
            Overview
          </li>
          {meta.sections.slice(0, 6).map((section, index) => (
            <li
              key={`${section.id}-${index}`}
              className="relative text-xs leading-5 text-stone-600 dark:text-gray-400"
            >
              <span className="absolute -left-[1.34rem] top-1.5 h-2 w-2 rounded-full border border-stone-300 bg-white dark:border-gray-700 dark:bg-gray-900" />
              {section.title}
            </li>
          ))}
          <li className="relative text-xs leading-5 text-stone-600 dark:text-gray-400">
            <span className="absolute -left-[1.34rem] top-1.5 h-2 w-2 rounded-full border border-amber-300 bg-white dark:border-amber-500/40 dark:bg-gray-900" />
            Checkpoint and recap
          </li>
        </ol>

        <div className="mt-5 border-t border-stone-200 pt-4 dark:border-gray-800">
          <p className="overline">In this chapter</p>
        </div>
        <div className="mt-3 space-y-2 text-xs text-stone-600 dark:text-gray-400">
          <div className="flex items-center justify-between gap-3">
            <span>Exercises</span>
            <strong className="text-stone-900 dark:text-gray-100">
              {meta.exercises}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Checkpoints</span>
            <strong className="text-stone-900 dark:text-gray-100">
              {meta.checkpoints}
            </strong>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span>Recaps</span>
            <strong className="text-stone-900 dark:text-gray-100">
              {meta.recaps}
            </strong>
          </div>
        </div>
      </section>
    </aside>
  );
}
