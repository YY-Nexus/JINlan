"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Trophy,
  RefreshCw,
  Download,
  Share,
  Filter,
  Settings,
  Clock,
  AlertCircle,
  Calendar,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"

interface DashboardMetrics {
  sales: {
    current: number
    target: number
    growth: number
    completion: number
  }
  customers: {
    active: number
    growth: number
    new: number
    returning: number
  }
  finance: {
    revenue: number
    growth: number
    income: number
    expense: number
  }
  projects: {
    active: number
    completed: number
    inProgress: number
    delayed: number
  }
  tasks: {
    total: number
    pending: number
    completion: number
  }
  communication: {
    active: number
    newMessages: number
    meetings: number
    messages: number
  }
  analytics: {
    accuracy: number
    reports: number
    sources: number
  }
  okr: {
    achievement: number
    completed: number
    inProgress: number
  }
}

export function DashboardContent() {
  const router = useRouter()
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    sales: { current: 1423696, target: 1825000, growth: 6.3, completion: 78 },
    customers: { active: 7924, growth: 4.1, new: 617, returning: 7307 },
    finance: { revenue: 4462078, growth: 7.9, income: 6423696, expense: 1961618 },
    projects: { active: 12, completed: 9, inProgress: 2, delayed: 1 },
    tasks: { total: 78, pending: 16, completion: 79 },
    communication: { active: 446, newMessages: 12, meetings: 23, messages: 424 },
    analytics: { accuracy: 98.5, reports: 124, sources: 6 },
    okr: { achievement: 85, completed: 9, inProgress: 2 },
  })

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        customers: {
          ...prev.customers,
          active: prev.customers.active + Math.floor(Math.random() * 10) - 5,
        },
        communication: {
          ...prev.communication,
          newMessages: prev.communication.newMessages + Math.floor(Math.random() * 3),
        },
        analytics: {
          ...prev.analytics,
          reports: prev.analytics.reports + Math.floor(Math.random() * 2),
        },
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setLastUpdate(new Date())
      toast({
        title: "数据刷新成功",
        description: "所有业务指标已更新到最新状态",
      })
    } catch (error) {
      toast({
        title: "刷新失败",
        description: "请检查网络连接后重试",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleExport = () => {
    toast({
      title: "导出成功",
      description: "运营报表已生成并开始下载",
    })
  }

  const handleShare = () => {
    toast({
      title: "分享成功",
      description: "运营数据已生成分享链接",
    })
  }

  const formatCurrency = (amount: number) => {
    return `¥${amount.toLocaleString()}`
  }

  // 统一的彩色进度条组件
  const ColoredProgress = ({ value, color }: { value: number; color: string }) => {
    return (
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
    )
  }

  // 统一的按钮样式
  const buttonStyles = {
    primary:
      "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200",
    outline:
      "border border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 bg-white shadow-sm hover:shadow-md transition-all duration-200",
  }

  return (
    <div className="p-6 space-y-6">
      {/* 顶部操作栏 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button onClick={handleRefresh} disabled={isRefreshing} className={buttonStyles.outline}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            刷新数据
          </Button>
          <Button onClick={handleExport} className={buttonStyles.outline}>
            <Download className="w-4 h-4 mr-2" />
            导出报表
          </Button>
          <Button onClick={handleShare} className={buttonStyles.outline}>
            <Share className="w-4 h-4 mr-2" />
            分享数据
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" className={buttonStyles.outline}>
            <Filter className="w-4 h-4 mr-1" />
            筛选
          </Button>
          <Button size="sm" onClick={() => router.push("/settings")} className={buttonStyles.outline}>
            <Settings className="w-4 h-4 mr-1" />
            设置
          </Button>
          <div className="flex items-center text-sm text-slate-500 ml-4">
            <Clock className="w-4 h-4 mr-1" />
            最后更新: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* 核心业务指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 销售业绩 */}
        <Card
          className="border-l-4 border-l-blue-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/analytics")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">销售业绩</CardTitle>
                <p className="text-xs text-slate-500 mt-1">月度目标</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <DollarSign className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(metrics.sales.current)}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{metrics.sales.growth}%</span>
                <span className="text-xs text-slate-500 ml-1">较上月</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">目标完成率</span>
                <span className="font-medium">{metrics.sales.completion}%</span>
              </div>
              <ColoredProgress value={metrics.sales.completion} color="bg-gradient-to-r from-blue-400 to-blue-500" />
            </div>
          </CardContent>
        </Card>

        {/* 客户管理 */}
        <Card
          className="border-l-4 border-l-green-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/customers")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">客户管理</CardTitle>
                <p className="text-xs text-slate-500 mt-1">活跃用户</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <Users className="w-8 h-8 text-green-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-green-600">{metrics.customers.active.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{metrics.customers.growth}%</span>
                <span className="text-xs text-slate-500 ml-1">新增客户</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                <p className="text-lg font-bold text-green-600">{metrics.customers.new.toLocaleString()}</p>
                <p className="text-xs text-slate-600">新客户</p>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                <p className="text-lg font-bold text-blue-600">{metrics.customers.returning.toLocaleString()}</p>
                <p className="text-xs text-slate-600">老客户</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 财务状况 */}
        <Card
          className="border-l-4 border-l-yellow-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/finance")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">财务状况</CardTitle>
                <p className="text-xs text-slate-500 mt-1">实时数据</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(metrics.finance.revenue)}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{metrics.finance.growth}%</span>
                <span className="text-xs text-slate-500 ml-1">净利润</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">收入</span>
                <span className="font-medium text-green-600">{formatCurrency(metrics.finance.income)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">支出</span>
                <span className="font-medium text-red-600">{formatCurrency(metrics.finance.expense)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 项目进度 */}
        <Card
          className="border-l-4 border-l-purple-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/projects")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">项目进度</CardTitle>
                <p className="text-xs text-slate-500 mt-1">进行中</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <Target className="w-8 h-8 text-purple-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-purple-600">{metrics.projects.active}</p>
              <div className="flex items-center mt-1">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{metrics.projects.completed}个已完成</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                <p className="font-bold text-green-600">{metrics.projects.completed}</p>
                <p className="text-slate-600">完成</p>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <p className="font-bold text-yellow-600">{metrics.projects.inProgress}</p>
                <p className="text-slate-600">进行</p>
              </div>
              <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                <p className="font-bold text-red-600">{metrics.projects.delayed}</p>
                <p className="text-slate-600">延期</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 任务管理 */}
        <Card
          className="border-l-4 border-l-indigo-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/tasks")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">任务管理</CardTitle>
                <p className="text-xs text-slate-500 mt-1">今日任务</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                <CheckCircle className="w-8 h-8 text-indigo-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-indigo-600">{metrics.tasks.total}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-3 h-3 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600 font-medium">{metrics.tasks.pending}个待处理</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">完成进度</span>
                <span className="font-medium">{metrics.tasks.completion}%</span>
              </div>
              <ColoredProgress
                value={metrics.tasks.completion}
                color="bg-gradient-to-r from-indigo-400 to-indigo-500"
              />
            </div>
          </CardContent>
        </Card>

        {/* 沟通协作 */}
        <Card
          className="border-l-4 border-l-teal-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/communication")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">沟通协作</CardTitle>
                <p className="text-xs text-slate-500 mt-1">团队活跃</p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                <MessageSquare className="w-8 h-8 text-teal-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-teal-600">{metrics.communication.active}</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+{metrics.communication.newMessages}条新消息</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-2 bg-teal-50 rounded border border-teal-200">
                <p className="text-lg font-bold text-teal-600">{metrics.communication.meetings}</p>
                <p className="text-xs text-slate-600">会议</p>
              </div>
              <div className="text-center p-2 bg-blue-50 rounded border border-blue-200">
                <p className="text-lg font-bold text-blue-600">{metrics.communication.messages}</p>
                <p className="text-xs text-slate-600">消息</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 数据分析 */}
        <Card
          className="border-l-4 border-l-pink-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/analytics")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">数据分析</CardTitle>
                <p className="text-xs text-slate-500 mt-1">AI智能</p>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg border border-pink-200">
                <BarChart3 className="w-8 h-8 text-pink-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-pink-600">{metrics.analytics.accuracy}%</p>
              <div className="flex items-center mt-1">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">数据准确率</span>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">报表生成</span>
                <span className="font-medium text-pink-600">{metrics.analytics.reports}份</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">数据源</span>
                <span className="font-medium text-blue-600">{metrics.analytics.sources}个</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OKR管理 */}
        <Card
          className="border-l-4 border-l-cyan-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => router.push("/okr")}
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-medium text-slate-600">OKR管理</CardTitle>
                <p className="text-xs text-slate-500 mt-1">季度目标</p>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg border border-cyan-200">
                <Trophy className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-2xl font-bold text-cyan-600">{metrics.okr.achievement}%</p>
              <div className="flex items-center mt-1">
                <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">目标达成率</span>
              </div>
            </div>
            <div>
              <ColoredProgress value={metrics.okr.achievement} color="bg-gradient-to-r from-cyan-400 to-cyan-500" />
              <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                  <p className="text-lg font-bold text-green-600">{metrics.okr.completed}</p>
                  <p className="text-xs text-slate-600">已达成</p>
                </div>
                <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-lg font-bold text-yellow-600">{metrics.okr.inProgress}</p>
                  <p className="text-xs text-slate-600">进行中</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部分析区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 业务趋势分析 */}
        <Card className="border-t-4 border-t-blue-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              业务趋势分析
            </CardTitle>
            <CardDescription>关键业务指标变化趋势</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">业务趋势图表</p>
              <Button onClick={() => router.push("/analytics")} className={`${buttonStyles.outline} mt-4`}>
                查看详细分析
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 今日待办 */}
        <Card className="border-t-4 border-t-orange-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              今日待办
            </CardTitle>
            <CardDescription>需要处理的重要事项</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div
                className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:shadow-md transition-all"
                onClick={() => router.push("/approval")}
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">审批待处理文档</span>
                </div>
                <Badge className="bg-orange-100 text-orange-800 border-orange-300">紧急</Badge>
              </div>
              <div
                className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:shadow-md transition-all"
                onClick={() => router.push("/schedule")}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">团队周会安排</span>
                </div>
                <Badge className="bg-blue-100 text-blue-800 border-blue-300">今日</Badge>
              </div>
              <div
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:shadow-md transition-all"
                onClick={() => router.push("/analytics")}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">月度报告提交</span>
                </div>
                <Badge className="bg-green-100 text-green-800 border-green-300">明日</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
