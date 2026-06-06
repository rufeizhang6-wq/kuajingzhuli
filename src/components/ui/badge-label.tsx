import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "muted";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-600",
  primary: "bg-primary/10 text-primary",
  success: "bg-green-50 text-green-700",
  warning: "bg-amber-50 text-amber-700",
  danger: "bg-red-50 text-red-700",
  muted: "bg-muted text-muted-foreground",
};

interface BadgeLabelProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

/**
 * Compact inline label/badge for status, difficulty, tags.
 * Consistent with the pill-style badges used on guide and assessment pages.
 */
export function BadgeLabel({ children, variant = "default", className }: BadgeLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
