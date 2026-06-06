import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description: string;
  /** Additional line below description */
  hint?: React.ReactNode;
  /** Back link (text + href) */
  back?: { label: string; href: string };
  /** Center text (default true) */
  center?: boolean;
  children?: React.ReactNode;
}

/**
 * Unified page header with grid background, matching hero-section style.
 * Used at the top of all non-landing pages for consistent visual hierarchy.
 */
export function PageHeader({
  title,
  description,
  hint,
  back,
  center = true,
  children,
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border/40 bg-neutral-50/80">
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Fade mask */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 0%, transparent 30%, rgb(250,250,250) 100%)",
        }}
      />

      <div className={cn("relative mx-auto max-w-2xl px-4 pb-8 pt-8 sm:px-6", center && "text-center")}>
        {back && (
          <Link
            href={back.href}
            className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {back.label}
          </Link>
        )}
        <div className="space-y-2 animate-slide-up-fade">
          <h1 className="text-2xl font-medium tracking-tight sm:text-3xl">{title}</h1>
          <p className="text-base text-muted-foreground">{description}</p>
          {hint && <div className="text-sm text-muted-foreground/80">{hint}</div>}
        </div>
        {children && <div className="mt-6 animate-slide-up-fade animation-delay-100">{children}</div>}
      </div>
    </div>
  );
}
