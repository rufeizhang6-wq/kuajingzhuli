import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, FileText } from "lucide-react";
import { Footer } from "@/components/layout/footer";

const categoryNames: Record<string, string> = {
  sourcing: "选品方法论",
  ads: "广告投流",
  influencer: "达人建联",
  logistics: "物流发货",
  analytics: "数据分析",
  finance: "财务提现",
};

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const name = categoryNames[category] ?? "运营指导";
  return { title: name + " — 运营指导" };
}

export function generateStaticParams() {
  return Object.keys(categoryNames).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const name = categoryNames[category] ?? "运营指导";

  return (
    <>
      <main className="flex-1 px-4 py-10">
        <div className="mx-auto max-w-2xl space-y-8">
          <Link
            href="/academy"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
            style={{ fontSize: "15px", color: "#737373" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            返回运营指导
          </Link>

          <div className="space-y-2">
            <h1 className="font-medium tracking-tight" style={{ fontSize: "30px", color: "#0a0a0a" }}>{name}</h1>
            <p style={{ fontSize: "15px", color: "#404040" }}>
              这个分类的文章正在编写中
            </p>
          </div>

          <div className="rounded-xl border border-dashed border-border bg-muted/20 p-12 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground/30" />
            <p className="mt-4 font-medium" style={{ fontSize: "15px", color: "#737373" }}>
              内容即将上线
            </p>
            <p className="mt-1" style={{ fontSize: "13px", color: "#737373" }}>
              这个分类的进阶教程正在从分析文档中整理，敬请期待
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
