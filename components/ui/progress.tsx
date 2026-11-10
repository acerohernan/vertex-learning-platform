import { cn } from "@/lib/cn";

export function ProgressBar({
  value,
  showLabel = true,
  className,
  barClassName,
}: {
  value: number;
  showLabel?: boolean;
  className?: string;
  barClassName?: string;
}) {
  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={boundedValue}
        aria-label={`${boundedValue}% complete`}
        className={cn(
          "h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-neutral-200",
          barClassName,
        )}
      >
        <div
          className="h-full rounded-full bg-primary-500 transition-[width] duration-500"
          style={{ width: `${boundedValue}%` }}
        />
      </div>
      {showLabel ? (
        <p className="shrink-0 text-xs leading-4 text-neutral-500">
          <span className="font-semibold text-neutral-900">
            {boundedValue}%
          </span>{" "}
          complete
        </p>
      ) : null}
    </div>
  );
}
