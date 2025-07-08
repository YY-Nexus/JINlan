"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Link,
  Settings,
  Activity,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface Platform {
  id: string
  name: string
  logo: string
  description: string
  status: "connected" | "disconnected" | "error" | "syncing"
  users: number
  messages: number
  lastSync: string
  apiKey?: string
  webhookUrl?: string
  enabled: boolean
}

const platforms: Platform[] = [
  {
    id: "wechat-official",
    name: "微信公众号",
    logo: "/images/wechat-official-logo.png",
    description: "连接微信公众号，实现消息推送和用户管理",
    status: "connected",
    users: 15420,
    messages: 8932,
    lastSync: "2024-01-07 14:30:25",
    apiKey: "wx_1234567890abcdef",
    webhookUrl: "https://api.example.com/webhook/wechat",
    enabled: true,
  },
  {
    id: "wework",
    name: "企业微信",
    logo: "/images/wework-logo.png",
    description: "企业内部沟通协作平台集成",
    status: "connected",
    users: 2580,
    messages: 4521,
    lastSync: "2024-01-07 14:28:15",
    apiKey: "ww_abcdef1234567890",
    webhookUrl: "https://api.example.com/webhook/wework",
    enabled: true,
  },
  {
    id: "feishu",
    name: "飞书",
    logo: "/images/feishu-logo.png",
    description: "飞书办公平台，支持文档协作和消息通知",
    status: "syncing",
    users: 1240,
    messages: 2156,
    lastSync: "2024-01-07 14:25:10",
    apiKey: "fs_1234567890abcdef",
    webhookUrl: "https://api.example.com/webhook/feishu",
    enabled: true,
  },
  {
    id: "dingtalk",
    name: "钉钉",
    logo: "/images/dingtalk-logo.png",
    description: "钉钉企业协作平台集成",
    status: "error",
    users: 890,
    messages: 1234,
    lastSync: "2024-01-07 13:45:30",
    apiKey: "dt_abcdef1234567890",
    webhookUrl: "https://api.example.com/webhook/dingtalk",
    enabled: false,
  },
  {
    id: "douyin",
    name: "抖音",
    logo: "/images/douyin-logo.png",
    description: "抖音短视频平台，支持内容发布和数据分析",
    status: "disconnected",
    users: 0,
    messages: 0,
    lastSync: "从未同步",
    enabled: false,
  },
]

const syncLogs = [
  {
    id: 1,
    platform: "微信公众号",
    action: "用户数据同步",
    status: "success",
    timestamp: "2024-01-07 14:30:25",
    details: "成功同步 156 个新用户",
  },
  {
    id: 2,
    platform: "企业微信",
    action: "消息推送",
    status: "success",
    timestamp: "2024-01-07 14:28:15",
    details: "成功推送 89 条消息",
  },
  {
    id: 3,
    platform: "飞书",
    action: "文档同步",
    status: "syncing",
    timestamp: "2024-01-07 14:25:10",
    details: "正在同步文档数据...",
  },
  {
    id: 4,
    platform: "钉钉",
    action: "连接测试",
    status: "error",
    timestamp: "2024-01-07 13:45:30",
    details: "API密钥验证失败",
  },
]

export default function PlatformIntegrationPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [showApiKey, setShowApiKey] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: Platform["status"]) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-800 border-green-200"
      case "disconnected":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      case "syncing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: Platform["status"]) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4" />
      case "disconnected":
        return <XCircle className="w-4 h-4" />
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "syncing":
        return <RefreshCw className="w-4 h-4 animate-spin" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleConnect = async (platformId: string) => {
    setIsConnecting(true)
    try {
      // 模拟API调用
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "连接成功",
        description: "平台连接已建立",
      })
    } catch (error) {
      toast({
        title: "连接失败",
        description: "请检查配置信息",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSync = async (platformId: string) => {
    try {
      toast({
        title: "同步开始",
        description: "正在同步平台数据...",
      })
    } catch (error) {
      toast({
        title: "同步失败",
        description: "同步过程中出现错误",
        variant: "destructive",
      })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "已复制",
      description: "内容已复制到剪贴板",
    })
  }

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Link className="w-8 h-8 mr-3 text-sky-600" />
            平台对接
          </h1>
          <p className="text-gray-600 mt-2">管理第三方平台集成和数据同步</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline" className="flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          刷新状态
        </Button>
      </div>

      <Tabs defaultValue="platforms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="platforms" className="flex items-center">
            <Link className="w-4 h-4 mr-2" />
            平台管理
          </TabsTrigger>
          <TabsTrigger value="config" className="flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            配置管理
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            同步日志
          </TabsTrigger>
        </TabsList>

        {/* 平台管理 */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => (
              <Card
                key={platform.id}
                className="border-l-4 border-l-sky-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPlatform(platform)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                        <Image
                          src={platform.logo || "/placeholder.svg"}
                          alt={platform.name}
                          width={24}
                          height={24}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{platform.name}</CardTitle>
                        <Badge variant="outline" className={`mt-1 ${getStatusColor(platform.status)}`}>
                          {getStatusIcon(platform.status)}
                          <span className="ml-1">
                            {platform.status === "connected" && "已连接"}
                            {platform.status === "disconnected" && "未连接"}
                            {platform.status === "error" && "连接错误"}
                            {platform.status === "syncing" && "同步中"}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{platform.description}</p>

                  {platform.status === "connected" && (
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-4 h-4 text-sky-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-sky-600">{platform.users.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">用户数</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <MessageSquare className="w-4 h-4 text-green-600 mr-1" />
                        </div>
                        <div className="text-2xl font-bold text-green-600">{platform.messages.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">消息数</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">最后同步: {platform.lastSync}</div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    {platform.status === "disconnected" ? (
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleConnect(platform.id)
                        }}
                        disabled={isConnecting}
                      >
                        {isConnecting ? (
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Link className="w-4 h-4 mr-2" />
                        )}
                        连接
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSync(platform.id)
                        }}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        同步
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedPlatform(platform)
                      }}
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 配置管理 */}
        <TabsContent value="config" className="space-y-6">
          {selectedPlatform ? (
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                    <Image
                      src={selectedPlatform.logo || "/placeholder.svg"}
                      alt={selectedPlatform.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedPlatform.name} 配置</CardTitle>
                    <CardDescription>{selectedPlatform.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 基础设置 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-sky-600" />
                    基础设置
                  </h3>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">启用平台集成</Label>
                      <p className="text-sm text-gray-500">开启后将自动同步平台数据</p>
                    </div>
                    <Switch checked={selectedPlatform.enabled} />
                  </div>
                </div>

                <Separator />

                {/* API配置 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Link className="w-5 h-5 mr-2 text-green-600" />
                    API配置
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="apiKey">API密钥</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={selectedPlatform.apiKey || ""}
                          placeholder="请输入API密钥"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(selectedPlatform.apiKey || "")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="webhookUrl">Webhook地址</Label>
                      <div className="flex space-x-2 mt-1">
                        <Input
                          id="webhookUrl"
                          value={selectedPlatform.webhookUrl || ""}
                          placeholder="https://api.example.com/webhook"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => copyToClipboard(selectedPlatform.webhookUrl || "")}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => window.open(selectedPlatform.webhookUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* 同步设置 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2 text-blue-600" />
                    同步设置
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>自动同步用户数据</Label>
                        <p className="text-sm text-gray-500">每小时自动同步</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>自动同步消息数据</Label>
                        <p className="text-sm text-gray-500">实时同步消息</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    保存配置
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Activity className="w-4 h-4 mr-2" />
                    测试连接
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-l-4 border-l-gray-300">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">选择平台进行配置</h3>
                  <p className="text-gray-500">请从平台管理页面选择一个平台来配置其设置</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* 同步日志 */}
        <TabsContent value="logs" className="space-y-6">
          <Card className="border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="w-6 h-6 mr-2 text-orange-600" />
                同步日志
              </CardTitle>
              <CardDescription>查看平台数据同步的详细记录</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {syncLogs.map((log) => (
                    <div key={log.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0">
                        {log.status === "success" && <CheckCircle className="w-5 h-5 text-green-600" />}
                        {log.status === "error" && <XCircle className="w-5 h-5 text-red-600" />}
                        {log.status === "syncing" && <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-semibold text-gray-900">{log.platform}</h4>
                          <Badge variant="outline" className={`${getStatusColor(log.status as Platform["status"])}`}>
                            {log.status === "success" && "成功"}
                            {log.status === "error" && "失败"}
                            {log.status === "syncing" && "进行中"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{log.action}</p>
                        <p className="text-sm text-gray-500 mt-1">{log.details}</p>
                        <p className="text-xs text-gray-400 mt-2">{log.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
