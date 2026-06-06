import type { Metadata } from "next";
import { ProfitCalculator } from "@/components/tools/profit-calculator";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "利润计算器",
  description:
    "跨境电商利润计算器——支持Temu/TikTok/Shopee/Amazon，输入售价和成本，自动扣除平台佣金、运费、手续费，算出每单真实利润。",
};

export default function ProfitCalculatorPage() {
  return (
    <div className="flex min-h-full flex-col">

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="space-y-2">
            <h1 className="font-medium tracking-tight" style={{ fontSize: "30px", color: "#0a0a0a" }}>利润计算器</h1>
            <p style={{ fontSize: "15px", color: "#404040" }}>
              输入你的售价和各项成本，自动计算每单真实利润。平台费用根据站点自动填入。
            </p>
          </div>

          <ProfitCalculator />
        </div>
      </main>

      <Footer />
    </div>
  );
}
