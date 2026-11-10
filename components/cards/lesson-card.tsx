import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PlayBadge } from "@/components/ui/play-badge";
import { cn } from "@/lib/cn";

type CardShellProps = {
  badge: "video" | "lesson";
  title: string;
  description: string;
  footer: string;
  actionLabel: string;
  actionHref: string;
  icon: "play" | "external";
  className?: string;
};

function LessonCardShell({
  badge,
  title,
  description,
  footer,
  actionLabel,
  actionHref,
  icon,
  className,
}: CardShellProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-md border border-neutral-200 bg-surface p-4",
        className,
      )}
    >
      <Badge tone={badge}>{badge}</Badge>
      <h3 className="mt-2.5 text-sm font-semibold leading-5 text-neutral-900">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-[1.55] text-neutral-500">
        {description}
      </p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <p className="text-[11px] font-medium leading-4 text-neutral-500">
          {footer}
        </p>
        <Link
          href={actionHref}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-sm text-xs font-medium leading-4 text-primary-600 transition-colors hover:text-primary-700 focus-visible:ring-2 focus-visible:ring-primary-200"
        >
          {actionLabel}
          {icon === "play" ? (
            <PlayBadge className="h-4 w-4" />
          ) : (
            <ExternalLink
              aria-hidden="true"
              strokeWidth={1.8}
              className="h-3.5 w-3.5"
            />
          )}
        </Link>
      </div>
    </article>
  );
}

export function LessonVideoCard({
  title,
  description,
  lessonLabel,
  duration,
  timestamp,
  href = "#",
  className,
}: {
  title: string;
  description: string;
  lessonLabel: string;
  duration: string;
  timestamp: string;
  href?: string;
  className?: string;
}) {
  return (
    <LessonCardShell
      badge="video"
      title={title}
      description={description}
      footer={`${lessonLabel} · ${duration}`}
      actionLabel={`Watch from ${timestamp}`}
      actionHref={href}
      icon="play"
      className={className}
    />
  );
}

export function LessonTopicCard({
  title,
  description,
  moduleLabel,
  href = "#",
  className,
}: {
  title: string;
  description: string;
  moduleLabel: string;
  href?: string;
  className?: string;
}) {
  return (
    <LessonCardShell
      badge="lesson"
      title={title}
      description={description}
      footer={moduleLabel}
      actionLabel="View lesson"
      actionHref={href}
      icon="external"
      className={className}
    />
  );
}
