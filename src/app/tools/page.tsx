import type { Metadata } from "next";
import Link from "next/link";
import {
  Calculator, Package, FileText, Target, ArrowRight, BarChart3,
  Wallet, AlertTriangle, GitCompare, ShieldCheck, Boxes,
  Clock, Ruler, CreditCard, Warehouse,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "工具箱",
  description: "14个跨境电商实操工具——利润计算、广告ROI、启动资金、费率对比、合规检查、备货量、FBA仓储费。",
};

const toolGroups = [
  {
    title: "财务计算",
    tools: [
      { href: "/tools/profit-calculator", icon: Calculator, name: "利润计算器", description: "输入售价和成本，自动算每单真实利润。支持反向计算建议售价。", color: "bg-blue-50 text-blue-600" },
      { href: "/tools/ad-roi-calculator", icon: Target, name: "广告ROI计算器", description: "保本ROI/ACOS/CPC计算，知道广告怎么投才不亏。", color: "bg-indigo-50 text-indigo-600" },
      { href: "/tools/startup-cost-calculator", icon: Wallet, name: "启动资金计算器", description: "5个平台逐项列出启动费用，算清楚要准备多少钱。", color: "bg-emerald-50 text-emerald-600" },
      { href: "/tools/fba-storage", icon: Warehouse, name: "FBA仓储费计算器", description: "Amazon FBA仓储费预估，避免超365天的费用暴涨。", color: "bg-amber-50 text-amber-600" },
    ],
  },
  {
    title: "物流计算",
    tools: [
      { href: "/tools/shipping-calculator", icon: Package, name: "运费计算器", description: "根据重量和站点预估头程和尾程运费。", color: "bg-orange-50 text-orange-600" },
      { href: "/tools/duty-calculator", icon: FileText, name: "关税计算器", description: "各目的国免税线和大致关税影响。", color: "bg-purple-50 text-purple-600" },
      { href: "/tools/dimensional-weight", icon: Ruler, name: "体积重计算器", description: "FBA/FBT发货体积重计算，避免超重罚款。", color: "bg-cyan-50 text-cyan-600" },
      { href: "/tools/inventory-calculator", icon: Boxes, name: "备货量计算器", description: "安全库存+补货时机，避免断货或积压。", color: "bg-lime-50 text-lime-600" },
      { href: "/tools/payment-cycle", icon: Clock, name: "回款周期计算器", description: "出单后什么时候拿到钱，各平台结算时间线。", color: "bg-sky-50 text-sky-600" },
    ],
  },
  {
    title: "决策辅助",
    tools: [
      { href: "/tools/fee-comparison", icon: GitCompare, name: "平台费率对比", description: "同一产品在5个平台的费率和利润对比。", color: "bg-violet-50 text-violet-600" },
      { href: "/tools/compliance-checker", icon: ShieldCheck, name: "合规资质检查", description: "品类+市场→需要哪些认证和资质。", color: "bg-rose-50 text-rose-600" },
      { href: "/tools/penalty-simulator", icon: AlertTriangle, name: "罚款风险模拟", description: "Temu/Shopee违规罚款金额预估。", color: "bg-red-50 text-red-600" },
      { href: "/tools/payment-providers", icon: CreditCard, name: "收款工具对比", description: "连连/网易/PingPong/Payoneer费率对比。", color: "bg-teal-50 text-teal-600" },
    ],
  },
];

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "跨境电商工具箱",
  url: "https://kuajingzhuli.com/tools",
  applicationCategory: "BusinessApplication",
  description: "14个跨境电商实操工具——支持Temu/TikTok/Shopee/Amazon。",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
};

export default function ToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }} />
      <PageHeader
        title="工具箱"
        description="14个跨境电商实操工具，帮你算清楚每一笔账"
      />
      <main className="flex-1 px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-2xl space-y-10">
          {toolGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{group.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tool.color}`}>
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <h3 className="text-sm font-medium">{tool.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
                    </div>
                    <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-600" />
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <p className="text-center text-xs text-muted-foreground">
            所有计算结果仅供参考，实际费率以各平台官方为准
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
