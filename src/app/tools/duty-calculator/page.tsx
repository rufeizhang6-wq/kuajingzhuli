import type { Metadata } from "next";
import { DutyCalculator } from "@/components/tools/duty-calculator";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "关税计算器",
  description: "跨境电商关税参考——了解各目的国的免税线和大致关税影响。",
};

export default function DutyCalculatorPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <div className="space-y-2">
            <h1 className="font-medium tracking-tight" style={{ fontSize: "30px", color: "#0a0a0a" }}>关税计算器</h1>
            <p style={{ fontSize: "15px", color: "#404040" }}>
              了解各目的国的免税线和大致关税影响，帮你在选品和定价时考虑关税成本。
            </p>
          </div>
          <DutyCalculator />
        </div>
      </main>
      <Footer />
    </div>
  );
}
