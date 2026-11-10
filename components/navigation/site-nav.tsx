import Link from "next/link";
import { VertexLogo } from "@/components/brand/logo";
import { cn } from "@/lib/cn";

export type NavItem = {
  label: string;
  href: string;
  active?: boolean;
};

export function SiteNav({
  items = [
    { label: "Courses", href: "#courses", active: true },
    { label: "My Learning", href: "#my-learning" },
  ],
  className,
}: {
  items?: NavItem[];
  className?: string;
}) {
  return (
    <nav
      aria-label="Primary"
      className={cn("flex items-center gap-6 lg:gap-10", className)}
    >
      <Link
        href="/design-system"
        aria-label="Vertex home"
        className="shrink-0 rounded-sm focus-visible:ring-2 focus-visible:ring-primary-200"
      >
        <VertexLogo
          markClassName="h-6"
          wordmarkClassName="text-lg font-semibold"
          className="gap-2"
        />
      </Link>

      <ul className="flex items-center gap-5 lg:gap-7">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-sm text-[11px] font-medium leading-4 transition-colors focus-visible:ring-2 focus-visible:ring-primary-200 xl:text-xs",
                item.active
                  ? "text-primary-500"
                  : "text-neutral-700 hover:text-neutral-900",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
