import type { Metadata } from "next";
import { ShippingCalculator } from "@/components/tools/shipping-calculator";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "运费计算器",
  description: "跨境电商运费估算——输入产品重量和目的站点，预估头程和尾程运费。",
};

export default function ShippingCalculatorPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="space-y-2">
            <h1 className="font-medium tracking-tight" style={{ fontSize: "30px", color: "#0a0a0a" }}>运费计算器</h1>
            <p style={{ fontSize: "15px", color: "#404040" }}>
              输入产品重量和目的站点，预估头程运费和尾程费用。
            </p>
          </div>
          <ShippingCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
