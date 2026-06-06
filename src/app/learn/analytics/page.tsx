import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { PlatformTabs } from "@/components/learn/learn-shared";
import { analyticsOverview, analyticsPlatforms } from "@/lib/learn-data-analytics";

export const metadata: Metadata = {
  title: "数据运营 — 运营学堂",
  description: "各平台数据运营教程——Temu质量分管理、TikTok体验分与出村追踪、Shopee账户健康、Amazon广告指标与ABA品牌分析。",
};

export default function LearnAnalyticsPage() {
  return (
    <>
      <PageHeader
        title="数据运营"
        description="看数据/优化/复盘——用数据驱动决策而不是凭感觉"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <PlatformTabs
            platforms={analyticsPlatforms}
            overviewSection={
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{analyticsOverview.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{analyticsOverview.description}</p>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
