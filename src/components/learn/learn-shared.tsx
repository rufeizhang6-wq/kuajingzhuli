"use client";

import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============ Shared Types ============

export interface ListingStep {
  title: string;
  content: string;
  confirmText?: string;
}

export interface PlatformSection {
  id: string;
  name: string;
  intro: string;
  preparations?: string[];
  steps: ListingStep[];
  warnings: string[];
  faq: { q: string; a: string }[];
}

// ============ Shared Components ============

export function SectionCard({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-xl border border-border/60 bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2.5">
          <Icon className="h-4 w-4 text-primary" />
          <span className="font-medium" style={{ fontSize: "16px", color: "#0a0a0a" }}>
            {title}
          </span>
        </div>
        {open ? (
          <ChevronUp className="h-4 w-4" style={{ color: "#737373" }} />
        ) : (
          <ChevronDown className="h-4 w-4" style={{ color: "#737373" }} />
        )}
      </button>
      {open && <div className="border-t border-border/40 px-4 pb-4 pt-3">{children}</div>}
    </div>
  );
}

export function StepCard({
  step,
  index,
  checked,
  onToggle,
}: {
  step: ListingStep;
  index: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border p-4 transition-all",
        checked ? "border-green-200 bg-green-50/30" : "border-border/60 bg-card"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium",
            checked ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
          )}
        >
          {checked ? <Check className="h-3.5 w-3.5" /> : index + 1}
        </div>
        <div className="flex-1 space-y-2">
          <h4 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>
            {step.title}
          </h4>
          <div className="whitespace-pre-line" style={{ fontSize: "14px", color: "#525252", lineHeight: 1.7 }}>
            {step.content}
          </div>
          {step.confirmText && (
            <button
              type="button"
              onClick={onToggle}
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                checked
                  ? "border-green-300 bg-green-100 text-green-700"
                  : "border-border hover:bg-muted text-neutral-600"
              )}
            >
              <Check className="h-3.5 w-3.5" />
              {step.confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function WarningBlock({ warnings }: { warnings: string[] }) {
  return (
    <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4 space-y-2">
      <h4 className="flex items-center gap-1.5 font-medium text-amber-800" style={{ fontSize: "15px" }}>
        <AlertTriangle className="h-4 w-4" />
        注意事项
      </h4>
      <ul className="space-y-1.5">
        {warnings.map((w) => (
          <li key={w} className="flex items-start gap-2 text-amber-800" style={{ fontSize: "14px" }}>
            <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
            <span>{w}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FaqBlock({ faq }: { faq: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      <h4 className="flex items-center gap-1.5 font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>
        <HelpCircle className="h-4 w-4" />
        常见问题
      </h4>
      {faq.map((item) => (
        <div key={item.q} className="rounded-lg bg-muted/40 p-3 space-y-1">
          <p className="font-medium" style={{ fontSize: "14px", color: "#0a0a0a" }}>
            Q：{item.q}
          </p>
          <p style={{ fontSize: "14px", color: "#525252" }}>A：{item.a}</p>
        </div>
      ))}
    </div>
  );
}

export function PlatformContent({ listing }: { listing: PlatformSection }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggle = (idx: number) => setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  return (
    <div className="space-y-5">
      <p style={{ fontSize: "15px", color: "#525252", lineHeight: 1.7 }}>{listing.intro}</p>

      {listing.preparations && listing.preparations.length > 0 && (
        <div className="rounded-lg border border-border/60 bg-muted/20 p-4 space-y-2">
          <h4 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>准备清单</h4>
          <ul className="space-y-1">
            {listing.preparations.map((p) => (
              <li key={p} className="flex items-start gap-2" style={{ fontSize: "14px", color: "#525252" }}>
                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        <h4 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>操作步骤</h4>
        {listing.steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} checked={!!checked[i]} onToggle={() => toggle(i)} />
        ))}
      </div>

      <WarningBlock warnings={listing.warnings} />
      <FaqBlock faq={listing.faq} />
    </div>
  );
}

export function PlatformTabs({
  platforms,
  overviewSection,
}: {
  platforms: PlatformSection[];
  overviewSection?: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState(platforms[0].id);
  const active = platforms.find((p) => p.id === activeTab)!;

  return (
    <div className="space-y-8">
      {overviewSection}

      <div className="space-y-4">
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {platforms.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveTab(p.id)}
              className={cn(
                "shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                activeTab === p.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-neutral-600"
              )}
            >
              {p.name}
            </button>
          ))}
        </div>
        <PlatformContent listing={active} />
      </div>
    </div>
  );
}
