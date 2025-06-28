"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Bell, Settings, User, Menu, Sun, Moon, Globe, HelpCircle, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

interface HeaderProps {
  onMenuClick?: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  // 使用useCallback优化性能
  const handleTitleClick = useCallback(() => {
    router.push("/system-management")
  }, [router])

  const handleProfileClick = useCallback(() => {
    router.push("/profile")
  }, [router])

  const handleSettingsClick = useCallback(() => {
    router.push("/settings")
  }, [router])

  const handleNotificationsClick = useCallback(() => {
    router.push("/notifications")
  }, [router])

  const handleHelpClick = useCallback(() => {
    router.push("/help")
  }, [router])

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        toast({
          title: "搜索功能",
          description: `正在搜索: ${searchQuery}`,
        })
        // 这里可以添加实际的搜索逻辑
      }
    },
    [searchQuery],
  )

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev)
    toast({
      title: isDarkMode ? "切换到浅色模式" : "切换到深色模式",
      description: "主题已更新",
    })
  }, [isDarkMode])

  const handleLogout = useCallback(() => {
    toast({
      title: "退出登录",
      description: "正在安全退出系统...",
    })
    // 这里可以添加实际的登出逻辑
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }, [router])

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 shadow-sm">
      {/* 左侧 */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        {/* 汉堡菜单按钮 - 在所有屏幕尺寸都显示 */}
        <Button
          variant="ghost"
          size="sm"
          className="w-9 h-9 p-0 hover:bg-gray-100 transition-colors flex-shrink-0"
          onClick={onMenuClick}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {/* 标题区域 - 移动端优化 */}
        <div className="flex items-center min-w-0 flex-1">
          <h1
            className="text-sm sm:text-base md:text-xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition-colors truncate"
            onClick={handleTitleClick}
            title="进入系统管理"
          >
            <span className="hidden sm:inline">Customer Care Center</span>
            <span className="sm:hidden">客服中心</span>
          </h1>
        </div>
      </div>

      {/* 中间搜索 - 在小屏幕上隐藏 */}
      <div className="hidden lg:flex flex-1 max-w-md mx-8">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="搜索功能、客户、任务..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 h-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-sky-300 transition-all"
          />
        </form>
      </div>

      {/* 右侧操作 */}
      <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
        {/* 移动端搜索按钮 */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden w-9 h-9 p-0 hover:bg-gray-100 transition-colors"
          onClick={() => {
            toast({
              title: "搜索功能",
              description: "移动端搜索功能",
            })
          }}
        >
          <Search className="w-4 h-4 text-gray-600" />
        </Button>

        {/* 主题切换 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="w-9 h-9 p-0 hover:bg-gray-100 transition-colors"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-gray-600" /> : <Moon className="w-4 h-4 text-gray-600" />}
        </Button>

        {/* 通知 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleNotificationsClick}
          className="relative w-9 h-9 p-0 hover:bg-gray-100 transition-colors"
        >
          <Bell className="w-4 h-4 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 hover:bg-red-500">3</Badge>
        </Button>

        {/* 帮助 - 在小屏幕上隐藏 */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpClick}
          className="hidden md:flex w-9 h-9 p-0 hover:bg-gray-100 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-gray-600" />
        </Button>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 hover:bg-gray-100 transition-colors">
              <User className="w-4 h-4 text-gray-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">系统管理员</p>
                <p className="text-xs text-gray-500">admin@jinlan.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              个人中心
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              系统设置
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer md:hidden" onClick={handleHelpClick}>
              <HelpCircle className="w-4 h-4 mr-2" />
              帮助中心
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Globe className="w-4 h-4 mr-2" />
              语言设置
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
