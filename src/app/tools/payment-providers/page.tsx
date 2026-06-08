"use client";

import { useState, useMemo } from "react";
import { CreditCard, Star } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const providers = [
  { name: "连连支付", rate: 0.007, hiddenLoss: 0, speed: "快", platforms: "全部", stars: 5, note: "跨境卖家用得最多，中文界面，客服快" },
  { name: "网易支付", rate: 0.006, hiddenLoss: 0, speed: "最快（1秒）", platforms: "Amazon", stars: 5, note: "费率最低，可谈到0.4%，Amazon首选" },
  { name: "万里汇", rate: 0.005, hiddenLoss: 0.002, speed: "中等", platforms: "全部", stars: 4, note: "阿里旗下，费率低但需确认汇率差" },
  { name: "PingPong", rate: 0.01, hiddenLoss: 0.003, speed: "中等", platforms: "全部", stars: 3, note: "实际成本约1.3%（含汇率差）" },
  { name: "Payoneer", rate: 0.015, hiddenLoss: 0.005, speed: "较慢", platforms: "全部", stars: 3, note: "老牌但贵，国际平台通用性强" },
];

export default function PaymentProvidersPage() {
  const [monthlySales, setMonthlySales] = useState(10000);

  const results = useMemo(() => {
    return providers.map((p) => {
      const totalRate = p.rate + p.hiddenLoss;
      const monthlyCost = monthlySales * totalRate;
      return { ...p, totalRate, monthlyCost };
    });
  }, [monthlySales]);

  const cheapest = results.reduce((min, r) => r.monthlyCost < min.monthlyCost ? r : min, results[0]);

  return (
    <>
      <PageHeader title="收款工具对比" description="连连/网易/PingPong/Payoneer/万里汇——费率+隐藏成本对比" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium">月销售额（元）</label>
            <input type="number" value={monthlySales || ""} onChange={(e) => setMonthlySales(Number(e.target.value))} step={1000} min={0} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring" />
            <p className="mt-0.5 text-xs text-muted-foreground">输入月销售额，计算各工具的实际费用差异</p>
          </div>

          <div className="space-y-3">
            {results.map((r) => (
              <div key={r.name} className={cn("rounded-xl border p-4 space-y-2", r.name === cheapest.name ? "border-primary/30 bg-accent/20 shadow-sm" : "border-border/60")}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium">{r.name}</h3>
                      {r.name === cheapest.name && <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary">最省</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.note}</p>
                  </div>
                  <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} className={cn("h-3 w-3", i < r.stars ? "fill-primary text-primary" : "fill-muted text-muted")} />))}</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div><span className="text-muted-foreground">明面费率</span><p className="font-medium">{(r.rate * 100).toFixed(1)}%</p></div>
                  <div><span className="text-muted-foreground">汇率损耗</span><p className="font-medium">{r.hiddenLoss > 0 ? `~${(r.hiddenLoss * 100).toFixed(1)}%` : "无"}</p></div>
                  <div><span className="text-muted-foreground">到账速度</span><p className="font-medium">{r.speed}</p></div>
                  <div><span className="text-muted-foreground">月费用</span><p className="font-medium text-primary">¥{r.monthlyCost.toFixed(0)}</p></div>
                </div>
                <p className="text-xs text-muted-foreground">适合平台：{r.platforms}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>费率数据为2026年参考值。部分收款工具有隐藏汇率损耗（按实时中间价vs平台汇率差），选之前问清楚"汇率是按实时中间价还是有差价"。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
