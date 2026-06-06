"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RotateCcw, BarChart3 } from "lucide-react";
import type { PlatformRecommendation } from "@/lib/assessment-data";
import { ResultCard } from "@/components/assessment/result-card";
import { PageHeader } from "@/components/ui/page-header";
import { WarningCallout } from "@/components/ui/warning-callout";
import { Footer } from "@/components/layout/footer";

export default function AssessmentResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<PlatformRecommendation[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kjzl-assessment-results");
    if (stored) {
      setResults(JSON.parse(stored));
    } else {
      router.replace("/assessment");
    }
  }, [router]);

  if (!results) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const qualified = results.filter((r) => !r.disqualified);
  const disqualified = results.filter((r) => r.disqualified);

  return (
    <div className="flex min-h-full flex-col">
      <PageHeader
        title="你的专属推荐"
        description="根据你的回答，我们从5个平台中为你匹配了最适合的选择"
      />

      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-lg space-y-8">
          <WarningCallout title="温馨提示">
            以下推荐基于你提供的信息，仅供参考。跨境电商存在经营风险，
            前几个月大概率不赚钱。请根据自身实际情况谨慎决策，不要借钱或用生活费投入。
          </WarningCallout>

          {/* Qualified platforms */}
          {qualified.length > 0 ? (
            <div className="space-y-4">
              {qualified.map((r, i) => (
                <ResultCard key={r.id} recommendation={r} rank={i + 1} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-center space-y-3">
              <p className="text-sm text-muted-foreground">
                你的条件暂时不满足大多数平台的开店要求。建议先从Temu全托管开始（个人身份证即可，启动资金3000元），
                或攒够启动资金并办理营业执照后重新测评。
              </p>
            </div>
          )}

          {/* Disqualified platforms */}
          {disqualified.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                暂不适合的平台（条件不满足）
              </h3>
              {disqualified.map((r) => (
                <ResultCard key={r.id} recommendation={r} rank={0} />
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("kjzl-assessment-answers");
                localStorage.removeItem("kjzl-assessment-results");
                router.push("/assessment");
              }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <RotateCcw className="h-4 w-4" />
              重新测评
            </button>
            <Link
              href="/platforms"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              <BarChart3 className="h-4 w-4" />
              查看全平台对比
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
