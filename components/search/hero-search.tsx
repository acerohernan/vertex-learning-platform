"use client";

import { useEffect, useRef } from "react";
import { SearchField } from "@/components/ui/field";

export function HeroSearch() {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        formRef.current
          ?.querySelector<HTMLInputElement>('input[name="q"]')
          ?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <form
      ref={formRef}
      action="/search"
      method="get"
      role="search"
      aria-label="Search your learning"
      className="w-full"
    >
      <SearchField
        name="q"
        size="lg"
        ariaLabel="Search your learning"
        placeholder="Ask anything about your learning..."
        shortcut="⌘ K"
      />
    </form>
  );
}
