import type { Metadata } from "next";
import Link from "next/link";
import { Package, Megaphone, Users, Truck, BarChart3, Wallet } from "lucide-react";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "运营指导",
  description: "开店之后的进阶知识——选品、广告、达人、物流、数据、财务。",
};

const categories = [
  { id: "sourcing", icon: Package, label: "选品方法论", description: "三指标法、侵权检查、货源渠道", color: "bg-blue-100 text-blue-600" },
  { id: "ads", icon: Megaphone, label: "广告投流", description: "GMV MAX、ECPM公式、ROI优化", color: "bg-purple-100 text-purple-600" },
  { id: "influencer", icon: Users, label: "达人建联", description: "筛选达人、寄样SOP、联盟计划", color: "bg-pink-100 text-pink-600" },
  { id: "logistics", icon: Truck, label: "物流发货", description: "跨境直邮、海外仓、运费优化", color: "bg-orange-100 text-orange-600" },
  { id: "analytics", icon: BarChart3, label: "数据分析", description: "看板解读、链路诊断、复盘方法", color: "bg-green-100 text-green-600" },
  { id: "finance", icon: Wallet, label: "财务提现", description: "回款周期、税务处理、利润核算", color: "bg-amber-100 text-amber-600" },
];

export default function AcademyPage() {
  return (
    <>
      <main className="flex-1 px-4 py-16 sm:px-12 sm:py-20">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="space-y-3 text-center animate-slide-up-fade">
            <h1 className="font-medium tracking-tight sm:text-4xl" style={{ fontSize: "30px", color: "#0a0a0a" }}>
              运营指导
            </h1>
            <p className="text-base sm:text-lg" style={{ color: "#404040" }}>
              开店之后的进阶知识，帮你从出单到盈利
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 animate-slide-up-fade animation-delay-100">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/academy/${cat.id}`}
                className="group flex items-start gap-4 rounded-lg border border-neutral-200 bg-white p-5 shadow-md transition-all duration-150 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${cat.color}`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium" style={{ fontSize: "15px", color: "#0a0a0a" }}>{cat.label}</h3>
                  <p style={{ fontSize: "13px", color: "#404040" }}>{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-center" style={{ fontSize: "13px", color: "#737373" }}>
            内容持续更新中，所有数据标注来源和更新日期
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
