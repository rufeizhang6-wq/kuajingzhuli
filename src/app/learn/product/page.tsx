import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Footer } from "@/components/layout/footer";
import { ProductLearnClient } from "@/components/learn/product-learn-client";

export const metadata: Metadata = {
  title: "选品上架 — 运营学堂",
  description: "选品方法论 + 4大平台上架教程（Temu/TikTok/Shopee/Amazon），从选品到上架的完整操作指南。",
};

export default function LearnProductPage() {
  return (
    <>
      <PageHeader
        title="选品上架"
        description="怎么选品、怎么上架产品——通用方法论 + 各平台实操教程"
        back={{ label: "运营学堂", href: "/learn" }}
        center={false}
      />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-2xl">
          <ProductLearnClient />
        </div>
      </main>
      <Footer />
    </>
  );
}
