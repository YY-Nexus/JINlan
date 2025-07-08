// 国际化工具库 - 完整的多语言支持
export interface LocaleConfig {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl: boolean
  dateFormat: string
  timeFormat: string
  numberFormat: {
    decimal: string
    thousands: string
    currency: string
  }
}

export interface TranslationKey {
  [key: string]: string | TranslationKey
}

export interface Translations {
  [locale: string]: TranslationKey
}

export interface FormatOptions {
  locale?: string
  currency?: string
  style?: "decimal" | "currency" | "percent"
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}

// 支持的语言配置
export const SUPPORTED_LOCALES: Record<string, LocaleConfig> = {
  "zh-CN": {
    code: "zh-CN",
    name: "Chinese (Simplified)",
    nativeName: "简体中文",
    flag: "🇨🇳",
    rtl: false,
    dateFormat: "YYYY年MM月DD日",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ".",
      thousands: ",",
      currency: "¥",
    },
  },
  "zh-TW": {
    code: "zh-TW",
    name: "Chinese (Traditional)",
    nativeName: "繁體中文",
    flag: "🇹🇼",
    rtl: false,
    dateFormat: "YYYY年MM月DD日",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ".",
      thousands: ",",
      currency: "NT$",
    },
  },
  "en-US": {
    code: "en-US",
    name: "English (US)",
    nativeName: "English",
    flag: "🇺🇸",
    rtl: false,
    dateFormat: "MM/DD/YYYY",
    timeFormat: "h:mm:ss A",
    numberFormat: {
      decimal: ".",
      thousands: ",",
      currency: "$",
    },
  },
  "ja-JP": {
    code: "ja-JP",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    rtl: false,
    dateFormat: "YYYY年MM月DD日",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ".",
      thousands: ",",
      currency: "¥",
    },
  },
  "ko-KR": {
    code: "ko-KR",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    rtl: false,
    dateFormat: "YYYY년 MM월 DD일",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ".",
      thousands: ",",
      currency: "₩",
    },
  },
  "es-ES": {
    code: "es-ES",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    rtl: false,
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ",",
      thousands: ".",
      currency: "€",
    },
  },
  "fr-FR": {
    code: "fr-FR",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    rtl: false,
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ",",
      thousands: " ",
      currency: "€",
    },
  },
  "de-DE": {
    code: "de-DE",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    rtl: false,
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ",",
      thousands: ".",
      currency: "€",
    },
  },
  "it-IT": {
    code: "it-IT",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    rtl: false,
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ",",
      thousands: ".",
      currency: "€",
    },
  },
  "pt-BR": {
    code: "pt-BR",
    name: "Portuguese (Brazil)",
    nativeName: "Português",
    flag: "🇧🇷",
    rtl: false,
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ",",
      thousands: ".",
      currency: "R$",
    },
  },
  "ru-RU": {
    code: "ru-RU",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
    rtl: false,
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ",",
      thousands: " ",
      currency: "₽",
    },
  },
  "ar-SA": {
    code: "ar-SA",
    name: "Arabic",
    nativeName: "العربية",
    flag: "🇸🇦",
    rtl: true,
    dateFormat: "DD/MM/YYYY",
    timeFormat: "HH:mm:ss",
    numberFormat: {
      decimal: ".",
      thousands: ",",
      currency: "ر.س",
    },
  },
}

// 默认翻译
export const DEFAULT_TRANSLATIONS: Translations = {
  "zh-CN": {
    common: {
      save: "保存",
      cancel: "取消",
      delete: "删除",
      edit: "编辑",
      add: "添加",
      search: "搜索",
      loading: "加载中...",
      error: "错误",
      success: "成功",
      warning: "警告",
      info: "信息",
      confirm: "确认",
      yes: "是",
      no: "否",
      ok: "确定",
      close: "关闭",
      back: "返回",
      next: "下一步",
      previous: "上一步",
      submit: "提交",
      reset: "重置",
      refresh: "刷新",
      export: "导出",
      import: "导入",
      print: "打印",
      copy: "复制",
      paste: "粘贴",
      cut: "剪切",
      undo: "撤销",
      redo: "重做",
      select: "选择",
      selectAll: "全选",
      clear: "清空",
      filter: "筛选",
      sort: "排序",
      view: "查看",
      download: "下载",
      upload: "上传",
    },
    navigation: {
      dashboard: "仪表盘",
      customers: "客户管理",
      tasks: "任务管理",
      communication: "沟通协作",
      analytics: "数据分析",
      finance: "财务管理",
      projects: "项目管理",
      settings: "设置",
      help: "帮助",
      profile: "个人资料",
      logout: "退出登录",
    },
    forms: {
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      address: "地址",
      company: "公司",
      title: "标题",
      description: "描述",
      status: "状态",
      priority: "优先级",
      dueDate: "截止日期",
      startDate: "开始日期",
      endDate: "结束日期",
      amount: "金额",
      quantity: "数量",
      price: "价格",
      total: "总计",
      notes: "备注",
      tags: "标签",
      category: "分类",
      type: "类型",
    },
    messages: {
      saveSuccess: "保存成功",
      deleteSuccess: "删除成功",
      updateSuccess: "更新成功",
      createSuccess: "创建成功",
      operationFailed: "操作失败",
      networkError: "网络错误",
      validationError: "验证错误",
      permissionDenied: "权限不足",
      notFound: "未找到",
      serverError: "服务器错误",
    },
  },
  "en-US": {
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      search: "Search",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      warning: "Warning",
      info: "Info",
      confirm: "Confirm",
      yes: "Yes",
      no: "No",
      ok: "OK",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      submit: "Submit",
      reset: "Reset",
      refresh: "Refresh",
      export: "Export",
      import: "Import",
      print: "Print",
      copy: "Copy",
      paste: "Paste",
      cut: "Cut",
      undo: "Undo",
      redo: "Redo",
      select: "Select",
      selectAll: "Select All",
      clear: "Clear",
      filter: "Filter",
      sort: "Sort",
      view: "View",
      download: "Download",
      upload: "Upload",
    },
    navigation: {
      dashboard: "Dashboard",
      customers: "Customers",
      tasks: "Tasks",
      communication: "Communication",
      analytics: "Analytics",
      finance: "Finance",
      projects: "Projects",
      settings: "Settings",
      help: "Help",
      profile: "Profile",
      logout: "Logout",
    },
    forms: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      company: "Company",
      title: "Title",
      description: "Description",
      status: "Status",
      priority: "Priority",
      dueDate: "Due Date",
      startDate: "Start Date",
      endDate: "End Date",
      amount: "Amount",
      quantity: "Quantity",
      price: "Price",
      total: "Total",
      notes: "Notes",
      tags: "Tags",
      category: "Category",
      type: "Type",
    },
    messages: {
      saveSuccess: "Saved successfully",
      deleteSuccess: "Deleted successfully",
      updateSuccess: "Updated successfully",
      createSuccess: "Created successfully",
      operationFailed: "Operation failed",
      networkError: "Network error",
      validationError: "Validation error",
      permissionDenied: "Permission denied",
      notFound: "Not found",
      serverError: "Server error",
    },
  },
}

// 国际化管理器类
export class I18nManager {
  private currentLocale = "zh-CN"
  private translations: Translations = DEFAULT_TRANSLATIONS
  private cache: Map<string, string> = new Map()
  private fallbackLocale = "en-US"

  constructor(initialLocale?: string, customTranslations?: Translations) {
    if (initialLocale && SUPPORTED_LOCALES[initialLocale]) {
      this.currentLocale = initialLocale
    }

    if (customTranslations) {
      this.translations = { ...this.translations, ...customTranslations }
    }

    this.detectBrowserLocale()
  }

  // 检测浏览器语言
  private detectBrowserLocale() {
    if (typeof window !== "undefined") {
      const browserLocale = navigator.language || (navigator as any).userLanguage
      const supportedLocale = Object.keys(SUPPORTED_LOCALES).find((locale) =>
        locale.startsWith(browserLocale.split("-")[0]),
      )

      if (supportedLocale && !this.currentLocale) {
        this.currentLocale = supportedLocale
      }
    }
  }

  // 设置当前语言
  setLocale(locale: string) {
    if (SUPPORTED_LOCALES[locale]) {
      this.currentLocale = locale
      this.cache.clear()
      this.updateDocumentDirection()
      this.dispatchLocaleChange()
    }
  }

  // 获取当前语言
  getCurrentLocale(): string {
    return this.currentLocale
  }

  // 获取语言配置
  getLocaleConfig(locale?: string): LocaleConfig {
    return SUPPORTED_LOCALES[locale || this.currentLocale]
  }

  // 获取所有支持的语言
  getSupportedLocales(): LocaleConfig[] {
    return Object.values(SUPPORTED_LOCALES)
  }

  // 翻译函数
  t(key: string, params?: Record<string, string | number>, locale?: string): string {
    const targetLocale = locale || this.currentLocale
    const cacheKey = `${targetLocale}:${key}:${JSON.stringify(params)}`

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!
    }

    let translation = this.getTranslation(key, targetLocale)

    // 如果没有找到翻译，尝试回退语言
    if (!translation && targetLocale !== this.fallbackLocale) {
      translation = this.getTranslation(key, this.fallbackLocale)
    }

    // 如果仍然没有找到，返回key
    if (!translation) {
      translation = key
    }

    // 参数替换
    if (params) {
      translation = this.interpolate(translation, params)
    }

    this.cache.set(cacheKey, translation)
    return translation
  }

  // 获取翻译
  private getTranslation(key: string, locale: string): string | null {
    const keys = key.split(".")
    let current: any = this.translations[locale]

    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k]
      } else {
        return null
      }
    }

    return typeof current === "string" ? current : null
  }

  // 参数插值
  private interpolate(template: string, params: Record<string, string | number>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key]?.toString() || match
    })
  }

  // 添加翻译
  addTranslations(locale: string, translations: TranslationKey) {
    if (!this.translations[locale]) {
      this.translations[locale] = {}
    }
    this.translations[locale] = this.deepMerge(this.translations[locale], translations)
    this.cache.clear()
  }

  // 深度合并对象
  private deepMerge(target: any, source: any): any {
    const result = { ...target }

    for (const key in source) {
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(result[key] || {}, source[key])
      } else {
        result[key] = source[key]
      }
    }

    return result
  }

  // 格式化数字
  formatNumber(value: number, options?: FormatOptions): string {
    const locale = options?.locale || this.currentLocale
    const config = SUPPORTED_LOCALES[locale]

    try {
      return new Intl.NumberFormat(locale, {
        style: options?.style || "decimal",
        currency: options?.currency || config.numberFormat.currency,
        minimumFractionDigits: options?.minimumFractionDigits,
        maximumFractionDigits: options?.maximumFractionDigits,
      }).format(value)
    } catch (error) {
      return value.toString()
    }
  }

  // 格式化货币
  formatCurrency(value: number, currency?: string, locale?: string): string {
    return this.formatNumber(value, {
      style: "currency",
      currency: currency || SUPPORTED_LOCALES[locale || this.currentLocale].numberFormat.currency,
      locale: locale || this.currentLocale,
    })
  }

  // 格式化百分比
  formatPercent(value: number, locale?: string): string {
    return this.formatNumber(value, {
      style: "percent",
      locale: locale || this.currentLocale,
    })
  }

  // 格式化日期
  formatDate(date: Date | string | number, format?: string, locale?: string): string {
    const targetLocale = locale || this.currentLocale
    const dateObj = new Date(date)

    if (format) {
      return this.customDateFormat(dateObj, format, targetLocale)
    }

    try {
      return new Intl.DateTimeFormat(targetLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(dateObj)
    } catch (error) {
      return dateObj.toLocaleDateString()
    }
  }

  // 格式化时间
  formatTime(date: Date | string | number, locale?: string): string {
    const targetLocale = locale || this.currentLocale
    const dateObj = new Date(date)

    try {
      return new Intl.DateTimeFormat(targetLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(dateObj)
    } catch (error) {
      return dateObj.toLocaleTimeString()
    }
  }

  // 格式化日期时间
  formatDateTime(date: Date | string | number, locale?: string): string {
    const targetLocale = locale || this.currentLocale
    const dateObj = new Date(date)

    try {
      return new Intl.DateTimeFormat(targetLocale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(dateObj)
    } catch (error) {
      return dateObj.toLocaleString()
    }
  }

  // 自定义日期格式
  private customDateFormat(date: Date, format: string, locale: string): string {
    const config = SUPPORTED_LOCALES[locale]
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    const hour = String(date.getHours()).padStart(2, "0")
    const minute = String(date.getMinutes()).padStart(2, "0")
    const second = String(date.getSeconds()).padStart(2, "0")

    return format
      .replace(/YYYY/g, year.toString())
      .replace(/MM/g, month)
      .replace(/DD/g, day)
      .replace(/HH/g, hour)
      .replace(/mm/g, minute)
      .replace(/ss/g, second)
  }

  // 相对时间格式化
  formatRelativeTime(date: Date | string | number, locale?: string): string {
    const targetLocale = locale || this.currentLocale
    const dateObj = new Date(date)
    const now = new Date()
    const diffMs = now.getTime() - dateObj.getTime()
    const diffSeconds = Math.floor(diffMs / 1000)
    const diffMinutes = Math.floor(diffSeconds / 60)
    const diffHours = Math.floor(diffMinutes / 60)
    const diffDays = Math.floor(diffHours / 24)

    try {
      const rtf = new Intl.RelativeTimeFormat(targetLocale, { numeric: "auto" })

      if (diffDays > 0) {
        return rtf.format(-diffDays, "day")
      } else if (diffHours > 0) {
        return rtf.format(-diffHours, "hour")
      } else if (diffMinutes > 0) {
        return rtf.format(-diffMinutes, "minute")
      } else {
        return rtf.format(-diffSeconds, "second")
      }
    } catch (error) {
      // 回退到简单的相对时间
      if (diffDays > 0) {
        return `${diffDays} ${this.t("common.daysAgo")}`
      } else if (diffHours > 0) {
        return `${diffHours} ${this.t("common.hoursAgo")}`
      } else if (diffMinutes > 0) {
        return `${diffMinutes} ${this.t("common.minutesAgo")}`
      } else {
        return this.t("common.justNow")
      }
    }
  }

  // 更新文档方向
  private updateDocumentDirection() {
    if (typeof document !== "undefined") {
      const config = SUPPORTED_LOCALES[this.currentLocale]
      document.documentElement.dir = config.rtl ? "rtl" : "ltr"
      document.documentElement.lang = this.currentLocale
    }
  }

  // 派发语言变更事件
  private dispatchLocaleChange() {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("localechange", {
        detail: { locale: this.currentLocale },
      })
      window.dispatchEvent(event)
    }
  }

  // 验证翻译完整性
  validateTranslations(locale: string): Array<{ key: string; missing: boolean }> {
    const baseKeys = this.getAllKeys(this.translations[this.fallbackLocale] || {})
    const targetKeys = this.getAllKeys(this.translations[locale] || {})

    return baseKeys.map((key) => ({
      key,
      missing: !targetKeys.includes(key),
    }))
  }

  // 获取所有翻译键
  private getAllKeys(obj: any, prefix = ""): string[] {
    const keys: string[] = []

    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key

      if (typeof obj[key] === "object" && obj[key] !== null) {
        keys.push(...this.getAllKeys(obj[key], fullKey))
      } else {
        keys.push(fullKey)
      }
    }

    return keys
  }

  // 导出翻译
  exportTranslations(locale?: string): string {
    const targetLocale = locale || this.currentLocale
    return JSON.stringify(this.translations[targetLocale], null, 2)
  }

  // 导入翻译
  importTranslations(locale: string, translationsJson: string): boolean {
    try {
      const translations = JSON.parse(translationsJson)
      this.addTranslations(locale, translations)
      return true
    } catch (error) {
      console.error("Failed to import translations:", error)
      return false
    }
  }

  // 清理缓存
  clearCache() {
    this.cache.clear()
  }

  // 获取统计信息
  getStats() {
    return {
      currentLocale: this.currentLocale,
      supportedLocales: Object.keys(SUPPORTED_LOCALES).length,
      loadedTranslations: Object.keys(this.translations).length,
      cacheSize: this.cache.size,
      isRTL: SUPPORTED_LOCALES[this.currentLocale]?.rtl || false,
    }
  }
}

// 创建默认实例
export const createI18nManager = (locale?: string, translations?: Translations) => {
  return new I18nManager(locale, translations)
}

// 工具函数
export const detectLocale = (): string => {
  if (typeof window === "undefined") return "zh-CN"

  const browserLocale = navigator.language || (navigator as any).userLanguage
  const supportedLocale = Object.keys(SUPPORTED_LOCALES).find((locale) =>
    locale.startsWith(browserLocale.split("-")[0]),
  )

  return supportedLocale || "zh-CN"
}

export const isRTLLocale = (locale: string): boolean => {
  return SUPPORTED_LOCALES[locale]?.rtl || false
}

export const getLocaleFlag = (locale: string): string => {
  return SUPPORTED_LOCALES[locale]?.flag || "🌐"
}

export const getLocaleName = (locale: string, native = false): string => {
  const config = SUPPORTED_LOCALES[locale]
  return native ? config?.nativeName : config?.name || locale
}
