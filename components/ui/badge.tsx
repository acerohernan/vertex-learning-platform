import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "video" | "lesson" | "popular";

const toneStyles: Record<BadgeTone, string> = {
  video: "bg-primary-100 text-primary-600",
  lesson: "bg-indigo-100 text-indigo-600",
  popular: "bg-primary-100 text-primary-600",
};

export function Badge({
  tone = "video",
  children,
  className,
}: {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-1.5 text-[10px] font-bold uppercase leading-none tracking-[0.08em]",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
