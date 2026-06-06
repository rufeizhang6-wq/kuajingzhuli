import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { PlatformTabs } from "@/components/learn/learn-shared";
import { logisticsOverview, logisticsPlatforms } from "@/lib/learn-data-logistics";

export const metadata: Metadata = {
  title: "物流发货 — 运营学堂",
  description: "各平台物流发货教程——Temu国内仓入仓、TikTok FBT官方物流、Shopee SLS发货、Amazon FBA完整流程。",
};

export default function LearnLogisticsPage() {
  return (
    <>
      <PageHeader
        title="物流发货"
        description="物流方案/发货/退货处理——2026年几乎都要求提前备货到平台仓库"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <PlatformTabs
            platforms={logisticsPlatforms}
            overviewSection={
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{logisticsOverview.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{logisticsOverview.description}</p>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
