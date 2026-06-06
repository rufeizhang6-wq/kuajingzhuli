"use client"

import Link from "next/link"
import { Sparkles } from "lucide-react"

export function BottomBanner() {
  return (
    <section className="relative bg-neutral-50 pb-16 pt-8">
      {/* Grid Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #e5e5e5 1px, transparent 1px),
              linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 0%, rgb(250, 250, 250) 100%)' }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-2xl bg-neutral-900">
          <div className="flex flex-col items-center justify-between gap-6 px-8 py-6 sm:flex-row sm:px-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800">
                <Sparkles className="h-6 w-6 text-neutral-300" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">
                  开店引导
                </h3>
                <p className="text-sm text-neutral-400">
                  从注册到开店，每一步都帮你拆好了
                </p>
              </div>
            </div>

            <Link
              href="/guide"
              className="shrink-0 inline-flex h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-100"
            >
              查看路径
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
