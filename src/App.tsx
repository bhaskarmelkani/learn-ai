import { useState, useCallback, useRef, useEffect } from "react";
import { chapters } from "./chapters";
import { Sidebar } from "./components/Sidebar";
import { SlideView } from "./components/SlideView";
import { NavigationBar } from "./components/NavigationBar";
import { useKeyboardNav } from "./hooks/useKeyboardNav";
import { getTrackLabel, useLearning } from "./learning/LearningContext";

const STORAGE_KEYS = {
  chapter: "learn-ai-current-chapter",
  theme: "learn-ai-theme",
};

function getInitialChapter() {
  if (typeof window === "undefined") return 0;

  const hash = window.location.hash.replace(/^#/, "");
  const hashMatch = hash.match(/^chapter-(\d+)/);
  if (hashMatch) {
    const chapterNumber = Number(hashMatch[1]);
    const chapterIndex = chapters.findIndex((chapter) => chapter.chapter === chapterNumber);
    if (chapterIndex >= 0) return chapterIndex;
  }

  const saved = window.localStorage.getItem(STORAGE_KEYS.chapter);
  const parsed = saved ? Number(saved) : Number.NaN;
  return Number.isInteger(parsed) && parsed >= 0 && parsed < chapters.length ? parsed : 0;
}

function getInitialTheme() {
  if (typeof window === "undefined") return false;

  const saved = window.localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getChapterHash(index: number) {
  const chapter = chapters[index];
  if (!chapter) return "";

  const slug = chapter.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `chapter-${chapter.chapter}-${slug}`;
}

export default function App() {
  const {
    state: { track, guidedMode },
    setTrack,
    setGuidedMode,
    masterySummary,
    reviewQueue,
  } = useLearning();
  const [current, setCurrent] = useState(getInitialChapter);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );
  const [sidebarVisible, setSidebarVisible] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );
  const [dark, setDark] = useState(getInitialTheme);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIsDesktop = useRef(isDesktop);

  useEffect(() => {
    if (typeof window === "undefined") return;

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
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem(STORAGE_KEYS.theme, dark ? "dark" : "light");
  }, [dark]);

  const goTo = useCallback(
    (i: number) => {
      if (i >= 0 && i < chapters.length) {
        setCurrent(i);
        if (!isDesktop) setSidebarVisible(false);
      }
    },
    [isDesktop]
  );

  const onNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const onPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const onToggleSidebar = useCallback(() => setSidebarVisible((v) => !v), []);

  useKeyboardNav({ onNext, onPrev, onToggleSidebar });

  // Scroll to top on chapter change
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
    window.localStorage.setItem(STORAGE_KEYS.chapter, String(current));
    const hash = getChapterHash(current);
    if (hash) {
      window.history.replaceState(null, "", `#${hash}`);
    }
  }, [current]);

  const chapter = chapters[current];
  const progress = ((current + 1) / chapters.length) * 100;
  const previousChapter = current > 0 ? chapters[current - 1] : null;
  const nextChapter = current < chapters.length - 1 ? chapters[current + 1] : null;

  return (
    <div className="h-screen flex overflow-hidden bg-stone-100 text-stone-900 dark:bg-gray-950 dark:text-gray-50">
      <Sidebar
        chapters={chapters}
        current={current}
        onSelect={goTo}
        visible={sidebarVisible}
        dark={dark}
        isDesktop={isDesktop}
        progress={progress}
        onToggleSidebar={onToggleSidebar}
        onToggleTheme={() => setDark((d) => !d)}
        track={track}
        onSelectTrack={setTrack}
        guidedMode={guidedMode}
        onToggleGuidedMode={() => setGuidedMode(!guidedMode)}
        masterySummary={masterySummary}
        reviewQueue={reviewQueue}
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
          sidebarVisible && isDesktop ? "lg:ml-80" : "lg:ml-0"
        }`}
      >
        <div className="sticky top-0 z-10 border-b border-stone-200/80 bg-stone-100/95 backdrop-blur dark:border-gray-800/80 dark:bg-gray-950/95">
          <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3 md:px-8">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition-colors hover:border-stone-400 hover:text-stone-950 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-50"
            >
              <span className="text-base leading-none">≡</span>
              Chapters
            </button>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-stone-800 dark:text-gray-100">
                {chapter.chapter}. {chapter.title}
              </p>
              <p className="truncate text-xs text-stone-500 dark:text-gray-400">
                {chapter.subtitle ?? "Build intuition step by step through concise explanations and live demos."}
              </p>
            </div>
            <div className="hidden rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow-sm dark:bg-gray-900 dark:text-gray-200 md:block">
              {getTrackLabel(track)}
            </div>
            <div className="hidden text-right md:block">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                Progress
              </p>
              <p className="text-sm font-semibold text-stone-700 dark:text-gray-200">
                {current + 1} / {chapters.length} · {masterySummary.completedChecks} checks
              </p>
            </div>
          </div>
          <div className="h-1 w-full bg-stone-200 dark:bg-gray-900">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {chapter ? (
          <SlideView key={current} chapter={chapter} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No chapters found
          </div>
        )}
      </main>
      <NavigationBar
        current={current}
        total={chapters.length}
        onPrev={onPrev}
        onNext={onNext}
        previousTitle={previousChapter?.title}
        nextTitle={nextChapter?.title}
        isDesktop={isDesktop}
        sidebarVisible={sidebarVisible}
      />
    </div>
  );
}
