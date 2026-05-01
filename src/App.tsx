import { Routes, Route, Navigate } from "react-router-dom";
import { useLearning } from "./learning/LearningContext";
import { WelcomeScreen, useOnboarding } from "./components/WelcomeScreen";
import { CatalogPage } from "./pages/CatalogPage";
import { CourseReader } from "./pages/CourseReader";
import { LegacyHashRedirect } from "./pages/LegacyHashRedirect";

export default function App() {
  const {
    state: { track, guidedMode },
    setTrack,
    setGuidedMode,
  } = useLearning();
  const { onboarded, completeOnboarding } = useOnboarding();

  if (!onboarded) {
    return (
      <WelcomeScreen
        track={track}
        onSelectTrack={setTrack}
        guidedMode={guidedMode}
        onToggleGuidedMode={() => setGuidedMode(!guidedMode)}
        onStart={completeOnboarding}
      />
    );
  }

  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route
        path="/courses/:courseSlug/:chapterNumber?"
        element={<CourseReader />}
      />
      {/* Legacy hash redirect — handles #chapter-N-slug on first load */}
      <Route path="/legacy-hash" element={<LegacyHashRedirect />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
