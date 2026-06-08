"use client";

import { useState, useMemo } from "react";
import { AlertTriangle } from "lucide-react";
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

export default function PenaltySimulatorPage() {
  const [platform, setPlatform] = useState<"temu" | "shopee">("temu");
  const [monthlyOrders, setMonthlyOrders] = useState(100);
  const [avgPrice, setAvgPrice] = useState(50);
  const [complaintRate, setComplaintRate] = useState(3);
  const [lateRate, setLateRate] = useState(5);

  const temuResult = useMemo(() => {
    const complaints = Math.ceil(monthlyOrders * complaintRate / 100);
    const qualityScore = complaintRate <= 2 ? 80 : complaintRate <= 5 ? 55 : 30;
    const penalty5x = qualityScore < 60 ? complaints * avgPrice * 5 : 0;
    const riskLevel = qualityScore >= 60 ? "safe" : qualityScore >= 40 ? "danger" : "critical";
    return { complaints, qualityScore, penalty5x, riskLevel };
  }, [monthlyOrders, avgPrice, complaintRate]);

  const shopeeResult = useMemo(() => {
    const lateOrders = Math.ceil(monthlyOrders * lateRate / 100);
    const latePoints = lateRate > 7 ? 1 + Math.max(0, Math.floor((lateOrders - 30) / 30)) : 0;
    const complaintOrders = Math.ceil(monthlyOrders * complaintRate / 100);
    const totalPoints = latePoints;
    const frozen = totalPoints >= 15;
    const riskLevel = totalPoints === 0 ? "safe" : totalPoints < 10 ? "warning" : "danger";
    return { lateOrders, latePoints, complaintOrders, totalPoints, frozen, riskLevel };
  }, [monthlyOrders, lateRate, complaintRate]);

  const riskColors: Record<string, string> = { safe: "border-green-200 bg-green-50", warning: "border-amber-200 bg-amber-50", danger: "border-red-200 bg-red-50", critical: "border-red-300 bg-red-100" };

  return (
    <>
      <PageHeader title="罚款风险模拟" description="Temu/Shopee违规罚款金额预估——知道违规的代价有多大" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="flex gap-2">
            <button type="button" onClick={() => setPlatform("temu")} className={cn("rounded-lg border px-4 py-2 text-sm font-medium transition-all", platform === "temu" ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>Temu</button>
            <button type="button" onClick={() => setPlatform("shopee")} className={cn("rounded-lg border px-4 py-2 text-sm font-medium transition-all", platform === "shopee" ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>Shopee</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Num label="月订单量" value={monthlyOrders} onChange={setMonthlyOrders} suffix="单" />
            {platform === "temu" && <Num label="产品申报价" value={avgPrice} onChange={setAvgPrice} suffix="¥" />}
            <Num label="质量投诉率" value={complaintRate} onChange={setComplaintRate} suffix="%" hint="退货/差评/投诉占比" step={0.5} />
            {platform === "shopee" && <Num label="迟发率" value={lateRate} onChange={setLateRate} suffix="%" hint="台湾站阈值7%" step={0.5} />}
          </div>

          {platform === "temu" && (
            <div className={cn("rounded-xl border-2 p-5 space-y-3", riskColors[temuResult.riskLevel])}>
              <h3 className="flex items-center gap-2 text-base font-medium"><AlertTriangle className="h-4 w-4" />Temu风险评估</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">预估投诉订单</span><span className="font-medium">{temuResult.complaints}单</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">预估质量分</span><span className={cn("font-medium", temuResult.qualityScore < 60 ? "text-red-600" : "text-green-600")}>{temuResult.qualityScore}分</span></div>
                {temuResult.penalty5x > 0 && (
                  <div className="flex justify-between"><span className="text-red-700 font-medium">5倍赔付罚款</span><span className="text-red-700 font-medium text-lg">¥{temuResult.penalty5x.toLocaleString()}</span></div>
                )}
              </div>
              {temuResult.qualityScore < 60 && <p className="text-sm text-red-700 font-medium">质量分低于60会触发5倍赔付+不结算货款！</p>}
              {temuResult.qualityScore >= 60 && <p className="text-sm text-green-700">当前投诉率在安全范围内。</p>}
            </div>
          )}

          {platform === "shopee" && (
            <div className={cn("rounded-xl border-2 p-5 space-y-3", riskColors[shopeeResult.riskLevel])}>
              <h3 className="flex items-center gap-2 text-base font-medium"><AlertTriangle className="h-4 w-4" />Shopee风险评估</h3>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">迟发订单</span><span className="font-medium">{shopeeResult.lateOrders}单</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">预估扣分</span><span className={cn("font-medium", shopeeResult.totalPoints >= 10 ? "text-red-600" : "")}>{shopeeResult.totalPoints}分</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">是否冻结</span><span className={cn("font-medium", shopeeResult.frozen ? "text-red-600" : "text-green-600")}>{shopeeResult.frozen ? "是（≥15分）" : "否"}</span></div>
              </div>
              <p className="text-xs text-muted-foreground">扣分按季度重置（1/4/7/10月）。2026年AI自动检测90分钟内触发。A类禁售品3分/次无上限。</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
