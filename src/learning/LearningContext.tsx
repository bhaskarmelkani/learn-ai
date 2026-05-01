/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CourseSlug } from "../courses/types";

/* ------------------------------------------------------------------ */
/*  Public types                                                       */
/* ------------------------------------------------------------------ */

export type AudienceTrack = "conceptual" | "builder";

export type CheckpointState = {
  chapter: number;
  prompt: string;
  concepts: string[];
  correct: boolean;
  attempts: number;
  misses: number;
  explanation?: string;
};

export type CourseProgress = {
  checkpoints: Record<string, CheckpointState>;
  reviewedChapters: Record<number, boolean>;
  lastChapter: number;
  lastVisitedAt?: string;
};

export type LearningStateV3 = {
  track: AudienceTrack;
  guidedMode: boolean;
  courseProgress: Record<CourseSlug, CourseProgress>;
};

export type RecordCheckpointInput = {
  id: string;
  courseSlug: CourseSlug;
  chapter: number;
  prompt: string;
  concepts: string[];
  correct: boolean;
  explanation?: string;
};

type LearningContextValue = {
  state: LearningStateV3;
  setTrack: (track: AudienceTrack) => void;
  setGuidedMode: (guidedMode: boolean) => void;
  recordCheckpoint: (input: RecordCheckpointInput) => void;
  markChapterReviewed: (courseSlug: CourseSlug, chapter: number) => void;
  setLastChapter: (courseSlug: CourseSlug, chapter: number) => void;
  getCourseProgress: (courseSlug: CourseSlug) => CourseProgress;
  masterySummary: (courseSlug: CourseSlug) => {
    completedChecks: number;
    attemptedChecks: number;
    reviewedChapters: number;
  };
  reviewQueue: (
    courseSlug: CourseSlug,
  ) => Array<{ concept: string; misses: number; chapter: number }>;

  /* Back-compat: flat accessors scoped to the "active" course.
     These let existing MDX consumers and Sidebar keep working without
     knowing about course slugs until they are individually migrated. */
  activeCourseSlug: CourseSlug;
  setActiveCourseSlug: (slug: CourseSlug) => void;

  /** @deprecated Use state.courseProgress[slug].reviewedChapters */
  reviewedChapters: Record<number, boolean>;
  /** @deprecated Use state.courseProgress[slug].checkpoints */
  checkpoints: Record<string, CheckpointState>;
};

/* ------------------------------------------------------------------ */
/*  Storage & migration                                                */
/* ------------------------------------------------------------------ */

const STORAGE_KEY_V2 = "learn-ai-learning-state-v2";
const STORAGE_KEY = "learn-ai-learning-state-v3";
const DEFAULT_COURSE = "ai-fundamentals";

const EMPTY_COURSE_PROGRESS: CourseProgress = {
  checkpoints: {},
  reviewedChapters: {},
  lastChapter: 1,
};

const DEFAULT_STATE: LearningStateV3 = {
  track: "conceptual",
  guidedMode: true,
  courseProgress: {},
};

interface LearningStateV2 {
  track?: AudienceTrack | string;
  guidedMode?: boolean;
  checkpoints?: Record<string, CheckpointState>;
  reviewedChapters?: Record<number, boolean>;
}

function migrateV2toV3(v2: LearningStateV2): LearningStateV3 {
  return {
    track: v2.track === "builder" ? "builder" : "conceptual",
    guidedMode: typeof v2.guidedMode === "boolean" ? v2.guidedMode : true,
    courseProgress: {
      [DEFAULT_COURSE]: {
        checkpoints: v2.checkpoints ?? {},
        reviewedChapters: v2.reviewedChapters ?? {},
        lastChapter: 1,
      },
    },
  };
}

function loadInitialState(): LearningStateV3 {
  if (typeof window === "undefined") return DEFAULT_STATE;

  try {
    // Try v3 first
    const rawV3 = window.localStorage.getItem(STORAGE_KEY);
    if (rawV3) {
      const parsed = JSON.parse(rawV3) as Partial<LearningStateV3>;
      return {
        track: parsed.track === "builder" ? "builder" : "conceptual",
        guidedMode:
          typeof parsed.guidedMode === "boolean"
            ? parsed.guidedMode
            : DEFAULT_STATE.guidedMode,
        courseProgress: parsed.courseProgress ?? {},
      };
    }

    // Migrate from v2
    const rawV2 = window.localStorage.getItem(STORAGE_KEY_V2);
    if (rawV2) {
      const v2 = JSON.parse(rawV2) as LearningStateV2;
      const v3 = migrateV2toV3(v2);
      // Persist v3 immediately and clean up v2
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v3));
      window.localStorage.removeItem(STORAGE_KEY_V2);
      return v3;
    }
  } catch {
    /* corrupted storage — start fresh */
  }

  return DEFAULT_STATE;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TRACK_LABELS: Record<AudienceTrack, string> = {
  conceptual: "Conceptual",
  builder: "Builder",
};

export function getTrackLabel(track: AudienceTrack) {
  return TRACK_LABELS[track];
}

function getProgress(
  state: LearningStateV3,
  slug: CourseSlug,
): CourseProgress {
  return state.courseProgress[slug] ?? EMPTY_COURSE_PROGRESS;
}

function computeMastery(cp: CourseProgress) {
  const checks = Object.values(cp.checkpoints);
  return {
    completedChecks: checks.filter((c) => c.correct).length,
    attemptedChecks: checks.length,
    reviewedChapters: Object.values(cp.reviewedChapters).filter(Boolean).length,
  };
}

function computeReviewQueue(cp: CourseProgress) {
  const byConcept = new Map<string, { misses: number; chapter: number }>();

  for (const checkpoint of Object.values(cp.checkpoints)) {
    if (checkpoint.misses === 0) continue;
    for (const concept of checkpoint.concepts) {
      const existing = byConcept.get(concept);
      if (!existing) {
        byConcept.set(concept, {
          misses: checkpoint.misses,
          chapter: checkpoint.chapter,
        });
      } else {
        byConcept.set(concept, {
          misses: existing.misses + checkpoint.misses,
          chapter: Math.max(existing.chapter, checkpoint.chapter),
        });
      }
    }
  }

  return Array.from(byConcept.entries())
    .map(([concept, v]) => ({ concept, misses: v.misses, chapter: v.chapter }))
    .sort((a, b) => b.misses - a.misses || a.chapter - b.chapter);
}

/* ------------------------------------------------------------------ */
/*  Context + Provider                                                 */
/* ------------------------------------------------------------------ */

const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningStateV3>(loadInitialState);
  const [activeCourseSlug, setActiveCourseSlug] =
    useState<CourseSlug>(DEFAULT_COURSE);

  // Persist
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setTrack = useCallback((track: AudienceTrack) => {
    setState((s) => ({ ...s, track }));
  }, []);

  const setGuidedMode = useCallback((guidedMode: boolean) => {
    setState((s) => ({ ...s, guidedMode }));
  }, []);

  const getCourseProgress = useCallback(
    (slug: CourseSlug) => getProgress(state, slug),
    [state],
  );

  const recordCheckpoint = useCallback((input: RecordCheckpointInput) => {
    setState((s) => {
      const cp = s.courseProgress[input.courseSlug] ?? {
        ...EMPTY_COURSE_PROGRESS,
      };
      const prev = cp.checkpoints[input.id];
      return {
        ...s,
        courseProgress: {
          ...s.courseProgress,
          [input.courseSlug]: {
            ...cp,
            checkpoints: {
              ...cp.checkpoints,
              [input.id]: {
                chapter: input.chapter,
                prompt: input.prompt,
                concepts: input.concepts,
                explanation: input.explanation,
                attempts: (prev?.attempts ?? 0) + 1,
                misses: (prev?.misses ?? 0) + (input.correct ? 0 : 1),
                correct: input.correct,
              },
            },
          },
        },
      };
    });
  }, []);

  const markChapterReviewed = useCallback(
    (slug: CourseSlug, chapter: number) => {
      setState((s) => {
        const cp = s.courseProgress[slug] ?? { ...EMPTY_COURSE_PROGRESS };
        return {
          ...s,
          courseProgress: {
            ...s.courseProgress,
            [slug]: {
              ...cp,
              reviewedChapters: { ...cp.reviewedChapters, [chapter]: true },
            },
          },
        };
      });
    },
    [],
  );

  const setLastChapter = useCallback(
    (slug: CourseSlug, chapter: number) => {
      setState((s) => {
        const cp = s.courseProgress[slug] ?? { ...EMPTY_COURSE_PROGRESS };
        return {
          ...s,
          courseProgress: {
            ...s.courseProgress,
            [slug]: {
              ...cp,
              lastChapter: chapter,
              lastVisitedAt: new Date().toISOString(),
            },
          },
        };
      });
    },
    [],
  );

  const masterySummary = useCallback(
    (slug: CourseSlug) => computeMastery(getProgress(state, slug)),
    [state],
  );

  const reviewQueue = useCallback(
    (slug: CourseSlug) => computeReviewQueue(getProgress(state, slug)),
    [state],
  );

  // Back-compat flat accessors for the active course
  const activeProgress = getProgress(state, activeCourseSlug);

  const value = useMemo<LearningContextValue>(
    () => ({
      state,
      setTrack,
      setGuidedMode,
      recordCheckpoint,
      markChapterReviewed,
      setLastChapter,
      getCourseProgress,
      masterySummary,
      reviewQueue,
      activeCourseSlug,
      setActiveCourseSlug,
      reviewedChapters: activeProgress.reviewedChapters,
      checkpoints: activeProgress.checkpoints,
    }),
    [
      state,
      setTrack,
      setGuidedMode,
      recordCheckpoint,
      markChapterReviewed,
      setLastChapter,
      getCourseProgress,
      masterySummary,
      reviewQueue,
      activeCourseSlug,
      activeProgress.reviewedChapters,
      activeProgress.checkpoints,
    ],
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used inside LearningProvider.");
  }
  return context;
}

/** Convenience hook for course-scoped progress. */
export function useCourseProgress(courseSlug: CourseSlug) {
  const { getCourseProgress, masterySummary, reviewQueue } = useLearning();
  return {
    progress: getCourseProgress(courseSlug),
    mastery: masterySummary(courseSlug),
    reviewQueue: reviewQueue(courseSlug),
  };
}
