"use client"

import { Check, Circle, Clock } from "lucide-react"
import { FeatureTabs } from "./feature-tabs"

const sidebarSteps = [
  { num: 1, title: "办理营业执照", status: "done" as const },
  { num: 2, title: "准备设备和网络", status: "done" as const },
  { num: 3, title: "注册TikTok店铺", status: "current" as const },
  { num: 4, title: "绑定收款账户", status: "locked" as const },
]

const operations = [
  { title: "打开官方入驻页面", time: "2分钟", status: "done" as const },
  { title: "注册账号", time: "5分钟", status: "done" as const },
  { title: "选择目标站点", time: "5分钟", status: "current" as const },
  { title: "上传营业执照", time: "5分钟", status: "locked" as const },
  { title: "身份证 + 人脸认证", time: "5分钟", status: "locked" as const },
  { title: "选择经营类目", time: "5分钟", status: "locked" as const },
]

function StatusIcon({ status }: { status: "done" | "current" | "locked" }) {
  if (status === "done") return <Check className="h-3.5 w-3.5 text-green-600" />
  if (status === "current") return <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
  return <Circle className="h-3.5 w-3.5 text-neutral-300" />
}

export function ProductPreview() {
  return (
    <section className="relative bg-neutral-50 pb-8">
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
      </div>

      {/* Gradient Glows */}
      <div
        className="pointer-events-none absolute -left-32 top-1/3 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 30%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0.05) 30%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Feature Tabs */}
        <div className="mb-8 pt-8">
          <FeatureTabs />
        </div>

        {/* Product Preview Card */}
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-2xl shadow-neutral-900/5">
            <div className="flex min-h-[420px]">
              {/* Step Sidebar */}
              <div className="hidden w-56 border-r border-neutral-100 bg-white p-5 sm:block">
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-neutral-400">
                  东南亚开店
                </p>
                <p className="mb-4 text-[11px] text-neutral-400">4步 · 预计2-3周</p>

                <div className="space-y-1">
                  {sidebarSteps.map((step) => (
                    <div
                      key={step.num}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm ${
                        step.status === "current"
                          ? "bg-neutral-100 font-medium text-neutral-900"
                          : ""
                      }`}
                      style={{
                        color:
                          step.status === "done" ? "#737373"
                          : step.status === "locked" ? "#a3a3a3"
                          : undefined,
                      }}
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <StatusIcon status={step.status} />
                      </div>
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6">
                <div className="mb-1 flex items-center gap-2">
                  <h2 className="text-lg font-medium text-neutral-900">注册TikTok Shop店铺</h2>
                </div>
                <p className="mb-6 flex items-center gap-1 text-sm text-neutral-400">
                  <Clock className="h-3.5 w-3.5" />
                  预计 1-3天（含审核）
                </p>

                {/* Operations list */}
                <div className="space-y-1">
                  {operations.map((op, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                        op.status === "current"
                          ? "bg-blue-50 ring-1 ring-blue-200"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                          <StatusIcon status={op.status} />
                        </div>
                        <span
                          className="text-sm"
                          style={{
                            color:
                              op.status === "done" ? "#737373"
                              : op.status === "locked" ? "#a3a3a3"
                              : "#0a0a0a",
                            fontWeight: op.status === "current" ? 500 : 400,
                            textDecoration: op.status === "done" ? "line-through" : undefined,
                          }}
                        >
                          {op.title}
                        </span>
                      </div>
                      <span className="text-xs text-neutral-400">{op.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
