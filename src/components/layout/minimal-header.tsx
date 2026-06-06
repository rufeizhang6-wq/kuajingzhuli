"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface MinimalHeaderProps {
  showBack?: boolean;
  backHref?: string;
  backLabel?: string;
  progress?: {
    current: number;
    total: number;
  };
  rightSlot?: React.ReactNode;
}

export function MinimalHeader({
  showBack = false,
  backHref = "/",
  backLabel = "返回",
  progress,
  rightSlot,
}: MinimalHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        {/* Left: Logo or Back */}
        {showBack ? (
          <Link
            href={backHref}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{backLabel}</span>
          </Link>
        ) : (
          <Link href="/" className="text-base font-semibold tracking-tight">
            跨境助理
          </Link>
        )}

        {/* Center: Progress bar */}
        {progress && (
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-300"
                style={{
                  width: `${(progress.current / progress.total) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {progress.current}/{progress.total}
            </span>
          </div>
        )}

        {/* Right slot */}
        {rightSlot ?? <div className="w-16" />}
      </div>
    </header>
  );
}
