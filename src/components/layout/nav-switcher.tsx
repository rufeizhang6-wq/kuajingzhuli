"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/landing/navbar"
import { GlobalNav } from "@/components/layout/global-nav"

export function NavSwitcher() {
  const pathname = usePathname()

  // Use the v0 landing navbar on homepage, global nav elsewhere
  if (pathname === "/") {
    return <Navbar />
  }

  return <GlobalNav />
}
