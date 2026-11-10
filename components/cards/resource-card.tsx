import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { cn } from "@/lib/cn";

export function ResourceCard({
  title,
  description,
  format,
  size,
  href = "#",
  className,
}: {
  title: string;
  description: string;
  format: string;
  size: string;
  href?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-md border border-neutral-200 bg-surface p-4",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <FileText
          aria-hidden="true"
          strokeWidth={1.45}
          className="mt-0.5 h-8 w-8 shrink-0 text-neutral-900"
        />
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-5 text-neutral-900">
            {title}
          </h3>
          <p className="mt-1 text-xs leading-[1.55] text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-end justify-between gap-3 pt-5">
        <p className="text-[11px] font-medium leading-4 text-neutral-500">
          {format} <span className="px-1 text-neutral-300">·</span> {size}
        </p>
        <Link
          href={href}
          aria-label={`Open ${title}`}
          className="inline-flex h-5 w-5 items-center justify-center rounded-sm text-primary-600 transition-colors hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-200"
        >
          <ExternalLink
            aria-hidden="true"
            strokeWidth={1.8}
            className="h-4 w-4"
          />
        </Link>
      </div>
    </article>
  );
}
