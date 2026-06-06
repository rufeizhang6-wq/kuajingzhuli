"use client";

import type { DecisionOption } from "@/lib/guide-types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface DecisionPointProps {
  operationId: string;
  options: DecisionOption[];
  selectedId: string | undefined;
  onSelect: (operationId: string, optionId: string) => void;
}

export function DecisionPoint({ operationId, options, selectedId, onSelect }: DecisionPointProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelect(operationId, option.id)}
            className={cn(
              "w-full rounded-lg border p-4 text-left transition-all",
              isSelected
                ? "border-primary bg-accent/50 ring-1 ring-primary/20"
                : "border-border hover:border-primary/30 hover:bg-accent/30"
            )}
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isSelected
                    ? "border-primary bg-primary"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
              </div>
              <div className="space-y-1">
                <p
                  className={cn("font-medium", isSelected && "text-primary")}
                  style={{ fontSize: "15px", color: isSelected ? undefined : "#0a0a0a" }}
                >
                  {option.label}
                </p>
                <p style={{ fontSize: "15px", color: "#404040" }}>{option.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
