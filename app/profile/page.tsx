"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FloatingNavButtons } from "@/components/ui/floating-nav-buttons"
import { AvatarUpload } from "@/components/avatar-upload"
import { useAuth } from "@/contexts/AuthContext"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Save,
  Edit3,
  Shield,
  Activity,
  Clock,
  Award,
  Target,
  TrendingUp,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: user?.name || "系统管理员",
    email: user?.email || "admin@jinlan.com",
    phone: "+86 138-0000-0000",
    department: "信息技术部",
    position: "系统管理员",
    location: "上海市浦东新区",
    joinDate: "2023-01-15",
    bio: "负责企业管理系统的维护和优化，确保系统稳定运行。专注于提升用户体验和系统性能。",
    avatar: user?.avatar || "/placeholder.svg?height=100&width=100",
    skills: ["系统管理", "数据分析", "项目管理", "团队协作"],
    achievements: [
      { title: "优秀员工", date: "2024-01", description: "年度优秀员工奖" },
      { title: "技术创新", date: "2023-10", description: "系统优化项目获奖" },
      { title: "团队领导", date: "2023-06", description: "成功领导团队完成重要项目" },
    ],
  })

  const [stats] = useState({
    totalTasks: 156,
    completedTasks: 142,
    activeProjects: 8,
    teamMembers: 12,
    workingDays: 365,
    efficiency: 91,
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 更新用户上下文
      updateUser({
        name: profile.name,
        email: profile.email,
        avatar: profile.avatar,
      })

      toast({
        title: "保存成功",
        description: "个人资料已更新",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "保存失败",
        description: "请稍后重试",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarChange = (newAvatar: string) => {
    setProfile({ ...profile, avatar: newAvatar })
    updateUser({ avatar: newAvatar })
    toast({
      title: "头像更新成功",
      description: "您的头像已更新",
    })
  }

  return (
    <>
      <div className="p-6 space-y-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">个人中心</h1>
            <p className="text-slate-600 mt-2">管理您的个人信息和账户设置</p>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  取消
                </Button>
                <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "保存中..." : "保存更改"}
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700">
                <Edit3 className="w-4 h-4 mr-2" />
                编辑资料
              </Button>
            )}
          </div>
        </div>

        {/* 个人信息概览卡片 */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex flex-col items-center">
                <AvatarUpload
                  currentAvatar={profile.avatar}
                  onAvatarChange={handleAvatarChange}
                  size="lg"
                  fallbackText={profile.name.charAt(0)}
                />
                <Badge variant="secondary" className="mt-2">
                  {user?.role === "admin" ? "管理员" : user?.role === "manager" ? "经理" : "用户"}
                </Badge>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
                <p className="text-lg text-slate-600 mt-1">{profile.position}</p>
                <p className="text-slate-500 mt-1">{profile.department}</p>
                <p className="text-slate-700 mt-3 max-w-2xl">{profile.bio}</p>

                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="bg-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 统计数据卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="bg-white border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">完成任务</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">总任务</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalTasks}</p>
                </div>
                <Activity className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">活跃项目</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.activeProjects}</p>
                </div>
                <Briefcase className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">团队成员</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.teamMembers}</p>
                </div>
                <User className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-indigo-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">工作天数</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.workingDays}</p>
                </div>
                <Clock className="w-8 h-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600">工作效率</p>
                  <p className="text-2xl font-bold text-red-600">{stats.efficiency}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 详细信息选项卡 */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">个人信息</TabsTrigger>
            <TabsTrigger value="contact">联系方式</TabsTrigger>
            <TabsTrigger value="achievements">成就记录</TabsTrigger>
            <TabsTrigger value="security">安全设置</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  基本信息
                </CardTitle>
                <CardDescription>管理您的基本个人信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">姓名</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">职位</Label>
                    <Input
                      id="position"
                      value={profile.position}
                      onChange={(e) => setProfile({ ...profile, position: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">部门</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">个人简介</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-green-600" />
                  联系方式
                </CardTitle>
                <CardDescription>管理您的联系信息</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    邮箱地址
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    手机号码
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    工作地点
                  </Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="joinDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    入职日期
                  </Label>
                  <Input
                    id="joinDate"
                    type="date"
                    value={profile.joinDate}
                    onChange={(e) => setProfile({ ...profile, joinDate: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  成就记录
                </CardTitle>
                <CardDescription>您的工作成就和荣誉记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-l-4 border-l-yellow-500"
                    >
                      <Award className="w-6 h-6 text-yellow-600 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{achievement.title}</h4>
                        <p className="text-slate-600 mt-1">{achievement.description}</p>
                        <p className="text-sm text-slate-500 mt-2">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  安全设置
                </CardTitle>
                <CardDescription>管理您的账户安全</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">当前密码</Label>
                  <Input id="currentPassword" type="password" placeholder="请输入当前密码" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">新密码</Label>
                  <Input id="newPassword" type="password" placeholder="请输入新密码" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">确认新密码</Label>
                  <Input id="confirmPassword" type="password" placeholder="请再次输入新密码" />
                </div>

                <Button className="w-full bg-red-600 hover:bg-red-700">更改密码</Button>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">最近登录记录</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>• 2024年1月15日 14:30 - 上海市 (当前会话)</p>
                    <p>• 2024年1月14日 09:15 - 上海市</p>
                    <p>• 2024年1月13日 16:45 - 上海市</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <FloatingNavButtons />
    </>
  )
}
