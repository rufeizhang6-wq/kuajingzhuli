"use client";

import { useState, useMemo } from "react";
import { Boxes, AlertTriangle } from "lucide-react";
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

const shippingOptions = [
  { id: "sea", label: "海运", days: 35 },
  { id: "fast-sea", label: "快船", days: 17 },
  { id: "air", label: "空运", days: 10 },
];

export default function InventoryCalculatorPage() {
  const [dailySales, setDailySales] = useState(10);
  const [shippingDays, setShippingDays] = useState(35);
  const [productionDays, setProductionDays] = useState(7);
  const [currentStock, setCurrentStock] = useState(200);

  const result = useMemo(() => {
    const leadTime = shippingDays + productionDays;
    const safetyStock = Math.ceil(dailySales * leadTime * 1.5);
    const daysOfStock = dailySales > 0 ? Math.floor(currentStock / dailySales) : 0;
    const orderQty = Math.max(0, safetyStock - currentStock);
    const urgent = daysOfStock < leadTime;
    return { leadTime, safetyStock, daysOfStock, orderQty, urgent };
  }, [dailySales, shippingDays, productionDays, currentStock]);

  return (
    <>
      <PageHeader title="备货量计算器" description="安全库存+补货时机——避免断货亏排名或库存积压" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Num label="日均销量" value={dailySales} onChange={setDailySales} suffix="件/天" />
            <Num label="当前库存" value={currentStock} onChange={setCurrentStock} suffix="件" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">头程运输方式</label>
            <div className="flex gap-2">
              {shippingOptions.map((opt) => (
                <button key={opt.id} type="button" onClick={() => setShippingDays(opt.days)}
                  className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-all", shippingDays === opt.days ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>
                  {opt.label}（{opt.days}天）
                </button>
              ))}
            </div>
          </div>
          <Num label="工厂生产周期" value={productionDays} onChange={setProductionDays} suffix="天" />

          <div className={cn("rounded-xl border-2 p-5 space-y-4", result.urgent ? "border-red-200 bg-red-50/50" : "border-green-200 bg-green-50/50")}>
            <h3 className="flex items-center gap-2 text-base font-medium"><Boxes className="h-4 w-4" />{result.urgent ? "需要立即补货！" : "库存充足"}</h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">安全库存量</p>
                <p className="mt-1 text-xl font-medium">{result.safetyStock}<span className="text-sm text-muted-foreground">件</span></p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">现有库存可售</p>
                <p className={cn("mt-1 text-xl font-medium", result.urgent ? "text-red-600" : "text-green-600")}>{result.daysOfStock}<span className="text-sm text-muted-foreground">天</span></p>
              </div>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">总备货周期（运输+生产）</span><span className="font-medium">{result.leadTime}天</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">建议立即下单数量</span><span className="font-medium text-primary">{result.orderQty}件</span></div>
            </div>

            {result.urgent && (
              <div className="flex items-start gap-2 text-sm text-red-700">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>当前库存仅够{result.daysOfStock}天，但补货周期需要{result.leadTime}天。断货会严重损害排名，建议立即下单补货。</span>
              </div>
            )}
          </div>

          <div className="rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>安全库存 = 日销量 × (运输时间 + 生产周期) × 1.5（安全系数）。美区FBT建议分仓：美中50%+美东25%+美西25%。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
