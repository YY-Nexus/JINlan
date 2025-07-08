// 企业管理系统 - 锁定设计系统配置
// 此文件定义了系统的核心UI风格，不可随意修改

export const DESIGN_SYSTEM_VERSION = "2.1.0"
export const LAST_UPDATED = "2024-01-15"

// 核心颜色系统 - 锁定
export const LOCKED_COLORS = {
  // 主色调 - 蓝色系
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // 主色
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },

  // 辅助色系
  secondary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b", // 辅助色
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },

  // 功能色系
  success: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // 成功色
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  warning: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // 警告色
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  error: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444", // 错误色
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
  },

  // 模块专用色系
  modules: {
    dashboard: "#22c55e", // 绿色
    users: "#f97316", // 橙色
    settings: "#3b82f6", // 蓝色
    ai: "#8b5cf6", // 紫色
    security: "#ef4444", // 红色
    mobile: "#ec4899", // 粉色
    analytics: "#6366f1", // 靛蓝色
    finance: "#f59e0b", // 琥珀色
  },
} as const

// 字体系统 - 锁定
export const LOCKED_TYPOGRAPHY = {
  fontFamily: {
    sans: ["Inter", "system-ui", "sans-serif"],
    mono: ["JetBrains Mono", "Consolas", "monospace"],
  },
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
} as const

// 间距系统 - 锁定
export const LOCKED_SPACING = {
  0: "0px",
  1: "0.25rem", // 4px
  2: "0.5rem", // 8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const

// 圆角系统 - 锁定
export const LOCKED_BORDER_RADIUS = {
  none: "0px",
  sm: "0.375rem", // 6px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
  "2xl": "1.5rem", // 24px
  full: "9999px",
} as const

// 阴影系统 - 锁定
export const LOCKED_SHADOWS = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
} as const

// 组件样式规范 - 锁定
export const LOCKED_COMPONENT_STYLES = {
  // 卡片组件
  card: {
    base: "bg-white/90 backdrop-blur-sm border border-sky-200/60 rounded-xl shadow-sm hover:shadow-lg hover:border-sky-300/60 transition-all duration-300",
    header: "p-6 border-b border-sky-100",
    content: "p-6",
    footer: "p-6 border-t border-sky-100",
  },

  // 按钮组件
  button: {
    primary:
      "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md",
    secondary:
      "bg-white border border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 font-medium px-4 py-2 rounded-lg transition-all duration-200",
    outline:
      "border border-sky-200 text-sky-700 hover:bg-sky-50 hover:border-sky-300 px-4 py-2 rounded-lg transition-all duration-200",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-4 py-2 rounded-lg transition-all duration-200",
  },

  // 输入框组件
  input: {
    base: "w-full px-3 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-200",
    search:
      "pl-10 pr-4 py-2 border border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-sky-50/50 transition-all duration-200",
  },

  // 徽章组件
  badge: {
    primary: "bg-sky-100 text-sky-800 border-sky-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
    error: "bg-red-100 text-red-800 border-red-200",
    secondary: "bg-slate-100 text-slate-800 border-slate-200",
  },

  // 导航组件
  navigation: {
    sidebar:
      "fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col h-full transition-transform duration-300 ease-in-out shadow-lg",
    header: "sticky top-0 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60",
    navItem:
      "w-full justify-start h-10 px-3 border-l-4 transition-all duration-300 hover:shadow-md group flex items-center rounded-md",
  },
} as const

// 动画系统 - 锁定
export const LOCKED_ANIMATIONS = {
  duration: {
    fast: "150ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
  },
  easing: {
    linear: "linear",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  scale: {
    hover: "scale-105",
    active: "scale-95",
  },
} as const

// 布局系统 - 锁定
export const LOCKED_LAYOUT = {
  container: "min-h-screen bg-gradient-to-br from-slate-50 to-sky-50/30",
  pageHeader: "flex items-center justify-between mb-6",
  pageTitle: "text-2xl font-bold text-slate-900",
  pageDescription: "text-slate-600 mt-1",
  grid: "grid gap-6",
  sidebar: {
    width: "16rem", // 256px
    zIndex: 60,
  },
  header: {
    height: "4rem", // 64px
    zIndex: 50,
  },
} as const

// Z-Index 层级系统 - 锁定
export const LOCKED_Z_INDEX = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
  toast: 1080,
} as const

// 响应式断点 - 锁定
export const LOCKED_BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const

// 设计原则 - 锁定
export const DESIGN_PRINCIPLES = {
  consistency: "保持整个应用的视觉和交互一致性",
  accessibility: "确保所有用户都能轻松使用",
  performance: "优化加载速度和交互响应",
  scalability: "支持功能扩展和维护",
  usability: "提供直观易用的用户体验",
} as const

// 导出锁定的设计令牌
export const DESIGN_TOKENS = {
  colors: LOCKED_COLORS,
  typography: LOCKED_TYPOGRAPHY,
  spacing: LOCKED_SPACING,
  borderRadius: LOCKED_BORDER_RADIUS,
  shadows: LOCKED_SHADOWS,
  components: LOCKED_COMPONENT_STYLES,
  animations: LOCKED_ANIMATIONS,
  layout: LOCKED_LAYOUT,
  zIndex: LOCKED_Z_INDEX,
  breakpoints: LOCKED_BREAKPOINTS,
} as const

// 类型定义
export type DesignTokens = typeof DESIGN_TOKENS
export type ColorPalette = typeof LOCKED_COLORS
export type ComponentStyles = typeof LOCKED_COMPONENT_STYLES
