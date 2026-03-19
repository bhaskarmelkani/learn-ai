import type { Chapter } from "../chapters";

export function Sidebar({
  chapters,
  current,
  onSelect,
  visible,
  dark,
  onToggleTheme,
}: {
  chapters: Chapter[];
  current: number;
  onSelect: (i: number) => void;
  visible: boolean;
  dark: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <aside
      className={`fixed left-0 top-0 h-full w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col z-20 transition-transform duration-200 ${
        visible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Intuition Session
          </h1>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">For Engineers</p>
        </div>
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          {dark ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        {chapters.map((ch, i) => (
          <button
            key={ch.chapter}
            onClick={() => onSelect(i)}
            className={`w-full text-left px-6 py-3 text-sm transition-colors ${
              i === current
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-300 border-r-2 border-blue-500 dark:border-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/50"
            }`}
          >
            <span className="text-xs text-gray-400 dark:text-gray-600 mr-2">{String(ch.chapter).padStart(2, "0")}</span>
            {ch.title}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-400 dark:text-gray-600">
        Arrow keys to navigate &middot; Esc to toggle sidebar
      </div>
    </aside>
  );
}
