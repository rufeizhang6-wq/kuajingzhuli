"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-neutral-50">
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
        {/* Fade out mask */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, rgb(250, 250, 250) 100%)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pb-12 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          {/* Announcement Pill */}
          <Link
            href="/guide"
            className="group mb-8 inline-flex items-center rounded-full border border-neutral-200 bg-white px-1 py-1 pr-4 shadow-sm transition-all hover:border-neutral-300 hover:shadow-md"
          >
            <span className="mr-3 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-700">
              5大平台开店引导已上线
            </span>
            <span className="flex items-center gap-1 text-sm text-neutral-500">
              了解更多
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-5xl font-medium tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            免费帮你从零开始
            <br />
            做跨境电商
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-2xl text-pretty text-lg text-neutral-500 sm:text-xl">
            不卖课，不推销，只给你确定性。跨境电商开店引导平台，基于300+教程交叉验证。
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/assessment"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-neutral-900 px-8 text-base font-medium text-white transition-colors hover:bg-neutral-800"
            >
              开始测评
            </Link>
            <Link
              href="/guide"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-neutral-300 bg-white px-8 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:border-neutral-400"
            >
              直接学习
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
