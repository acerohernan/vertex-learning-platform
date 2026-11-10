import { Check, Lock } from "lucide-react";
import { PlayBadge } from "@/components/ui/play-badge";
import { cn } from "@/lib/cn";

export type StatusKind = "in-progress" | "completed" | "now-playing" | "locked";

const labels: Record<StatusKind, string> = {
  "in-progress": "In Progress",
  completed: "Completed",
  "now-playing": "Now Playing",
  locked: "Locked",
};

function InProgressIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="h-4 w-4 text-primary-500"
    >
      <circle
        cx="10"
        cy="10"
        r="7.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="34 12"
        transform="rotate(-55 10 10)"
      />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
      <Check aria-hidden="true" className="h-2.5 w-2.5" strokeWidth={3} />
    </span>
  );
}

export function StatusIndicator({
  status,
  className,
  label,
}: {
  status: StatusKind;
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium leading-4 text-neutral-700",
        className,
      )}
    >
      {status === "in-progress" ? <InProgressIcon /> : null}
      {status === "completed" ? <CompletedIcon /> : null}
      {status === "now-playing" ? (
        <PlayBadge className="h-4 w-4" />
      ) : null}
      {status === "locked" ? (
        <Lock
          aria-hidden="true"
          strokeWidth={1.8}
          className="h-4 w-4 text-neutral-900"
        />
      ) : null}
      <span>{label ?? labels[status]}</span>
    </span>
  );
}
