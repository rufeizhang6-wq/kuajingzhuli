"use client";

import { useState, useMemo } from "react";
import { ShieldCheck, Check, AlertTriangle, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

interface CertItem { name: string; cost: string; cycle: string; required: boolean; condition?: string }

const certDatabase: CertItem[] = [
  { name: "CE认证", cost: "2000-5000元", cycle: "2-4周", required: true, condition: "electronic+eu" },
  { name: "UL认证", cost: "3500-7500元", cycle: "4-8周", required: true, condition: "electronic+us" },
  { name: "FCC认证", cost: "3000-6000元", cycle: "2-4周", required: true, condition: "wireless+us" },
  { name: "FDA注册", cost: "500-2000元", cycle: "1-2周", required: true, condition: "food-contact+us" },
  { name: "GPSR欧代", cost: "99-150元", cycle: "1-3天", required: true, condition: "eu" },
  { name: "土代", cost: "99-150元", cycle: "1-3天", required: true, condition: "turkey" },
  { name: "德国包装法注册", cost: "免费（自注册）", cycle: "2-3小时", required: true, condition: "eu" },
  { name: "MSDS安全数据表", cost: "500-1500元", cycle: "1-2周", required: true, condition: "battery" },
  { name: "UN38.3电池检测", cost: "2000-5000元", cycle: "2-4周", required: true, condition: "battery" },
  { name: "CPC儿童产品证书", cost: "1000-3000元", cycle: "2-4周", required: true, condition: "toy+us" },
  { name: "Prop 65加州警告", cost: "免费（贴标）", cycle: "即时", required: true, condition: "us" },
];

export default function ComplianceCheckerPage() {
  const [productType, setProductType] = useState("home");
  const [hasBattery, setHasBattery] = useState(false);
  const [hasLiquid, setHasLiquid] = useState(false);
  const [markets, setMarkets] = useState<string[]>(["us"]);
  const toggleMarket = (m: string) => setMarkets((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);

  const results = useMemo(() => {
    const tags = new Set<string>();
    if (["electronic", "wireless"].includes(productType)) tags.add("electronic");
    if (productType === "wireless") tags.add("wireless");
    if (productType === "toy") tags.add("toy");
    if (productType === "food-contact") tags.add("food-contact");
    if (hasBattery) tags.add("battery");
    markets.forEach((m) => tags.add(m));

    return certDatabase.filter((cert) => {
      if (!cert.condition) return true;
      const parts = cert.condition.split("+");
      return parts.every((p) => tags.has(p));
    });
  }, [productType, hasBattery, markets]);

  const blocked = hasLiquid || (hasBattery && ["electronic", "wireless"].includes(productType));
  const warnings: string[] = [];
  if (hasLiquid) warnings.push("液体/膏状/粉末类产品物流受限严重，多数货代不接，建议新手避开。");
  if (hasBattery) warnings.push("含锂电池产品需要MSDS+UN38.3，费用高且部分物流渠道拒收。");

  const productTypes = [
    { id: "home", label: "家居日用" }, { id: "electronic", label: "消费电子" },
    { id: "wireless", label: "无线产品" }, { id: "toy", label: "玩具" },
    { id: "clothing", label: "服装" }, { id: "beauty", label: "美妆" },
    { id: "food-contact", label: "食品接触" }, { id: "other", label: "其他" },
  ];
  const marketOptions = [
    { id: "us", label: "美国" }, { id: "eu", label: "欧盟" },
    { id: "sea", label: "东南亚" }, { id: "turkey", label: "土耳其" },
  ];

  return (
    <>
      <PageHeader title="合规资质检查" description="选品类和市场，生成需要的认证清单——上架前必查" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">产品类型</label>
            <div className="flex flex-wrap gap-2">
              {productTypes.map((t) => (
                <button key={t.id} type="button" onClick={() => setProductType(t.id)}
                  className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-all", productType === t.id ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>{t.label}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={hasBattery} onChange={(e) => setHasBattery(e.target.checked)} className="rounded" />含电池</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={hasLiquid} onChange={(e) => setHasLiquid(e.target.checked)} className="rounded" />含液体/膏状</label>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">目标市场（多选）</label>
            <div className="flex gap-2">
              {marketOptions.map((m) => (
                <button key={m.id} type="button" onClick={() => toggleMarket(m.id)}
                  className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-all", markets.includes(m.id) ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>{m.label}</button>
              ))}
            </div>
          </div>

          {warnings.length > 0 && (
            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 space-y-1.5">
              {warnings.map((w) => (
                <div key={w} className="flex items-start gap-2 text-sm text-amber-800"><AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /><span>{w}</span></div>
              ))}
            </div>
          )}

          <div className="rounded-xl border border-border/60 overflow-hidden">
            <div className="bg-muted/30 px-4 py-2.5 text-sm font-medium">需要的认证和资质（{results.length}项）</div>
            {results.length === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">该品类和市场组合无特殊认证要求。上架时遵守各平台基本规则即可。</div>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {results.map((cert) => (
                    <tr key={cert.name} className="border-t border-border/40">
                      <td className="px-4 py-2.5"><span className="font-medium">{cert.name}</span></td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{cert.cost}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{cert.cycle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
