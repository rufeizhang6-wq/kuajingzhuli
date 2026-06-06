import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { PlatformTabs } from "@/components/learn/learn-shared";
import { marketingOverview, marketingPlatforms } from "@/lib/learn-data-marketing";

export const metadata: Metadata = {
  title: "营销推广 — 运营学堂",
  description: "各平台广告与推广教程——Temu活动报名、TikTok达人合作与GMV Max、Shopee搜索广告、Amazon SP广告、短视频内容营销。",
};

export default function LearnMarketingPage() {
  return (
    <>
      <PageHeader
        title="营销推广"
        description="广告/促销/内容/达人带货——先优化产品再开广告"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <PlatformTabs
            platforms={marketingPlatforms}
            overviewSection={
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{marketingOverview.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{marketingOverview.description}</p>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
