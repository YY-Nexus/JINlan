"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Star,
  Search,
  Download,
  Settings,
  Eye,
  MessageSquare,
  Activity,
  Target,
  Zap,
  BarChart3,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Database,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"

// 模拟客户数据
const customerSegments = [
  {
    id: "high-value",
    name: "高价值客户",
    count: 1247,
    percentage: 15.2,
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    description: "消费金额高，忠诚度强",
    avgValue: 15680,
    retention: 92,
    growth: 8.5,
  },
  {
    id: "potential",
    name: "潜在客户",
    count: 3421,
    percentage: 41.8,
    color: "from-blue-500 to-indigo-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    description: "有购买意向，需要培育",
    avgValue: 3240,
    retention: 45,
    growth: 23.1,
  },
  {
    id: "active",
    name: "活跃客户",
    count: 2156,
    percentage: 26.3,
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    description: "互动频繁，参与度高",
    avgValue: 7890,
    retention: 78,
    growth: 12.3,
  },
  {
    id: "at-risk",
    name: "流失风险",
    count: 1376,
    percentage: 16.7,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    borderColor: "border-orange-200",
    description: "活跃度下降，需要关注",
    avgValue: 2340,
    retention: 28,
    growth: -5.2,
  },
]

const aiInsights = [
  {
    id: 1,
    type: "warning",
    title: "客户流失预警",
    description: "检测到156位高价值客户最近30天活跃度显著下降",
    priority: "high",
    action: "立即联系",
    impact: "潜在损失：¥2,340,000",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
  {
    id: 2,
    type: "opportunity",
    title: "升级销售机会",
    description: "发现234位客户符合高端产品推荐条件",
    priority: "medium",
    action: "制定营销策略",
    impact: "预期收益：¥1,890,000",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: 3,
    type: "insight",
    title: "交叉销售推荐",
    description: "AI分析显示67%的家具客户对装饰品有潜在需求",
    priority: "medium",
    action: "推送相关产品",
    impact: "转化率提升：+15%",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 4,
    type: "behavior",
    title: "行为模式分析",
    description: "周末浏览量增加40%，建议调整营销时间策略",
    priority: "low",
    action: "优化投放时间",
    impact: "点击率提升：+8%",
    icon: Activity,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
]

const customerProfiles = [
  {
    id: 1,
    name: "张明华",
    avatar: "/placeholder.svg?height=40&width=40",
    segment: "high-value",
    value: 28900,
    orders: 15,
    lastActive: "2小时前",
    satisfaction: 4.8,
    tags: ["VIP", "忠实客户", "推荐者"],
    phone: "138****8888",
    email: "zhang***@email.com",
    location: "上海市",
    joinDate: "2022-03-15",
    aiScore: 95,
    riskLevel: "低",
    nextAction: "续费提醒",
  },
  {
    id: 2,
    name: "李雅婷",
    avatar: "/placeholder.svg?height=40&width=40",
    segment: "potential",
    value: 4200,
    orders: 3,
    lastActive: "1天前",
    satisfaction: 4.2,
    tags: ["新客户", "潜力股"],
    phone: "159****6666",
    email: "li***@email.com",
    location: "北京市",
    joinDate: "2024-01-20",
    aiScore: 72,
    riskLevel: "中",
    nextAction: "产品推荐",
  },
  {
    id: 3,
    name: "王建国",
    avatar: "/placeholder.svg?height=40&width=40",
    segment: "at-risk",
    value: 12600,
    orders: 8,
    lastActive: "15天前",
    satisfaction: 3.1,
    tags: ["流失风险", "需关注"],
    phone: "186****9999",
    email: "wang***@email.com",
    location: "广州市",
    joinDate: "2021-08-10",
    aiScore: 34,
    riskLevel: "高",
    nextAction: "挽回营销",
  },
]

const analyticsData = {
  customerValue: [
    { month: "1月", value: 45000, customers: 1200 },
    { month: "2月", value: 52000, customers: 1350 },
    { month: "3月", value: 48000, customers: 1280 },
    { month: "4月", value: 61000, customers: 1450 },
    { month: "5月", value: 58000, customers: 1380 },
    { month: "6月", value: 67000, customers: 1520 },
  ],
  satisfaction: [
    { name: "非常满意", value: 45, color: "#10b981" },
    { name: "满意", value: 35, color: "#3b82f6" },
    { name: "一般", value: 15, color: "#f59e0b" },
    { name: "不满意", value: 5, color: "#ef4444" },
  ],
  revenue: [
    { segment: "高价值", amount: 2340000, percentage: 45 },
    { segment: "活跃客户", amount: 1560000, percentage: 30 },
    { segment: "潜在客户", amount: 890000, percentage: 17 },
    { segment: "流失风险", amount: 410000, percentage: 8 },
  ],
}

export function AiCustomerData() {
  const [selectedSegment, setSelectedSegment] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [aiSettings, setAiSettings] = useState({
    autoAnalysis: true,
    riskThreshold: 30,
    notificationEnabled: true,
    analysisFrequency: "daily",
  })

  const filteredCustomers = customerProfiles.filter((customer) => {
    const matchesSegment = selectedSegment === "all" || customer.segment === selectedSegment
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSegment && matchesSearch
  })

  const runAiAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI客户数据分析
          </h1>
          <p className="text-gray-600 mt-2">智能分析客户行为，精准洞察商业机会</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={runAiAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                AI分析
              </>
            )}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 客户分群概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {customerSegments.map((segment, index) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`${segment.borderColor} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer`}
              onClick={() => setSelectedSegment(segment.id)}
            >
              <CardHeader className={`${segment.bgColor} pb-3`}>
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-lg ${segment.textColor}`}>{segment.name}</CardTitle>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${segment.color} flex items-center justify-center`}
                  >
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{segment.count.toLocaleString()}</span>
                    <Badge variant="secondary" className={segment.textColor}>
                      {segment.percentage}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{segment.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">平均价值</span>
                      <p className="font-semibold">¥{segment.avgValue.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">留存率</span>
                      <p className="font-semibold flex items-center">
                        {segment.retention}%
                        {segment.growth > 0 ? (
                          <ArrowUp className="w-3 h-3 text-green-500 ml-1" />
                        ) : (
                          <ArrowDown className="w-3 h-3 text-red-500 ml-1" />
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI洞察和分析 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI洞察 */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <CardTitle>AI智能洞察</CardTitle>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  实时更新
                </Badge>
              </div>
              <CardDescription>基于机器学习算法的客户行为分析</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${insight.borderColor} ${insight.bgColor}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg ${insight.bgColor} flex items-center justify-center`}>
                          <insight.icon className={`w-4 h-4 ${insight.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                            <Badge
                              variant={
                                insight.priority === "high"
                                  ? "destructive"
                                  : insight.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {insight.priority === "high"
                                ? "高优先级"
                                : insight.priority === "medium"
                                  ? "中优先级"
                                  : "低优先级"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">
                              <span className="font-medium">{insight.impact}</span>
                            </div>
                            <Button size="sm" variant="outline">
                              {insight.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* 快速统计 */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                关键指标
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">总客户数</span>
                  <span className="font-semibold">8,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">月活跃用户</span>
                  <span className="font-semibold text-green-600">6,543</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">平均客单价</span>
                  <span className="font-semibold">¥4,567</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">客户满意度</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">4.6</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">AI分析状态</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">模型准确率</span>
                  <span className="font-semibold text-blue-600">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">预测置信度</span>
                  <span className="font-semibold text-purple-600">87.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">最后更新</span>
                  <span className="text-sm text-gray-500">5分钟前</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                AI设置
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">自动分析</span>
                <Switch
                  checked={aiSettings.autoAnalysis}
                  onCheckedChange={(checked) => setAiSettings({ ...aiSettings, autoAnalysis: checked })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">风险阈值</span>
                  <span className="text-sm font-medium">{aiSettings.riskThreshold}%</span>
                </div>
                <Slider
                  value={[aiSettings.riskThreshold]}
                  onValueChange={(value) => setAiSettings({ ...aiSettings, riskThreshold: value[0] })}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">通知提醒</span>
                <Switch
                  checked={aiSettings.notificationEnabled}
                  onCheckedChange={(checked) => setAiSettings({ ...aiSettings, notificationEnabled: checked })}
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm">分析频率</span>
                <Select
                  value={aiSettings.analysisFrequency}
                  onValueChange={(value) => setAiSettings({ ...aiSettings, analysisFrequency: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">实时</SelectItem>
                    <SelectItem value="hourly">每小时</SelectItem>
                    <SelectItem value="daily">每日</SelectItem>
                    <SelectItem value="weekly">每周</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 详细分析标签页 */}
      <Tabs defaultValue="customers" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="customers">客户档案</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
          <TabsTrigger value="predictions">预测模型</TabsTrigger>
          <TabsTrigger value="reports">报告导出</TabsTrigger>
        </TabsList>

        {/* 客户档案 */}
        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>客户详细档案</CardTitle>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="搜索客户..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="选择分群" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">全部客户</SelectItem>
                      <SelectItem value="high-value">高价值客户</SelectItem>
                      <SelectItem value="potential">潜在客户</SelectItem>
                      <SelectItem value="active">活跃客户</SelectItem>
                      <SelectItem value="at-risk">流失风险</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCustomers.map((customer, index) => (
                  <motion.div
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{customer.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className={
                                customer.segment === "high-value"
                                  ? "border-emerald-200 text-emerald-700"
                                  : customer.segment === "potential"
                                    ? "border-blue-200 text-blue-700"
                                    : customer.segment === "active"
                                      ? "border-purple-200 text-purple-700"
                                      : "border-orange-200 text-orange-700"
                              }
                            >
                              {customerSegments.find((s) => s.id === customer.segment)?.name}
                            </Badge>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">{customer.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">¥{customer.value.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{customer.orders}笔订单</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-gray-500">AI评分:</span>
                          <span
                            className={`text-xs font-medium ${
                              customer.aiScore >= 80
                                ? "text-green-600"
                                : customer.aiScore >= 60
                                  ? "text-yellow-600"
                                  : "text-red-600"
                            }`}
                          >
                            {customer.aiScore}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>最后活跃: {customer.lastActive}</span>
                        <span>满意度: {customer.satisfaction}/5.0</span>
                        <span
                          className={`font-medium ${
                            customer.riskLevel === "低"
                              ? "text-green-600"
                              : customer.riskLevel === "中"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          风险: {customer.riskLevel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          查看详情
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          联系
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 数据分析 */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>客户价值趋势</CardTitle>
                <CardDescription>过去6个月的客户价值变化</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={analyticsData.customerValue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>客户满意度分布</CardTitle>
                <CardDescription>当前客户满意度统计</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Tooltip />
                    <RechartsPieChart data={analyticsData.satisfaction}>
                      {analyticsData.satisfaction.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart>
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>收入贡献分析</CardTitle>
                <CardDescription>各客户分群的收入贡献情况</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsBarChart data={analyticsData.revenue}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 预测模型 */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  流失预测
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">156</div>
                    <div className="text-sm text-gray-600">高风险客户</div>
                  </div>
                  <Progress value={23} className="w-full" />
                  <div className="text-xs text-gray-500 text-center">预测准确率: 89.2%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  价值提升
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">234</div>
                    <div className="text-sm text-gray-600">潜力客户</div>
                  </div>
                  <Progress value={67} className="w-full" />
                  <div className="text-xs text-gray-500 text-center">预测准确率: 92.1%</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-500" />
                  交叉销售
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">412</div>
                    <div className="text-sm text-gray-600">推荐机会</div>
                  </div>
                  <Progress value={45} className="w-full" />
                  <div className="text-xs text-gray-500 text-center">预测准确率: 85.7%</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI模型性能</CardTitle>
              <CardDescription>各预测模型的准确率和置信度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">94.2%</div>
                    <div className="text-sm text-gray-600">整体准确率</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87.5%</div>
                    <div className="text-sm text-gray-600">预测置信度</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">12.3%</div>
                    <div className="text-sm text-gray-600">误差率</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">客户流失预测</span>
                    <div className="flex items-center gap-2">
                      <Progress value={89} className="w-24" />
                      <span className="text-sm font-medium">89.2%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">价值提升预测</span>
                    <div className="flex items-center gap-2">
                      <Progress value={92} className="w-24" />
                      <span className="text-sm font-medium">92.1%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">交叉销售预测</span>
                    <div className="flex items-center gap-2">
                      <Progress value={86} className="w-24" />
                      <span className="text-sm font-medium">85.7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">行为模式分析</span>
                    <div className="flex items-center gap-2">
                      <Progress value={91} className="w-24" />
                      <span className="text-sm font-medium">91.4%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 报告导出 */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  客户分析报告
                </CardTitle>
                <CardDescription>完整的客户行为分析和洞察</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    • 客户分群详细分析
                    <br />• AI洞察和建议
                    <br />• 预测模型结果
                    <br />• 行动计划建议
                  </div>
                  <Button className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    下载PDF报告
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-500" />
                  数据导出
                </CardTitle>
                <CardDescription>导出客户数据和分析结果</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    • 客户基础信息
                    <br />• 交易历史数据
                    <br />• AI评分结果
                    <br />• 预测分析数据
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    导出Excel
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  可视化报表
                </CardTitle>
                <CardDescription>交互式图表和仪表板</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-sm text-gray-600">
                    • 动态数据图表
                    <br />• 交互式仪表板
                    <br />• 趋势分析图
                    <br />• 自定义视图
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    查看仪表板
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>定制报告</CardTitle>
              <CardDescription>根据需求生成个性化分析报告</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">报告类型</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择报告类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="comprehensive">综合分析报告</SelectItem>
                        <SelectItem value="segment">客户分群报告</SelectItem>
                        <SelectItem value="prediction">预测分析报告</SelectItem>
                        <SelectItem value="performance">模型性能报告</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">时间范围</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择时间范围" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">最近7天</SelectItem>
                        <SelectItem value="30d">最近30天</SelectItem>
                        <SelectItem value="90d">最近90天</SelectItem>
                        <SelectItem value="1y">最近1年</SelectItem>
                        <SelectItem value="custom">自定义</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">客户分群</label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择客户分群" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">全部客户</SelectItem>
                        <SelectItem value="high-value">高价值客户</SelectItem>
                        <SelectItem value="potential">潜在客户</SelectItem>
                        <SelectItem value="active">活跃客户</SelectItem>
                        <SelectItem value="at-risk">流失风险</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">输出格式</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="pdf" className="rounded" />
                        <label htmlFor="pdf" className="text-sm">
                          PDF报告
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="excel" className="rounded" />
                        <label htmlFor="excel" className="text-sm">
                          Excel数据
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="ppt" className="rounded" />
                        <label htmlFor="ppt" className="text-sm">
                          PPT演示
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">邮件发送</label>
                    <Input placeholder="输入邮箱地址" className="mt-1" />
                  </div>
                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    生成定制报告
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
