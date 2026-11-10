import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "md" | "lg";
export type ButtonState = "default" | "hover" | "disabled";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none";

const variantStyles: Record<
  ButtonVariant,
  Record<ButtonState, string>
> = {
  primary: {
    default: "bg-primary-500 text-white hover:bg-primary-600",
    hover: "bg-primary-600 text-white",
    disabled: "bg-primary-100 text-primary-300",
  },
  secondary: {
    default:
      "border border-primary-400 bg-surface text-primary-600 hover:border-primary-500 hover:bg-primary-100/40 hover:text-primary-700",
    hover: "border border-primary-500 bg-primary-100/40 text-primary-700",
    disabled: "border border-primary-200 bg-surface text-primary-300",
  },
  tertiary: {
    default:
      "border border-neutral-200 bg-surface text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50",
    hover: "border border-neutral-300 bg-neutral-50 text-neutral-900",
    disabled: "border border-neutral-200 bg-surface text-neutral-300",
  },
  text: {
    default: "text-primary-600 hover:text-primary-700",
    hover: "text-primary-700",
    disabled: "text-primary-300",
  },
};

export function buttonVariants({
  variant = "primary",
  size = "lg",
  state = "default",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  className?: string;
} = {}) {
  const sizing =
    variant === "text"
      ? "h-11 px-0 text-sm"
      : size === "md"
        ? "h-9 px-3 text-sm"
        : "h-11 px-4 text-sm";

  return cn(
    base,
    sizing,
    variantStyles[variant][state],
    state === "disabled" && "pointer-events-none",
    className,
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  icon?: ReactNode;
  href?: string;
  external?: boolean;
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "lg",
  state = "default",
  icon,
  href,
  external = false,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = buttonVariants({ variant, size, state, className });
  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="shrink-0">{icon}</span> : null}
    </>
  );

  if (href && state !== "disabled") {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  if (state === "disabled") {
    return (
      <button
        type={type}
        className={classes}
        disabled
        aria-disabled="true"
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {content}
    </button>
  );
}
