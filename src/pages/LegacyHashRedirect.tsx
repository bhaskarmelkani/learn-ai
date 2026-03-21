/* eslint-disable react-refresh/only-export-components */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Reads window.location.hash on mount and redirects legacy
 * `#chapter-{n}-{slug}` URLs to `/courses/ai-fundamentals/{n}`.
 * Rendered at `/legacy-hash` but also called eagerly from main.tsx
 * via the redirect bootstrap below.
 */
export function LegacyHashRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    const match = hash.match(/^chapter-(\d+)/);
    if (match) {
      navigate(`/courses/ai-fundamentals/${match[1]}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return null;
}

/**
 * Call once at app startup (before routes render) to check for legacy
 * hash URLs and rewrite the browser location so the router picks up
 * the correct path.
 */
export function applyLegacyHashRedirect() {
  if (typeof window === "undefined") return;
  const hash = window.location.hash.replace(/^#/, "");
  const match = hash.match(/^chapter-(\d+)/);
  if (match) {
    const newPath = `/courses/ai-fundamentals/${match[1]}`;
    window.history.replaceState(null, "", newPath);
  }
}
