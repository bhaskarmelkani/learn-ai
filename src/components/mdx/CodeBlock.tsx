import type { HTMLAttributes, ReactNode } from "react";

export function Pre({ children, ...props }: HTMLAttributes<HTMLPreElement> & { children?: ReactNode }) {
  return (
    <div className="relative my-4 group">
      <pre {...props} className="rounded-lg border border-gray-700 bg-[#22272e] p-4 text-sm leading-relaxed overflow-x-auto">
        {children}
      </pre>
    </div>
  );
}
