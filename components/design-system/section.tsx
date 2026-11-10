import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "min-w-0 rounded-lg border border-line bg-surface shadow-sm",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHeading({
  number,
  title,
  className,
}: {
  number: string;
  title: string;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "flex items-baseline gap-3 text-xs font-semibold uppercase leading-none tracking-[0.16em] text-neutral-900",
        className,
      )}
    >
      <span className="tabular-nums text-primary-500">{number}</span>
      <span>{title}</span>
    </h2>
  );
}

export function Caption({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "text-xs font-semibold leading-4 text-neutral-900",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function SpecList({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "space-y-1.5 text-xs leading-[1.5] text-neutral-500",
        className,
      )}
    >
      {items.map((item, index) => (
        <li key={index} className="flex gap-2">
          <span
            aria-hidden="true"
            className="mt-[0.45em] h-[3px] w-[3px] shrink-0 rounded-full bg-neutral-500"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
