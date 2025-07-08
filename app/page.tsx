"use client"

import { DashboardContent } from "@/components/dashboard-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 页面头部 */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-slate-800">运营中心</h1>
          <p className="text-slate-600 mt-1">实时监控业务数据，掌握企业运营状况</p>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <DashboardContent />
      </div>
    </div>
  )
}
