import { useEffect } from "react";

export function useKeyboardNav({
  onNext,
  onPrev,
  onToggleSidebar,
}: {
  onNext: () => void;
  onPrev: () => void;
  onToggleSidebar: () => void;
}) {
  useEffect(() => {
    function handle(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "Escape") {
        onToggleSidebar();
      } else if (e.key === "f" && !e.metaKey && !e.ctrlKey) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
      }
    }
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onNext, onPrev, onToggleSidebar]);
}
