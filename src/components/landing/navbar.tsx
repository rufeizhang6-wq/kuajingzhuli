"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

const navItems = [
  { label: "测评", href: "/assessment" },
  { label: "开店引导", href: "/guide" },
  { label: "运营学堂", href: "/learn" },
  { label: "工具箱", href: "/tools" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold tracking-tight text-neutral-900">
            跨境助理
          </span>
        </Link>

        {/* Center Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`inline-flex items-center gap-1 rounded-lg px-4 py-2 text-[15px] transition-colors ${
                  isActive
                    ? "font-medium text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-neutral-500 lg:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Spacer for desktop (no login/signup buttons yet) */}
        <div className="hidden lg:block w-20" />
      </div>

      {mobileOpen && (
        <nav className="border-t border-neutral-100 bg-white px-4 pb-3 pt-2 lg:hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive ? "font-medium text-neutral-900" : "text-neutral-500"
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
