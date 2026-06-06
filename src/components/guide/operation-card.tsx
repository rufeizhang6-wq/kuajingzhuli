"use client";

import type { Operation } from "@/lib/guide-types";
import { DecisionPoint } from "./decision-point";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, Clock } from "lucide-react";

interface OperationCardProps {
  operation: Operation;
  index: number;
  total: number;
  isCompleted: boolean;
  isExpanded: boolean;
  selectedDecision?: string;
  onToggle: () => void;
  onConfirm: (operationId: string) => void;
  onDecision: (operationId: string, optionId: string) => void;
}

export function OperationCard({
  operation: op,
  index,
  total,
  isCompleted,
  isExpanded,
  selectedDecision,
  onToggle,
  onConfirm,
  onDecision,
}: OperationCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border transition-all",
        isCompleted ? "border-green-200 bg-green-50/30" : "border-border bg-card"
      )}
    >
      {/* Header — always visible */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-4 text-left"
      >
        {/* Step indicator */}
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
            isCompleted
              ? "bg-green-100 text-green-700"
              : "bg-primary/10 text-primary"
          )}
        >
          {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
        </div>

        <div className="flex-1 min-w-0">
          <p
            className={cn("font-medium truncate")}
            style={{
              fontSize: "15px",
              color: isCompleted ? "#737373" : "#0a0a0a",
            }}
          >
            {op.title}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1" style={{ fontSize: "13px", color: "#737373" }}>
            <Clock className="h-3 w-3" />
            {op.estimatedTime}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isExpanded && "rotate-180"
            )}
            style={{ color: "#737373" }}
          />
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="border-t border-border/60 px-4 pb-4 pt-3 space-y-4">
          {/* Action content */}
          {op.type === "action" && op.content && (
            <div className="prose-sm whitespace-pre-line leading-relaxed" style={{ fontSize: "15px", color: "#404040" }}>
              {op.content}
            </div>
          )}

          {/* Decision point */}
          {op.type === "decision" && op.options && (
            <DecisionPoint
              operationId={op.id}
              options={op.options}
              selectedId={selectedDecision}
              onSelect={onDecision}
            />
          )}

          {/* Confirm checkbox */}
          {op.type === "action" && op.confirmText && (
            <button
              type="button"
              onClick={() => onConfirm(op.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg border p-3 font-medium transition-all",
                isCompleted
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-border hover:border-primary/30 hover:bg-accent/30"
              )}
              style={{ fontSize: "15px", color: isCompleted ? undefined : "#404040" }}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border-2",
                  isCompleted
                    ? "border-green-500 bg-green-500"
                    : "border-muted-foreground/30"
                )}
              >
                {isCompleted && <Check className="h-3 w-3 text-white" />}
              </div>
              {isCompleted ? `✓ ${op.confirmText}` : op.confirmText}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
