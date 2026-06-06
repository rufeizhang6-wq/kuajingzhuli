"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Lightbulb,
  Target,
  Ban,
  Calculator,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  selectionOverview,
  inspirationSources,
  fiveDimensions,
  avoidCategories,
  platformAvoidTips,
  commissionTable,
  actionChecklist,
  platformListings,
} from "@/lib/learn-data-product";
import type { PlatformListing, ListingStep } from "@/lib/learn-data-product";

// ============ Sub-components ============

function SectionCard({
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

function StepCard({
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

function WarningBlock({ warnings }: { warnings: string[] }) {
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

function FaqBlock({ faq }: { faq: { q: string; a: string }[] }) {
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

// ============ Platform Tab Content ============

function PlatformContent({ listing }: { listing: PlatformListing }) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const toggle = (idx: number) => {
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-5">
      {/* Intro */}
      <p style={{ fontSize: "15px", color: "#525252", lineHeight: 1.7 }}>{listing.intro}</p>

      {/* Preparations */}
      <div className="rounded-lg border border-border/60 bg-muted/20 p-4 space-y-2">
        <h4 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>上架前准备</h4>
        <ul className="space-y-1">
          {listing.preparations.map((p) => (
            <li key={p} className="flex items-start gap-2" style={{ fontSize: "14px", color: "#525252" }}>
              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        <h4 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>上架流程</h4>
        {listing.steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            checked={!!checked[i]}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {/* Warnings */}
      <WarningBlock warnings={listing.warnings} />

      {/* FAQ */}
      <FaqBlock faq={listing.faq} />
    </div>
  );
}

// ============ Main Component ============

export function ProductLearnClient() {
  const [activeTab, setActiveTab] = useState("temu");

  const activeListing = platformListings.find((p) => p.id === activeTab)!;

  return (
    <div className="space-y-8">
      {/* ---- Section 1: 通用选品方法论 ---- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium" style={{ color: "#0a0a0a" }}>通用选品方法论</h2>
        </div>

        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-3">
          <p style={{ fontSize: "15px", color: "#0a0a0a", lineHeight: 1.7 }}>
            {selectionOverview.corePrinciple}
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {selectionOverview.threeConditions.map((c) => (
              <div key={c.label} className="rounded-lg bg-white p-3 border border-border/40">
                <p className="font-medium text-primary" style={{ fontSize: "14px" }}>{c.label}</p>
                <p style={{ fontSize: "13px", color: "#525252" }}>{c.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <SectionCard title="从哪里找产品灵感" icon={Lightbulb} defaultOpen={false}>
          <div className="space-y-4">
            {inspirationSources.map((source) => (
              <div key={source.title} className="space-y-1.5">
                <h5 className="font-medium" style={{ fontSize: "14px", color: "#0a0a0a" }}>{source.title}</h5>
                <div className="space-y-1">
                  {source.items.map((item) => (
                    <div key={item.label} className="flex items-start gap-2" style={{ fontSize: "14px" }}>
                      <span className="shrink-0 font-medium" style={{ color: "#0a0a0a" }}>{item.label}：</span>
                      <span style={{ color: "#525252" }}>{item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <p style={{ fontSize: "13px", color: "#737373" }}>
              建议新手先用免费方法（榜单+1688+搜索建议），不要一上来就买工具。
            </p>
          </div>
        </SectionCard>

        <SectionCard title="五维评估法：判断产品值不值得做" icon={Target}>
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="py-2 pr-3 text-left font-medium" style={{ color: "#0a0a0a" }}>维度</th>
                    <th className="py-2 pr-3 text-left font-medium" style={{ color: "#0a0a0a" }}>怎么看</th>
                    <th className="py-2 text-left font-medium" style={{ color: "#0a0a0a" }}>及格线</th>
                  </tr>
                </thead>
                <tbody>
                  {fiveDimensions.map((d) => (
                    <tr key={d.dimension} className="border-b border-border/20">
                      <td className="py-2 pr-3 font-medium" style={{ color: "#0a0a0a" }}>{d.dimension}</td>
                      <td className="py-2 pr-3" style={{ color: "#525252" }}>{d.howToCheck}</td>
                      <td className="py-2 font-medium text-green-700">{d.passLine}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "13px", color: "#737373" }}>
              5个维度都及格=可以做。有1个严重不及格=不要做。
            </p>
          </div>
        </SectionCard>

        <SectionCard title="选品雷区：绝对不碰" icon={Ban}>
          <div className="space-y-4">
            <div className="space-y-1.5">
              {avoidCategories.map((a) => (
                <div key={a.category} className="flex items-start gap-2" style={{ fontSize: "14px" }}>
                  <Ban className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-500" />
                  <span>
                    <span className="font-medium" style={{ color: "#0a0a0a" }}>{a.category}</span>
                    <span style={{ color: "#737373" }}> — {a.reason}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-amber-50 p-3 space-y-1.5">
              <h5 className="font-medium text-amber-800" style={{ fontSize: "14px" }}>各平台特有雷区</h5>
              {platformAvoidTips.map((t) => (
                <p key={t.platform} style={{ fontSize: "13px", color: "#92400e" }}>
                  <span className="font-medium">{t.platform}：</span>{t.tip}
                </p>
              ))}
            </div>
          </div>
        </SectionCard>

        <SectionCard title="各平台佣金速查" icon={Calculator}>
          <div className="space-y-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/40">
                    <th className="py-2 pr-3 text-left font-medium" style={{ color: "#0a0a0a" }}>平台</th>
                    <th className="py-2 pr-3 text-left font-medium" style={{ color: "#0a0a0a" }}>佣金</th>
                    <th className="py-2 pr-3 text-left font-medium" style={{ color: "#0a0a0a" }}>其他费用</th>
                    <th className="py-2 text-left font-medium" style={{ color: "#0a0a0a" }}>总扣费</th>
                  </tr>
                </thead>
                <tbody>
                  {commissionTable.map((c) => (
                    <tr key={c.platform} className="border-b border-border/20">
                      <td className="py-2 pr-3 font-medium" style={{ color: "#0a0a0a" }}>{c.platform}</td>
                      <td className="py-2 pr-3" style={{ color: "#525252" }}>{c.commission}</td>
                      <td className="py-2 pr-3" style={{ color: "#525252" }}>{c.otherFees}</td>
                      <td className="py-2 font-medium" style={{ color: "#0a0a0a" }}>{c.totalFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "13px", color: "#737373" }}>
              用<Link href="/tools/profit-calculator" className="text-primary hover:underline">利润计算器</Link>可以直接算各平台的真实利润。
            </p>
          </div>
        </SectionCard>

        {/* Action Checklist */}
        <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 space-y-3">
          <h4 className="flex items-center gap-1.5 font-medium text-green-800" style={{ fontSize: "15px" }}>
            <Check className="h-4 w-4" />
            新手选品行动清单
          </h4>
          <ul className="space-y-1.5">
            {actionChecklist.map((item, i) => (
              <li key={i} className="flex items-start gap-2" style={{ fontSize: "14px", color: "#166534" }}>
                <span className="mt-0.5 shrink-0 text-green-600" style={{ fontSize: "12px" }}>
                  {i + 1}.
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ---- Section 2: 平台上架教程 ---- */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-medium" style={{ color: "#0a0a0a" }}>各平台上架教程</h2>
        </div>

        {/* Tab buttons */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {platformListings.map((p) => (
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

        {/* Tab content */}
        <PlatformContent listing={activeListing} />
      </div>
    </div>
  );
}
