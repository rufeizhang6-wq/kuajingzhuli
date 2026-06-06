"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ChevronRight, Clock, Lock, ArrowRight } from "lucide-react";
import type { GuidePath } from "@/lib/guide-types";
import { loadProgress, resolveOperations, countConfirmable, countCompleted } from "@/lib/guide-types";
import { cn } from "@/lib/utils";

interface PathOverviewProps {
  path: GuidePath;
}

export function PathOverview({ path }: PathOverviewProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [decisions, setDecisions] = useState<Record<string, string>>({});

  useEffect(() => {
    const progress = loadProgress(path.id);
    setCompleted(progress.completed);
    setDecisions(progress.decisions);
  }, [path.id]);

  useEffect(() => {
    const handleFocus = () => {
      const progress = loadProgress(path.id);
      setCompleted(progress.completed);
      setDecisions(progress.decisions);
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [path.id]);

  // Find the first non-complete step
  let firstIncompleteIndex = -1;

  return (
    <div className="space-y-3">
      {path.steps.map((step, i) => {
        const resolved = resolveOperations(step, decisions);
        const total = countConfirmable(resolved);
        const done = countCompleted(resolved, completed);
        const isComplete = total > 0 && done === total;
        const hasContent = step.operations.length > 0;

        // Track first incomplete
        const isCurrent = !isComplete && hasContent && firstIncompleteIndex === -1;
        if (isCurrent) firstIncompleteIndex = i;

        // Summary of user decisions for completed steps
        const decisionSummary = step.operations
          .filter((op) => op.type === "decision" && decisions[op.id])
          .map((op) => {
            const selected = op.options?.find((o) => o.id === decisions[op.id]);
            return selected?.label;
          })
          .filter(Boolean)
          .join(" · ");

        return (
          <div
            key={step.id}
            className={cn(
              "relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all",
              isComplete
                ? "border-neutral-200"
                : isCurrent
                  ? "border-neutral-200 shadow-md"
                  : "border-neutral-200"
            )}
          >
            {/* Left color bar */}
            <div className={cn(
              "absolute left-0 top-0 bottom-0 w-1",
              isComplete ? "bg-green-500" : isCurrent ? "bg-primary" : "bg-neutral-200"
            )} />

            <div className="flex items-start gap-3 p-4 pl-5">
              {/* Status icon */}
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isComplete
                    ? "bg-green-100 text-green-700"
                    : isCurrent
                      ? "bg-primary text-white"
                      : "bg-neutral-100"
                )}
                style={!isComplete && !isCurrent ? { color: "#a3a3a3" } : undefined}
              >
                {isComplete ? <Check className="h-4 w-4" /> : i + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3
                    className={cn("font-medium")}
                    style={{
                      fontSize: "15px",
                      color: isComplete || isCurrent ? "#0a0a0a" : "#a3a3a3",
                    }}
                  >
                    {step.title}
                  </h3>
                  <span className="shrink-0 flex items-center gap-1" style={{ fontSize: "13px", color: "#737373" }}>
                    <Clock className="h-3 w-3" />
                    {step.estimatedTime}
                  </span>
                </div>

                {/* Completed summary */}
                {isComplete && decisionSummary && (
                  <p className="mt-0.5" style={{ fontSize: "13px", color: "#737373" }}>
                    已完成 · {decisionSummary}
                  </p>
                )}
                {isComplete && !decisionSummary && (
                  <p className="mt-0.5" style={{ fontSize: "13px", color: "#737373" }}>已完成</p>
                )}

                {/* Current step CTA */}
                {isCurrent && hasContent && (
                  <Link
                    href={`/guide/${path.id}/${step.id}`}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    进入此步骤
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}

                {/* Not yet unlocked */}
                {!isComplete && !isCurrent && hasContent && (
                  <p className="mt-0.5" style={{ fontSize: "13px", color: "#a3a3a3" }}>
                    需先完成第{firstIncompleteIndex + 1}步
                  </p>
                )}

                {/* No content yet */}
                {!hasContent && (
                  <p className="mt-0.5 flex items-center gap-1" style={{ fontSize: "13px", color: "#a3a3a3" }}>
                    <Lock className="h-3 w-3" />
                    内容编写中
                  </p>
                )}
              </div>

              {/* Click to view completed steps */}
              {isComplete && hasContent && (
                <Link
                  href={`/guide/${path.id}/${step.id}`}
                  className="mt-1 shrink-0 hover:text-foreground"
                  style={{ color: "#737373" }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
