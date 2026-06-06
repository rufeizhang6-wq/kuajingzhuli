import type { Metadata } from "next";
import { PricingAdvisor } from "@/components/tools/pricing-advisor";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "售价建议",
  description: "根据成本和目标毛利率反算建议售价，包含保本ROI计算。",
};

export default function PricingAdvisorPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="space-y-2">
            <h1 className="font-medium tracking-tight" style={{ fontSize: "30px", color: "#0a0a0a" }}>售价建议</h1>
            <p style={{ fontSize: "15px", color: "#404040" }}>
              输入产品成本和目标毛利率，反向计算建议售价。帮你在定价时不亏本。
            </p>
          </div>
          <PricingAdvisor />
        </div>
      </main>
      <Footer />
    </div>
  );
}
