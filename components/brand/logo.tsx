import { cn } from "@/lib/cn";

type VertexMarkProps = {
  className?: string;
};

export function VertexMark({ className }: VertexMarkProps) {
  return (
    <svg
      viewBox="0 0 28 26"
      fill="none"
      aria-hidden="true"
      className={cn(className)}
    >
      <path
        d="M3 2.2h6.25l4.1 12.65L17.55 2.2H24.6l-9.55 20.35c-.45.96-1.82.96-2.27 0L3 2.2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type VertexLogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  wordmark?: boolean;
  tone?: "primary" | "accent";
};

export function VertexLogo({
  className,
  markClassName,
  wordmarkClassName,
  wordmark = true,
  tone = "primary",
}: VertexLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5",
        tone === "accent" ? "text-accent-500" : "text-primary-500",
        className,
      )}
    >
      <VertexMark className={cn("h-8 w-auto", markClassName)} />
      {wordmark ? (
        <span
          className={cn(
            "text-[22px] font-semibold leading-none tracking-[-0.03em] text-neutral-900",
            wordmarkClassName,
          )}
        >
          Vertex
        </span>
      ) : null}
    </span>
  );
}
