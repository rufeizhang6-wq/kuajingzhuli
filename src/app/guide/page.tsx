import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, DollarSign, Gauge } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "开店引导",
  description: "选择你要开店的平台，从零到开好店铺。5个平台按难度从低到高排列。",
};

const platforms = [
  { id: "temu", name: "Temu全托管", tagline: "最简单的跨境入门，平台帮你卖", steps: 3, duration: "1-10天", budget: "3000-5000元", difficulty: "最低", diffColor: "bg-green-50 text-green-700", badge: "门槛最低", badgeColor: "bg-green-50 text-green-700" },
  { id: "tiktok-sea", name: "TikTok东南亚", tagline: "最低成本学跨境全流程", steps: 4, duration: "2-3周", budget: "8000-15000元", difficulty: "低", diffColor: "bg-green-50 text-green-600", badge: "新手练兵场", badgeColor: "bg-blue-50 text-blue-700" },
  { id: "shopee", name: "Shopee", tagline: "东南亚老牌电商，搜索流量为主", steps: 4, duration: "2-3周", budget: "5000-10000元", difficulty: "低-中", diffColor: "bg-amber-50 text-amber-700", badge: "台湾站友好", badgeColor: "bg-orange-50 text-orange-700" },
  { id: "tiktok-us", name: "TikTok美区", tagline: "流量大、利润高，但门槛也高", steps: 5, duration: "3-5周", budget: "25000-45000元", difficulty: "中-高", diffColor: "bg-orange-50 text-orange-700", badge: "利润最高", badgeColor: "bg-amber-50 text-amber-700" },
  { id: "amazon", name: "Amazon", tagline: "全球最大电商，天花板最高", steps: 5, duration: "3-5周", budget: "30000-50000元起", difficulty: "最高", diffColor: "bg-red-50 text-red-700", badge: "天花板最高", badgeColor: "bg-red-50 text-red-700" },
];

const guideSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "跨境电商开店引导",
  description: "5大平台从零到开好店铺的完整引导：Temu(3步)、TikTok东南亚(4步)、Shopee(4步)、TikTok美区(5步)、Amazon(5步)。",
  step: [
    { "@type": "HowToStep", name: "做测评", text: "花2分钟回答几个问题，找到最适合你的平台" },
    { "@type": "HowToStep", name: "选平台", text: "根据推荐选择一个平台，进入开店引导" },
    { "@type": "HowToStep", name: "按步骤开店", text: "按引导路径一步步完成，从办执照到店铺开通" },
    { "@type": "HowToStep", name: "学运营", text: "进入运营学堂学习选品上架、营销推广等" },
  ],
};

export default function GuidePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
      />
      <PageHeader
        title="选择你要开店的平台"
        description="按难度从低到高排列，从零到开好店铺"
        hint={<>不确定选哪个？先<Link href="/assessment" className="text-primary hover:underline font-medium">做个测评</Link></>}
      />

      <main className="flex-1 px-4 py-8 sm:py-10">
        <div className="mx-auto max-w-2xl space-y-4">
          {platforms.map((p, i) => (
            <Link
              key={p.id}
              href={`/guide/${p.id}`}
              className="group flex flex-col rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-medium sm:text-lg">{p.name}</h2>
                    <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", p.badgeColor)}>
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.tagline}</p>
                </div>
                <ArrowRight className="mt-1.5 h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-600" />
              </div>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {p.steps}步 · {p.duration}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3.5 w-3.5" />
                  {p.budget}
                </span>
                <span className={cn("flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium", p.diffColor)}>
                  <Gauge className="h-3 w-3" />
                  难度{p.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
