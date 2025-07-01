"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Download,
  Share2,
  Search,
  BarChart3,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Loader2,
  Target,
  Lock,
  Eye,
  EyeOff,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Bookmark,
  Lightbulb,
  TrendingDown,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
  confidence?: number
  processingTime?: number
  tokens?: number
  cost?: number
  rating?: number
  bookmarked?: boolean
}

interface AIModel {
  id: string
  name: string
  description: string
  speed: number
  accuracy: number
  cost: number
  capabilities: string[]
  status: "online" | "offline" | "maintenance"
  responseTime: number
  reliability: number
}

interface SecurityMetrics {
  dataEncryption: boolean
  accessControl: boolean
  auditLog: boolean
  privacyCompliance: boolean
  threatDetection: boolean
  securityScore: number
}

interface PerformanceMetrics {
  responseTime: number
  throughput: number
  accuracy: number
  uptime: number
  errorRate: number
  resourceUsage: number
}

export function AIAssistant() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [temperature, setTemperature] = useState([0.7])
  const [maxTokens, setMaxTokens] = useState([2048])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isRealTimeMode, setIsRealTimeMode] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [showMetrics, setShowMetrics] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const [currentProcessingTime, setCurrentProcessingTime] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const processingIntervalRef = useRef<NodeJS.Timeout>()

  const aiModels: AIModel[] = [
    {
      id: "gpt-4-turbo",
      name: "GPT-4 Turbo",
      description: "最新的GPT-4模型，速度更快，成本更低",
      speed: 95,
      accuracy: 98,
      cost: 0.03,
      capabilities: ["文本生成", "代码编写", "数据分析", "创意写作", "问题解答"],
      status: "online",
      responseTime: 1.2,
      reliability: 99.8,
    },
    {
      id: "gpt-4",
      name: "GPT-4",
      description: "强大的多模态AI模型，适合复杂任务",
      speed: 85,
      accuracy: 96,
      cost: 0.06,
      capabilities: ["深度分析", "复杂推理", "多语言支持", "图像理解"],
      status: "online",
      responseTime: 2.1,
      reliability: 99.5,
    },
    {
      id: "claude-3",
      name: "Claude 3",
      description: "Anthropic的高性能AI助手",
      speed: 90,
      accuracy: 94,
      cost: 0.04,
      capabilities: ["安全对话", "长文本处理", "代码审查", "学术写作"],
      status: "online",
      responseTime: 1.8,
      reliability: 99.2,
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      description: "Google的先进AI模型",
      speed: 88,
      accuracy: 93,
      cost: 0.02,
      capabilities: ["多模态理解", "实时分析", "科学计算", "创新思维"],
      status: "maintenance",
      responseTime: 2.5,
      reliability: 98.9,
    },
  ]

  const securityMetrics: SecurityMetrics = {
    dataEncryption: true,
    accessControl: true,
    auditLog: true,
    privacyCompliance: true,
    threatDetection: true,
    securityScore: 98,
  }

  const performanceMetrics: PerformanceMetrics = {
    responseTime: 1.5,
    throughput: 1200,
    accuracy: 96.5,
    uptime: 99.9,
    errorRate: 0.1,
    resourceUsage: 65,
  }

  const quickActions = [
    { icon: BarChart3, label: "数据分析", prompt: "帮我分析最新的业务数据趋势" },
    { icon: Users, label: "客户洞察", prompt: "分析客户行为模式和偏好" },
    { icon: TrendingUp, label: "市场预测", prompt: "预测下个季度的市场趋势" },
    { icon: Target, label: "目标优化", prompt: "优化我们的业务目标和KPI" },
    { icon: Lightbulb, label: "创新建议", prompt: "提供创新的业务改进建议" },
    { icon: Shield, label: "风险评估", prompt: "评估当前业务风险和应对策略" },
  ]

  const businessInsights = [
    {
      title: "客户满意度提升",
      description: "基于最新数据分析，客户满意度较上月提升15%",
      impact: "高",
      confidence: 92,
      trend: "up",
    },
    {
      title: "销售转化率优化",
      description: "建议调整营销策略，预计可提升转化率8-12%",
      impact: "中",
      confidence: 87,
      trend: "up",
    },
    {
      title: "成本控制机会",
      description: "识别到3个主要成本优化点，预计节省成本20%",
      impact: "高",
      confidence: 94,
      trend: "down",
    },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // 模拟网络连接状态检测
    const checkConnection = () => {
      setIsConnected(navigator.onLine)
    }

    window.addEventListener("online", checkConnection)
    window.addEventListener("offline", checkConnection)

    return () => {
      window.removeEventListener("online", checkConnection)
      window.removeEventListener("offline", checkConnection)
    }
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const startProcessingTimer = () => {
    setCurrentProcessingTime(0)
    processingIntervalRef.current = setInterval(() => {
      setCurrentProcessingTime((prev) => prev + 0.1)
    }, 100)
  }

  const stopProcessingTimer = () => {
    if (processingIntervalRef.current) {
      clearInterval(processingIntervalRef.current)
    }
  }

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    startProcessingTimer()

    try {
      // 模拟AI响应延迟（优化后的响应时间）
      const selectedModelData = aiModels.find((m) => m.id === selectedModel)
      const responseTime = selectedModelData?.responseTime || 1.5

      await new Promise((resolve) => setTimeout(resolve, responseTime * 1000))

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date(),
        model: selectedModel,
        confidence: Math.floor(Math.random() * 20) + 80,
        processingTime: currentProcessingTime,
        tokens: Math.floor(Math.random() * 500) + 100,
        cost: (Math.random() * 0.05).toFixed(4),
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (autoSave) {
        toast({
          title: "对话已自动保存",
          description: "您的对话记录已安全保存",
        })
      }
    } catch (error) {
      toast({
        title: "响应失败",
        description: "AI助手暂时无法响应，请稍后重试",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      stopProcessingTimer()
    }
  }

  const generateAIResponse = (prompt: string): string => {
    // 智能响应生成逻辑
    const responses = [
      `基于您的问题"${prompt}"，我为您提供以下分析和建议：\n\n1. 数据显示当前趋势积极向上\n2. 建议采取渐进式优化策略\n3. 预计在2-3周内可见明显改善\n\n需要我详细解释某个方面吗？`,
      `我理解您关于"${prompt}"的需求。让我为您提供专业的解决方案：\n\n• 首先分析现状和痛点\n• 制定针对性改进计划\n• 设置可量化的成功指标\n• 建立持续监控机制\n\n这个方案符合您的预期吗？`,
      `关于"${prompt}"，我建议采用数据驱动的方法：\n\n📊 当前数据分析结果显示...\n🎯 关键改进机会包括...\n⚡ 快速实施建议...\n📈 预期效果评估...\n\n您希望我深入分析哪个部分？`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoiceInput = () => {
    if (!isListening) {
      setIsListening(true)
      // 模拟语音识别
      setTimeout(() => {
        setInput("这是通过语音输入的示例文本")
        setIsListening(false)
        toast({
          title: "语音识别完成",
          description: "已将语音转换为文本",
        })
      }, 2000)
    } else {
      setIsListening(false)
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
    handleSendMessage()
  }

  const handleExportChat = () => {
    const chatData = {
      messages,
      timestamp: new Date().toISOString(),
      model: selectedModel,
      settings: { temperature: temperature[0], maxTokens: maxTokens[0] },
    }

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ai-chat-${Date.now()}.json`
    a.click()

    toast({
      title: "对话已导出",
      description: "对话记录已成功导出到本地文件",
    })
  }

  const handleShareChat = () => {
    navigator.clipboard.writeText(messages.map((m) => `${m.type}: ${m.content}`).join("\n\n"))
    toast({
      title: "对话已复制",
      description: "对话内容已复制到剪贴板",
    })
  }

  const handleRateMessage = (messageId: string, rating: number) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, rating } : msg)))
    toast({
      title: "评价已提交",
      description: "感谢您的反馈，这将帮助我们改进AI服务",
    })
  }

  const handleBookmarkMessage = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, bookmarked: !msg.bookmarked } : msg)))
  }

  const filteredMessages = messages
    .filter((msg) => {
      if (filterType === "all") return true
      if (filterType === "bookmarked") return msg.bookmarked
      if (filterType === "high-confidence") return msg.confidence && msg.confidence > 90
      return true
    })
    .filter((msg) => searchQuery === "" || msg.content.toLowerCase().includes(searchQuery.toLowerCase()))

  const currentModel = aiModels.find((m) => m.id === selectedModel)

  return (
    <div className="space-y-6">
      {/* 连接状态和性能指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              {isConnected ? <Wifi className="w-4 h-4 text-green-500" /> : <WifiOff className="w-4 h-4 text-red-500" />}
              <span className="text-sm font-medium">{isConnected ? "在线" : "离线"}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">网络状态</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">{performanceMetrics.responseTime}s</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">平均响应时间</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">{performanceMetrics.accuracy}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">准确率</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">{securityMetrics.securityScore}%</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">安全评分</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="chat">智能对话</TabsTrigger>
          <TabsTrigger value="insights">业务洞察</TabsTrigger>
          <TabsTrigger value="models">模型管理</TabsTrigger>
          <TabsTrigger value="security">安全中心</TabsTrigger>
          <TabsTrigger value="analytics">分析报告</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 主对话区域 */}
            <div className="lg:col-span-3 space-y-4">
              {/* 对话控制栏 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiModels.map((model) => (
                            <SelectItem key={model.id} value={model.id} disabled={model.status !== "online"}>
                              <div className="flex items-center space-x-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    model.status === "online"
                                      ? "bg-green-500"
                                      : model.status === "maintenance"
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                />
                                <span>{model.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="搜索对话..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-32"
                        />
                      </div>

                      <Select value={filterType} onValueChange={setFilterType}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部</SelectItem>
                          <SelectItem value="bookmarked">已收藏</SelectItem>
                          <SelectItem value="high-confidence">高置信度</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleExportChat}>
                        <Download className="w-4 h-4 mr-2" />
                        导出
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShareChat}>
                        <Share2 className="w-4 h-4 mr-2" />
                        分享
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowMetrics(!showMetrics)}>
                        {showMetrics ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 对话消息区域 */}
              <Card className="h-96">
                <CardContent className="p-0">
                  <ScrollArea className="h-96 p-4">
                    <div className="space-y-4">
                      {filteredMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                              message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <div className="flex items-start space-x-2">
                              {message.type === "assistant" && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                              <div className="flex-1">
                                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                                {/* 消息元数据 */}
                                {showMetrics && message.type === "assistant" && (
                                  <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <span>模型: {message.model}</span>
                                      <span>置信度: {message.confidence}%</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <span>处理时间: {message.processingTime?.toFixed(1)}s</span>
                                      <span>成本: ${message.cost}</span>
                                    </div>
                                  </div>
                                )}

                                {/* 消息操作 */}
                                {message.type === "assistant" && (
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRateMessage(message.id, 1)}
                                      className={message.rating === 1 ? "text-green-500" : ""}
                                    >
                                      <ThumbsUp className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleRateMessage(message.id, -1)}
                                      className={message.rating === -1 ? "text-red-500" : ""}
                                    >
                                      <ThumbsDown className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleBookmarkMessage(message.id)}
                                      className={message.bookmarked ? "text-yellow-500" : ""}
                                    >
                                      <Bookmark className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => navigator.clipboard.writeText(message.content)}
                                    >
                                      <Copy className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                            <div className="flex items-center space-x-2">
                              <Bot className="w-4 h-4" />
                              <div className="flex items-center space-x-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">AI正在思考中...</span>
                                <span className="text-xs text-gray-500">{currentProcessingTime.toFixed(1)}s</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* 输入区域 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="输入您的问题或需求..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSendMessage()
                          }
                        }}
                        className="min-h-[60px] resize-none"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button
                        onClick={handleVoiceInput}
                        variant={isListening ? "default" : "outline"}
                        size="sm"
                        disabled={!isConnected}
                      >
                        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!input.trim() || isLoading || !isConnected}
                        size="sm"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 侧边栏 */}
            <div className="space-y-4">
              {/* 快捷操作 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">快捷操作</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="h-auto p-2 flex flex-col items-center space-y-1 bg-transparent"
                        onClick={() => handleQuickAction(action.prompt)}
                        disabled={!isConnected}
                      >
                        <action.icon className="w-4 h-4" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 当前模型状态 */}
              {currentModel && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">当前模型</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{currentModel.name}</span>
                      <Badge variant={currentModel.status === "online" ? "default" : "secondary"}>
                        {currentModel.status === "online" ? "在线" : "维护中"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>速度</span>
                        <span>{currentModel.speed}%</span>
                      </div>
                      <Progress value={currentModel.speed} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>准确性</span>
                        <span>{currentModel.accuracy}%</span>
                      </div>
                      <Progress value={currentModel.accuracy} className="h-1" />

                      <div className="flex justify-between text-xs">
                        <span>可靠性</span>
                        <span>{currentModel.reliability}%</span>
                      </div>
                      <Progress value={currentModel.reliability} className="h-1" />
                    </div>

                    <div className="text-xs text-gray-500">
                      <p>响应时间: {currentModel.responseTime}s</p>
                      <p>成本: ${currentModel.cost}/1K tokens</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 高级设置 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">高级设置</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">创造性 ({temperature[0]})</label>
                    <Slider
                      value={temperature}
                      onValueChange={setTemperature}
                      max={2}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">最大令牌数 ({maxTokens[0]})</label>
                    <Slider
                      value={maxTokens}
                      onValueChange={setMaxTokens}
                      max={4096}
                      min={256}
                      step={256}
                      className="w-full"
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium">实时模式</label>
                      <Switch checked={isRealTimeMode} onCheckedChange={setIsRealTimeMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium">自动保存</label>
                      <Switch checked={autoSave} onCheckedChange={setAutoSave} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {businessInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{insight.title}</CardTitle>
                    <div className="flex items-center space-x-1">
                      {insight.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <Badge variant={insight.impact === "高" ? "default" : "secondary"}>{insight.impact}影响</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">置信度</span>
                    <span className="text-xs font-medium">{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-1 mt-1" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiModels.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{model.name}</CardTitle>
                    <Badge variant={model.status === "online" ? "default" : "secondary"}>
                      {model.status === "online" ? "在线" : model.status === "maintenance" ? "维护中" : "离线"}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs">{model.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-xs text-gray-500">速度</p>
                      <p className="text-sm font-medium">{model.speed}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">准确性</p>
                      <p className="text-sm font-medium">{model.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">成本</p>
                      <p className="text-sm font-medium">${model.cost}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-medium">能力特长:</p>
                    <div className="flex flex-wrap gap-1">
                      {model.capabilities.map((capability, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="w-full"
                    variant={selectedModel === model.id ? "default" : "outline"}
                    onClick={() => setSelectedModel(model.id)}
                    disabled={model.status !== "online"}
                  >
                    {selectedModel === model.id ? "当前使用" : "切换模型"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">安全状态</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">数据加密</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">已启用</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">访问控制</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">已启用</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">审计日志</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">已启用</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">隐私合规</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">已启用</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">威胁检测</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-xs text-green-600">已启用</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">安全评分</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">{securityMetrics.securityScore}%</div>
                  <Progress value={securityMetrics.securityScore} className="h-2" />
                  <p className="text-xs text-gray-500">安全等级: 优秀</p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-blue-500" />
                    <span className="text-xs">端到端加密保护</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-xs">实时威胁监控</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-purple-500" />
                    <span className="text-xs">隐私数据保护</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{performanceMetrics.responseTime}s</p>
                    <p className="text-xs text-gray-500">平均响应时间</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <div>
                    <p className="text-sm font-medium">{performanceMetrics.throughput}</p>
                    <p className="text-xs text-gray-500">每小时处理量</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{performanceMetrics.accuracy}%</p>
                    <p className="text-xs text-gray-500">准确率</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">{performanceMetrics.uptime}%</p>
                    <p className="text-xs text-gray-500">系统可用性</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">使用统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>资源使用率</span>
                    <span>{performanceMetrics.resourceUsage}%</span>
                  </div>
                  <Progress value={performanceMetrics.resourceUsage} />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>错误率</span>
                    <span>{performanceMetrics.errorRate}%</span>
                  </div>
                  <Progress value={performanceMetrics.errorRate} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
