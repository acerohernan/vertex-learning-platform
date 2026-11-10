import type { ReactNode } from "react";
import { ChartNoAxesColumnIncreasing, Clock3, Folder } from "lucide-react";
import { cn } from "@/lib/cn";

export function CourseCard({
  title,
  description,
  level,
  duration,
  modules,
  mark,
  className,
}: {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  mark?: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-md border border-neutral-200 bg-surface p-4",
        className,
      )}
    >
      <div className="flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] bg-neutral-900 text-white">
          {mark ?? (
            <span className="text-2xl font-extrabold italic leading-none tracking-[-0.08em]">
              N
            </span>
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-5 text-neutral-900">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-[1.55] text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-[11px] font-medium text-neutral-500">
        <span className="inline-flex items-center gap-1">
          <ChartNoAxesColumnIncreasing
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-3 w-3 text-neutral-700"
          />
          {level}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-3 w-3 text-neutral-700"
          />
          {duration}
        </span>
        <span className="inline-flex items-center gap-1">
          <Folder
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-3 w-3 text-neutral-700"
          />
          {modules}
        </span>
      </div>
    </article>
  );
}
