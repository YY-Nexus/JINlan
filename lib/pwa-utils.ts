// PWA工具库 - 完整的PWA管理功能
export interface PWAInstallPrompt {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export interface ServiceWorkerRegistration {
  installing?: ServiceWorker
  waiting?: ServiceWorker
  active?: ServiceWorker
  scope: string
  update: () => Promise<void>
  unregister: () => Promise<boolean>
}

export interface PWAConfig {
  swPath: string
  scope: string
  updateViaCache: "imports" | "all" | "none"
  skipWaiting: boolean
  clientsClaim: boolean
}

export interface CacheConfig {
  name: string
  version: string
  maxAge: number
  maxEntries: number
  strategies: {
    static: "cache-first" | "network-first" | "stale-while-revalidate"
    dynamic: "cache-first" | "network-first" | "stale-while-revalidate"
    api: "cache-first" | "network-first" | "stale-while-revalidate"
  }
}

export interface NotificationConfig {
  title: string
  body: string
  icon?: string
  badge?: string
  image?: string
  tag?: string
  requireInteraction?: boolean
  actions?: Array<{
    action: string
    title: string
    icon?: string
  }>
}

export interface SyncConfig {
  tag: string
  data?: any
  options?: {
    minDelay?: number
    maxDelay?: number
  }
}

// PWA管理器类
export class PWAManager {
  private config: PWAConfig
  private cacheConfig: CacheConfig
  private registration: ServiceWorkerRegistration | null = null
  private installPrompt: PWAInstallPrompt | null = null

  constructor(config: PWAConfig, cacheConfig: CacheConfig) {
    this.config = config
    this.cacheConfig = cacheConfig
    this.init()
  }

  // 初始化PWA
  private async init() {
    if ("serviceWorker" in navigator) {
      await this.registerServiceWorker()
    }

    this.setupInstallPrompt()
    this.setupNotifications()
    this.setupBackgroundSync()
  }

  // 注册Service Worker
  async registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
    try {
      this.registration = await navigator.serviceWorker.register(this.config.swPath, {
        scope: this.config.scope,
        updateViaCache: this.config.updateViaCache,
      })

      console.log("Service Worker注册成功:", this.registration.scope)

      // 监听更新
      this.registration.addEventListener("updatefound", () => {
        const newWorker = this.registration?.installing
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              this.showUpdateNotification()
            }
          })
        }
      })

      return this.registration
    } catch (error) {
      console.error("Service Worker注册失败:", error)
      return null
    }
  }

  // 设置安装提示
  private setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault()
      this.installPrompt = e as any
      this.showInstallButton()
    })

    window.addEventListener("appinstalled", () => {
      console.log("PWA安装成功")
      this.hideInstallButton()
    })
  }

  // 显示安装按钮
  private showInstallButton() {
    const event = new CustomEvent("pwa-install-available")
    window.dispatchEvent(event)
  }

  // 隐藏安装按钮
  private hideInstallButton() {
    const event = new CustomEvent("pwa-install-completed")
    window.dispatchEvent(event)
  }

  // 触发安装
  async install(): Promise<boolean> {
    if (!this.installPrompt) {
      return false
    }

    try {
      await this.installPrompt.prompt()
      const choiceResult = await this.installPrompt.userChoice

      if (choiceResult.outcome === "accepted") {
        console.log("用户接受了安装")
        return true
      } else {
        console.log("用户拒绝了安装")
        return false
      }
    } catch (error) {
      console.error("安装失败:", error)
      return false
    } finally {
      this.installPrompt = null
    }
  }

  // 检查是否已安装
  isInstalled(): boolean {
    return window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
  }

  // 检查是否支持PWA
  isSupported(): boolean {
    return "serviceWorker" in navigator && "PushManager" in window
  }

  // 更新Service Worker
  async updateServiceWorker(): Promise<boolean> {
    if (!this.registration) {
      return false
    }

    try {
      await this.registration.update()
      return true
    } catch (error) {
      console.error("更新Service Worker失败:", error)
      return false
    }
  }

  // 显示更新通知
  private showUpdateNotification() {
    const event = new CustomEvent("pwa-update-available")
    window.dispatchEvent(event)
  }

  // 应用更新
  async applyUpdate(): Promise<boolean> {
    if (!this.registration?.waiting) {
      return false
    }

    try {
      this.registration.waiting.postMessage({ type: "SKIP_WAITING" })

      // 等待新的Service Worker激活
      await new Promise((resolve) => {
        navigator.serviceWorker.addEventListener("controllerchange", resolve, { once: true })
      })

      // 刷新页面
      window.location.reload()
      return true
    } catch (error) {
      console.error("应用更新失败:", error)
      return false
    }
  }

  // 设置通知
  private async setupNotifications() {
    if ("Notification" in window) {
      const permission = await Notification.requestPermission()
      console.log("通知权限:", permission)
    }
  }

  // 发送通知
  async sendNotification(config: NotificationConfig): Promise<boolean> {
    if (!("Notification" in window) || Notification.permission !== "granted") {
      return false
    }

    try {
      if (this.registration) {
        await this.registration.showNotification(config.title, {
          body: config.body,
          icon: config.icon,
          badge: config.badge,
          image: config.image,
          tag: config.tag,
          requireInteraction: config.requireInteraction,
          actions: config.actions,
        })
      } else {
        new Notification(config.title, {
          body: config.body,
          icon: config.icon,
        })
      }
      return true
    } catch (error) {
      console.error("发送通知失败:", error)
      return false
    }
  }

  // 设置后台同步
  private setupBackgroundSync() {
    if ("serviceWorker" in navigator && "sync" in window.ServiceWorkerRegistration.prototype) {
      console.log("后台同步支持已启用")
    }
  }

  // 注册后台同步
  async registerBackgroundSync(config: SyncConfig): Promise<boolean> {
    if (!this.registration || !("sync" in this.registration)) {
      return false
    }

    try {
      await (this.registration as any).sync.register(config.tag)

      // 存储同步数据
      if (config.data) {
        localStorage.setItem(`sync-${config.tag}`, JSON.stringify(config.data))
      }

      return true
    } catch (error) {
      console.error("注册后台同步失败:", error)
      return false
    }
  }

  // 缓存管理
  async clearCache(cacheName?: string): Promise<boolean> {
    try {
      if (cacheName) {
        await caches.delete(cacheName)
      } else {
        const cacheNames = await caches.keys()
        await Promise.all(cacheNames.map((name) => caches.delete(name)))
      }
      return true
    } catch (error) {
      console.error("清理缓存失败:", error)
      return false
    }
  }

  // 获取缓存大小
  async getCacheSize(): Promise<number> {
    try {
      if ("storage" in navigator && "estimate" in navigator.storage) {
        const estimate = await navigator.storage.estimate()
        return estimate.usage || 0
      }
      return 0
    } catch (error) {
      console.error("获取缓存大小失败:", error)
      return 0
    }
  }

  // 检查网络状态
  isOnline(): boolean {
    return navigator.onLine
  }

  // 监听网络状态变化
  onNetworkChange(callback: (online: boolean) => void) {
    window.addEventListener("online", () => callback(true))
    window.addEventListener("offline", () => callback(false))
  }

  // 预缓存资源
  async precacheResources(urls: string[]): Promise<boolean> {
    try {
      const cache = await caches.open(this.cacheConfig.name)
      await cache.addAll(urls)
      return true
    } catch (error) {
      console.error("预缓存资源失败:", error)
      return false
    }
  }

  // 获取PWA状态
  getStatus() {
    return {
      isSupported: this.isSupported(),
      isInstalled: this.isInstalled(),
      isOnline: this.isOnline(),
      hasServiceWorker: !!this.registration,
      canInstall: !!this.installPrompt,
      notificationPermission: "Notification" in window ? Notification.permission : "unsupported",
    }
  }
}

// 默认配置
export const defaultPWAConfig: PWAConfig = {
  swPath: "/sw-advanced.js",
  scope: "/",
  updateViaCache: "none",
  skipWaiting: true,
  clientsClaim: true,
}

export const defaultCacheConfig: CacheConfig = {
  name: "enterprise-management-v1",
  version: "1.0.0",
  maxAge: 24 * 60 * 60 * 1000, // 24小时
  maxEntries: 100,
  strategies: {
    static: "cache-first",
    dynamic: "stale-while-revalidate",
    api: "network-first",
  },
}

// 创建PWA管理器实例
export const createPWAManager = (config: Partial<PWAConfig> = {}, cacheConfig: Partial<CacheConfig> = {}) => {
  return new PWAManager({ ...defaultPWAConfig, ...config }, { ...defaultCacheConfig, ...cacheConfig })
}

// 工具函数
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const isStandalone = (): boolean => {
  return window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true
}

export const getInstallPromptEvent = (): Promise<PWAInstallPrompt> => {
  return new Promise((resolve) => {
    window.addEventListener(
      "beforeinstallprompt",
      (e) => {
        e.preventDefault()
        resolve(e as any)
      },
      { once: true },
    )
  })
}
