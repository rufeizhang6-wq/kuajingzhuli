"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const guidePlatforms = [
  { href: "/guide/temu", label: "Temu全托管" },
  { href: "/guide/tiktok-sea", label: "TikTok东南亚" },
  { href: "/guide/shopee", label: "Shopee" },
  { href: "/guide/tiktok-us", label: "TikTok美区" },
  { href: "/guide/amazon", label: "Amazon" },
];

const navLinks = [
  { href: "/assessment", label: "测评" },
  { href: "/guide", label: "开店引导", children: guidePlatforms },
  { href: "/learn", label: "运营学堂" },
  { href: "/tools", label: "工具箱" },
];

export function GlobalNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-12">
        <Link
          href="/"
          style={{ fontSize: "16px", fontWeight: 600, color: "#0a0a0a", letterSpacing: "-0.01em" }}
        >
          跨境助理
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            const hasChildren = item.children && item.children.length > 0;

            if (hasChildren) {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(item.href)}
                  onMouseLeave={() => setDropdownOpen(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-0.5 rounded-md px-3 py-1.5 transition-colors",
                      isActive ? "font-medium" : "hover:opacity-80"
                    )}
                    style={{ fontSize: "15px", color: "#0a0a0a" }}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </Link>

                  {dropdownOpen === item.href && (
                    <div className="absolute left-0 top-full pt-1">
                      <div className="w-44 rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2 transition-colors hover:bg-neutral-50",
                              pathname.startsWith(child.href) ? "font-medium text-primary" : ""
                            )}
                            style={{ fontSize: "14px", color: "#404040" }}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-1.5 transition-colors",
                  isActive
                    ? "font-medium"
                    : "hover:opacity-80"
                )}
                style={{ fontSize: "15px", color: "#0a0a0a" }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-neutral-500 sm:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-neutral-100 bg-white px-4 pb-3 pt-2 sm:hidden">
          {navLinks.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "font-medium text-neutral-900"
                      : "text-neutral-500"
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-sm transition-colors",
                          pathname.startsWith(child.href)
                            ? "font-medium text-primary"
                            : "text-neutral-400"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </header>
  );
}
