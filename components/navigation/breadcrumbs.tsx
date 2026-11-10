import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type Crumb = {
  label: string;
  href: string;
};

export function Breadcrumbs({
  items,
  className,
}: {
  items: Crumb[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-medium leading-4 text-neutral-500 xl:text-xs">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="h-3 w-3 shrink-0 text-neutral-300"
                />
              ) : null}
              <Link
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap rounded-sm transition-colors hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary-200",
                  isCurrent ? "text-neutral-700" : "text-neutral-500",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
