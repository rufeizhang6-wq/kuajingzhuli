"use client";

import { useState, useMemo } from "react";
import { Ruler } from "lucide-react";
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

export default function DimensionalWeightPage() {
  const [length, setLength] = useState(30);
  const [width, setWidth] = useState(20);
  const [height, setHeight] = useState(15);
  const [actualWeight, setActualWeight] = useState(500);
  const [perBox, setPerBox] = useState(10);

  const result = useMemo(() => {
    const volWeightKg = (length * width * height) / 6000;
    const actualKg = actualWeight / 1000;
    const chargeWeight = Math.max(volWeightKg, actualKg);
    const isVolumetric = volWeightKg > actualKg;
    const boxVolWeight = volWeightKg * perBox;
    const boxActualWeight = actualKg * perBox;
    const boxChargeWeight = Math.max(boxVolWeight, boxActualWeight);
    const seaFreight = chargeWeight * 6;
    const airFreight = chargeWeight * 60;
    return { volWeightKg, actualKg, chargeWeight, isVolumetric, boxVolWeight, boxActualWeight, boxChargeWeight, seaFreight, airFreight };
  }, [length, width, height, actualWeight, perBox]);

  return (
    <>
      <PageHeader title="体积重计算器" description="FBA/FBT发货前算清体积重——避免超重罚款（可达$100/单）" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="grid grid-cols-3 gap-3">
            <Num label="长" value={length} onChange={setLength} suffix="cm" />
            <Num label="宽" value={width} onChange={setWidth} suffix="cm" />
            <Num label="高" value={height} onChange={setHeight} suffix="cm" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Num label="实际重量" value={actualWeight} onChange={setActualWeight} suffix="g" />
            <Num label="每箱件数" value={perBox} onChange={setPerBox} />
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-5 space-y-4">
            <h3 className="flex items-center gap-2 text-base font-medium"><Ruler className="h-4 w-4" />计算结果</h3>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">体积重</p>
                <p className="mt-1 text-xl font-medium">{result.volWeightKg.toFixed(2)}<span className="text-sm text-muted-foreground">kg</span></p>
              </div>
              <div className="rounded-lg bg-white p-3 border border-border/40">
                <p className="text-xs text-muted-foreground">实际重</p>
                <p className="mt-1 text-xl font-medium">{result.actualKg.toFixed(2)}<span className="text-sm text-muted-foreground">kg</span></p>
              </div>
              <div className={cn("rounded-lg p-3 border", result.isVolumetric ? "bg-amber-50 border-amber-200" : "bg-green-50 border-green-200")}>
                <p className="text-xs text-muted-foreground">计费重量</p>
                <p className="mt-1 text-xl font-medium">{result.chargeWeight.toFixed(2)}<span className="text-sm text-muted-foreground">kg</span></p>
              </div>
            </div>

            <p className={cn("text-sm font-medium text-center", result.isVolumetric ? "text-amber-700" : "text-green-700")}>
              {result.isVolumetric ? "按体积重计费（体积重>实重，运费更贵）" : "按实际重量计费"}
            </p>

            <div className="border-t border-border/40 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">整箱计费重量（{perBox}件）</span><span className="font-medium">{result.boxChargeWeight.toFixed(2)}kg</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">预估海运运费（~6元/kg）</span><span className="font-medium">¥{(result.seaFreight * perBox).toFixed(0)}/箱</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">预估空运运费（~60元/kg）</span><span className="font-medium">¥{(result.airFreight * perBox).toFixed(0)}/箱</span></div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>公式：体积重(kg) = 长(cm) × 宽(cm) × 高(cm) ÷ 6000。计费重量取实际重量和体积重的较大值。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
