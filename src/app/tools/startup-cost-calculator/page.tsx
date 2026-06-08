"use client";

import { useState } from "react";
import { Wallet, Check, X } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

interface CostItem { name: string; min: number; max: number; required: boolean; note?: string; condition?: string }

const platformCosts: Record<string, { name: string; items: CostItem[] }> = {
  temu: { name: "Temu全托管", items: [
    { name: "营业执照（个体户）", min: 0, max: 150, required: false, note: "个人身份证也能开店" },
    { name: "热敏打印机", min: 200, max: 300, required: true },
    { name: "打包耗材", min: 50, max: 100, required: true },
    { name: "保证金", min: 1000, max: 1000, required: true, note: "可从货款冻结，不必预缴" },
    { name: "首批备货（20-30品）", min: 2000, max: 3000, required: true },
    { name: "欧代办理", min: 99, max: 150, required: false, note: "卖欧洲站需要" },
  ]},
  "tiktok-sea": { name: "TikTok东南亚", items: [
    { name: "个体户执照代办", min: 200, max: 300, required: true },
    { name: "手机+网络环境", min: 1000, max: 1500, required: true },
    { name: "保证金", min: 650, max: 650, required: false, note: "前90天免缴" },
    { name: "首批备货", min: 3000, max: 5000, required: true },
    { name: "广告测试费", min: 500, max: 1000, required: false },
    { name: "收款账户开通", min: 0, max: 0, required: true, note: "提现费率0.7%" },
  ]},
  shopee: { name: "Shopee", items: [
    { name: "营业执照", min: 200, max: 500, required: true },
    { name: "收款账户", min: 0, max: 0, required: true, note: "提现费率0.7%" },
    { name: "首批铺品（50SKU）", min: 2000, max: 5000, required: true },
    { name: "保证金", min: 3000, max: 3000, required: false, note: "前3个月免缴" },
    { name: "ERP工具", min: 0, max: 100, required: false, note: "免费版够用" },
  ]},
  "tiktok-us": { name: "TikTok美区", items: [
    { name: "企业营业执照", min: 300, max: 500, required: true },
    { name: "代记账/报税", min: 2000, max: 5000, required: true, note: "年费" },
    { name: "保证金", min: 10800, max: 10800, required: true, note: "$1500" },
    { name: "手机+网络环境", min: 1000, max: 1500, required: true },
    { name: "紫鸟浏览器+IP", min: 70, max: 200, required: true, note: "月费" },
    { name: "首批FBT备货", min: 5000, max: 15000, required: true },
    { name: "投流测试", min: 1000, max: 3000, required: false },
  ]},
  amazon: { name: "Amazon", items: [
    { name: "企业营业执照", min: 300, max: 500, required: true },
    { name: "月费（专业卖家）", min: 290, max: 290, required: true, note: "$39.99/月" },
    { name: "VPS环境（阿里云）", min: 300, max: 300, required: true, note: "月费" },
    { name: "VISA/MasterCard信用卡", min: 0, max: 0, required: true, note: "已有则免费" },
    { name: "选品工具", min: 0, max: 3700, required: false, note: "年费，可先用免费版" },
    { name: "首批FBA备货", min: 10000, max: 30000, required: true },
    { name: "商标注册", min: 2000, max: 4000, required: false, note: "品牌备案用" },
    { name: "收款账户", min: 0, max: 0, required: true, note: "费率0.3%-0.8%" },
  ]},
};

export default function StartupCostCalculatorPage() {
  const [platformId, setPlatformId] = useState("temu");
  const [hasLicense, setHasLicense] = useState(false);
  const [includeOptional, setIncludeOptional] = useState(false);

  const platform = platformCosts[platformId];
  const items = platform.items;

  const totalMin = items.reduce((sum, item) => {
    if (!item.required && !includeOptional) return sum;
    if (item.name.includes("营业执照") && hasLicense) return sum;
    return sum + item.min;
  }, 0);

  const totalMax = items.reduce((sum, item) => {
    if (!item.required && !includeOptional) return sum;
    if (item.name.includes("营业执照") && hasLicense) return sum;
    return sum + item.max;
  }, 0);

  return (
    <>
      <PageHeader title="启动资金计算器" description="选择平台，逐项计算启动费用——到底要准备多少钱" back={{ label: "工具箱", href: "/tools" }} center={false} />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium">选择平台</label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(platformCosts).map(([id, p]) => (
                <button key={id} type="button" onClick={() => setPlatformId(id)}
                  className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-all", platformId === id ? "border-primary bg-accent text-primary" : "border-border hover:bg-muted")}>
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={hasLicense} onChange={(e) => setHasLicense(e.target.checked)} className="rounded" />
              已有营业执照
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={includeOptional} onChange={(e) => setIncludeOptional(e.target.checked)} className="rounded" />
              包含可选项
            </label>
          </div>

          <div className="rounded-xl border border-border/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-4 py-2.5 text-left font-medium">费用项</th>
                  <th className="px-4 py-2.5 text-right font-medium">金额</th>
                  <th className="px-4 py-2.5 text-center font-medium w-16">类型</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const skipped = item.name.includes("营业执照") && hasLicense;
                  const hidden = !item.required && !includeOptional;
                  if (hidden) return null;
                  return (
                    <tr key={item.name} className={cn("border-b border-border/40 last:border-0", skipped && "opacity-40 line-through")}>
                      <td className="px-4 py-2.5">
                        <span>{item.name}</span>
                        {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium whitespace-nowrap">
                        {item.min === item.max ? `¥${item.min.toLocaleString()}` : item.max === 0 ? "免费" : `¥${item.min.toLocaleString()}-${item.max.toLocaleString()}`}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {item.required ? <span className="text-xs text-red-500">必须</span> : <span className="text-xs text-muted-foreground">可选</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-primary/5">
                  <td className="px-4 py-3 font-medium">总计{includeOptional ? "（含可选）" : "（仅必须）"}</td>
                  <td className="px-4 py-3 text-right text-lg font-medium text-primary" colSpan={2}>
                    {totalMin === totalMax ? `¥${totalMin.toLocaleString()}` : `¥${totalMin.toLocaleString()} - ${totalMax.toLocaleString()}`}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground">
            <p>费用数据来源于2026年各平台官方标准和实操验证。实际费用可能因地区和政策变化而不同。</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
