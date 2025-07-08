"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AuthProvider } from "@/contexts/AuthContext"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // 路由变化时移动端自动关闭侧边栏
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false)
  }

  // 登录页面不显示导航
  if (pathname === "/login" || pathname === "/unauthorized") {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">{children}</div>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Header */}
          <Header onMenuClick={handleMenuClick} />

          {/* 主要布局 */}
          <div className="flex">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />

            {/* 主内容区域 */}
            <main
              className={`flex-1 transition-all duration-300 ease-in-out ${
                sidebarOpen && !isMobile ? "ml-64" : "ml-0"
              }`}
              style={{
                minHeight: "calc(100vh - 4rem)",
                paddingTop: "4rem", // Header高度
              }}
            >
              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}

// Header组件
function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="切换菜单"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <img src="/images/jinlan-logo-main.png" alt="锦澜家居" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-gray-900">锦澜家居客户服务中心</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 7H4l5-5v5z" />
            </svg>
          </button>
          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// Sidebar组件
function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  const menuItems = [
    { href: "/", label: "仪表盘", icon: "📊" },
    { href: "/customers", label: "客户管理", icon: "👥" },
    { href: "/tasks", label: "任务管理", icon: "✅" },
    { href: "/communication", label: "沟通协作", icon: "💬" },
    { href: "/analytics", label: "数据分析", icon: "📈" },
    { href: "/finance", label: "财务管理", icon: "💰" },
    { href: "/projects", label: "项目管理", icon: "📋" },
    { href: "/settings", label: "设置", icon: "⚙️" },
  ]

  return (
    <>
      {/* 移动端遮罩 */}
      {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* 侧边栏 */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href ? "bg-purple-100 text-purple-700" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={onClose}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}
