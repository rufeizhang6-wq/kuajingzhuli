"use client";

import { useState, useMemo } from "react";
import { Calculator, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 利润计算器
 *
 * 基于老阳头的算价表方法，支持多站点费率自动计算。
 *
 * 算价公式：
 *   净利润 = 售价 × 汇率
 *            - 产品成本
 *            - 一段运费（国内到货代）
 *            - 货代费用
 *            - 三段运费（尾程）
 *            - 平台佣金（售价 × 佣金率）
 *            - 交易手续费（售价 × 手续费率）
 *            - 订单处理费（固定）
 *            - 包邮服务费（售价 × 费率，部分站点）
 *            - 达人佣金（售价 × 达人佣金率）
 *
 * 数据来源：
 *   - tiktok-framework-complete.md 全链路费用
 *   - tiktok-new-tutorials-analysis.md 菲律宾费率详解
 */

interface MarketConfig {
  id: string;
  name: string;
  currency: string;
  defaultExchangeRate: number;
  commissionRate: number;
  transactionFeeRate: number;
  orderProcessingFee: number;
  shippingSubsidyRate: number;
  note: string;
}

/** FBA per-item fee in USD (for Amazon) — added to orderProcessingFee after conversion */
interface MarketConfigExt extends MarketConfig {
  fbaFeeUSD?: number;
  monthlyFeePerUnit?: number;
  domesticShippingSubsidy?: number;
}

const MARKETS: MarketConfigExt[] = [
  { id: "temu", name: "Temu全托管", currency: "CNY", defaultExchangeRate: 1, commissionRate: 0.15, transactionFeeRate: 0, orderProcessingFee: 0, shippingSubsidyRate: 0, domesticShippingSubsidy: 0.5, note: "佣金10-20%按品类（默认15%），国内物流平台承担50%，回款周期约15个工作日" },
  { id: "us-fashion", name: "TK美区-时尚", currency: "USD", defaultExchangeRate: 7.2, commissionRate: 0.08, transactionFeeRate: 0.02, orderProcessingFee: 0, shippingSubsidyRate: 0, note: "时尚服装佣金8% + 支付费2%" },
  { id: "us-beauty", name: "TK美区-美妆", currency: "USD", defaultExchangeRate: 7.2, commissionRate: 0.05, transactionFeeRate: 0.02, orderProcessingFee: 0, shippingSubsidyRate: 0, note: "美妆个护佣金5% + 支付费2%" },
  { id: "us-electronics", name: "TK美区-电子", currency: "USD", defaultExchangeRate: 7.2, commissionRate: 0.03, transactionFeeRate: 0.02, orderProcessingFee: 0, shippingSubsidyRate: 0, note: "电子产品佣金3% + 支付费2%" },
  { id: "us-home", name: "TK美区-家居", currency: "USD", defaultExchangeRate: 7.2, commissionRate: 0.05, transactionFeeRate: 0.02, orderProcessingFee: 0, shippingSubsidyRate: 0, note: "家居园艺佣金5% + 支付费2%" },
  { id: "shopee-tw", name: "Shopee台湾", currency: "TWD", defaultExchangeRate: 0.22, commissionRate: 0.14, transactionFeeRate: 0.025, orderProcessingFee: 0, shippingSubsidyRate: 0.08, note: "佣金14% + 手续费2.5% + 技术费5% + 预售费3%（合计24.5%）" },
  { id: "shopee-my", name: "Shopee马来", currency: "MYR", defaultExchangeRate: 1.6, commissionRate: 0.1512, transactionFeeRate: 0.02, orderProcessingFee: 0, shippingSubsidyRate: 0.05, note: "佣金15.12% + 交易费2% + 技术费5%" },
  { id: "ph", name: "TK菲律宾", currency: "PHP", defaultExchangeRate: 0.128, commissionRate: 0.073, transactionFeeRate: 0.0224, orderProcessingFee: 0.33, shippingSubsidyRate: 0.055, note: "佣金7.3% + 交易2.24% + 处理费0.33元 + 包邮5.5%" },
  { id: "my", name: "TK马来", currency: "MYR", defaultExchangeRate: 1.6, commissionRate: 0.06, transactionFeeRate: 0.02, orderProcessingFee: 0, shippingSubsidyRate: 0, note: "佣金约6% + 交易费约2%" },
  { id: "amazon-us", name: "Amazon美国", currency: "USD", defaultExchangeRate: 7.2, commissionRate: 0.15, transactionFeeRate: 0, orderProcessingFee: 0, shippingSubsidyRate: 0, fbaFeeUSD: 3.22, monthlyFeePerUnit: 0, note: "佣金15%（大多数类目）+ FBA配送费$3.22起/件 + 月费$39.99（需分摊到单量）" },
];

function NumberInput({
  label,
  value,
  onChange,
  suffix,
  hint,
  step = 1,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  hint?: string;
  step?: number;
  min?: number;
}) {
  return (
    <div>
      <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>{label}</label>
      <div className="flex items-center gap-1">
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
          step={step}
          min={min}
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
        />
        {suffix && (
          <span className="shrink-0" style={{ fontSize: "15px", color: "#737373" }}>{suffix}</span>
        )}
      </div>
      {hint && <p className="mt-0.5" style={{ fontSize: "13px", color: "#737373" }}>{hint}</p>}
    </div>
  );
}

export function ProfitCalculator() {
  const [marketId, setMarketId] = useState("us-fashion");
  const [sellingPrice, setSellingPrice] = useState(25);
  const [productCost, setProductCost] = useState(30);
  const [domesticShipping, setDomesticShipping] = useState(5);
  const [forwarderFee, setForwarderFee] = useState(10);
  const [lastMileShipping, setLastMileShipping] = useState(35);
  const [influencerRate, setInfluencerRate] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(7.2);

  const market = MARKETS.find((m) => m.id === marketId) as MarketConfigExt;

  // Sync exchange rate when market changes
  const handleMarketChange = (id: string) => {
    setMarketId(id);
    const m = MARKETS.find((mk) => mk.id === id)!;
    setExchangeRate(m.defaultExchangeRate);
  };

  const result = useMemo(() => {
    const revenueRMB = sellingPrice * exchangeRate;
    const commission = revenueRMB * market.commissionRate;
    const transactionFee = revenueRMB * market.transactionFeeRate;
    const orderFee = market.orderProcessingFee;
    const shippingSubsidy = revenueRMB * market.shippingSubsidyRate;
    const influencerFee = revenueRMB * (influencerRate / 100);

    // Temu: platform subsidizes 50% of domestic shipping
    const effectiveDomesticShipping = market.domesticShippingSubsidy
      ? domesticShipping * (1 - market.domesticShippingSubsidy)
      : domesticShipping;

    // Amazon: FBA per-item fee in USD converted to RMB
    const fbaFee = market.fbaFeeUSD ? market.fbaFeeUSD * exchangeRate : 0;

    const totalCost =
      productCost +
      effectiveDomesticShipping +
      forwarderFee +
      lastMileShipping +
      commission +
      transactionFee +
      orderFee +
      shippingSubsidy +
      influencerFee +
      fbaFee;

    const profit = revenueRMB - totalCost;
    const marginRate = revenueRMB > 0 ? (profit / revenueRMB) * 100 : 0;
    const breakEvenROI = marginRate > 0 ? (1 / (marginRate / 100)) : 0;

    return {
      revenueRMB,
      commission,
      transactionFee,
      orderFee,
      shippingSubsidy,
      influencerFee,
      effectiveDomesticShipping,
      fbaFee,
      totalCost,
      profit,
      marginRate,
      breakEvenROI,
    };
  }, [
    sellingPrice, productCost, domesticShipping, forwarderFee,
    lastMileShipping, influencerRate, exchangeRate, market,
  ]);

  return (
    <div className="space-y-6">
      {/* Market selector */}
      <div>
        <label className="mb-2 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>选择站点</label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {MARKETS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleMarketChange(m.id)}
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
        <p className="mt-1.5 flex items-start gap-1" style={{ fontSize: "13px", color: "#737373" }}>
          <Info className="mt-0.5 h-3 w-3 shrink-0" />
          {market.note}
        </p>
      </div>

      {/* Input grid */}
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          label={`售价（${market.currency}）`}
          value={sellingPrice}
          onChange={setSellingPrice}
          step={0.5}
        />
        <NumberInput
          label="汇率"
          value={exchangeRate}
          onChange={setExchangeRate}
          step={0.01}
          hint="可手动修改"
        />
        <NumberInput
          label="产品成本"
          value={productCost}
          onChange={setProductCost}
          suffix="¥"
        />
        <NumberInput
          label="一段运费（到货代）"
          value={domesticShipping}
          onChange={setDomesticShipping}
          suffix="¥"
        />
        <NumberInput
          label="货代费用"
          value={forwarderFee}
          onChange={setForwarderFee}
          suffix="¥"
        />
        <NumberInput
          label="三段运费（尾程）"
          value={lastMileShipping}
          onChange={setLastMileShipping}
          suffix="¥"
        />
        <NumberInput
          label="达人佣金"
          value={influencerRate}
          onChange={setInfluencerRate}
          suffix="%"
          hint="没有达人合作填0"
          step={1}
        />
      </div>

      {/* Result */}
      <div className="rounded-lg border border-border bg-muted/30 p-5 space-y-4">
        <h3 className="flex items-center gap-2 text-base font-medium" style={{ color: "#0a0a0a" }}>
          <Calculator className="h-4 w-4" />
          计算结果
        </h3>

        {/* Main result */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div className="rounded-lg bg-background p-3 border border-border/60">
            <p style={{ fontSize: "13px", color: "#737373" }}>单件利润</p>
            <p className={cn(
              "mt-1 text-xl font-medium",
              result.profit >= 0 ? "text-green-600" : "text-red-600"
            )}>
              ¥{result.profit.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-background p-3 border border-border/60">
            <p style={{ fontSize: "13px", color: "#737373" }}>毛利率</p>
            <p className={cn(
              "mt-1 text-xl font-medium",
              result.marginRate >= 0 ? "text-green-600" : "text-red-600"
            )}>
              {result.marginRate.toFixed(1)}%
            </p>
          </div>
          <div className="rounded-lg bg-background p-3 border border-border/60">
            <p style={{ fontSize: "13px", color: "#737373" }}>保本ROI</p>
            <p className="mt-1 text-xl font-medium" style={{ color: "#0a0a0a" }}>
              {result.breakEvenROI > 0 && result.breakEvenROI < 100
                ? result.breakEvenROI.toFixed(1)
                : "—"}
            </p>
          </div>
        </div>

        {/* Cost breakdown */}
        <div className="space-y-1.5" style={{ fontSize: "15px" }}>
          <div className="flex justify-between">
            <span style={{ color: "#737373" }}>售价折合人民币</span>
            <span className="font-medium">¥{result.revenueRMB.toFixed(2)}</span>
          </div>
          <div className="border-t border-border/40 my-2" />
          <div className="flex justify-between">
            <span style={{ color: "#737373" }}>产品成本</span>
            <span>-¥{productCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#737373" }}>
              运费合计{market.domesticShippingSubsidy ? "（国内运费已扣平台补贴50%）" : "（一段+货代+尾程）"}
            </span>
            <span>-¥{(result.effectiveDomesticShipping + forwarderFee + lastMileShipping).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#737373" }}>平台佣金（{(market.commissionRate * 100).toFixed(1)}%）</span>
            <span>-¥{result.commission.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "#737373" }}>交易手续费（{(market.transactionFeeRate * 100).toFixed(1)}%）</span>
            <span>-¥{result.transactionFee.toFixed(2)}</span>
          </div>
          {result.orderFee > 0 && (
            <div className="flex justify-between">
              <span style={{ color: "#737373" }}>订单处理费</span>
              <span>-¥{result.orderFee.toFixed(2)}</span>
            </div>
          )}
          {result.shippingSubsidy > 0 && (
            <div className="flex justify-between">
              <span style={{ color: "#737373" }}>包邮服务费（{(market.shippingSubsidyRate * 100).toFixed(1)}%）</span>
              <span>-¥{result.shippingSubsidy.toFixed(2)}</span>
            </div>
          )}
          {result.fbaFee > 0 && (
            <div className="flex justify-between">
              <span style={{ color: "#737373" }}>FBA配送费（${market.fbaFeeUSD}/件）</span>
              <span>-¥{result.fbaFee.toFixed(2)}</span>
            </div>
          )}
          {result.influencerFee > 0 && (
            <div className="flex justify-between">
              <span style={{ color: "#737373" }}>达人佣金（{influencerRate}%）</span>
              <span>-¥{result.influencerFee.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-border/40 my-2" />
          <div className="flex justify-between font-medium" style={{ color: "#0a0a0a" }}>
            <span>单件净利润</span>
            <span className={result.profit >= 0 ? "text-green-600" : "text-red-600"}>
              ¥{result.profit.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-lg bg-muted/30 p-4 space-y-1" style={{ fontSize: "13px", color: "#737373" }}>
        <p>💡 <strong>保本ROI</strong> = 1 ÷ 毛利率。投广告时ROI必须高于这个数才不亏。</p>
        <p>💡 以上费率为参考值，实际费率以各平台后台为准。</p>
        <p>💡 未包含：退货损耗、仓储费、代记账费、Amazon月费$39.99等隐性成本。</p>
      </div>
    </div>
  );
}
