import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AudienceTrack = "conceptual" | "builder";

type CheckpointState = {
  chapter: number;
  prompt: string;
  concepts: string[];
  correct: boolean;
  attempts: number;
  misses: number;
  explanation?: string;
};

type LearningState = {
  track: AudienceTrack;
  guidedMode: boolean;
  checkpoints: Record<string, CheckpointState>;
  reviewedChapters: Record<number, boolean>;
};

type RecordCheckpointInput = {
  id: string;
  chapter: number;
  prompt: string;
  concepts: string[];
  correct: boolean;
  explanation?: string;
};

type LearningContextValue = {
  state: LearningState;
  setTrack: (track: AudienceTrack) => void;
  setGuidedMode: (guidedMode: boolean) => void;
  recordCheckpoint: (input: RecordCheckpointInput) => void;
  markChapterReviewed: (chapter: number) => void;
  masterySummary: {
    completedChecks: number;
    attemptedChecks: number;
    reviewedChapters: number;
  };
  reviewQueue: Array<{
    concept: string;
    misses: number;
    chapter: number;
  }>;
};

const STORAGE_KEY = "learn-ai-learning-state-v2";

const DEFAULT_STATE: LearningState = {
  track: "conceptual",
  guidedMode: true,
  checkpoints: {},
  reviewedChapters: {},
};

const TRACK_LABELS: Record<AudienceTrack, string> = {
  conceptual: "Conceptual",
  builder: "Builder",
};

const LearningContext = createContext<LearningContextValue | null>(null);

function loadInitialState(): LearningState {
  if (typeof window === "undefined") return DEFAULT_STATE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<LearningState>;
    return {
      // Old saved "educator" sessions now fall back to the simpler conceptual path.
      track: parsed.track === "builder" ? "builder" : DEFAULT_STATE.track,
      guidedMode:
        typeof parsed.guidedMode === "boolean" ? parsed.guidedMode : DEFAULT_STATE.guidedMode,
      checkpoints: parsed.checkpoints ?? {},
      reviewedChapters: parsed.reviewedChapters ?? {},
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function LearningProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearningState>(loadInitialState);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setTrack = useCallback((track: AudienceTrack) => {
    setState((current) => ({ ...current, track }));
  }, []);

  const setGuidedMode = useCallback((guidedMode: boolean) => {
    setState((current) => ({ ...current, guidedMode }));
  }, []);

  const recordCheckpoint = useCallback((input: RecordCheckpointInput) => {
    setState((current) => {
      const previous = current.checkpoints[input.id];
      return {
        ...current,
        checkpoints: {
          ...current.checkpoints,
          [input.id]: {
            chapter: input.chapter,
            prompt: input.prompt,
            concepts: input.concepts,
            explanation: input.explanation,
            attempts: (previous?.attempts ?? 0) + 1,
            misses: (previous?.misses ?? 0) + (input.correct ? 0 : 1),
            correct: input.correct,
          },
        },
      };
    });
  }, []);

  const markChapterReviewed = useCallback((chapter: number) => {
    setState((current) => ({
      ...current,
      reviewedChapters: {
        ...current.reviewedChapters,
        [chapter]: true,
      },
    }));
  }, []);

  const masterySummary = useMemo(() => {
    const checkpoints = Object.values(state.checkpoints);
    return {
      completedChecks: checkpoints.filter((checkpoint) => checkpoint.correct).length,
      attemptedChecks: checkpoints.length,
      reviewedChapters: Object.values(state.reviewedChapters).filter(Boolean).length,
    };
  }, [state.checkpoints, state.reviewedChapters]);

  const reviewQueue = useMemo(() => {
    const byConcept = new Map<string, { misses: number; chapter: number }>();

    Object.values(state.checkpoints).forEach((checkpoint) => {
      if (checkpoint.misses === 0) return;

      checkpoint.concepts.forEach((concept) => {
        const existing = byConcept.get(concept);
        if (!existing) {
          byConcept.set(concept, { misses: checkpoint.misses, chapter: checkpoint.chapter });
          return;
        }

        byConcept.set(concept, {
          misses: existing.misses + checkpoint.misses,
          chapter: Math.max(existing.chapter, checkpoint.chapter),
        });
      });
    });

    return Array.from(byConcept.entries())
      .map(([concept, value]) => ({
        concept,
        misses: value.misses,
        chapter: value.chapter,
      }))
      .sort((a, b) => b.misses - a.misses || a.chapter - b.chapter);
  }, [state.checkpoints]);

  const value = useMemo(
    () => ({
      state,
      setTrack,
      setGuidedMode,
      recordCheckpoint,
      markChapterReviewed,
      masterySummary,
      reviewQueue,
    }),
    [
      markChapterReviewed,
      masterySummary,
      recordCheckpoint,
      reviewQueue,
      setGuidedMode,
      setTrack,
      state,
    ]
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error("useLearning must be used inside LearningProvider.");
  }
  return context;
}

export function getTrackLabel(track: AudienceTrack) {
  return TRACK_LABELS[track];
}
