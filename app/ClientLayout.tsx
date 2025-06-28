"use client"

import type React from "react"
import { Inter } from "next/font/google"
import { useState } from "react"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { OfflineIndicator } from "@/components/offline-indicator"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <title>企业管理系统 - 金兰数据服务平台</title>
        <meta name="description" content="专业的企业数据管理和业务协作平台" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="企业管理系统" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex h-screen overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header onMenuClick={toggleSidebar} />
              <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
            </div>
          </div>
          <Toaster />
          <PWAInstallPrompt />
          <OfflineIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
