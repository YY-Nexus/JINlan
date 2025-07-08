"use client"

import { useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"
import {
  Wand2,
  Send,
  RefreshCw,
  Download,
  ImageIcon,
  Video,
  Globe,
  Settings,
  BookOpen,
  FileText,
  LayoutGrid,
  Sparkles,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Image from "next/image"

export default function AIContentCreatorPage() {
  const [activeTab, setActiveTab] = useState("create")
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [keywords, setKeywords] = useState("")
  const [platforms, setPlatforms] = useState(["wechat", "workwechat", "feishu", "dingtalk", "redbook"])
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState({})
  const [history, setHistory] = useState([
    { id: 1, title: "夏季防晒指南", date: "2023-11-15", platforms: ["wechat", "redbook"], views: 2450 },
    { id: 2, title: "智能家居选购攻略", date: "2023-11-12", platforms: ["workwechat", "dingtalk"], views: 1870 },
    { id: 3, title: "冬季养生食谱", date: "2023-11-08", platforms: ["wechat", "redbook", "feishu"], views: 3120 },
  ])

  const fileInputRef = useRef(null)

  const handleGenerate = () => {
    if (!title.trim()) {
      toast({
        title: "提示",
        description: "请输入创作主题",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    // 模拟AI生成内容
    setTimeout(() => {
      const sampleContent = `# ${title}

## 核心要点
- ${keywords
        .split(",")
        .filter((k) => k.trim())
        .join("\n- ")}

### 详细内容
随着科技的不断发展，${title}已成为现代生活的重要组成部分。本文将从多个角度深入探讨${title}的关键要素：

1. **基础概念**
   ${title}的基本原理和应用场景

2. **实用技巧**
   如何高效地应用${title}解决实际问题

3. **行业趋势**
   ${title}在未来5年的发展方向预测

> **专家观点**：知名行业专家表示，${title}将在未来改变人们的生活方式。

### 总结
${title}不仅改变了我们的日常生活，也正在重塑整个行业生态。掌握${title}的核心知识，将帮助您在数字化时代保持竞争力。

---
*本文由AI智能生成，内容仅供参考*`

      setContent(sampleContent)
      setIsGenerating(false)
      toast({
        title: "生成成功",
        description: "AI内容已生成完成！",
      })
    }, 2000)
  }

  const handlePublish = () => {
    if (!content.trim()) {
      toast({
        title: "提示",
        description: "请先生成内容",
        variant: "destructive",
      })
      return
    }

    setIsPublishing(true)
    setPublishStatus({})

    // 模拟发布过程
    const statusUpdates = {}
    const platformNames = {
      wechat: "微信公众号",
      workwechat: "企业微信",
      feishu: "飞书",
      dingtalk: "钉钉",
      redbook: "小红书",
      douyin: "抖音",
    }

    platforms.forEach((platform, index) => {
      setTimeout(() => {
        statusUpdates[platform] = { status: "processing" }
        setPublishStatus({ ...statusUpdates })
      }, index * 800)

      setTimeout(
        () => {
          statusUpdates[platform] = {
            status: "published",
            url: `https://${platform}.com/content/${title.replace(/\s+/g, "-")}`,
            views: Math.floor(Math.random() * 1000) + 500,
          }
          setPublishStatus({ ...statusUpdates })

          // 如果是最后一个平台
          if (index === platforms.length - 1) {
            setIsPublishing(false)

            // 添加到历史记录
            const newHistory = [
              {
                id: history.length + 1,
                title,
                date: new Date().toISOString().split("T")[0],
                platforms: [...platforms],
                views: Object.values(statusUpdates).reduce((sum, item) => sum + (item.views || 0), 0),
              },
              ...history,
            ]
            setHistory(newHistory.slice(0, 5))

            toast({
              title: "发布成功",
              description: `内容已成功发布到${platforms.length}个平台！`,
            })
          }
        },
        index * 800 + 2000,
      )
    })
  }

  const togglePlatform = (platform) => {
    if (platforms.includes(platform)) {
      setPlatforms(platforms.filter((p) => p !== platform))
    } else {
      setPlatforms([...platforms, platform])
    }
  }

  const handleImageUpload = () => {
    fileInputRef.current?.click()
  }

  const PlatformIcon = ({ platform, size = 24, className = "" }) => {
    const platformLogos = {
      wechat: "/images/wechat-official-logo.png",
      workwechat: "/images/wework-logo.png",
      feishu: "/images/feishu-logo.png",
      dingtalk: "/images/dingtalk-logo.png",
      redbook: "/images/xiaohongshu-logo.png",
      douyin: "/images/douyin-logo.png",
    }

    const logoSrc = platformLogos[platform]

    if (logoSrc) {
      return (
        <Image
          src={logoSrc || "/placeholder.svg"}
          alt={`${platform} logo`}
          width={size}
          height={size}
          className={`rounded-sm ${className}`}
        />
      )
    }

    return <Globe size={size} className={className} />
  }

  const PlatformBadge = ({ platform }) => (
    <Badge
      variant={platforms.includes(platform) ? "default" : "outline"}
      className="cursor-pointer hover:bg-primary/80 flex items-center gap-2"
      onClick={() => togglePlatform(platform)}
    >
      <PlatformIcon platform={platform} size={16} />
      <span>
        {platform === "wechat" && "公众号"}
        {platform === "workwechat" && "企业微信"}
        {platform === "feishu" && "飞书"}
        {platform === "dingtalk" && "钉钉"}
        {platform === "redbook" && "小红书"}
        {platform === "douyin" && "抖音"}
      </span>
    </Badge>
  )

  return (
    <>
      <div className="p-6 space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-purple-600 bg-clip-text text-transparent flex items-center">
              <Wand2 className="w-8 h-8 mr-3 text-sky-600" />
              AI创作助手
            </h1>
            <p className="text-slate-600 mt-2">
              一键生成高质量内容，并同步推送到微信公众号、企业微信、飞书、小红书等平台
            </p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-sky-200">
            <TabsTrigger
              value="create"
              className="flex items-center gap-2 data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700"
            >
              <Wand2 className="w-4 h-4" />
              内容创作
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="flex items-center gap-2 data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700"
            >
              <FileText className="w-4 h-4" />
              内容预览
            </TabsTrigger>
            <TabsTrigger
              value="publish"
              className="flex items-center gap-2 data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700"
            >
              <Send className="w-4 h-4" />
              发布设置
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="flex items-center gap-2 data-[state=active]:bg-sky-50 data-[state=active]:text-sky-700"
            >
              <LayoutGrid className="w-4 h-4" />
              创作历史
            </TabsTrigger>
          </TabsList>

          {/* 内容创作标签页 */}
          <TabsContent value="create">
            <Card className="border-l-4 border-l-sky-400 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Wand2 className="w-6 h-6 mr-2 text-sky-600" />
                  内容创作
                </CardTitle>
                <CardDescription className="text-slate-600">输入主题和关键词，AI将为您生成高质量内容</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="title" className="text-slate-700 font-medium">
                        创作主题 *
                      </Label>
                      <Input
                        id="title"
                        placeholder="例如：智能家居选购指南"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-sky-200 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="keywords" className="text-slate-700 font-medium">
                        关键词
                      </Label>
                      <Input
                        id="keywords"
                        placeholder="用逗号分隔，例如：智能音箱,智能灯泡,安全性"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="border-sky-200 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium">内容类型</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          科普文章
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          产品评测
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          使用指南
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          行业分析
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          新闻资讯
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium">添加素材</Label>
                      <div className="flex gap-4 mt-2">
                        <Button
                          variant="outline"
                          onClick={handleImageUpload}
                          className="border-sky-200 hover:bg-sky-50 text-sky-700 bg-transparent"
                        >
                          <ImageIcon className="w-4 h-4 mr-2" /> 添加图片
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              toast({
                                title: "图片上传",
                                description: "图片上传功能开发中...",
                              })
                            }
                          }}
                        />
                        <Button
                          variant="outline"
                          className="border-sky-200 hover:bg-sky-50 text-sky-700 bg-transparent"
                        >
                          <Video className="w-4 h-4 mr-2" /> 添加视频
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium">内容风格</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          专业严谨
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          轻松活泼
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          简洁明了
                        </Badge>
                        <Badge variant="outline" className="cursor-pointer hover:bg-sky-50 border-sky-200 text-sky-700">
                          情感丰富
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-slate-700 font-medium">目标平台</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {["wechat", "workwechat", "feishu", "dingtalk", "redbook", "douyin"].map((platform) => (
                          <PlatformBadge key={platform} platform={platform} />
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerate}
                      className="w-full py-6 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          内容生成中...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 mr-2" />
                          一键生成内容
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-sky-200 rounded-lg p-4 min-h-[500px] bg-sky-50/30">
                      <h3 className="font-semibold mb-4 flex items-center text-slate-900">
                        <Sparkles className="w-4 h-4 mr-2 text-sky-600" />
                        AI生成预览
                      </h3>
                      {content ? (
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap text-sm text-slate-700 font-sans">{content}</pre>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-slate-500">
                          <div className="text-center">
                            <FileText className="w-12 h-12 mx-auto text-slate-300 mb-4" />
                            <p>AI生成的内容将显示在这里</p>
                            <p className="text-sm mt-2">请填写创作主题后点击生成</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 内容预览标签页 */}
          <TabsContent value="preview">
            <Card className="border-l-4 border-l-sky-400 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <FileText className="w-6 h-6 mr-2 text-sky-600" />
                  内容预览
                </CardTitle>
                <CardDescription className="text-slate-600">预览AI生成的内容，并进行编辑优化</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title" className="text-slate-700 font-medium">
                        标题
                      </Label>
                      <Input
                        id="edit-title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-sky-200 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor="edit-content" className="text-slate-700 font-medium">
                        内容
                      </Label>
                      <Textarea
                        id="edit-content"
                        rows={20}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="AI生成的内容将显示在这里..."
                        className="border-sky-200 focus:ring-sky-500 focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-sky-200 rounded-lg p-4 min-h-[400px] bg-white">
                      <h2 className="text-2xl font-bold mb-4 text-slate-900">{title}</h2>
                      <div
                        className="prose prose-lg max-w-none text-slate-700"
                        dangerouslySetInnerHTML={{
                          __html: content
                            ? content.replace(/\n/g, "<br>").replace(/# (.+?)\n/g, "<h3>$1</h3>")
                            : '<p class="text-slate-500">暂无内容，请先生成内容</p>',
                        }}
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent border-sky-200 hover:bg-sky-50 text-sky-700"
                      >
                        <Download className="w-4 h-4 mr-2" /> 导出为Markdown
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent border-sky-200 hover:bg-sky-50 text-sky-700"
                      >
                        <Download className="w-4 h-4 mr-2" /> 导出为PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={() => setActiveTab("publish")}
                  className="bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                >
                  下一步：发布设置 <Send className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* 发布设置标签页 */}
          <TabsContent value="publish">
            <Card className="border-l-4 border-l-sky-400 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <Send className="w-6 h-6 mr-2 text-sky-600" />
                  发布设置
                </CardTitle>
                <CardDescription className="text-slate-600">配置发布平台和发布时间</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <Label className="text-slate-700 font-medium">目标平台</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                        {["wechat", "workwechat", "feishu", "dingtalk", "redbook", "douyin"].map((platform) => (
                          <div
                            key={platform}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              platforms.includes(platform)
                                ? "border-sky-300 bg-sky-50"
                                : "border-slate-200 hover:bg-slate-50"
                            }`}
                            onClick={() => togglePlatform(platform)}
                          >
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-full ${
                                  platforms.includes(platform)
                                    ? "bg-sky-100 text-sky-600"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                <PlatformIcon platform={platform} size={24} />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">
                                  {platform === "wechat" && "微信公众号"}
                                  {platform === "workwechat" && "企业微信"}
                                  {platform === "feishu" && "飞书"}
                                  {platform === "dingtalk" && "钉钉"}
                                  {platform === "redbook" && "小红书"}
                                  {platform === "douyin" && "抖音"}
                                </p>
                                <p className="text-sm text-slate-500">
                                  {platforms.includes(platform) ? "已选择" : "未选择"}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-slate-700 font-medium">发布设置</Label>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 border border-sky-200 rounded-lg bg-white">
                          <div>
                            <p className="font-medium text-slate-900">立即发布</p>
                            <p className="text-sm text-slate-600">内容生成后立即发布到所有平台</p>
                          </div>
                          <Switch defaultChecked />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-sky-200 rounded-lg bg-white">
                          <div>
                            <p className="font-medium text-slate-900">定时发布</p>
                            <p className="text-sm text-slate-600">设置具体发布时间</p>
                          </div>
                          <Switch />
                        </div>

                        <div className="flex items-center justify-between p-4 border border-sky-200 rounded-lg bg-white">
                          <div>
                            <p className="font-medium text-slate-900">内容审核</p>
                            <p className="text-sm text-slate-600">发布前自动进行内容安全审核</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="border border-sky-200 rounded-lg p-5 bg-white">
                      <h3 className="font-semibold text-lg mb-4 text-slate-900">发布状态</h3>

                      {platforms.length === 0 ? (
                        <div className="text-center py-10 text-slate-500">请至少选择一个发布平台</div>
                      ) : (
                        <div className="space-y-4">
                          {platforms.map((platform) => {
                            const status = publishStatus[platform]?.status || "pending"
                            const isProcessing = status === "processing"
                            const isPublished = status === "published"

                            return (
                              <div
                                key={platform}
                                className="flex items-center justify-between p-3 border border-sky-200 rounded-lg bg-sky-50/30"
                              >
                                <div className="flex items-center space-x-3">
                                  <div
                                    className={`p-2 rounded-full ${
                                      isPublished
                                        ? "bg-green-100 text-green-600"
                                        : isProcessing
                                          ? "bg-blue-100 text-blue-600"
                                          : "bg-slate-100 text-slate-600"
                                    }`}
                                  >
                                    <PlatformIcon platform={platform} size={20} />
                                  </div>
                                  <div>
                                    <p className="font-medium text-slate-900">
                                      {platform === "wechat" && "微信公众号"}
                                      {platform === "workwechat" && "企业微信"}
                                      {platform === "feishu" && "飞书"}
                                      {platform === "dingtalk" && "钉钉"}
                                      {platform === "redbook" && "小红书"}
                                      {platform === "douyin" && "抖音"}
                                    </p>
                                    <p
                                      className={`text-sm ${
                                        isPublished
                                          ? "text-green-600"
                                          : isProcessing
                                            ? "text-blue-600"
                                            : "text-slate-500"
                                      }`}
                                    >
                                      {isPublished && `已发布 · ${publishStatus[platform]?.views || 0}次浏览`}
                                      {isProcessing && "发布中..."}
                                      {status === "pending" && "等待发布"}
                                    </p>
                                  </div>
                                </div>

                                {isPublished && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-sky-200 hover:bg-sky-50 text-sky-700 bg-transparent"
                                  >
                                    查看
                                  </Button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}

                      <div className="mt-6">
                        <Button
                          onClick={handlePublish}
                          className="w-full py-6 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
                          disabled={isPublishing || platforms.length === 0}
                        >
                          {isPublishing ? (
                            <>
                              <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                              内容发布中...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              一键发布到{platforms.length}个平台
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                      <h4 className="font-medium text-sky-800 flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        平台适配建议
                      </h4>
                      <ul className="mt-2 space-y-2 text-sm text-sky-700">
                        <li>• 微信公众号：建议添加封面图和摘要</li>
                        <li>• 小红书：建议添加多个图片和话题标签</li>
                        <li>• 抖音：建议生成竖版视频内容</li>
                        <li>• 企业微信：适合发布内部通知类内容</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 创作历史标签页 */}
          <TabsContent value="history">
            <Card className="border-l-4 border-l-sky-400 bg-white/80 backdrop-blur-sm border border-sky-200 rounded-xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-slate-900">
                  <LayoutGrid className="w-6 h-6 mr-2 text-sky-600" />
                  创作历史
                </CardTitle>
                <CardDescription className="text-slate-600">最近创作的内容和发布效果</CardDescription>
              </CardHeader>
              <CardContent>
                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <BookOpen className="w-12 h-12 mx-auto text-slate-300" />
                    <p className="mt-4">暂无创作历史</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {history.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-shadow border border-sky-200">
                        <CardHeader>
                          <CardTitle className="text-lg text-slate-900">{item.title}</CardTitle>
                          <CardDescription className="flex justify-between text-slate-600">
                            <span>{item.date}</span>
                            <span>{item.views}次浏览</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {item.platforms.map((platform) => (
                              <Badge
                                key={platform}
                                variant="outline"
                                className="flex items-center gap-1 border-sky-200 text-sky-700"
                              >
                                <PlatformIcon platform={platform} size={16} />
                                <span>
                                  {platform === "wechat" && "公众号"}
                                  {platform === "workwechat" && "企业微信"}
                                  {platform === "feishu" && "飞书"}
                                  {platform === "dingtalk" && "钉钉"}
                                  {platform === "redbook" && "小红书"}
                                </span>
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-sky-200 hover:bg-sky-50 text-sky-700 bg-transparent"
                          >
                            查看详情
                          </Button>
                          <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">
                            再次发布
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-6 bg-gradient-to-r from-sky-50 to-purple-50 rounded-xl border border-sky-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold flex items-center text-slate-900">
                <Sparkles className="w-5 h-5 mr-2 text-sky-600" />
                开始你的创作之旅
              </h3>
              <p className="text-slate-600 mt-2">一键生成专业内容，多平台同步发布，提升你的内容影响力</p>
            </div>
            <Button
              className="mt-4 md:mt-0 bg-gradient-to-r from-sky-500 to-purple-600 hover:from-sky-600 hover:to-purple-700 text-white"
              onClick={() => setActiveTab("create")}
            >
              <Wand2 className="w-4 h-4 mr-2" /> 立即开始创作
            </Button>
          </div>
        </div>
      </div>
      <FloatingNavButtons />
    </>
  )
}
