import { useState, useCallback, useRef, useEffect } from "react";
import {
  COURSE_LEVEL_LABELS,
  type Chapter,
  type CourseLevel,
  getDefaultTrackId,
  getTrackById,
  getTrackLevelContent,
  learningTracks,
} from "./content";
import { Sidebar } from "./components/Sidebar";
import { SlideView } from "./components/SlideView";
import { NavigationBar } from "./components/NavigationBar";
import { TrackBlueprintView } from "./components/TrackBlueprintView";
import { useKeyboardNav } from "./hooks/useKeyboardNav";

const STORAGE_KEYS = {
  chapterMap: "learn-ai-current-chapters",
  track: "learn-ai-current-track",
  level: "learn-ai-current-level",
  theme: "learn-ai-theme",
};

function isCourseLevel(value: string | null): value is CourseLevel {
  return value === "conceptual" || value === "builder";
}

function getInitialTheme() {
  if (typeof window === "undefined") return false;

  const saved = window.localStorage.getItem(STORAGE_KEYS.theme);
  if (saved === "dark") return true;
  if (saved === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getChapterHash(chapter: Chapter) {
  return `chapter-${chapter.chapter}-${chapter.slug}`;
}

function createTrackLevelKey(trackId: string, level: CourseLevel) {
  return `${trackId}:${level}`;
}

function readStoredChapterMap() {
  if (typeof window === "undefined") return {} as Record<string, number>;

  const raw = window.localStorage.getItem(STORAGE_KEYS.chapterMap);
  if (!raw) return {};

  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed ? (parsed as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function getStoredChapterIndex(trackId: string, level: CourseLevel) {
  const chapterMap = readStoredChapterMap();
  const stored = chapterMap[createTrackLevelKey(trackId, level)];
  return Number.isInteger(stored) ? stored : 0;
}

function clampChapterIndex(chapterCount: number, desired: number) {
  if (chapterCount <= 0) return 0;
  return Math.min(Math.max(desired, 0), chapterCount - 1);
}

function parseHash() {
  if (typeof window === "undefined") return {};

  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return {};

  const [trackId, level, chapterHash] = hash.split("/");
  return {
    trackId: trackId || undefined,
    level: level || undefined,
    chapterHash: chapterHash || undefined,
  };
}

function resolveInitialChapterIndex(
  chapters: Chapter[],
  storedIndex: number,
  chapterHash?: string
) {
  if (chapters.length === 0) return 0;

  if (chapterHash) {
    const hashIndex = chapters.findIndex((chapter) => getChapterHash(chapter) === chapterHash);
    if (hashIndex >= 0) return hashIndex;
  }

  return clampChapterIndex(chapters.length, storedIndex);
}

function getInitialSelection() {
  const trackIdFromHash = parseHash().trackId;
  const levelFromHash = parseHash().level;
  const chapterHash = parseHash().chapterHash;

  if (typeof window === "undefined") {
    return {
      trackId: getDefaultTrackId(),
      level: "conceptual" as CourseLevel,
      current: 0,
    };
  }

  const savedTrackId = window.localStorage.getItem(STORAGE_KEYS.track);
  const resolvedTrackId = getTrackById(trackIdFromHash ?? savedTrackId ?? getDefaultTrackId())?.id ?? getDefaultTrackId();

  const savedLevel = window.localStorage.getItem(STORAGE_KEYS.level);
  const level = isCourseLevel(levelFromHash ?? savedLevel) ? (levelFromHash ?? savedLevel) : "conceptual";
  const content = getTrackLevelContent(resolvedTrackId, level);
  const current = resolveInitialChapterIndex(
    content.chapters,
    getStoredChapterIndex(resolvedTrackId, level),
    chapterHash
  );

  return {
    trackId: resolvedTrackId,
    level,
    current,
  };
}

function buildHash(trackId: string, level: CourseLevel, chapter?: Chapter) {
  return `#${trackId}/${level}${chapter ? `/${getChapterHash(chapter)}` : ""}`;
}

export default function App() {
  const [selection, setSelection] = useState(getInitialSelection);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );
  const [sidebarVisible, setSidebarVisible] = useState(() =>
    typeof window === "undefined" ? true : window.innerWidth >= 1024
  );
  const [dark, setDark] = useState(getInitialTheme);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevIsDesktop = useRef(isDesktop);
  const content = getTrackLevelContent(selection.trackId, selection.level);
  const track = content.track;
  const chapters = content.chapters;
  const currentChapter = chapters[selection.current];

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

  useEffect(() => {
    const maxIndex = clampChapterIndex(chapters.length, selection.current);
    if (maxIndex !== selection.current) {
      setSelection((previous) => ({ ...previous, current: maxIndex }));
    }
  }, [chapters.length, selection.current]);

  const goToChapter = useCallback(
    (i: number) => {
      if (i >= 0 && i < chapters.length) {
        setSelection((previous) => ({ ...previous, current: i }));
        if (!isDesktop) setSidebarVisible(false);
      }
    },
    [chapters.length, isDesktop]
  );

  const switchTrackLevel = useCallback(
    (trackId: string, level: CourseLevel) => {
      const nextTrackId = getTrackById(trackId)?.id ?? selection.trackId;
      const nextContent = getTrackLevelContent(nextTrackId, level);
      const nextIndex = resolveInitialChapterIndex(
        nextContent.chapters,
        getStoredChapterIndex(nextTrackId, level)
      );

      setSelection({
        trackId: nextTrackId,
        level,
        current: nextIndex,
      });

      if (!isDesktop) setSidebarVisible(false);
    },
    [isDesktop, selection.trackId]
  );

  const onNext = useCallback(() => goToChapter(selection.current + 1), [selection.current, goToChapter]);
  const onPrev = useCallback(() => goToChapter(selection.current - 1), [selection.current, goToChapter]);
  const onToggleSidebar = useCallback(() => setSidebarVisible((v) => !v), []);
  const onSelectTrack = useCallback(
    (trackId: string) => switchTrackLevel(trackId, selection.level),
    [selection.level, switchTrackLevel]
  );
  const onSelectLevel = useCallback(
    (level: CourseLevel) => switchTrackLevel(selection.trackId, level),
    [selection.trackId, switchTrackLevel]
  );

  useKeyboardNav({ onNext, onPrev, onToggleSidebar });

  useEffect(() => {
    if (typeof window === "undefined") return;

    contentRef.current?.scrollTo(0, 0);

    window.localStorage.setItem(STORAGE_KEYS.track, selection.trackId);
    window.localStorage.setItem(STORAGE_KEYS.level, selection.level);

    if (chapters.length > 0) {
      const chapterMap = readStoredChapterMap();
      chapterMap[createTrackLevelKey(selection.trackId, selection.level)] = selection.current;
      window.localStorage.setItem(STORAGE_KEYS.chapterMap, JSON.stringify(chapterMap));
    }

    window.history.replaceState(
      null,
      "",
      buildHash(selection.trackId, selection.level, currentChapter)
    );
  }, [
    chapters.length,
    currentChapter,
    selection.current,
    selection.level,
    selection.trackId,
  ]);

  const progress = chapters.length ? ((selection.current + 1) / chapters.length) * 100 : 0;
  const previousChapter = selection.current > 0 ? chapters[selection.current - 1] : null;
  const nextChapter =
    selection.current < chapters.length - 1 ? chapters[selection.current + 1] : null;
  const trackSummaries = learningTracks.map((entry) => ({
    track: entry,
    publishedLevels: {
      conceptual: getTrackLevelContent(entry.id, "conceptual").chapters.length > 0,
      builder: getTrackLevelContent(entry.id, "builder").chapters.length > 0,
    },
  }));
  const levelBlueprint = track.levels[selection.level];

  return (
    <div className="h-screen flex overflow-hidden bg-stone-100 text-stone-900 dark:bg-gray-950 dark:text-gray-50">
      <Sidebar
        track={track}
        trackSummaries={trackSummaries}
        level={selection.level}
        chapters={chapters}
        current={selection.current}
        onSelectChapter={goToChapter}
        onSelectTrack={onSelectTrack}
        onSelectLevel={onSelectLevel}
        visible={sidebarVisible}
        dark={dark}
        isDesktop={isDesktop}
        progress={progress}
        hasPublishedContent={content.hasPublishedContent}
        blueprintModules={levelBlueprint.plannedModules}
        onToggleSidebar={onToggleSidebar}
        onToggleTheme={() => setDark((d) => !d)}
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
                {track.title} • {COURSE_LEVEL_LABELS[selection.level]}
              </p>
              <p className="truncate text-xs text-stone-500 dark:text-gray-400">
                {currentChapter?.subtitle ?? levelBlueprint.description}
              </p>
            </div>
            <div className="hidden text-right md:block">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-gray-500">
                {content.hasPublishedContent ? "Progress" : "Status"}
              </p>
              <p className="text-sm font-semibold text-stone-700 dark:text-gray-200">
                {content.hasPublishedContent ? `${selection.current + 1} / ${chapters.length}` : "Blueprint"}
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
        {currentChapter ? (
          <SlideView
            key={`${selection.trackId}:${selection.level}:${selection.current}`}
            chapter={currentChapter}
            trackTitle={track.title}
            level={selection.level}
            profession={track.profession}
          />
        ) : (
          <TrackBlueprintView track={track} level={selection.level} />
        )}
      </main>
      <NavigationBar
        current={selection.current}
        total={chapters.length}
        onPrev={onPrev}
        onNext={onNext}
        previousTitle={previousChapter?.title}
        nextTitle={nextChapter?.title}
        isDesktop={isDesktop}
        sidebarVisible={sidebarVisible}
        hasPublishedContent={content.hasPublishedContent}
        trackTitle={track.title}
        levelLabel={COURSE_LEVEL_LABELS[selection.level]}
      />
    </div>
  );
}
