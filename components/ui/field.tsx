import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const fieldStyles =
  "h-11 w-full rounded-md border border-neutral-200 bg-surface text-sm text-neutral-900 shadow-[0_1px_1px_rgba(15,23,42,0.02)] outline-none transition-[border-color,box-shadow] placeholder:text-neutral-500 focus:border-primary-400 focus:ring-2 focus:ring-primary-100";

export function SearchField({
  placeholder = "Search anything...",
  shortcut = "⌘ K",
  className,
  inputClassName,
}: {
  placeholder?: string;
  shortcut?: string | null;
  className?: string;
  inputClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden="true"
        strokeWidth={2}
        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-neutral-500"
      />
      <input
        type="search"
        aria-label="Search"
        placeholder={placeholder}
        className={cn(fieldStyles, "pl-10 pr-16", inputClassName)}
      />
      {shortcut ? (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-neutral-200 bg-neutral-50 px-1.5 py-0.5 font-sans text-[10px] font-medium leading-4 text-neutral-500">
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
