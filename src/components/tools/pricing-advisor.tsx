"use client";

import { useState, useMemo } from "react";
import { Target, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 售价建议工具
 *
 * 利润计算器的反向版本：输入成本+目标毛利率，反算建议售价。
 * 引用老阳头的保本ROI公式（1÷毛利率）。
 */

interface MarketFees {
  id: string;
  name: string;
  currency: string;
  exchangeRate: number;
  totalFeeRate: number;
  feeBreakdown: string;
}

const MARKETS: MarketFees[] = [
  { id: "us", name: "美区", currency: "USD", exchangeRate: 7.2, totalFeeRate: 0.108, feeBreakdown: "佣金8% + 交易费2.8%" },
  { id: "ph", name: "菲律宾", currency: "PHP", exchangeRate: 0.128, totalFeeRate: 0.172, feeBreakdown: "佣金7.3% + 交易2.24% + 包邮5.5% + 处理费" },
  { id: "my", name: "马来西亚", currency: "MYR", exchangeRate: 1.6, totalFeeRate: 0.08, feeBreakdown: "佣金6% + 交易费2%" },
  { id: "th", name: "泰国", currency: "THB", exchangeRate: 0.2, totalFeeRate: 0.08, feeBreakdown: "佣金6% + 交易费2%" },
];

export function PricingAdvisor() {
  const [marketId, setMarketId] = useState("us");
  const [productCost, setProductCost] = useState(30);
  const [totalShipping, setTotalShipping] = useState(50);
  const [targetMargin, setTargetMargin] = useState(30);
  const [influencerRate, setInfluencerRate] = useState(0);

  const market = MARKETS.find((m) => m.id === marketId)!;

  const result = useMemo(() => {
    const totalCostRMB = productCost + totalShipping;
    const totalDeductionRate = market.totalFeeRate + influencerRate / 100;

    // 反向计算：售价_RMB × (1 - 扣费率) = 总成本 + 目标利润
    // 售价_RMB × (1 - 扣费率) = 总成本 / (1 - 目标毛利率)
    // → 售价_RMB = 总成本 / ((1 - 目标毛利率) × (1 - 扣费率))
    // 简化：售价_RMB = 总成本 / (1 - 目标毛利率 - 扣费率)
    const effectiveRate = 1 - targetMargin / 100 - totalDeductionRate;

    if (effectiveRate <= 0) {
      return null; // 无法达到目标毛利率
    }

    const suggestedPriceRMB = totalCostRMB / effectiveRate;
    const suggestedPriceLocal = suggestedPriceRMB / market.exchangeRate;
    const estimatedProfit = suggestedPriceRMB - totalCostRMB - suggestedPriceRMB * totalDeductionRate;
    const breakEvenROI = targetMargin > 0 ? (100 / targetMargin) : 0;

    return {
      suggestedPriceLocal: Math.ceil(suggestedPriceLocal * 100) / 100,
      suggestedPriceRMB: Math.round(suggestedPriceRMB * 100) / 100,
      estimatedProfit: Math.round(estimatedProfit * 100) / 100,
      breakEvenROI: Math.round(breakEvenROI * 10) / 10,
      totalCostRMB,
    };
  }, [productCost, totalShipping, targetMargin, influencerRate, market]);

  return (
    <div className="space-y-6">
      {/* Market selector */}
      <div>
        <label className="mb-2 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>目标站点</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {MARKETS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMarketId(m.id)}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                marketId === m.id
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:bg-muted"
              )}
            >
              {m.name}
            </button>
          ))}
        </div>
        <p className="mt-1" style={{ fontSize: "13px", color: "#737373" }}>
          平台费率：{market.feeBreakdown}
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>产品成本</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={productCost || ""}
              onChange={(e) => setProductCost(Number(e.target.value))}
              min={0}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="shrink-0" style={{ fontSize: "15px", color: "#737373" }}>¥</span>
          </div>
        </div>
        <div>
          <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>运费合计</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={totalShipping || ""}
              onChange={(e) => setTotalShipping(Number(e.target.value))}
              min={0}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="shrink-0" style={{ fontSize: "15px", color: "#737373" }}>¥</span>
          </div>
          <p className="mt-0.5" style={{ fontSize: "13px", color: "#737373" }}>一段+货代+尾程</p>
        </div>
        <div>
          <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>目标毛利率</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={targetMargin || ""}
              onChange={(e) => setTargetMargin(Number(e.target.value))}
              min={1}
              max={90}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="shrink-0" style={{ fontSize: "15px", color: "#737373" }}>%</span>
          </div>
        </div>
        <div>
          <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>达人佣金</label>
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={influencerRate || ""}
              onChange={(e) => setInfluencerRate(Number(e.target.value))}
              min={0}
              max={50}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
            />
            <span className="shrink-0" style={{ fontSize: "15px", color: "#737373" }}>%</span>
          </div>
          <p className="mt-0.5" style={{ fontSize: "13px", color: "#737373" }}>没有填0</p>
        </div>
      </div>

      {/* Result */}
      {result ? (
        <div className="rounded-lg border border-border bg-muted/30 p-5 space-y-4">
          <h3 className="flex items-center gap-2 text-base font-medium" style={{ color: "#0a0a0a" }}>
            <Target className="h-4 w-4" />
            建议售价
          </h3>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg bg-background p-4 border border-primary/30">
              <p style={{ fontSize: "13px", color: "#737373" }}>建议售价（{market.currency}）</p>
              <p className="mt-1 text-2xl font-medium text-primary">
                {result.suggestedPriceLocal.toFixed(2)}
              </p>
            </div>
            <div className="rounded-lg bg-background p-4 border border-border/60">
              <p style={{ fontSize: "13px", color: "#737373" }}>折合人民币</p>
              <p className="mt-1 text-2xl font-medium" style={{ color: "#0a0a0a" }}>
                ¥{result.suggestedPriceRMB.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center" style={{ fontSize: "15px" }}>
            <div className="rounded-lg bg-background p-3 border border-border/60">
              <p style={{ fontSize: "13px", color: "#737373" }}>预估单件利润</p>
              <p className="mt-1 font-medium text-green-600">¥{result.estimatedProfit.toFixed(2)}</p>
            </div>
            <div className="rounded-lg bg-background p-3 border border-border/60">
              <p style={{ fontSize: "13px", color: "#737373" }}>目标毛利率</p>
              <p className="mt-1 font-medium" style={{ color: "#0a0a0a" }}>{targetMargin}%</p>
            </div>
            <div className="rounded-lg bg-background p-3 border border-border/60">
              <p style={{ fontSize: "13px", color: "#737373" }}>保本ROI</p>
              <p className="mt-1 font-medium" style={{ color: "#0a0a0a" }}>{result.breakEvenROI}</p>
            </div>
          </div>

          <div className="space-y-1" style={{ fontSize: "15px", color: "#737373" }}>
            <p>• 总成本：¥{result.totalCostRMB}（产品 ¥{productCost} + 运费 ¥{totalShipping}）</p>
            <p>• 平台扣费：{(market.totalFeeRate * 100).toFixed(1)}%{influencerRate > 0 ? ` + 达人${influencerRate}%` : ""}</p>
            <p>• 保本ROI {result.breakEvenROI} = 投广告时ROI必须高于此数</p>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700" style={{ fontSize: "15px" }}>
          ⚠️ 目标毛利率过高或成本过高，无法计算出合理售价。请降低目标毛利率或减少成本。
        </div>
      )}

      {/* Tips */}
      <div className="rounded-lg bg-muted/30 p-4 space-y-1" style={{ fontSize: "13px", color: "#737373" }}>
        <p>💡 建议售价已预留了平台费用空间，但未包含促销折扣。定价时建议再加30%折扣空间。</p>
        <p>💡 对比同类商品的价格带：如果建议售价远高于竞品，可能需要降低目标毛利率。</p>
        <p>💡 毛利率低于20%的品不适合投广告（保本ROI太高难以达到）。</p>
      </div>
    </div>
  );
}
