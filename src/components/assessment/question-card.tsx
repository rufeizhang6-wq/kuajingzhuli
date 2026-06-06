"use client";

import type { AssessmentOption } from "@/lib/assessment-data";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface QuestionCardProps {
  option: AssessmentOption;
  selected: boolean;
  onSelect: (value: string) => void;
}

export function QuestionCard({ option, selected, onSelect }: QuestionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.value)}
      className={cn(
        "group w-full rounded-xl p-5 text-left transition-all duration-150 cursor-pointer",
        selected
          ? "border-2 border-primary bg-primary/5 shadow-md"
          : "border border-neutral-200 shadow-sm hover:border-neutral-300 hover:shadow-md"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all",
            selected ? "border-primary bg-primary" : "border-neutral-300"
          )}
        >
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
        <div className="space-y-1">
          <p style={{ fontSize: "16px", fontWeight: 500, color: "#0a0a0a" }}>
            {option.label}
          </p>
          <p style={{ fontSize: "15px", color: "#525252", lineHeight: 1.5 }}>{option.description}</p>
        </div>
      </div>
    </button>
  );
}
