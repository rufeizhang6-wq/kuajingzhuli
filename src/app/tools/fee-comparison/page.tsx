"use client";

import { useState, useMemo } from "react";
import { GitCompare } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

function Num({ label, value, onChange, suffix, step = 1 }: { label: string; value: number; onChange: (v: number) => void; suffix?: string; step?: number }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-1">
        <input type="number" value={value || ""} onChange={(e) => onChange(Number(e.target.value))} step={step} min={0} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring" />
        {suffix && <span className="shrink-0 text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}

const platformFees = [
  { id: "temu", name: "Temu", commission: 0.15, otherRate: 0, fixedFee: 0, shippingNote: "国内运费50%补贴", currency: "CNY", rate: 1 },
  { id: "tiktok-sea", name: "TK东南亚", commission: 0.05, otherRate: 0.02, fixedFee: 2.16, shippingNote: "FBT配送费", currency: "USD", rate: 7.2 },
  { id: "shopee", name: "Shopee", commission: 0.14, otherRate: 0.105, fixedFee: 0, shippingNote: "SLS运费", currency: "TWD", rate: 0.22 },
  { id: "tiktok-us", name: "TK美区", commission: 0.05, otherRate: 0.02, fixedFee: 2.16, shippingNote: "FBT配送费", currency: "USD", rate: 7.2 },
  { id: "amazon", name: "Amazon", commission: 0.15, otherRate: 0, fixedFee: 23.18, shippingNote: "FBA $3.22/件", currency: "USD", rate: 7.2 },
];

export default function FeeComparisonPage() {
  const [cost, setCost] = useState(30);
  const [weight, setWeight] = useState(300);
  const [temuPrice, setTemuPrice] = useState(50);
  const [seaPrice, setSeaPrice] = useState(5);
  const [shopeePrice, setShopeePrice] = useState(200);
  const [usPrice, setUsPrice] = useState(15);
  const [amazonPrice, setAmazonPrice] = useState(20);

  const prices: Record<string, number> = { temu: temuPrice, "tiktok-sea": seaPrice, shopee: shopeePrice, "tiktok-us": usPrice, amazon: amazonPrice };

  const results = useMemo(() => {
    return platformFees.map((p) => {
      const price = prices[p.id] || 0;
      const revenueRMB = price * p.rate;
      const commissionRMB = revenueRMB * p.commission;
      const otherFeesRMB = revenueRMB * p.otherRate;
      const fixedRMB = p.fixedFee;
      const totalFees = commissionRMB + otherFeesRMB + fixedRMB;
      const profit = revenueRMB - cost - totalFees;
      const marginRate = revenueRMB > 0 ? (profit / revenueRMB) * 100 : 0;
      return { ...p, price, revenueRMB, totalFees, profit, marginRate };
    }).sort((a, b) => b.profit - a.profit);
  }, [cost, prices]);

  const bestId = results[0]?.id;

  return (
    <>
      <PageHeader title="平台费率对比" description="同一产品在5个平台的费率和利润对比——一眼看出哪里赚最多" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <Num label="产品采购成本" value={cost} onChange={setCost} suffix="¥" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Num label="Temu售价（¥）" value={temuPrice} onChange={setTemuPrice} />
            <Num label="TK东南亚（$）" value={seaPrice} onChange={setSeaPrice} step={0.5} />
            <Num label="Shopee（TWD）" value={shopeePrice} onChange={setShopeePrice} />
            <Num label="TK美区（$）" value={usPrice} onChange={setUsPrice} step={0.5} />
            <Num label="Amazon（$）" value={amazonPrice} onChange={setAmazonPrice} step={0.5} />
          </div>

          <div className="rounded-xl border border-border/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b bg-muted/30"><th className="px-3 py-2.5 text-left font-medium">平台</th><th className="px-3 py-2.5 text-right font-medium">收入(¥)</th><th className="px-3 py-2.5 text-right font-medium">费用(¥)</th><th className="px-3 py-2.5 text-right font-medium">利润(¥)</th><th className="px-3 py-2.5 text-right font-medium">利润率</th></tr></thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.id} className={cn("border-b border-border/40 last:border-0", r.id === bestId && "bg-green-50/50")}>
                    <td className="px-3 py-2.5 font-medium">{r.name}{r.id === bestId && <span className="ml-1 text-xs text-green-600">最优</span>}</td>
                    <td className="px-3 py-2.5 text-right">¥{r.revenueRMB.toFixed(1)}</td>
                    <td className="px-3 py-2.5 text-right text-muted-foreground">-¥{r.totalFees.toFixed(1)}</td>
                    <td className={cn("px-3 py-2.5 text-right font-medium", r.profit >= 0 ? "text-green-600" : "text-red-600")}>¥{r.profit.toFixed(1)}</td>
                    <td className={cn("px-3 py-2.5 text-right", r.marginRate >= 0 ? "text-green-600" : "text-red-600")}>{r.marginRate.toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>费率参考：Temu佣金15%、TikTok佣金5%+交易费2%+$0.3/单、Shopee总扣费24.5%、Amazon佣金15%+FBA$3.22/件。实际费率以各平台为准。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
