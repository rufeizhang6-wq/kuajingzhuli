import type { Metadata } from "next";
import Link from "next/link";
import { Package, Palette, Megaphone, Truck, BarChart3, ShieldCheck, CalendarCheck, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "运营学堂",
  description: "店铺开通后的下一步——选品上架、店铺装修、营销推广、物流发货、数据运营、合规避坑。",
};

const topics = [
  { icon: Package, label: "选品上架", description: "怎么选品、怎么上架产品", href: "/learn/product", ready: true },
  { icon: Palette, label: "店铺装修", description: "店铺名称/logo/详情页优化", href: "/learn/store-setup", ready: true },
  { icon: Megaphone, label: "营销推广", description: "广告/促销/内容/达人带货", href: "/learn/marketing", ready: true },
  { icon: Truck, label: "物流发货", description: "物流方案/发货/退货处理", href: "/learn/logistics", ready: true },
  { icon: BarChart3, label: "数据运营", description: "看数据/优化/复盘方法", href: "/learn/analytics", ready: true },
  { icon: ShieldCheck, label: "合规避坑", description: "平台规则/罚款/侵权防范", href: "/learn/compliance", ready: true },
  { icon: CalendarCheck, label: "30天行动手册", description: "开店后每天该做什么，逐日行动清单", href: "/learn/playbook", ready: true },
];

export default function LearnPage() {
  return (
    <>
      <PageHeader
        title="运营学堂"
        description="店铺开通后的「接下来怎么办」"
        hint="每个主题都有各平台（Temu/TikTok/Shopee/Amazon）的具体操作指南"
      />

      <main className="flex-1 px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {topics.map((topic) => (
              <Link
                key={topic.label}
                href={topic.href}
                className="group flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <topic.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-0.5">
                  <h3 className="text-sm font-medium">{topic.label}</h3>
                  <p className="text-xs text-muted-foreground">{topic.description}</p>
                </div>
                <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              先去开店引导
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
