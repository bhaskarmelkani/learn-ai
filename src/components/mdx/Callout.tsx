import { type ReactNode } from "react";

function Icon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={`w-4 h-4 inline-block ${className ?? ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const icons = {
  idea: <Icon d="M9 18h6 M10 22h4 M12 2a7 7 0 0 1 4 12.7V17H8v-2.3A7 7 0 0 1 12 2z" className="text-purple-500" />,
  tip: <Icon d="M20 6L9 17l-5-5" className="text-green-500" />,
  note: <Icon d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" className="text-blue-500" />,
  warning: <Icon d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01" className="text-amber-500" />,
  analogy: <Icon d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71 M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" className="text-cyan-500" />,
};

const styles = {
  idea: { border: "border-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10", label: "Key Idea" },
  tip: { border: "border-green-500", bg: "bg-green-50 dark:bg-green-500/10", label: "Tip" },
  note: { border: "border-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10", label: "Note" },
  warning: { border: "border-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10", label: "Warning" },
  analogy: { border: "border-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-500/10", label: "Analogy" },
} as const;

type CalloutType = keyof typeof styles;

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const s = styles[type];
  return (
    <div className={`my-6 rounded-lg border-l-4 ${s.border} ${s.bg} p-4`}>
      <div className="font-semibold text-sm uppercase tracking-wide mb-1 text-gray-600 dark:text-gray-300 flex items-center gap-2">
        {icons[type]} {title ?? s.label}
      </div>
      <div className="text-gray-700 dark:text-gray-200 [&>p]:my-1">{children}</div>
    </div>
  );
}
