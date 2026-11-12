import Link from "next/link";
import { Bell } from "lucide-react";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { VertexLogo } from "@/components/brand/logo";

const navItems = [
  { label: "Courses", href: "/courses" },
  { label: "My Learning", href: "/my-learning" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="flex flex-wrap items-center gap-y-3 px-5 py-3 sm:px-8 sm:py-4 lg:h-[98px] lg:flex-nowrap lg:gap-y-0 lg:py-0">
        <Link
          href="/"
          aria-label="Vertex home"
          className="rounded-sm focus-visible:ring-2 focus-visible:ring-accent-200 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <VertexLogo
            tone="accent"
            markClassName="h-7 lg:h-8"
            wordmarkClassName="text-[22px] lg:text-[26px]"
            className="gap-2.5"
          />
        </Link>

        <nav
          aria-label="Primary"
          className="order-3 w-full border-t border-line pt-3 lg:order-none lg:ml-12 lg:w-auto lg:border-0 lg:pt-0"
        >
          <ul className="flex items-center gap-7 lg:gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="rounded-sm text-[15px] font-medium leading-5 text-neutral-900 transition-colors hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="order-2 ml-auto flex items-center gap-3 lg:order-none lg:gap-6">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2.5 text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-accent-200"
          >
            <Bell
              aria-hidden="true"
              strokeWidth={1.7}
              className="h-[22px] w-[22px]"
            />
          </button>
          <Suspense>
            <Show when="signed-out">
              <SignInButton>
                <button
                  type="button"
                  className="rounded-sm px-4 py-2 text-[15px] font-medium text-neutral-700 transition-colors hover:text-accent-600 focus-visible:ring-2 focus-visible:ring-accent-200"
                >
                  Sign in
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  type="button"
                  className="rounded-sm bg-accent-600 px-4 py-2 text-[15px] font-medium text-white transition-colors hover:bg-accent-700 focus-visible:ring-2 focus-visible:ring-accent-200"
                >
                  Sign up
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <UserButton />
            </Show>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
