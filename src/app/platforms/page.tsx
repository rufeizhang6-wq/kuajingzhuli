import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star, AlertTriangle, Check } from "lucide-react";
import { platforms } from "@/lib/platform-data";
import type { PlatformInfo } from "@/lib/platform-data";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "全平台对比",
  description:
    "Temu、TikTok Shop、Shopee、Amazon——5大跨境电商平台2026年最新数据对比，帮你选对方向。",
};

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-3.5 w-3.5",
            i < level ? "fill-primary text-primary" : "fill-muted text-muted"
          )}
        />
      ))}
    </div>
  );
}

function PlatformCard({ p }: { p: PlatformInfo }) {
  return (
    <Link
      id={p.id}
      href={p.guidePath}
      className="group block rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-medium sm:text-lg">{p.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{p.tagline}</p>
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-neutral-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      {/* Stats grid */}
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">适合人群</p>
          <p className="mt-0.5">{p.suitableFor}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">难度</p>
          <div className="mt-1 flex items-center gap-2">
            <DifficultyStars level={p.difficulty} />
            <span className="text-xs text-muted-foreground">{p.difficultyLabel}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">启动资金</p>
          <p className="mt-0.5 font-medium">{p.startupBudget}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">平台费用</p>
          <p className="mt-0.5">{p.fees}</p>
        </div>
      </div>

      {/* Advantages */}
      <div className="mt-4 space-y-1">
        {p.coreAdvantages.map((adv) => (
          <div key={adv} className="flex items-start gap-1.5 text-sm">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
            <span>{adv}</span>
          </div>
        ))}
      </div>

      {/* Risks */}
      <div className="mt-3 space-y-1">
        {p.coreRisks.map((risk) => (
          <div key={risk} className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
            <span>{risk}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-medium text-primary">
          进入开店引导 →
        </span>
        <span className="text-xs text-muted-foreground">
          更新：{p.lastUpdated}
        </span>
      </div>
    </Link>
  );
}

export default function PlatformsPage() {
  return (
    <>
      <PageHeader
        title="全平台对比"
        description="5大跨境电商平台2026年最新数据对比，帮你选对方向"
        hint="所有数据经官网验证，标注更新日期"
      />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl space-y-4">
          {platforms.map((p) => (
            <PlatformCard key={p.id} p={p} />
          ))}

          <div className="rounded-xl bg-muted/50 p-4 text-center text-xs text-muted-foreground space-y-1">
            <p>
              以上数据来源于平台官方公开信息及多个实操卖家的交叉验证。
              费率和政策随时可能变化，请以各平台最新官方公告为准。
            </p>
            <p>免责声明：本内容仅供参考，不构成投资建议。</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
