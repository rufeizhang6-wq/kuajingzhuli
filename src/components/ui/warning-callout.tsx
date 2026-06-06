import { AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarningCalloutProps {
  children: React.ReactNode;
  title?: string;
  /** "warning" (amber) or "info" (blue) */
  variant?: "warning" | "info";
  className?: string;
}

/**
 * Unified callout block for warnings and info tips.
 * Replaces the various inline warning/alert styles across the site.
 */
export function WarningCallout({
  children,
  title,
  variant = "warning",
  className,
}: WarningCalloutProps) {
  const isWarning = variant === "warning";
  const Icon = isWarning ? AlertTriangle : Info;

  return (
    <div
      className={cn(
        "rounded-xl border-2 p-4",
        isWarning ? "border-amber-200 bg-amber-50/80" : "border-primary/20 bg-primary/5",
        className
      )}
    >
      {title && (
        <h4
          className={cn(
            "mb-2 flex items-center gap-1.5 text-sm font-medium",
            isWarning ? "text-amber-800" : "text-primary"
          )}
        >
          <Icon className="h-4 w-4" />
          {title}
        </h4>
      )}
      <div className={cn("text-sm leading-relaxed", isWarning ? "text-amber-800" : "text-foreground/80")}>
        {children}
      </div>
    </div>
  );
}
