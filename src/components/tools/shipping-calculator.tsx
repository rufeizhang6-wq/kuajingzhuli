"use client";

import { useState, useMemo } from "react";
import { Package, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 运费计算器
 *
 * 数据来源：
 *   - tiktok-framework-complete.md 美区物流费用表
 *   - tiktok-new-tutorials-analysis.md 东南亚站点运费数据
 */

interface Destination {
  id: string;
  name: string;
  rates: {
    label: string;
    baseWeight: number;
    baseCost: number;
    perKgExtra: number;
    transitDays: string;
    note?: string;
  }[];
}

const DESTINATIONS: Destination[] = [
  {
    id: "us",
    name: "美区",
    rates: [
      { label: "空运", baseWeight: 1000, baseCost: 60, perKgExtra: 60, transitDays: "2-3天到仓", note: "适合测品小批量" },
      { label: "海运快船", baseWeight: 1000, baseCost: 20, perKgExtra: 20, transitDays: "14-19天", note: "稳定出单后首选" },
      { label: "海运普通", baseWeight: 1000, baseCost: 10, perKgExtra: 10, transitDays: "30-40天", note: "大批量低值品" },
    ],
  },
  {
    id: "ph",
    name: "菲律宾",
    rates: [
      { label: "跨境直邮（500g内）", baseWeight: 500, baseCost: 28, perKgExtra: 30, transitDays: "7-15天" },
      { label: "跨境直邮（1kg）", baseWeight: 1000, baseCost: 45, perKgExtra: 30, transitDays: "7-15天" },
    ],
  },
  {
    id: "my",
    name: "马来西亚",
    rates: [
      { label: "跨境直邮（500g内）", baseWeight: 500, baseCost: 13, perKgExtra: 15, transitDays: "7-12天" },
      { label: "跨境直邮（1kg）", baseWeight: 1000, baseCost: 22, perKgExtra: 15, transitDays: "7-12天" },
    ],
  },
  {
    id: "th",
    name: "泰国",
    rates: [
      { label: "跨境直邮（500g内）", baseWeight: 500, baseCost: 11.8, perKgExtra: 14, transitDays: "7-12天" },
      { label: "跨境直邮（1kg）", baseWeight: 1000, baseCost: 20, perKgExtra: 14, transitDays: "7-12天" },
    ],
  },
  {
    id: "vn",
    name: "越南",
    rates: [
      { label: "跨境直邮（500g内）", baseWeight: 500, baseCost: 15.7, perKgExtra: 18, transitDays: "7-12天" },
    ],
  },
  {
    id: "sg",
    name: "新加坡",
    rates: [
      { label: "跨境直邮（500g内）", baseWeight: 500, baseCost: 42, perKgExtra: 45, transitDays: "5-10天", note: "运费极贵，不推荐小白" },
    ],
  },
];

const US_LAST_MILE = [
  { label: "USPS", cost: "4.6美金起（约33元）" },
  { label: "GoFor", cost: "2.88美金起（约21元）" },
  { label: "海外仓操作费", cost: "0.8-1.5美金/单（约6-11元）" },
];

export function ShippingCalculator() {
  const [destId, setDestId] = useState("us");
  const [weightGrams, setWeightGrams] = useState(500);

  const dest = DESTINATIONS.find((d) => d.id === destId)!;

  const results = useMemo(() => {
    const weightKg = weightGrams / 1000;
    return dest.rates.map((rate) => {
      let cost: number;
      if (weightGrams <= rate.baseWeight) {
        cost = rate.baseCost;
      } else {
        const extraKg = (weightGrams - rate.baseWeight) / 1000;
        cost = rate.baseCost + extraKg * rate.perKgExtra;
      }
      return { ...rate, estimatedCost: Math.round(cost * 100) / 100 };
    });
  }, [dest, weightGrams]);

  return (
    <div className="space-y-6">
      {/* Destination selector */}
      <div>
        <label className="mb-2 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>目的站点</label>
        <div className="flex flex-wrap gap-2">
          {DESTINATIONS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setDestId(d.id)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                destId === d.id
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:bg-muted"
              )}
            >
              {d.name}
            </button>
          ))}
        </div>
      </div>

      {/* Weight input */}
      <div>
        <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>产品重量</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={weightGrams || ""}
            onChange={(e) => setWeightGrams(Number(e.target.value))}
            min={1}
            step={100}
            className="h-9 w-32 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
          <span style={{ fontSize: "15px", color: "#737373" }}>克</span>
          <span style={{ fontSize: "13px", color: "#737373" }}>（{(weightGrams / 1000).toFixed(2)} kg）</span>
        </div>
        <p className="mt-1" style={{ fontSize: "13px", color: "#737373" }}>
          注意：如果体积重（长×宽×高÷6000）大于实际重量，按体积重计费
        </p>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <h3 className="flex items-center gap-2 font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>
          <Package className="h-4 w-4" />
          头程运费预估
        </h3>
        <div className="space-y-2">
          {results.map((r) => (
            <div key={r.label} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>{r.label}</p>
                  <p style={{ fontSize: "13px", color: "#737373" }}>时效：{r.transitDays}</p>
                  {r.note && <p style={{ fontSize: "13px", color: "#737373" }}>{r.note}</p>}
                </div>
                <p className="text-lg font-medium text-primary">¥{r.estimatedCost.toFixed(1)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* US last mile */}
      {destId === "us" && (
        <div className="space-y-3">
          <h3 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>美区尾程参考</h3>
          <div className="rounded-lg border border-border overflow-hidden">
            <table className="w-full" style={{ fontSize: "15px" }}>
              <tbody>
                {US_LAST_MILE.map((item) => (
                  <tr key={item.label} className="border-b border-border/40 last:border-0">
                    <td className="px-3 py-2" style={{ color: "#737373" }}>{item.label}</td>
                    <td className="px-3 py-2 text-right font-medium">{item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <p className="flex items-start gap-1" style={{ fontSize: "13px", color: "#737373" }}>
        <Info className="mt-0.5 h-3 w-3 shrink-0" />
        以上运费为行业均值参考，实际以物流商报价为准。体积重大于实际重量时按体积重计费。
      </p>
    </div>
  );
}
