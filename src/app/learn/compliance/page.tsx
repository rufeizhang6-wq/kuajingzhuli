import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { PlatformTabs } from "@/components/learn/learn-shared";
import { complianceOverview, compliancePlatforms } from "@/lib/learn-data-compliance";

export const metadata: Metadata = {
  title: "合规避坑 — 运营学堂",
  description: "各平台合规避坑指南——Temu质量分与罚款、TikTok假面单与IP关联、Shopee扣分系统与AI检测、Amazon防关联与品牌保护。",
};

export default function LearnCompliancePage() {
  return (
    <>
      <PageHeader
        title="合规避坑"
        description="平台规则/罚款/侵权防范——一次严重违规可能让所有努力归零"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <PlatformTabs
            platforms={compliancePlatforms}
            overviewSection={
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{complianceOverview.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{complianceOverview.description}</p>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
