"use client";

import { useState, useMemo } from "react";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const platformCycles = [
  { id: "temu", name: "Temu全托管", settleDays: 15, settleUnit: "个工作日", shippingDays: 7, note: "签收后T+15个工作日，实际约30-45天到账" },
  { id: "tiktok-new", name: "TikTok（新店）", settleDays: 31, settleUnit: "天", shippingDays: 14, note: "签收后T+31天。出新手村后可缩短到T+1天" },
  { id: "tiktok-standard", name: "TikTok（标准）", settleDays: 8, settleUnit: "天", shippingDays: 14, note: "签收后T+8天" },
  { id: "tiktok-fast", name: "TikTok（≥4.0分）", settleDays: 1, settleUnit: "天", shippingDays: 14, note: "签收后T+1天，最快回款" },
  { id: "shopee", name: "Shopee", settleDays: 14, settleUnit: "天", shippingDays: 10, note: "每月2次结算（月初+月中），有2周结算窗口" },
  { id: "amazon", name: "Amazon", settleDays: 14, settleUnit: "天", shippingDays: 0, note: "每14天结算一次。FBA配送由Amazon处理，无额外物流时间" },
];

export default function PaymentCyclePage() {
  const [platformId, setPlatformId] = useState("temu");
  const [orderDate, setOrderDate] = useState(() => new Date().toISOString().split("T")[0]);

  const platform = platformCycles.find((p) => p.id === platformId)!;

  const timeline = useMemo(() => {
    const order = new Date(orderDate);
    const delivery = new Date(order);
    delivery.setDate(delivery.getDate() + platform.shippingDays);
    const settlement = new Date(delivery);
    settlement.setDate(settlement.getDate() + platform.settleDays);
    const totalDays = Math.ceil((settlement.getTime() - order.getTime()) / (1000 * 60 * 60 * 24));
    return { order, delivery, settlement, totalDays };
  }, [orderDate, platform]);

  const fmt = (d: Date) => d.toLocaleDateString("zh-CN", { month: "numeric", day: "numeric" });

  return (
    <>
      <PageHeader title="回款周期计算器" description="出了单什么时候拿到钱——各平台结算时间线" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">选择平台</label>
            <div className="flex flex-wrap gap-2">
              {platformCycles.map((p) => (
                <button key={p.id} type="button" onClick={() => setPlatformId(p.id)}
                  className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-all", platformId === p.id ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">出单日期</label>
            <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring" />
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-5 space-y-4">
            <h3 className="flex items-center gap-2 text-base font-medium"><Clock className="h-4 w-4" />时间线</h3>
            <div className="relative pl-6 space-y-4">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
              {[
                { label: "下单", date: timeline.order, color: "bg-blue-500" },
                { label: "预计签收", date: timeline.delivery, color: "bg-amber-500" },
                { label: "预计到账", date: timeline.settlement, color: "bg-green-500" },
              ].map((step) => (
                <div key={step.label} className="relative flex items-center gap-3">
                  <div className={cn("absolute -left-4 h-3 w-3 rounded-full border-2 border-white", step.color)} />
                  <div>
                    <p className="text-sm font-medium">{step.label}</p>
                    <p className="text-xs text-muted-foreground">{fmt(step.date)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border/40 pt-3 space-y-1 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">资金占用天数</span><span className="font-medium text-primary text-lg">{timeline.totalDays}天</span></div>
              <p className="text-xs text-muted-foreground">{platform.note}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
