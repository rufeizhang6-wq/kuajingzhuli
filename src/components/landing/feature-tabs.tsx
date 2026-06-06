"use client"

import { Store, ShoppingBag, ShoppingCart, Package, Globe } from "lucide-react"

const features = [
  {
    id: "temu",
    label: "Temu",
    icon: Package,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: "tiktok",
    label: "TikTok Shop",
    icon: Store,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: "shopee",
    label: "Shopee",
    icon: ShoppingBag,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: "amazon",
    label: "Amazon",
    icon: Globe,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
]

export function FeatureTabs() {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {features.map((feature) => {
        const Icon = feature.icon
        return (
          <div
            key={feature.id}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium shadow-sm"
          >
            <span className={`flex h-5 w-5 items-center justify-center rounded ${feature.iconBg}`}>
              <Icon className={`h-3 w-3 ${feature.iconColor}`} />
            </span>
            {feature.label}
          </div>
        )
      })}
    </div>
  )
}
