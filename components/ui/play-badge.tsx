import { cn } from "@/lib/cn";

type PlayBadgeProps = {
  className?: string;
};

export function PlayBadge({ className }: PlayBadgeProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn("h-[18px] w-[18px] text-primary-500", className)}
    >
      <circle cx="10" cy="10" r="8.4" fill="currentColor" />
      <path d="M8.1 6.6 13.4 10l-5.3 3.4V6.6Z" fill="white" />
      <circle
        cx="10"
        cy="10"
        r="9.1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.35"
      />
    </svg>
  );
}
