import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NavSwitcher } from "@/components/layout/nav-switcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "跨境助理 - 免费跨境电商开店引导平台",
    template: "%s | 跨境助理",
  },
  description:
    "免费的跨境电商入门引导平台。2分钟测评找到适合你的平台，一步步带你从零到开店出单。",
  metadataBase: new URL("https://kuajingzhuli.com"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "跨境助理",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NavSwitcher />
        {children}
      </body>
    </html>
  );
}
