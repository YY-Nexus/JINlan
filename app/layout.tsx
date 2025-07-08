import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "锦澜家居客户服务中心",
  description: "专业的客户关系管理系统，提供全方位的客户服务解决方案",
  keywords: "客户管理,CRM,客户服务,锦澜家居",
  authors: [{ name: "锦澜家居" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#0ea5e9",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/jinlan-logo-main.png",
    apple: "/images/jinlan-logo-main.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/images/jinlan-logo-main.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
