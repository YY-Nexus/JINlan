"use client"

import { useState } from "react"
import { PageContainer } from "@/components/layout/page-container"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"
import { EnhancedCard } from "@/components/ui/enhanced-card"
import { EnhancedButton } from "@/components/ui/enhanced-button"
import { SalesChart } from "@/components/charts/sales-chart"
import { FinanceChart } from "@/components/charts/finance-chart"
import { PerformanceChart } from "@/components/charts/performance-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Download, Eye, Users, DollarSign } from "lucide-react"
import { getProgressColor } from "@/lib/design-system"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <PageContainer>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">数据分析</h1>
            <p className="text-slate-600 mt-1">深入了解业务数据和趋势</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">本周</SelectItem>
                <SelectItem value="month">本月</SelectItem>
                <SelectItem value="quarter">本季度</SelectItem>
                <SelectItem value="year">本年度</SelectItem>
              </SelectContent>
            </Select>
            <EnhancedButton variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              实时监控
            </EnhancedButton>
            <EnhancedButton className="bg-sky-600 hover:bg-sky-700">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </EnhancedButton>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedCard className="border-l-4 border-l-sky-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">总访问量</p>
                <p className="text-2xl font-bold text-slate-800">24,567</p>
                <p className="text-xs text-green-600 mt-1">↑ 15% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-sky-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">活跃用户</p>
                <p className="text-2xl font-bold text-slate-800">8,945</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">转化率</p>
                <p className="text-2xl font-bold text-slate-800">12.5%</p>
                <p className="text-xs text-yellow-600 mt-1">↑ 2.3% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </EnhancedCard>

          <EnhancedCard className="border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">总收入</p>
                <p className="text-2xl font-bold text-slate-800">¥156.8K</p>
                <p className="text-xs text-purple-600 mt-1">↑ 18% 较上月</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </EnhancedCard>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnhancedCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">销售趋势</h2>
              <EnhancedButton variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                详细分析
              </EnhancedButton>
            </div>
            <SalesChart />
          </EnhancedCard>

          <EnhancedCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">财务概览</h2>
              <EnhancedButton variant="outline" size="sm">
                <DollarSign className="w-4 h-4 mr-2" />
                财务报表
              </EnhancedButton>
            </div>
            <FinanceChart />
          </EnhancedCard>
        </div>

        {/* 性能分析 */}
        <EnhancedCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">性能分析</h2>
            <div className="flex gap-2">
              <EnhancedButton variant="outline" size="sm">
                日
              </EnhancedButton>
              <EnhancedButton variant="outline" size="sm">
                周
              </EnhancedButton>
              <EnhancedButton variant="outline" size="sm">
                月
              </EnhancedButton>
            </div>
          </div>
          <PerformanceChart />
        </EnhancedCard>

        {/* 数据洞察 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EnhancedCard>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">热门页面</h3>
            <div className="space-y-3">
              {[
                { page: "/dashboard", views: "12,345", percentage: 85 },
                { page: "/customers", views: "8,967", percentage: 65 },
                { page: "/tasks", views: "6,543", percentage: 45 },
                { page: "/analytics", views: "4,321", percentage: 30 },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">{item.page}</p>
                    <p className="text-sm text-slate-600">{item.views} 次访问</p>
                  </div>
                  <div className="w-20">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(item.percentage)}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </EnhancedCard>

          <EnhancedCard>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">用户来源</h3>
            <div className="space-y-3">
              {[
                { source: "直接访问", users: "5,234", color: "bg-sky-500" },
                { source: "搜索引擎", users: "3,456", color: "bg-green-500" },
                { source: "社交媒体", users: "2,345", color: "bg-yellow-500" },
                { source: "邮件营销", users: "1,234", color: "bg-purple-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-slate-800">{item.source}</span>
                  </div>
                  <span className="font-medium text-slate-800">{item.users}</span>
                </div>
              ))}
            </div>
          </EnhancedCard>
        </div>
      </div>
      <FloatingNavButtons />
    </PageContainer>
  )
}
