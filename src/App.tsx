import { useState, useCallback, useRef, useEffect } from "react";
import { chapters } from "./chapters";
import { Sidebar } from "./components/Sidebar";
import { SlideView } from "./components/SlideView";
import { NavigationBar } from "./components/NavigationBar";
import { useKeyboardNav } from "./hooks/useKeyboardNav";

export default function App() {
  const [current, setCurrent] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [dark, setDark] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const goTo = useCallback(
    (i: number) => {
      if (i >= 0 && i < chapters.length) setCurrent(i);
    },
    []
  );

  const onNext = useCallback(() => goTo(current + 1), [current, goTo]);
  const onPrev = useCallback(() => goTo(current - 1), [current, goTo]);
  const onToggleSidebar = useCallback(() => setSidebarVisible((v) => !v), []);

  useKeyboardNav({ onNext, onPrev, onToggleSidebar });

  // Scroll to top on chapter change
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0);
  }, [current]);

  const chapter = chapters[current];

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-gray-950">
      <Sidebar
        chapters={chapters}
        current={current}
        onSelect={goTo}
        visible={sidebarVisible}
        dark={dark}
        onToggleTheme={() => setDark((d) => !d)}
      />
      <main
        ref={contentRef}
        className={`flex-1 overflow-y-auto transition-[margin] duration-200 ${
          sidebarVisible ? "ml-72" : "ml-0"
        }`}
      >
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
      />
    </div>
  );
}
