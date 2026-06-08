import type { Metadata } from "next";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { PlatformTabs } from "@/components/learn/learn-shared";
import { playbookOverview, playbookPlatforms } from "@/lib/learn-data-playbook";

export const metadata: Metadata = {
  title: "30天行动手册 — 运营学堂",
  description: "开店后30天逐日行动清单——Temu/TikTok/Shopee/Amazon 5个平台各自的30天冲刺手册，含真实案例数据和利润预期。",
};

export default function LearnPlaybookPage() {
  return (
    <>
      <PageHeader
        title="30天行动手册"
        description="开店后每天该做什么——不是「建议你做」，是「今天就做这个」"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <PlatformTabs
            platforms={playbookPlatforms}
            overviewSection={
              <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">{playbookOverview.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{playbookOverview.description}</p>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
