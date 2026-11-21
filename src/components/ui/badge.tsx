import { cn } from "@/lib/cn";

type BadgeTone = "default" | "success" | "warning" | "danger" | "info" | "ai";

const tones: Record<BadgeTone, string> = {
  default: "bg-gvmc-surface text-gvmc-text border-gvmc-border",
  success: "bg-emerald-500/15 text-gvmc-success border-emerald-500/30",
  warning: "bg-orange-500/15 text-gvmc-warning border-orange-500/30",
  danger: "bg-red-500/15 text-gvmc-danger border-red-500/30",
  info: "bg-sky-500/15 text-gvmc-info border-sky-500/30",
  ai: "bg-cyan-500/15 text-gvmc-ai border-cyan-500/30",
};

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
