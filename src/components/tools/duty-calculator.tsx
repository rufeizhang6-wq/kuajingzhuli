"use client";

import { useState } from "react";
import { FileText, Info } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 关税计算器（简化版）
 *
 * 目前数据有限，主要告知用户关税的存在和大致影响。
 * 覆盖：美区（de minimis $800）、泰国（2026涨关税）、其他东南亚。
 */

interface CountryDutyInfo {
  id: string;
  name: string;
  deMinimis: string;
  generalRate: string;
  notes: string[];
}

const COUNTRIES: CountryDutyInfo[] = [
  {
    id: "us",
    name: "美国",
    deMinimis: "$800",
    generalRate: "单件申报价值低于$800免关税",
    notes: [
      "美国有$800的 de minimis 免税线——单件包裹申报价值低于$800不用交关税",
      "大多数跨境电商商品都在免税线以下",
      "如果通过海外仓大批量进口，关税计算方式不同（整批申报）",
      "某些品类有额外关税（如纺织品、钢铝制品）",
    ],
  },
  {
    id: "th",
    name: "泰国",
    deMinimis: "约1500泰铢（约300元）",
    generalRate: "一般进口税率 0-30%，增值税 7%",
    notes: [
      "2026年泰国提高了跨境电商关税，不再推荐新手做泰国站",
      "低于1500泰铢的包裹可能免关税（政策变动中）",
      "增值税7%由平台代扣",
      "部分品类关税高达30%",
    ],
  },
  {
    id: "my",
    name: "马来西亚",
    deMinimis: "500马币（约800元）",
    generalRate: "一般进口税率 0-25%，销售税 10%",
    notes: [
      "低于500马币的包裹通常免进口税",
      "销售税(SST) 10%由平台代扣",
      "跨境电商通常走SLS官方物流，关税由平台处理",
    ],
  },
  {
    id: "ph",
    name: "菲律宾",
    deMinimis: "约10000比索（约1300元）",
    generalRate: "一般进口税率 0-30%，增值税 12%",
    notes: [
      "低于10000比索的包裹可能免进口税",
      "增值税12%由平台代扣",
      "跨境直邮走SLS官方物流时，关税由平台处理",
    ],
  },
];

export function DutyCalculator() {
  const [countryId, setCountryId] = useState("us");
  const [declaredValue, setDeclaredValue] = useState(15);

  const country = COUNTRIES.find((c) => c.id === countryId)!;

  return (
    <div className="space-y-6">
      {/* Country selector */}
      <div>
        <label className="mb-2 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>目的国</label>
        <div className="flex flex-wrap gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCountryId(c.id)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm font-medium transition-all",
                countryId === c.id
                  ? "border-primary bg-accent text-primary"
                  : "border-border hover:bg-muted"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Declared value */}
      <div>
        <label className="mb-1 block font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>商品申报价值（美金）</label>
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "15px", color: "#737373" }}>$</span>
          <input
            type="number"
            value={declaredValue || ""}
            onChange={(e) => setDeclaredValue(Number(e.target.value))}
            min={0}
            step={1}
            className="h-9 w-32 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Result */}
      <div className="rounded-lg border border-border bg-muted/30 p-5 space-y-4">
        <h3 className="flex items-center gap-2 text-base font-medium" style={{ color: "#0a0a0a" }}>
          <FileText className="h-4 w-4" />
          {country.name}关税参考
        </h3>

        <div className="rounded-lg bg-background p-4 border border-border/60">
          <p className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>免税线（De Minimis）</p>
          <p className="mt-1 text-2xl font-medium text-primary">{country.deMinimis}</p>
          <p className="mt-1" style={{ fontSize: "15px", color: "#737373" }}>{country.generalRate}</p>
        </div>

        {countryId === "us" && declaredValue > 0 && (
          <div className={cn(
            "rounded-lg p-4",
            declaredValue < 800
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          )} style={{ fontSize: "15px" }}>
            {declaredValue < 800
              ? `✅ 您的商品申报价值 $${declaredValue} 低于 $800 免税线，无需缴纳关税。`
              : `⚠️ 您的商品申报价值 $${declaredValue} 超过 $800 免税线，可能需要缴纳关税。具体税率取决于商品类别。`
            }
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>注意事项</h4>
          <ul className="space-y-1">
            {country.notes.map((note) => (
              <li key={note} className="flex items-start gap-2" style={{ fontSize: "15px", color: "#737373" }}>
                <span className="mt-1 shrink-0">•</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="rounded-lg bg-muted/30 p-3 space-y-1" style={{ fontSize: "13px", color: "#737373" }}>
        <p className="flex items-start gap-1">
          <Info className="mt-0.5 h-3 w-3 shrink-0" />
          关税政策随时可能变化，以上数据仅供参考。实际关税以海关征收为准。
        </p>
        <p>💡 通过平台官方物流（如SLS）发货时，关税通常由平台代扣代缴。</p>
        <p>📌 数据持续完善中，更多品类和国家的关税数据即将更新。</p>
      </div>
    </div>
  );
}
