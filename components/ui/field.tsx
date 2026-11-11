import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const fieldStyles =
  "h-11 w-full rounded-md border border-neutral-200 bg-surface text-sm text-neutral-900 shadow-[0_1px_1px_rgba(15,23,42,0.02)] outline-none transition-[border-color,box-shadow] placeholder:text-neutral-500 focus:border-primary-400 focus:ring-2 focus:ring-primary-100";

type SearchFieldSize = "md" | "lg";

export function SearchField({
  placeholder = "Search anything...",
  shortcut = "⌘ K",
  className,
  inputClassName,
  size = "md",
  name,
  defaultValue,
  id,
  ariaLabel = "Search",
}: {
  placeholder?: string;
  shortcut?: string | null;
  className?: string;
  inputClassName?: string;
  size?: SearchFieldSize;
  name?: string;
  defaultValue?: string;
  id?: string;
  ariaLabel?: string;
}) {
  const isLarge = size === "lg";

  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden="true"
        strokeWidth={isLarge ? 1.8 : 2}
        className={cn(
          "pointer-events-none absolute top-1/2 -translate-y-1/2 text-neutral-500",
          isLarge ? "left-6 h-[26px] w-[26px]" : "left-3.5 h-[18px] w-[18px]",
        )}
      />
      <input
        id={id}
        name={name}
        defaultValue={defaultValue}
        type="search"
        aria-label={ariaLabel}
        placeholder={placeholder}
        enterKeyHint="search"
        className={cn(
          "w-full border bg-surface text-neutral-900 outline-none transition-[border-color,box-shadow] placeholder:text-neutral-500",
          isLarge
            ? "h-16 rounded-xl border-line pl-[60px] pr-24 text-base shadow-[0_2px_8px_rgba(120,80,60,0.06)] focus:border-accent-400 focus:ring-2 focus:ring-accent-100 sm:h-[84px] sm:pl-[68px] sm:text-[19px]"
            : "h-11 rounded-md border-neutral-200 pl-10 pr-16 text-sm shadow-[0_1px_1px_rgba(15,23,42,0.02)] focus:border-primary-400 focus:ring-2 focus:ring-primary-100",
          inputClassName,
        )}
      />
      {shortcut ? (
        <kbd
          className={cn(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded border bg-surface font-sans font-medium text-neutral-500",
            isLarge
              ? "right-4 h-11 min-w-[52px] px-3 text-[13px]"
              : "right-2.5 border-neutral-200 bg-neutral-50 px-1.5 py-0.5 text-[10px] leading-4",
            isLarge && "border-line",
          )}
        >
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  options,
  value,
  className,
  id = "design-system-select",
}: {
  label?: string;
  options: string[];
  value?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {label ? (
        <label
          htmlFor={id}
          className="mb-2 block text-xs font-semibold text-neutral-700"
        >
          {label}
        </label>
      ) : null}
      <select
        id={id}
        defaultValue={value ?? options[0]}
        className={cn(
          fieldStyles,
          "cursor-pointer appearance-none px-4 pr-10 font-medium",
        )}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        strokeWidth={1.8}
        className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 text-neutral-500"
      />
    </div>
  );
}
