"use client";

import Link from "next/link";
import type { PlatformRecommendation } from "@/lib/assessment-data";
import { RiskAlert } from "@/components/guide/risk-alert";
import {
  DollarSign,
  AlertTriangle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ExternalLink,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  recommendation: PlatformRecommendation;
  rank: number;
}

const difficultyColors: Record<string, string> = {
  "最低": "text-green-700 bg-green-50",
  "低": "text-green-600 bg-green-50",
  "低-中": "text-amber-600 bg-amber-50",
  "中-高": "text-orange-600 bg-orange-50",
  "最高": "text-red-600 bg-red-50",
};

function CardDetails({ r }: { r: PlatformRecommendation }) {
  return (
    <div className="border-t border-border/60 px-5 pb-5 pt-4 space-y-5">
      <p className="text-sm leading-relaxed text-muted-foreground">{r.description}</p>

      {r.matchReasons.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">为什么适合你</h4>
          <ul className="space-y-1.5">
            {r.matchReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.notMatchReasons.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">需要注意</h4>
          <ul className="space-y-1.5">
            {r.notMatchReasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm">
                <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium">启动费用明细</h4>
        <div className="rounded-lg border border-border/60 overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {r.costBreakdown.map((cost) => (
                <tr key={cost.item} className="border-b border-border/40 last:border-0">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      {cost.required ? (
                        <span className="text-xs text-red-500">必需</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">可选</span>
                      )}
                      <span>{cost.item}</span>
                    </div>
                    {cost.note && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{cost.note}</p>
                    )}
                  </td>
                  <td className="px-3 py-2 text-right font-medium whitespace-nowrap">
                    {cost.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RiskAlert>
        <ul className="space-y-1">
          {r.risks.map((riskItem) => (
            <li key={riskItem} className="flex items-start gap-1.5">
              <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
              <span>{riskItem}</span>
            </li>
          ))}
        </ul>
      </RiskAlert>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">预计耗时</p>
          <p className="mt-1 text-sm font-medium">{r.timeline}</p>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">开店步骤</p>
          <p className="mt-1 text-sm font-medium">{r.guideSteps}步完成</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        数据来源：{r.dataSource}
      </p>

      {!r.disqualified && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Link
            href={r.guidePath}
            className="group flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            进入开店引导
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/platforms"
            className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            查看平台详情
          </Link>
        </div>
      )}

      {r.disqualified && (
        <Link
          href="/platforms"
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          查看平台详情
        </Link>
      )}
    </div>
  );
}

export function ResultCard({ recommendation: r, rank }: ResultCardProps) {
  const [expanded, setExpanded] = useState(!r.disqualified && rank === 1);
  const diffColor = difficultyColors[r.difficulty] ?? "text-neutral-600 bg-neutral-50";

  if (r.disqualified) {
    return (
      <div className="rounded-xl border border-border/60 bg-muted/20 opacity-75">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full p-5 text-left"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1.5">
              <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                暂不适合
              </span>
              <h3 className="text-base font-medium text-neutral-400">{r.name}</h3>
              <p className="text-sm text-neutral-400">{r.disqualifyReason}</p>
            </div>
            {expanded ? (
              <ChevronUp className="mt-2 h-4 w-4 text-neutral-400" />
            ) : (
              <ChevronDown className="mt-2 h-4 w-4 text-neutral-400" />
            )}
          </div>
        </button>
        {expanded && <CardDetails r={r} />}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        rank === 1 ? "border-primary/30 bg-accent/30 shadow-md shadow-primary/5" : "border-border bg-card shadow-sm"
      )}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {rank === 1 && (
                <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
                  推荐
                </span>
              )}
              {rank > 1 && (
                <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-neutral-600">
                  也可考虑
                </span>
              )}
              <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", diffColor)}>
                难度{r.difficulty}
              </span>
            </div>
            <h3 className="text-lg font-medium">{r.name}</h3>
            <p className="text-sm text-muted-foreground">{r.tagline}</p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="text-2xl font-medium text-primary">{r.matchScore}</div>
            <div className="text-xs text-muted-foreground">匹配分</div>
            {expanded ? (
              <ChevronUp className="mt-1 h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="mt-1 h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <DollarSign className="h-3.5 w-3.5" />
            启动 <span className="font-medium text-foreground">{r.startupBudget}</span>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span className="font-medium text-foreground">{r.guideSteps}步开店</span>
          </span>
        </div>
      </button>

      {expanded && <CardDetails r={r} />}
    </div>
  );
}
