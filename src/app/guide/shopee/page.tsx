import type { Metadata } from "next";
import Link from "next/link";
import { shopeeGuide } from "@/lib/guide-data-shopee";
import { PageHeader } from "@/components/ui/page-header";
import { PathOverview } from "@/components/guide/path-overview";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Shopee开店引导",
  description: "从零到开好店铺：4个步骤，一步步完成Shopee跨境店开店全流程。",
};

export default function ShopeeGuidePage() {
  return (
    <>
      <PageHeader
        title={shopeeGuide.name}
        description="从零到开好店铺，按顺序完成以下步骤"
        back={{ label: "选择平台", href: "/guide" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <PathOverview path={shopeeGuide} />

          <div className="rounded-xl border border-border/60 bg-accent/30 p-4 text-center text-sm">
            🎓 完成开店后，前往<Link href="/learn" className="font-medium text-primary hover:underline">运营学堂</Link>学习选品上架
          </div>

          <p className="text-center text-xs text-muted-foreground">
            进度自动保存在本地，关闭浏览器不会丢失
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
