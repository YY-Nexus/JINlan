"use client"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { DashboardContent } from "@/components/dashboard-content"
import { ModuleCards } from "@/components/module-cards"
import { DashboardRealTimeData } from "@/components/dashboard-realtime-data"
import { SystemPerformanceMetrics } from "@/components/system-performance-metrics"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
  Target,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Zap,
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const quickStats = [
    {
      title: "今日客户咨询",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
      progress: 78,
    },
    {
      title: "待处理任务",
      value: "23",
      change: "-8%",
      trend: "down",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-l-orange-500",
      progress: 45,
    },
    {
      title: "已完成任务",
      value: "89",
      change: "+15%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
      progress: 92,
    },
    {
      title: "客户满意度",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-l-purple-500",
      progress: 98.5,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "customer",
      title: "新客户注册",
      description: "张先生完成了账户注册",
      time: "5分钟前",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      borderColor: "border-l-blue-500",
    },
    {
      id: 2,
      type: "task",
      title: "任务完成",
      description: "客户投诉处理已完成",
      time: "10分钟前",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
      borderColor: "border-l-green-500",
    },
    {
      id: 3,
      type: "alert",
      title: "系统提醒",
      description: "有3个任务即将到期",
      time: "15分钟前",
      icon: AlertCircle,
      color: "bg-orange-100 text-orange-600",
      borderColor: "border-l-orange-500",
    },
    {
      id: 4,
      type: "message",
      title: "新消息",
      description: "收到来自李女士的咨询",
      time: "20分钟前",
      icon: MessageSquare,
      color: "bg-purple-100 text-purple-600",
      borderColor: "border-l-purple-500",
    },
  ]

  const performanceMetrics = [
    {
      title: "销售业绩",
      value: "¥2,847,392",
      target: "¥3,000,000",
      progress: 94.9,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-l-green-500",
      progressColor: "bg-gradient-to-r from-green-400 to-green-500",
    },
    {
      title: "客户增长",
      value: "15,847",
      target: "18,000",
      progress: 88.0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-l-blue-500",
      progressColor: "bg-gradient-to-r from-blue-400 to-blue-500",
    },
    {
      title: "项目完成率",
      value: "89%",
      target: "95%",
      progress: 93.7,
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-l-purple-500",
      progressColor: "bg-gradient-to-r from-purple-400 to-purple-500",
    },
    {
      title: "响应速度",
      value: "2.3秒",
      target: "2.0秒",
      progress: 85.0,
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-l-orange-500",
      progressColor: "bg-gradient-to-r from-orange-400 to-orange-500",
    },
  ]

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            欢迎回来，{user?.name}！
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            今天是 {formatTime(currentTime)}
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <Badge variant="secondary" className="text-sm px-3 py-1 border-l-4 border-l-blue-500">
            {user?.role === "admin" ? "系统管理员" : user?.role === "manager" ? "部门经理" : "普通用户"}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1 border-l-4 border-l-green-500 bg-green-50">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            在线
          </Badge>
        </div>
      </div>

      {/* 快速统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className={`${stat.borderColor} hover:shadow-xl hover:scale-105 transition-all duration-300 group`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                      >
                        {stat.change} 较昨日
                      </span>
                    </div>
                  </div>
                  <div className={`p-4 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-all duration-300`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">完成度</span>
                    <span className="font-medium">{stat.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-lg">
          <TabsTrigger value="overview" className="transition-all duration-300 hover:scale-105">
            概览
          </TabsTrigger>
          <TabsTrigger value="analytics" className="transition-all duration-300 hover:scale-105">
            分析
          </TabsTrigger>
          <TabsTrigger value="modules" className="transition-all duration-300 hover:scale-105">
            模块
          </TabsTrigger>
          <TabsTrigger value="system" className="transition-all duration-300 hover:scale-105">
            系统
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 实时数据 */}
            <div className="lg:col-span-2">
              <DashboardRealTimeData />
            </div>

            {/* 最近活动 */}
            <Card className="border-l-4 border-l-sky-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-sky-600" />
                  最近活动
                </CardTitle>
                <CardDescription>系统最新动态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div
                      key={activity.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${activity.borderColor} hover:shadow-md transition-all duration-300 group`}
                    >
                      <div
                        className={`p-2 rounded-full ${activity.color} group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-all duration-300">
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* 性能指标 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, index) => {
              const Icon = metric.icon
              return (
                <Card
                  key={index}
                  className={`${metric.borderColor} hover:shadow-xl hover:scale-105 transition-all duration-300 group`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-lg ${metric.bgColor} group-hover:scale-110 transition-all duration-300`}
                      >
                        <Icon className={`h-6 w-6 ${metric.color}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{metric.title}</p>
                        <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">目标: {metric.target}</span>
                        <span className="font-medium">{metric.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`${metric.progressColor} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${metric.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* 仪表板内容 */}
          <DashboardContent />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-blue-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  数据分析
                </CardTitle>
                <CardDescription>业务数据统计分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-300">
                  数据图表区域
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />
                  目标达成
                </CardTitle>
                <CardDescription>本月目标完成情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">客户满意度</span>
                      <span className="text-green-600 font-bold">98.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: "98.5%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">任务完成率</span>
                      <span className="text-blue-600 font-bold">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium">响应时间</span>
                      <span className="text-purple-600 font-bold">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <ModuleCards />
        </TabsContent>

        <TabsContent value="system" className="space-y-6">
          <SystemPerformanceMetrics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
