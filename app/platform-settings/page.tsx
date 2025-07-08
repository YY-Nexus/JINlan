"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"
import {
  PhoneIcon as Wechat,
  Settings,
  BookOpen,
  FileText,
  MessageSquare,
  Smartphone,
  Globe,
  CheckCircle,
  RefreshCw,
  Save,
  Sparkles,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState("wechat")
  const [wechatConfig, setWechatConfig] = useState({
    appId: "wx1234567890abcdef",
    appSecret: "****************",
    token: "your_token",
    aesKey: "your_encoding_aes_key",
    enabled: true,
    callbackUrl: "https://yourdomain.com/wechat/callback",
  })

  const [workWechatConfig, setWorkWechatConfig] = useState({
    corpId: "ww1234567890abcdef",
    agentId: "1000002",
    secret: "****************",
    token: "your_token",
    aesKey: "your_encoding_aes_key",
    enabled: true,
    callbackUrl: "https://yourdomain.com/workwechat/callback",
  })

  const [feishuConfig, setFeishuConfig] = useState({
    appId: "cli_1234567890abcdef",
    appSecret: "****************",
    verificationToken: "your_verification_token",
    encryptKey: "your_encrypt_key",
    enabled: true,
    callbackUrl: "https://yourdomain.com/feishu/callback",
  })

  const [dingtalkConfig, setDingtalkConfig] = useState({
    appKey: "ding1234567890abcdef",
    appSecret: "****************",
    token: "your_token",
    aesKey: "your_encoding_aes_key",
    enabled: true,
    callbackUrl: "https://yourdomain.com/dingtalk/callback",
  })

  const [douyinConfig, setDouyinConfig] = useState({
    clientKey: "aw1234567890abcdef",
    clientSecret: "****************",
    callbackUrl: "https://yourdomain.com/douyin/callback",
    enabled: false,
  })

  const [contentConfig, setContentConfig] = useState({
    autoSync: true,
    autoPublish: false,
    platforms: ["wechat", "workwechat", "feishu"],
    defaultFormat: "markdown",
    contentFilter: "strict",
  })

  const handleSave = () => {
    toast({
      title: "保存成功",
      description: "配置已保存！",
    })
  }

  const handleTestConnection = (platform: string) => {
    toast({
      title: "测试连接",
      description: `正在测试 ${platform} 连接...`,
    })
  }

  const handleSyncMenus = () => {
    toast({
      title: "同步菜单",
      description: "开始同步菜单到所有平台...",
    })
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center justify-center">
            <Settings className="w-8 h-8 mr-2" />
            国内公共平台对接设置
          </h1>
          <p className="text-lg text-gray-600 mt-2 max-w-3xl mx-auto">
            配置微信公众号、企业微信、飞书、钉钉等平台的对接参数，实现菜单同步和图文内容一键分发
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-7 mb-6">
            <TabsTrigger value="wechat" className="flex items-center gap-1">
              <Wechat className="w-4 h-4" /> 微信公众号
            </TabsTrigger>
            <TabsTrigger value="workwechat" className="flex items-center gap-1">
              <Wechat className="w-4 h-4" /> 企业微信
            </TabsTrigger>
            <TabsTrigger value="feishu" className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> 飞书
            </TabsTrigger>
            <TabsTrigger value="dingtalk" className="flex items-center gap-1">
              <Smartphone className="w-4 h-4" /> 钉钉
            </TabsTrigger>
            <TabsTrigger value="douyin" className="flex items-center gap-1">
              <Globe className="w-4 h-4" /> 抖音
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> 内容分发
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-1">
              <FileText className="w-4 h-4" /> 文档
            </TabsTrigger>
          </TabsList>

          {/* 微信公众号配置 */}
          <TabsContent value="wechat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wechat className="w-6 h-6 mr-2 text-green-600" />
                  微信公众号对接配置
                </CardTitle>
                <CardDescription>配置微信公众号的API接口参数，实现菜单同步和消息接收</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="wechat-appId">AppID</Label>
                      <Input
                        id="wechat-appId"
                        value={wechatConfig.appId}
                        onChange={(e) => setWechatConfig({ ...wechatConfig, appId: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="wechat-appSecret">AppSecret</Label>
                      <Input
                        id="wechat-appSecret"
                        type="password"
                        value={wechatConfig.appSecret}
                        onChange={(e) => setWechatConfig({ ...wechatConfig, appSecret: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="wechat-token">Token</Label>
                      <Input
                        id="wechat-token"
                        value={wechatConfig.token}
                        onChange={(e) => setWechatConfig({ ...wechatConfig, token: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="wechat-aesKey">EncodingAESKey</Label>
                      <Input
                        id="wechat-aesKey"
                        value={wechatConfig.aesKey}
                        onChange={(e) => setWechatConfig({ ...wechatConfig, aesKey: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="wechat-callback">回调URL</Label>
                      <Input id="wechat-callback" value={wechatConfig.callbackUrl} readOnly />
                      <p className="text-sm text-gray-500 mt-1">在微信公众号后台配置此URL</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="wechat-enabled"
                        checked={wechatConfig.enabled}
                        onCheckedChange={(val) => setWechatConfig({ ...wechatConfig, enabled: val })}
                      />
                      <Label htmlFor="wechat-enabled">启用对接</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" /> 已连接
                    </Badge>
                    <p className="text-sm text-gray-600">最后同步: 2023-11-15 14:30</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => handleTestConnection("微信公众号")}>
                      <RefreshCw className="w-4 h-4 mr-2" /> 测试连接
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" /> 保存配置
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 企业微信配置 */}
          <TabsContent value="workwechat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wechat className="w-6 h-6 mr-2 text-blue-600" />
                  企业微信对接配置
                </CardTitle>
                <CardDescription>配置企业微信自建应用的API参数，实现组织通讯录同步和消息推送</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="work-corpId">CorpID</Label>
                      <Input
                        id="work-corpId"
                        value={workWechatConfig.corpId}
                        onChange={(e) => setWorkWechatConfig({ ...workWechatConfig, corpId: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="work-agentId">AgentID</Label>
                      <Input
                        id="work-agentId"
                        value={workWechatConfig.agentId}
                        onChange={(e) => setWorkWechatConfig({ ...workWechatConfig, agentId: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="work-secret">Secret</Label>
                      <Input
                        id="work-secret"
                        type="password"
                        value={workWechatConfig.secret}
                        onChange={(e) => setWorkWechatConfig({ ...workWechatConfig, secret: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="work-token">Token</Label>
                      <Input
                        id="work-token"
                        value={workWechatConfig.token}
                        onChange={(e) => setWorkWechatConfig({ ...workWechatConfig, token: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="work-aesKey">EncodingAESKey</Label>
                      <Input
                        id="work-aesKey"
                        value={workWechatConfig.aesKey}
                        onChange={(e) => setWorkWechatConfig({ ...workWechatConfig, aesKey: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="work-enabled"
                        checked={workWechatConfig.enabled}
                        onCheckedChange={(val) => setWorkWechatConfig({ ...workWechatConfig, enabled: val })}
                      />
                      <Label htmlFor="work-enabled">启用对接</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-4 h-4 mr-1" /> 已连接
                    </Badge>
                    <p className="text-sm text-gray-600">最后同步: 2023-11-14 09:45</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => handleTestConnection("企业微信")}>
                      <RefreshCw className="w-4 h-4 mr-2" /> 测试连接
                    </Button>
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" /> 保存配置
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 其他标签页内容类似，这里省略以节省空间 */}
          <TabsContent value="feishu">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                  飞书对接配置
                </CardTitle>
                <CardDescription>配置飞书开放平台的API参数，实现应用集成和消息推送</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>飞书配置功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dingtalk">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-6 h-6 mr-2 text-blue-400" />
                  钉钉对接配置
                </CardTitle>
                <CardDescription>配置钉钉开放平台的API参数，实现工作通知和微应用集成</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>钉钉配置功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="douyin">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="w-6 h-6 mr-2 text-red-500" />
                  抖音开放平台配置
                </CardTitle>
                <CardDescription>配置抖音开放平台的API参数，实现内容分发和小程序集成</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Settings className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>抖音配置功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-2 text-purple-600" />
                  图文内容分发配置
                </CardTitle>
                <CardDescription>设置AI生成内容的自动分发规则和目标平台</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>内容分发配置功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-blue-600" />
                  平台对接文档与资源
                </CardTitle>
                <CardDescription>各平台官方文档、对接指南和示例代码</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                  <p>文档资源功能开发中...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                立即同步所有平台菜单
              </h3>
              <p className="text-gray-600 mt-2">将当前菜单配置一键同步到所有已启用的平台</p>
            </div>
            <Button
              className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              onClick={handleSyncMenus}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> 同步菜单到所有平台
            </Button>
          </div>
        </div>
      </div>
      <FloatingNavButtons />
    </>
  )
}
