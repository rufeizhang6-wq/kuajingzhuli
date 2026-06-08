import type { MetadataRoute } from "next";
import { tiktokSeaGuide } from "@/lib/guide-data-sea";
import { tiktokUsGuide } from "@/lib/guide-data-us";
import { shopeeGuide } from "@/lib/guide-data-shopee";
import { temuGuide } from "@/lib/guide-data-temu";
import { amazonGuide } from "@/lib/guide-data-amazon";

const BASE_URL = "https://kuajingzhuli.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/assessment`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/assessment/result`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/platforms`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    // Guide pages
    { url: `${BASE_URL}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/guide/temu`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/guide/tiktok-sea`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/guide/shopee`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/guide/tiktok-us`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/guide/amazon`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    // Learn pages
    { url: `${BASE_URL}/learn`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn/product`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn/store-setup`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn/marketing`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn/logistics`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn/analytics`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/learn/compliance`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    // Tools (14)
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/tools/profit-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/ad-roi-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/startup-cost-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/fba-storage`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/shipping-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/duty-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/dimensional-weight`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/inventory-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/payment-cycle`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/fee-comparison`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/compliance-checker`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/penalty-simulator`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/tools/payment-providers`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const guideStepPages = [temuGuide, tiktokSeaGuide, shopeeGuide, tiktokUsGuide, amazonGuide].flatMap(
    (guide) =>
      guide.steps.map((step) => ({
        url: `${BASE_URL}/guide/${guide.id}/${step.id}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
  );

  return [...staticPages, ...guideStepPages];
}
