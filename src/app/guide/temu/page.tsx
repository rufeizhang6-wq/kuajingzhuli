import type { Metadata } from "next";
import Link from "next/link";
import { temuGuide } from "@/lib/guide-data-temu";
import { PageHeader } from "@/components/ui/page-header";
import { PathOverview } from "@/components/guide/path-overview";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Temu全托管开店引导",
  description: "从零到开好店铺：3个步骤，一步步完成Temu全托管开店全流程。个人身份证即可，3-5分钟下店。",
};

export default function TemuGuidePage() {
  return (
    <>
      <PageHeader
        title={temuGuide.name}
        description="从零到开好店铺，按顺序完成以下步骤"
        back={{ label: "选择平台", href: "/guide" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-6">
          <PathOverview path={temuGuide} />

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
