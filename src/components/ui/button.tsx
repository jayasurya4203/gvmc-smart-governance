import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ai" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gvmc-primary text-white hover:bg-gvmc-primary-dark focus-visible:ring-gvmc-primary",
  secondary:
    "bg-gvmc-surface text-gvmc-text border border-gvmc-border hover:bg-gvmc-bg",
  ai: "bg-gvmc-ai text-slate-900 hover:brightness-110 ai-glow focus-visible:ring-gvmc-ai",
  danger:
    "bg-gvmc-danger text-white hover:brightness-110 focus-visible:ring-gvmc-danger",
  ghost: "bg-transparent text-gvmc-text hover:bg-gvmc-surface",
};

const sizes: Record<"sm" | "md" | "lg", string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
