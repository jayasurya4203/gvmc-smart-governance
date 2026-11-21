import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  glass = true,
}: {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5",
        glass ? "glass-card" : "bg-gvmc-surface border border-gvmc-border",
        className,
      )}
    >
      {children}
    </div>
  );
}
