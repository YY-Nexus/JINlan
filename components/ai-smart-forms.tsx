"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Brain,
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  TrendingUp,
  Users,
  CheckCircle,
  Smartphone,
  Monitor,
  Tablet,
  Target,
  Lightbulb,
  Download,
  Share,
  FileText,
  FormInput,
  Calendar,
  Star,
  MessageSquare,
  Mail,
  Phone,
  ImageIcon,
  Hash,
  Type,
  List,
  CheckSquare,
  Radio,
  Upload,
  Palette,
  Layout,
  RefreshCw,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// 表单模板数据
const formTemplates = [
  {
    id: "survey",
    name: "客户调研表",
    description: "收集客户反馈和需求信息",
    category: "调研",
    fields: 8,
    responses: 1247,
    completionRate: 78,
    avgTime: "3分钟",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
  },
  {
    id: "feedback",
    name: "产品反馈表",
    description: "收集产品使用体验和建议",
    category: "反馈",
    fields: 6,
    responses: 892,
    completionRate: 85,
    avgTime: "2分钟",
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
  },
  {
    id: "registration",
    name: "用户注册表",
    description: "新用户注册信息收集",
    category: "注册",
    fields: 5,
    responses: 2156,
    completionRate: 92,
    avgTime: "1.5分钟",
    icon: Users,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-200",
  },
  {
    id: "order",
    name: "订单信息表",
    description: "客户订单详情和配送信息",
    category: "订单",
    fields: 12,
    responses: 3421,
    completionRate: 89,
    avgTime: "4分钟",
    icon: FileText,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
  },
  {
    id: "contact",
    name: "联系我们表",
    description: "客户咨询和联系信息",
    category: "联系",
    fields: 4,
    responses: 567,
    completionRate: 76,
    avgTime: "1分钟",
    icon: Phone,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-700",
    borderColor: "border-indigo-200",
  },
  {
    id: "assessment",
    name: "需求评估表",
    description: "客户需求分析和评估",
    category: "评估",
    fields: 10,
    responses: 734,
    completionRate: 82,
    avgTime: "5分钟",
    icon: Target,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    borderColor: "border-red-200",
  },
]

// 字段类型
const fieldTypes = [
  { id: "text", name: "单行文本", icon: Type, description: "简短文本输入" },
  { id: "textarea", name: "多行文本", icon: FileText, description: "长文本输入" },
  { id: "email", name: "邮箱", icon: Mail, description: "邮箱地址输入" },
  { id: "phone", name: "电话", icon: Phone, description: "电话号码输入" },
  { id: "number", name: "数字", icon: Hash, description: "数字输入" },
  { id: "select", name: "下拉选择", icon: List, description: "单选下拉菜单" },
  { id: "radio", name: "单选按钮", icon: Radio, description: "单选选项" },
  { id: "checkbox", name: "多选框", icon: CheckSquare, description: "多选选项" },
  { id: "date", name: "日期", icon: Calendar, description: "日期选择" },
  { id: "rating", name: "评分", icon: Star, description: "星级评分" },
  { id: "file", name: "文件上传", icon: Upload, description: "文件上传" },
  { id: "image", name: "图片上传", icon: ImageIcon, description: "图片上传" },
]

// AI优化建议
const aiSuggestions = [
  {
    id: 1,
    type: "field-order",
    title: "字段顺序优化",
    description: "建议将字段移至表单顶部，可提升完成率12%",
    impact: "高",
    confidence: 89,
    action: "应用建议",
    icon: Layout,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 2,
    type: "field-type",
    title: "字段类型建议",
    description: "电话号码字段建议使用专用输入类型，减少输入错误",
    impact: "中",
    confidence: 76,
    action: "查看详情",
    icon: Phone,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    id: 3,
    type: "validation",
    title: "验证规则优化",
    description: "邮箱字段添加实时验证，可减少无效提交23%",
    impact: "中",
    confidence: 82,
    action: "启用验证",
    icon: CheckCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    id: 4,
    type: "design",
    title: "视觉设计建议",
    description: "使用渐进式表单设计，分步骤展示可提升用户体验",
    impact: "高",
    confidence: 91,
    action: "预览效果",
    icon: Palette,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

// 分析数据
const analyticsData = {
  completion: [
    { date: "1月", rate: 72, responses: 1200 },
    { date: "2月", rate: 78, responses: 1350 },
    { date: "3月", rate: 75, responses: 1180 },
    { date: "4月", rate: 82, responses: 1420 },
    { date: "5月", rate: 85, responses: 1560 },
    { date: "6月", rate: 89, responses: 1680 },
  ],
  devices: [
    { name: "移动端", value: 65, color: "#3b82f6" },
    { name: "桌面端", value: 28, color: "#10b981" },
    { name: "平板", value: 7, color: "#f59e0b" },
  ],
  responseTime: [
    { hour: "00", responses: 12 },
    { hour: "06", responses: 45 },
    { hour: "12", responses: 156 },
    { hour: "18", responses: 234 },
    { hour: "24", responses: 89 },
  ],
}

export function AiSmartForms() {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formBuilder, setFormBuilder] = useState({
    name: "",
    description: "",
    fields: [],
    settings: {
      allowMultiple: false,
      requireLogin: false,
      showProgress: true,
      autoSave: true,
    },
  })
  const [aiAnalyzing, setAiAnalyzing] = useState(false)
  const [selectedField, setSelectedField] = useState<any>(null)

  const startCreating = (template?: any) => {
    setSelectedTemplate(template)
    setIsCreating(true)
    if (template) {
      setFormBuilder({
        ...formBuilder,
        name: template.name,
        description: template.description,
      })
    }
  }

  const runAiAnalysis = () => {
    setAiAnalyzing(true)
    setTimeout(() => {
      setAiAnalyzing(false)
    }, 3000)
  }

  const addField = (type: string) => {
    const newField = {
      id: Date.now(),
      type,
      label: `新${fieldTypes.find((f) => f.id === type)?.name}`,
      required: false,
      placeholder: "",
      options: type === "select" || type === "radio" || type === "checkbox" ? ["选项1", "选项2"] : [],
    }
    setFormBuilder({
      ...formBuilder,
      fields: [...formBuilder.fields, newField],
    })
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI智能表单
          </h1>
          <p className="text-gray-600 mt-2">智能构建表单，AI优化体验，深度数据分析</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={runAiAnalysis} disabled={aiAnalyzing} variant="outline">
            {aiAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                AI分析中...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                AI分析
              </>
            )}
          </Button>
          <Button
            onClick={() => startCreating()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            创建表单
          </Button>
        </div>
      </div>

      {!isCreating ? (
        <>
          {/* 概览统计 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">总表单数</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% 本月
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">总回复数</p>
                    <p className="text-2xl font-bold text-gray-900">9,017</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +23% 本月
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">平均完成率</p>
                    <p className="text-2xl font-bold text-gray-900">83.5%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5.2% 本月
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">AI优化建议</p>
                    <p className="text-2xl font-bold text-gray-900">12</p>
                    <p className="text-xs text-orange-600 flex items-center mt-1">
                      <Lightbulb className="w-3 h-3 mr-1" />
                      待处理
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 表单模板 */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    智能表单模板
                  </CardTitle>
                  <CardDescription>选择预设模板快速创建表单，或从空白开始</CardDescription>
                </div>
                <Button variant="outline" onClick={() => startCreating()}>
                  <Plus className="w-4 h-4 mr-2" />
                  空白表单
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`${template.borderColor} border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                    >
                      <CardHeader className={`${template.bgColor} pb-3`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${template.color} flex items-center justify-center`}
                            >
                              <template.icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <CardTitle className={`text-lg ${template.textColor}`}>{template.name}</CardTitle>
                              <Badge variant="secondary" className="text-xs">
                                {template.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                          <div>
                            <span className="text-gray-500">字段数量</span>
                            <p className="font-semibold">{template.fields}个</p>
                          </div>
                          <div>
                            <span className="text-gray-500">回复数量</span>
                            <p className="font-semibold">{template.responses.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-500">完成率</span>
                            <p className="font-semibold text-green-600">{template.completionRate}%</p>
                          </div>
                          <div>
                            <span className="text-gray-500">平均用时</span>
                            <p className="font-semibold">{template.avgTime}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1" onClick={() => startCreating(template)}>
                            使用模板
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI优化建议 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-500" />
                AI优化建议
              </CardTitle>
              <CardDescription>基于数据分析的智能优化建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${suggestion.bgColor} border-gray-200`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg ${suggestion.bgColor} flex items-center justify-center`}>
                        <suggestion.icon className={`w-4 h-4 ${suggestion.color} mt-0.5`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant={suggestion.impact === "高" ? "destructive" : "secondary"}>
                              {suggestion.impact}影响
                            </Badge>
                            <span className="text-xs text-gray-500">{suggestion.confidence}%置信度</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                        <Button size="sm" variant="outline">
                          {suggestion.action}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 数据分析 */}
          <Tabs defaultValue="performance" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="performance">性能分析</TabsTrigger>
              <TabsTrigger value="devices">设备分布</TabsTrigger>
              <TabsTrigger value="timing">时间分析</TabsTrigger>
              <TabsTrigger value="conversion">转化分析</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>完成率趋势</CardTitle>
                    <CardDescription>过去6个月的表单完成率变化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={analyticsData.completion}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>回复数量趋势</CardTitle>
                    <CardDescription>每月表单回复数量统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={analyticsData.completion}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="responses" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>设备使用分布</CardTitle>
                    <CardDescription>用户使用设备类型统计</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Tooltip />
                        {analyticsData.devices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>设备性能对比</CardTitle>
                    <CardDescription>不同设备的表单完成情况</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">移动端</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-24" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Monitor className="w-4 h-4 text-green-500" />
                        <span className="text-sm">桌面端</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-24" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tablet className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">平板</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-24" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="timing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>时间分布分析</CardTitle>
                  <CardDescription>用户填写表单的时间分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analyticsData.responseTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="responses" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversion" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">89.2%</div>
                    <div className="text-sm text-gray-600">平均转化率</div>
                    <div className="text-xs text-green-600 mt-1">+5.2% 较上月</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">2.3分钟</div>
                    <div className="text-sm text-gray-600">平均完成时间</div>
                    <div className="text-xs text-green-600 mt-1">-12秒 较上月</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">15.7%</div>
                    <div className="text-sm text-gray-600">跳出率</div>
                    <div className="text-xs text-red-600 mt-1">+2.1% 较上月</div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        /* 表单构建器 */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">表单构建器</h2>
              <p className="text-gray-600">拖拽字段创建表单，AI实时优化建议</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                返回列表
              </Button>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                预览
              </Button>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
                <CheckCircle className="w-4 h-4 mr-2" />
                保存表单
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 字段工具箱 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">字段工具箱</CardTitle>
                <CardDescription>拖拽字段到表单中</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-2">
                    {fieldTypes.map((field) => (
                      <motion.div key={field.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          className="w-full justify-start h-auto p-3 bg-transparent"
                          onClick={() => addField(field.id)}
                        >
                          <field.icon className="w-4 h-4 mr-3 flex-shrink-0" />
                          <div className="text-left">
                            <div className="font-medium">{field.name}</div>
                            <div className="text-xs text-gray-500">{field.description}</div>
                          </div>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* 表单编辑区 */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="表单标题"
                      value={formBuilder.name}
                      onChange={(e) => setFormBuilder({ ...formBuilder, name: e.target.value })}
                      className="text-lg font-semibold"
                    />
                    <Textarea
                      placeholder="表单描述"
                      value={formBuilder.description}
                      onChange={(e) => setFormBuilder({ ...formBuilder, description: e.target.value })}
                      rows={2}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {formBuilder.fields.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                          <FormInput className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>从左侧工具箱拖拽字段到这里</p>
                          <p className="text-sm">或点击字段类型快速添加</p>
                        </div>
                      ) : (
                        formBuilder.fields.map((field, index) => (
                          <motion.div
                            key={field.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 border rounded-lg hover:shadow-sm transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{field.label}</span>
                                {field.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    必填
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="ghost">
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Copy className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {field.type === "text" && (
                                <Input placeholder={field.placeholder || "请输入..."} disabled />
                              )}
                              {field.type === "textarea" && (
                                <Textarea placeholder={field.placeholder || "请输入..."} disabled rows={3} />
                              )}
                              {field.type === "select" && (
                                <Select disabled>
                                  <SelectTrigger>
                                    <SelectValue placeholder="请选择..." />
                                  </SelectTrigger>
                                </Select>
                              )}
                              {field.type === "email" && <Input type="email" placeholder="请输入邮箱地址" disabled />}
                              {field.type === "phone" && <Input type="tel" placeholder="请输入电话号码" disabled />}
                              {field.type === "date" && <Input type="date" disabled />}
                              {field.type === "rating" && (
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-5 h-5 text-gray-300" />
                                  ))}
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* 设置面板 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">表单设置</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">显示进度条</span>
                    <Switch
                      checked={formBuilder.settings.showProgress}
                      onCheckedChange={(checked) =>
                        setFormBuilder({
                          ...formBuilder,
                          settings: { ...formBuilder.settings, showProgress: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">自动保存</span>
                    <Switch
                      checked={formBuilder.settings.autoSave}
                      onCheckedChange={(checked) =>
                        setFormBuilder({
                          ...formBuilder,
                          settings: { ...formBuilder.settings, autoSave: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">需要登录</span>
                    <Switch
                      checked={formBuilder.settings.requireLogin}
                      onCheckedChange={(checked) =>
                        setFormBuilder({
                          ...formBuilder,
                          settings: { ...formBuilder.settings, requireLogin: checked },
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">允许多次提交</span>
                    <Switch
                      checked={formBuilder.settings.allowMultiple}
                      onCheckedChange={(checked) =>
                        setFormBuilder({
                          ...formBuilder,
                          settings: { ...formBuilder.settings, allowMultiple: checked },
                        })
                      }
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">AI优化建议</h4>
                  <div className="space-y-3">
                    {aiSuggestions.slice(0, 2).map((suggestion) => (
                      <div key={suggestion.id} className={`p-3 rounded-lg ${suggestion.bgColor} border`}>
                        <div className="flex items-start gap-2">
                          <suggestion.icon className={`w-4 h-4 ${suggestion.color} mt-0.5`} />
                          <div>
                            <div className="text-sm font-medium">{suggestion.title}</div>
                            <div className="text-xs text-gray-600 mt-1">{suggestion.description}</div>
                            <Button size="sm" variant="outline" className="mt-2 text-xs bg-transparent">
                              应用建议
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">分享设置</h4>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share className="w-4 h-4 mr-2" />
                    获取分享链接
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    导出表单
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
