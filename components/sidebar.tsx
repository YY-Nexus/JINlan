"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart3,
  Monitor,
  Home,
  Users,
  CheckSquare,
  MessageSquare,
  TrendingUp,
  DollarSign,
  FolderOpen,
  Target,
  Bell,
  Calendar,
  Settings,
  HelpCircle,
  Bot,
  Building2,
  Smartphone,
  Shield,
  TestTube,
  Zap,
  Database,
  GraduationCap,
  ChevronDown,
  ChevronRight,
  FileText,
  Brain,
  X,
} from "lucide-react"
import Image from "next/image"

const navigationItems = [
  {
    title: "运营中心",
    href: "/dashboard",
    icon: BarChart3,
    color: "border-l-green-500 hover:bg-green-50 text-green-700",
    activeColor: "border-l-green-500 bg-green-50 text-green-700",
  },
  {
    title: "系统监控",
    href: "/system-monitor",
    icon: Monitor,
    color: "border-l-blue-500 hover:bg-blue-50 text-blue-700",
    activeColor: "border-l-blue-500 bg-blue-50 text-blue-700",
  },
]

const newFeatureModules = [
  {
    title: "应用总览",
    href: "/modules",
    icon: Home,
    color: "border-l-blue-500 hover:bg-blue-50 text-blue-700",
    activeColor: "border-l-blue-500 bg-blue-50 text-blue-700",
  },
  {
    title: "AI智能助手",
    href: "/ai-assistant",
    icon: Bot,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "AI客户数据",
    href: "/ai-customer-data",
    icon: Brain,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "AI智能表单",
    href: "/ai-smart-forms",
    icon: FileText,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "多租户管理",
    href: "/tenant-management",
    icon: Building2,
    color: "border-l-green-500 hover:bg-green-50 text-green-700",
    activeColor: "border-l-green-500 bg-green-50 text-green-700",
  },
  {
    title: "高级BI分析",
    href: "/advanced-bi",
    icon: TrendingUp,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "移动端应用",
    href: "/mobile-app",
    icon: Smartphone,
    color: "border-l-rose-500 hover:bg-rose-50 text-rose-700",
    activeColor: "border-l-rose-500 bg-rose-50 text-rose-700",
  },
  {
    title: "安全中心",
    href: "/security",
    icon: Shield,
    color: "border-l-orange-500 hover:bg-orange-50 text-orange-700",
    activeColor: "border-l-orange-500 bg-orange-50 text-orange-700",
  },
]

const coreModules = [
  {
    title: "客户管理",
    href: "/customers",
    icon: Users,
    color: "border-l-orange-500 hover:bg-orange-50 text-orange-700",
    activeColor: "border-l-orange-500 bg-orange-50 text-orange-700",
  },
  {
    title: "任务管理",
    href: "/tasks",
    icon: CheckSquare,
    color: "border-l-green-500 hover:bg-green-50 text-green-700",
    activeColor: "border-l-green-500 bg-green-50 text-green-700",
  },
  {
    title: "沟通协作",
    href: "/communication",
    icon: MessageSquare,
    color: "border-l-green-500 hover:bg-green-50 text-green-700",
    activeColor: "border-l-green-500 bg-green-50 text-green-700",
  },
  {
    title: "数据分析",
    href: "/analytics",
    icon: TrendingUp,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "财务管理",
    href: "/finance",
    icon: DollarSign,
    color: "border-l-orange-500 hover:bg-orange-50 text-orange-700",
    activeColor: "border-l-orange-500 bg-orange-50 text-orange-700",
  },
  {
    title: "项目管理",
    href: "/projects",
    icon: FolderOpen,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "OKR管理",
    href: "/okr",
    icon: Target,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "团队协作",
    href: "/collaboration",
    icon: Users,
    color: "border-l-green-500 hover:bg-green-50 text-green-700",
    activeColor: "border-l-green-500 bg-green-50 text-green-700",
  },
  {
    title: "审批流程",
    href: "/approval",
    icon: CheckSquare,
    color: "border-l-orange-500 hover:bg-orange-50 text-orange-700",
    activeColor: "border-l-orange-500 bg-orange-50 text-orange-700",
  },
]

const systemModules = [
  {
    title: "通知中心",
    href: "/notifications",
    icon: Bell,
    color: "border-l-yellow-500 hover:bg-yellow-50 text-yellow-700",
    activeColor: "border-l-yellow-500 bg-yellow-50 text-yellow-700",
  },
  {
    title: "日程安排",
    href: "/schedule",
    icon: Calendar,
    color: "border-l-yellow-500 hover:bg-yellow-50 text-yellow-700",
    activeColor: "border-l-yellow-500 bg-yellow-50 text-yellow-700",
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
    color: "border-l-blue-500 hover:bg-blue-50 text-blue-700",
    activeColor: "border-l-blue-500 bg-blue-50 text-blue-700",
  },
  {
    title: "帮助中心",
    href: "/help",
    icon: HelpCircle,
    color: "border-l-yellow-500 hover:bg-yellow-50 text-yellow-700",
    activeColor: "border-l-yellow-500 bg-yellow-50 text-yellow-700",
  },
]

const advancedModules = [
  {
    title: "系统测试",
    href: "/system-testing",
    icon: TestTube,
    color: "border-l-green-500 hover:bg-green-50 text-green-700",
    activeColor: "border-l-green-500 bg-green-50 text-green-700",
  },
  {
    title: "性能优化",
    href: "/performance-optimization",
    icon: Zap,
    color: "border-l-yellow-500 hover:bg-yellow-50 text-yellow-700",
    activeColor: "border-l-yellow-500 bg-yellow-50 text-yellow-700",
  },
  {
    title: "数据集成",
    href: "/data-integration",
    icon: Database,
    color: "border-l-purple-500 hover:bg-purple-50 text-purple-700",
    activeColor: "border-l-purple-500 bg-purple-50 text-purple-700",
  },
  {
    title: "用户培训",
    href: "/training",
    icon: GraduationCap,
    color: "border-l-orange-500 hover:bg-orange-50 text-orange-700",
    activeColor: "border-l-orange-500 bg-orange-50 text-orange-700",
  },
  {
    title: "系统管理",
    href: "/system-management",
    icon: Settings,
    color: "border-l-blue-500 hover:bg-blue-50 text-blue-700",
    activeColor: "border-l-blue-500 bg-blue-50 text-blue-700",
  },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function Sidebar({ isOpen = true, onClose, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isNewFeaturesExpanded, setIsNewFeaturesExpanded] = useState(true)

  const isActive = (href: string) => pathname === href

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={onClose} />}

      {/* 侧边栏 */}
      <div
        className={`
      ${isCollapsed ? "w-16" : "w-64"} 
      bg-white border-r border-gray-200 flex flex-col h-full transition-all duration-300 ease-in-out
      fixed md:relative z-50 md:z-auto
      ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
    `}
      >
        {/* Logo区域 */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div
            className={`flex items-center justify-center transition-all duration-300 ${isCollapsed ? "w-8" : "w-full"}`}
          >
            {!isCollapsed ? (
              <Image
                src="/images/jinlan-complete-logo.png"
                alt="锦澜家居"
                width={180}
                height={80}
                className="h-20 w-auto object-contain"
                priority
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">锦</span>
              </div>
            )}
          </div>

          {/* 移动端关闭按钮 */}
          <Button variant="ghost" size="sm" className="md:hidden w-8 h-8 p-0" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 导航内容 */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {/* 主要导航 */}
            {navigationItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-start px-3"} h-10 border-l-4 transition-all duration-200 group relative ${
                    active ? item.activeColor : `border-l-transparent ${item.color}`
                  } hover:scale-105 active:scale-95`}
                  onClick={() => handleNavigation(item.href)}
                >
                  <Icon className="w-4 h-4 mr-3 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">{item.title}</span>}

                  {/* 折叠状态下的提示 */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}
                </Button>
              )
            })}

            {/* 新功能模块 */}
            <div className="mt-6">
              <Button
                variant="ghost"
                className={`w-full ${isCollapsed ? "justify-center px-2" : "justify-between px-3"} h-10 text-gray-600 hover:text-gray-900 hover:bg-gray-50 group relative`}
                onClick={() => setIsNewFeaturesExpanded(!isNewFeaturesExpanded)}
              >
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-3 flex-shrink-0" />
                  {!isCollapsed && <span className="font-medium">新功能模块</span>}
                </div>
                {!isCollapsed &&
                  (isNewFeaturesExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />)}

                {/* 折叠状态下的提示 */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    新功能模块
                  </div>
                )}
              </Button>

              {isNewFeaturesExpanded && !isCollapsed && (
                <div className="ml-4 mt-2 space-y-1">
                  {newFeatureModules.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={`w-full justify-start h-9 px-3 border-l-4 transition-all duration-200 hover:scale-105 active:scale-95 ${
                          active ? item.activeColor : `border-l-transparent ${item.color}`
                        }`}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="text-sm">{item.title}</span>
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* 核心功能 */}
            {!isCollapsed && (
              <div className="mt-6">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">核心功能</h3>
                </div>
                <div className="space-y-1">
                  {coreModules.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={`w-full justify-start h-9 px-3 border-l-4 transition-all duration-200 hover:scale-105 active:scale-95 ${
                          active ? item.activeColor : `border-l-transparent ${item.color}`
                        }`}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="text-sm">{item.title}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 折叠状态下的核心功能 */}
            {isCollapsed && (
              <div className="mt-6 space-y-1">
                {coreModules.slice(0, 6).map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.href)
                  return (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={`w-full justify-center h-9 px-2 border-l-4 transition-all duration-200 group relative hover:scale-105 active:scale-95 ${
                        active ? item.activeColor : `border-l-transparent ${item.color}`
                      }`}
                      onClick={() => handleNavigation(item.href)}
                    >
                      <Icon className="w-4 h-4" />
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                        {item.title}
                      </div>
                    </Button>
                  )
                })}
              </div>
            )}

            {/* 系统功能 */}
            {!isCollapsed && (
              <div className="mt-6">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">系统功能</h3>
                </div>
                <div className="space-y-1">
                  {systemModules.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={`w-full justify-start h-9 px-3 border-l-4 transition-all duration-200 hover:scale-105 active:scale-95 ${
                          active ? item.activeColor : `border-l-transparent ${item.color}`
                        }`}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="text-sm">{item.title}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 高级功能 */}
            {!isCollapsed && (
              <div className="mt-6">
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">高级功能</h3>
                </div>
                <div className="space-y-1">
                  {advancedModules.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.href)
                    return (
                      <Button
                        key={item.href}
                        variant="ghost"
                        className={`w-full justify-start h-9 px-3 border-l-4 transition-all duration-200 hover:scale-105 active:scale-95 ${
                          active ? item.activeColor : `border-l-transparent ${item.color}`
                        }`}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <Icon className="w-4 h-4 mr-3" />
                        <span className="text-sm">{item.title}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* 折叠/展开按钮 */}
        <div className="p-4 border-t border-gray-200 hidden md:block">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-center h-8 hover:bg-gray-100 transition-colors"
            onClick={onToggleCollapse}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </>
  )
}
