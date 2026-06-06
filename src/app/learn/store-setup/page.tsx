import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { PlatformTabs } from "@/components/learn/learn-shared";
import { storeSetupOverview, storeSetupPlatforms } from "@/lib/learn-data-store-setup";

export const metadata: Metadata = {
  title: "店铺装修 — 运营学堂",
  description: "各平台店铺装修教程——Temu设置优化、TikTok体验分管理、Shopee首页装修、Amazon品牌旗舰店和A+页面。",
};

export default function LearnStoreSetupPage() {
  return (
    <>
      <PageHeader
        title="店铺装修"
        description="店铺名称/logo/详情页/首页布局——各平台差异大，按需投入"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <PlatformTabs
            platforms={storeSetupPlatforms}
            overviewSection={
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{storeSetupOverview.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{storeSetupOverview.description}</p>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
