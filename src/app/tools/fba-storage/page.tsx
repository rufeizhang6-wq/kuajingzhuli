"use client";

import { useState, useMemo } from "react";
import { Warehouse, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

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

export default function FbaStoragePage() {
  const [lengthIn, setLengthIn] = useState(10);
  const [widthIn, setWidthIn] = useState(8);
  const [heightIn, setHeightIn] = useState(4);
  const [qty, setQty] = useState(100);
  const [months, setMonths] = useState(3);
  const [season, setSeason] = useState<"off" | "peak">("off");

  const result = useMemo(() => {
    const cubicFtPerUnit = (lengthIn * widthIn * heightIn) / 1728;
    const totalCubicFt = cubicFtPerUnit * qty;
    const offRate = 0.87;
    const peakRate = 2.40;
    const rate = season === "peak" ? peakRate : offRate;
    const monthlyFee = totalCubicFt * rate;
    const totalFee = monthlyFee * months;
    const over365MonthlyFee = totalCubicFt * rate * 10;
    return { cubicFtPerUnit, totalCubicFt, rate, monthlyFee, totalFee, over365MonthlyFee };
  }, [lengthIn, widthIn, heightIn, qty, months, season]);

  return (
    <>
      <PageHeader title="FBA仓储费计算器" description="Amazon FBA仓储费预估——库存别放超365天" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Num label="长" value={lengthIn} onChange={setLengthIn} suffix="英寸" step={0.5} />
            <Num label="宽" value={widthIn} onChange={setWidthIn} suffix="英寸" step={0.5} />
            <Num label="高" value={heightIn} onChange={setHeightIn} suffix="英寸" step={0.5} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Num label="库存数量" value={qty} onChange={setQty} />
            <Num label="预计存放" value={months} onChange={setMonths} suffix="个月" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">存放时段</label>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSeason("off")} className={cn("rounded-lg border px-4 py-2 text-sm font-medium transition-all", season === "off" ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>淡季（1-9月）$0.87</button>
              <button type="button" onClick={() => setSeason("peak")} className={cn("rounded-lg border px-4 py-2 text-sm font-medium transition-all", season === "peak" ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>旺季（10-12月）$2.40</button>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-5 space-y-4">
            <h3 className="flex items-center gap-2 text-base font-medium"><Warehouse className="h-4 w-4" />计算结果</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">单件体积</p>
                <p className="mt-1 text-xl font-medium">{result.cubicFtPerUnit.toFixed(3)}<span className="text-sm text-muted-foreground">ft³</span></p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">总体积</p>
                <p className="mt-1 text-xl font-medium">{result.totalCubicFt.toFixed(1)}<span className="text-sm text-muted-foreground">ft³</span></p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">月仓储费</span><span className="font-medium">${result.monthlyFee.toFixed(2)}</span></div>
              <div className="flex justify-between font-medium"><span>{months}个月总费用</span><span className="text-primary text-lg">${result.totalFee.toFixed(2)}</span></div>
            </div>

            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3 flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
              <div className="text-sm text-red-800">
                <p className="font-medium">超365天仓储费暴涨约10倍</p>
                <p>如果这批库存放超1年，月仓储费将变为 <strong>${result.over365MonthlyFee.toFixed(2)}/月</strong></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
