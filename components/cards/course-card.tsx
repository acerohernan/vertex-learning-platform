import type { ReactNode } from "react";
import {
  Book,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Folder,
} from "lucide-react";
import { cn } from "@/lib/cn";

type CourseMetaProps = {
  level: string;
  duration: string;
  modules: string;
  featured?: boolean;
};

function CourseMeta({
  level,
  duration,
  modules,
  featured = false,
}: CourseMetaProps) {
  const iconClass = featured ? "h-3 w-3" : "h-3 w-3";
  const ModuleIcon = featured ? Book : Folder;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-y-1 font-medium",
        featured
          ? "gap-x-4 text-[9.5px] leading-5 text-neutral-700"
          : "gap-x-3 text-[11px] text-neutral-500",
      )}
    >
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        <ChartNoAxesColumnIncreasing
          aria-hidden="true"
          strokeWidth={1.8}
          className={cn(iconClass, "text-neutral-700")}
        />
        {level}
      </span>
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        <Clock3
          aria-hidden="true"
          strokeWidth={1.8}
          className={cn(iconClass, "text-neutral-700")}
        />
        {duration}
      </span>
      <span className="inline-flex items-center gap-1 whitespace-nowrap">
        <ModuleIcon
          aria-hidden="true"
          strokeWidth={1.8}
          className={cn(iconClass, "text-neutral-700")}
        />
        {modules}
      </span>
    </div>
  );
}

function DefaultMark({ featured = false }: { featured?: boolean }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[10px] bg-neutral-900 text-white",
        featured ? "h-[84px] w-[84px]" : "h-12 w-12",
      )}
    >
      <span
        className={cn(
          "font-extrabold italic leading-none tracking-[-0.08em]",
          featured ? "text-[52px]" : "text-2xl",
        )}
      >
        N
      </span>
    </div>
  );
}

export function CourseCard({
  title,
  description,
  level,
  duration,
  modules,
  mark,
  variant = "compact",
  className,
}: {
  title: string;
  description: string;
  level: string;
  duration: string;
  modules: string;
  mark?: ReactNode;
  variant?: "compact" | "featured";
  className?: string;
}) {
  const featured = variant === "featured";

  if (featured) {
    return (
      <article
        className={cn(
          "flex h-full flex-col rounded-xl border border-line bg-surface p-6 sm:min-h-[380px]",
          className,
        )}
      >
        <div className="h-[84px] w-[84px] shrink-0">
          {mark ?? <DefaultMark featured />}
        </div>

        <h3 className="mt-7 font-display text-[21px] font-semibold leading-[1.25] text-neutral-900">
          {title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.55] text-neutral-500">
          {description}
        </p>

        <div className="mt-auto border-t border-line pt-5">
          <CourseMeta
            level={level}
            duration={duration}
            modules={modules}
            featured
          />
        </div>
      </article>
    );
  }

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

      <div className="mt-auto pt-5">
        <CourseMeta level={level} duration={duration} modules={modules} />
      </div>
    </article>
  );
}
