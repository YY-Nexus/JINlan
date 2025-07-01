"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Bell,
  Settings,
  User,
  Menu,
  MessageSquare,
  Calendar,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  onMenuClick?: () => void
  onToggleCollapse?: () => void
}

export function Header({ onMenuClick, onToggleCollapse }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-40">
      {/* 左侧：菜单按钮和搜索 */}
      <div className="flex items-center gap-4">
        {/* 移动端菜单按钮 */}
        <Button variant="ghost" size="sm" className="md:hidden w-8 h-8 p-0" onClick={onMenuClick}>
          <Menu className="w-4 h-4" />
        </Button>

        {/* 桌面端折叠按钮 */}
        <Button variant="ghost" size="sm" className="hidden md:flex w-8 h-8 p-0" onClick={onToggleCollapse}>
          <Menu className="w-4 h-4" />
        </Button>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="search"
            placeholder="搜索功能模块..."
            className="pl-10 w-64 h-8 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 右侧：通知、设置、用户菜单 */}
      <div className="flex items-center gap-2">
        {/* 消息中心 */}
        <Button variant="ghost" size="sm" className="relative w-8 h-8 p-0">
          <MessageSquare className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs bg-red-500 hover:bg-red-500">3</Badge>
        </Button>

        {/* 通知中心 */}
        <Button variant="ghost" size="sm" className="relative w-8 h-8 p-0">
          <Bell className="w-4 h-4" />
          <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-xs bg-red-500 hover:bg-red-500">5</Badge>
        </Button>

        {/* 日程 */}
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <Calendar className="w-4 h-4" />
        </Button>

        {/* 帮助 */}
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <HelpCircle className="w-4 h-4" />
        </Button>

        {/* 设置 */}
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <Settings className="w-4 h-4" />
        </Button>

        {/* 用户菜单 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder.svg?height=24&width=24" />
                <AvatarFallback className="text-xs">管理员</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden sm:inline">管理员</span>
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              个人资料
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              账户设置
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" />
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
