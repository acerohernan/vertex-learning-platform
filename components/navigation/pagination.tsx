import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

type PageItem = number | "ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: PageItem[] = [];
  const visible = new Set([1, 2, currentPage, totalPages]);

  if (currentPage > 1) visible.add(currentPage - 1);
  if (currentPage < totalPages) visible.add(currentPage + 1);

  const pages = [...visible]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  pages.forEach((page, index) => {
    if (index > 0 && page - pages[index - 1] > 1) {
      items.push("ellipsis");
    }
    items.push(page);
  });

  return items;
}

export function Pagination({
  currentPage = 1,
  totalPages = 8,
  className,
}: {
  currentPage?: number;
  totalPages?: number;
  className?: string;
}) {
  const items = getPageItems(currentPage, totalPages);

  const navButton =
    "inline-flex h-7 w-7 items-center justify-center rounded-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-primary-200";

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button
        type="button"
        aria-label="Previous page"
        disabled={currentPage === 1}
        className={cn(navButton, "disabled:pointer-events-none disabled:opacity-40")}
      >
        <ChevronLeft aria-hidden="true" strokeWidth={1.8} className="h-3.5 w-3.5" />
      </button>

      {items.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            aria-hidden="true"
            className="inline-flex h-7 w-7 items-center justify-center text-neutral-500"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </span>
        ) : (
          <button
            key={item}
            type="button"
            aria-label={`Page ${item}`}
            aria-current={item === currentPage ? "page" : undefined}
            className={cn(
              "inline-flex h-7 min-w-7 items-center justify-center rounded-sm px-1 text-[11px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primary-200 xl:text-xs",
              item === currentPage
                ? "border border-primary-300 bg-primary-100/50 text-primary-600"
                : "text-neutral-700 hover:bg-neutral-100",
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        className={cn(navButton, "disabled:pointer-events-none disabled:opacity-40")}
      >
        <ChevronRight aria-hidden="true" strokeWidth={1.8} className="h-3.5 w-3.5" />
      </button>
    </nav>
  );
}
