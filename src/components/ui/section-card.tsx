import { cn } from "@/lib/utils";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  /** Highlighted card (primary border tint) */
  highlighted?: boolean;
  /** Make the card hoverable with lift effect */
  hoverable?: boolean;
  /** Render as a div (default) or other element */
  as?: "div" | "section";
}

/**
 * Unified content card matching the product-preview card style:
 * subtle border, clean background, optional hover lift.
 */
export function SectionCard({
  children,
  className,
  highlighted = false,
  hoverable = false,
  as: Tag = "div",
}: SectionCardProps) {
  return (
    <Tag
      className={cn(
        "rounded-xl border bg-card",
        highlighted ? "border-primary/25 shadow-md shadow-primary/5" : "border-border/60 shadow-sm",
        hoverable && "transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      {children}
    </Tag>
  );
}
