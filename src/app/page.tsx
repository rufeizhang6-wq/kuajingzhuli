import { HeroSection } from "@/components/landing/hero-section";
import { ProductPreview } from "@/components/landing/product-preview";
import { BottomBanner } from "@/components/landing/bottom-banner";
import { Footer } from "@/components/layout/footer";

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "跨境助理",
    url: "https://kuajingzhuli.com",
    description: "免费的跨境电商入门引导平台。基于300+教程交叉验证，覆盖Temu/TikTok/Shopee/Amazon 5大平台。",
    inLanguage: "zh-CN",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "跨境助理",
    url: "https://kuajingzhuli.com",
    description: "免费跨境电商开店引导平台",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <HeroSection />
      <ProductPreview />
      <BottomBanner />
      <Footer />
    </>
  );
}
