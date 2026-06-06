import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Package, FileText, Target, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "工具箱",
  description: "跨境电商实操工具——利润计算器、运费计算器、关税计算器、售价建议。",
};

const tools = [
  { href: "/tools/profit-calculator", icon: Calculator, name: "利润计算器", description: "输入售价和各项成本，自动计算每单真实利润", useCase: "选品定价时算清楚每单能赚多少", color: "bg-blue-50 text-blue-600" },
  { href: "/tools/shipping-calculator", icon: Package, name: "运费计算器", description: "根据产品重量和目的站点，预估头程和尾程运费", useCase: "选品时评估运费对利润的影响", color: "bg-orange-50 text-orange-600" },
  { href: "/tools/duty-calculator", icon: FileText, name: "关税计算器", description: "了解各目的国的免税线和大致关税影响", useCase: "定价时考虑关税成本", color: "bg-purple-50 text-purple-600" },
  { href: "/tools/pricing-advisor", icon: Target, name: "售价建议", description: "输入成本和目标毛利率，反算建议售价", useCase: "确保定价既有竞争力又不亏本", color: "bg-green-50 text-green-600" },
];

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "跨境电商工具箱",
  url: "https://kuajingzhuli.com/tools",
  applicationCategory: "BusinessApplication",
  description: "利润计算器、运费计算器、关税计算器、售价建议——支持Temu/TikTok/Shopee/Amazon。",
  offers: { "@type": "Offer", price: "0", priceCurrency: "CNY" },
};

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <PageHeader
        title="工具箱"
        description="跨境电商实操工具，也嵌入在引导路径的对应步骤中"
      />

      <main className="flex-1 px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-start gap-4 rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${tool.color}`}>
                  <tool.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">{tool.name}</h3>
                    <ArrowRight className="h-4 w-4 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-600" />
                  </div>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                  <p className="text-xs text-muted-foreground/70">适用：{tool.useCase}</p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            所有计算结果仅供参考，实际费率以各平台官方为准
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
