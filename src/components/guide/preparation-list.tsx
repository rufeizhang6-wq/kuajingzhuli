"use client";

import type { PreparationItem } from "@/lib/guide-types";
import { Package } from "lucide-react";

interface PreparationListProps {
  items: PreparationItem[];
}

export function PreparationList({ items }: PreparationListProps) {
  if (items.length === 0) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 flex items-center gap-2 font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>
        <Package className="h-4 w-4 text-primary" />
        你需要准备
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2" style={{ fontSize: "15px", color: "#404040" }}>
            <span className="mt-0.5" style={{ color: "#737373" }}>•</span>
            <div>
              <span>{item.text}</span>
              {item.note && (
                <span className="ml-1" style={{ fontSize: "13px", color: "#737373" }}>({item.note})</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
