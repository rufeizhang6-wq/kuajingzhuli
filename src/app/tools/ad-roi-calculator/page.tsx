"use client";

import { useState, useMemo } from "react";
import { Target, Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const platforms = [
  { id: "tiktok", name: "TikTok", cvrHint: "5%", currency: "USD", rate: 7.2 },
  { id: "shopee", name: "Shopee", cvrHint: "5%", currency: "TWD", rate: 0.22 },
  { id: "amazon", name: "Amazon", cvrHint: "10%", currency: "USD", rate: 7.2 },
];

function Num({ label, value, onChange, suffix, hint, step = 1 }: { label: string; value: number; onChange: (v: number) => void; suffix?: string; hint?: string; step?: number }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <div className="flex items-center gap-1">
        <input type="number" value={value || ""} onChange={(e) => onChange(Number(e.target.value))} step={step} min={0} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring" />
        {suffix && <span className="shrink-0 text-sm text-muted-foreground">{suffix}</span>}
      </div>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

export default function AdRoiCalculatorPage() {
  const [platformId, setPlatformId] = useState("tiktok");
  const [sellingPrice, setSellingPrice] = useState(25);
  const [grossProfit, setGrossProfit] = useState(8);
  const [cpc, setCpc] = useState(0.5);
  const [cvr, setCvr] = useState(5);

  const platform = platforms.find((p) => p.id === platformId)!;
  const grossProfitRMB = grossProfit * platform.rate;
  const sellingPriceRMB = sellingPrice * platform.rate;

  const result = useMemo(() => {
    const marginRate = sellingPriceRMB > 0 ? grossProfitRMB / sellingPriceRMB : 0;
    const breakEvenROI = marginRate > 0 ? 1 / marginRate : 0;
    const breakEvenACOS = marginRate * 100;
    const breakEvenCPC = (cvr / 100) * grossProfitRMB;
    const clickWarning = cpc > 0 ? grossProfitRMB / (cpc * platform.rate) : 0;
    const minCVR = clickWarning > 0 ? (1 / clickWarning) * 100 : 0;
    const dailyBudget = cpc * platform.rate * 20;
    const isProfitable = cpc * platform.rate < breakEvenCPC;

    return { marginRate, breakEvenROI, breakEvenACOS, breakEvenCPC, clickWarning, minCVR, dailyBudget, isProfitable };
  }, [sellingPriceRMB, grossProfitRMB, cpc, cvr, platform.rate]);

  return (
    <>
      <PageHeader title="广告ROI计算器" description="算清楚广告怎么投才不亏——保本ROI/ACOS/CPC一键计算" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">选择平台</label>
            <div className="flex gap-2">
              {platforms.map((p) => (
                <button key={p.id} type="button" onClick={() => { setPlatformId(p.id); setCvr(parseFloat(p.cvrHint)); }}
                  className={cn("rounded-lg border px-4 py-2 text-sm font-medium transition-all", platformId === p.id ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Num label={`售价（${platform.currency}）`} value={sellingPrice} onChange={setSellingPrice} step={0.5} />
            <Num label={`单件毛利润（${platform.currency}）`} value={grossProfit} onChange={setGrossProfit} step={0.5} hint="售价减去所有成本后" />
            <Num label={`广告CPC出价（${platform.currency}）`} value={cpc} onChange={setCpc} step={0.01} />
            <Num label="预估转化率" value={cvr} onChange={setCvr} suffix="%" hint={`参考值：${platform.cvrHint}`} step={0.5} />
          </div>

          <div className={cn("rounded-xl border-2 p-5 space-y-4", result.isProfitable ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50")}>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              <h3 className="text-base font-medium">{result.isProfitable ? "当前设置可盈利" : "当前设置会亏损"}</h3>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">保本ROI</p>
                <p className="mt-1 text-xl font-medium">{result.breakEvenROI > 0 ? result.breakEvenROI.toFixed(1) : "—"}</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">保本ACOS</p>
                <p className="mt-1 text-xl font-medium">{result.breakEvenACOS > 0 ? result.breakEvenACOS.toFixed(0) + "%" : "—"}</p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">保本CPC</p>
                <p className="mt-1 text-xl font-medium">¥{result.breakEvenCPC.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">毛利率</span><span className="font-medium">{(result.marginRate * 100).toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">点击预警值</span><span className="font-medium">{result.clickWarning > 0 ? Math.floor(result.clickWarning) + "次点击" : "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">最低转化率要求</span><span className="font-medium">{result.minCVR > 0 ? result.minCVR.toFixed(1) + "%" : "—"}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">日预算建议（CPC×20）</span><span className="font-medium">¥{result.dailyBudget.toFixed(0)}</span></div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4 space-y-1 text-xs text-muted-foreground">
            <p><strong>保本ROI</strong> = 1÷毛利率。广告ROI必须高于此才盈利。</p>
            <p><strong>点击预警值</strong> = 毛利润÷CPC。超过这个点击数无转化就该暂停该关键词。</p>
            <p><strong>保本CPC</strong> = 转化率×毛利润。出价超过此值就亏。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
