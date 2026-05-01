import { type ReactNode } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Lightbulb,
  Link2,
} from "lucide-react";

const icons = {
  idea: <Lightbulb className="h-4 w-4 text-violet-500" />,
  tip: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  note: <FileText className="h-4 w-4 text-blue-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  analogy: <Link2 className="h-4 w-4 text-cyan-500" />,
};

const styles = {
  idea: {
    border: "border-violet-200 dark:border-violet-500/20",
    bg: "bg-violet-50/80 dark:bg-violet-500/10",
    label: "Key Idea",
  },
  tip: {
    border: "border-emerald-200 dark:border-emerald-500/20",
    bg: "bg-emerald-50/80 dark:bg-emerald-500/10",
    label: "Tip",
  },
  note: {
    border: "border-blue-200 dark:border-blue-500/20",
    bg: "bg-blue-50/80 dark:bg-blue-500/10",
    label: "Note",
  },
  warning: {
    border: "border-amber-200 dark:border-amber-500/20",
    bg: "bg-amber-50/80 dark:bg-amber-500/10",
    label: "Warning",
  },
  analogy: {
    border: "border-cyan-200 dark:border-cyan-500/20",
    bg: "bg-cyan-50/80 dark:bg-cyan-500/10",
    label: "Analogy",
  },
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
    <div
      className={`my-7 rounded-[1.35rem] border ${s.border} ${s.bg} p-5 shadow-sm`}
    >
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-600 dark:text-gray-300">
        {icons[type]} {title ?? s.label}
      </div>
      <div className="text-sm leading-7 text-stone-700 dark:text-gray-200 [&>p]:my-1">
        {children}
      </div>
    </div>
  );
}
