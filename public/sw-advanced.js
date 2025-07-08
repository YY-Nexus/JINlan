// 高级Service Worker - 智能缓存策略
const CACHE_NAME = "enterprise-management-v1"
const STATIC_CACHE = "static-v1"
const DYNAMIC_CACHE = "dynamic-v1"
const API_CACHE = "api-v1"

// 缓存策略配置
const CACHE_STRATEGIES = {
  static: "cache-first",
  dynamic: "stale-while-revalidate",
  api: "network-first",
}

// 静态资源列表
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/offline",
  "/images/jinlan-logo-main.png",
  "/images/jinlan-logo-animated.png",
]

// API端点配置
const API_ENDPOINTS = ["/api/auth", "/api/users", "/api/customers", "/api/tasks", "/api/analytics"]

// 缓存时间配置（毫秒）
const CACHE_EXPIRY = {
  static: 7 * 24 * 60 * 60 * 1000, // 7天
  dynamic: 24 * 60 * 60 * 1000, // 1天
  api: 5 * 60 * 1000, // 5分钟
}

// 最大缓存条目数
const MAX_CACHE_ENTRIES = {
  static: 50,
  dynamic: 100,
  api: 200,
}

// Service Worker安装事件
self.addEventListener("install", (event) => {
  console.log("Service Worker安装中...")

  event.waitUntil(
    Promise.all([
      // 预缓存静态资源
      caches
        .open(STATIC_CACHE)
        .then((cache) => {
          console.log("预缓存静态资源")
          return cache.addAll(STATIC_ASSETS)
        }),
      // 跳过等待，立即激活
      self.skipWaiting(),
    ]),
  )
})

// Service Worker激活事件
self.addEventListener("activate", (event) => {
  console.log("Service Worker激活中...")

  event.waitUntil(
    Promise.all([
      // 清理旧缓存
      cleanupOldCaches(),
      // 立即控制所有客户端
      self.clients.claim(),
    ]),
  )
})

// 网络请求拦截
self.addEventListener("fetch", (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 只处理同源请求
  if (url.origin !== location.origin) {
    return
  }

  // 根据请求类型选择缓存策略
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE))
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request, API_CACHE))
  } else {
    event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE))
  }
})

// 后台同步事件
self.addEventListener("sync", (event) => {
  console.log("后台同步事件:", event.tag)

  if (event.tag === "background-sync") {
    event.waitUntil(handleBackgroundSync())
  }
})

// 推送通知事件
self.addEventListener("push", (event) => {
  console.log("收到推送通知:", event.data?.text())

  if (event.data) {
    const data = event.data.json()
    event.waitUntil(showNotification(data))
  }
})

// 通知点击事件
self.addEventListener("notificationclick", (event) => {
  console.log("通知被点击:", event.notification.tag)

  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data?.url || "/"))
})

// 消息事件处理
self.addEventListener("message", (event) => {
  const { type, payload } = event.data

  switch (type) {
    case "SKIP_WAITING":
      self.skipWaiting()
      break
    case "GET_CACHE_SIZE":
      event.ports[0].postMessage(getCacheSize())
      break
    case "CLEAR_CACHE":
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true })
      })
      break
    case "UPDATE_CACHE":
      updateCache(payload).then(() => {
        event.ports[0].postMessage({ success: true })
      })
      break
  }
})

// 缓存优先策略
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)

    if (cachedResponse && !isExpired(cachedResponse, CACHE_EXPIRY.static)) {
      return cachedResponse
    }

    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone())
      await limitCacheSize(cacheName, MAX_CACHE_ENTRIES.static)
    }

    return networkResponse
  } catch (error) {
    console.error("缓存优先策略失败:", error)
    return caches.match("/offline") || new Response("离线模式")
  }
}

// 网络优先策略
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request)

    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      await cache.put(request, networkResponse.clone())
      await limitCacheSize(cacheName, MAX_CACHE_ENTRIES.api)
    }

    return networkResponse
  } catch (error) {
    console.error("网络请求失败，尝试缓存:", error)

    const cache = await caches.open(cacheName)
    const cachedResponse = await cache.match(request)

    if (cachedResponse && !isExpired(cachedResponse, CACHE_EXPIRY.api)) {
      return cachedResponse
    }

    throw error
  }
}

// 过期重新验证策略
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName)
  const cachedResponse = await cache.match(request)

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone())
        limitCacheSize(cacheName, MAX_CACHE_ENTRIES.dynamic)
      }
      return networkResponse
    })
    .catch((error) => {
      console.error("网络请求失败:", error)
      return cachedResponse || new Response("网络错误")
    })

  return cachedResponse || fetchPromise
}

// 判断是否为静态资源
function isStaticAsset(request) {
  const url = new URL(request.url)
  return (
    request.method === "GET" &&
    (url.pathname.startsWith("/images/") ||
      url.pathname.startsWith("/icons/") ||
      url.pathname.startsWith("/_next/static/") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".jpg") ||
      url.pathname.endsWith(".svg") ||
      url.pathname.endsWith(".woff2"))
  )
}

// 判断是否为API请求
function isAPIRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith("/api/")
}

// 检查缓存是否过期
function isExpired(response, maxAge) {
  const dateHeader = response.headers.get("date")
  if (!dateHeader) return false

  const responseTime = new Date(dateHeader).getTime()
  const now = Date.now()

  return now - responseTime > maxAge
}

// 限制缓存大小
async function limitCacheSize(cacheName, maxEntries) {
  const cache = await caches.open(cacheName)
  const keys = await cache.keys()

  if (keys.length > maxEntries) {
    const keysToDelete = keys.slice(0, keys.length - maxEntries)
    await Promise.all(keysToDelete.map((key) => cache.delete(key)))
  }
}

// 清理旧缓存
async function cleanupOldCaches() {
  const cacheNames = await caches.keys()
  const validCaches = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE]

  const deletePromises = cacheNames
    .filter((cacheName) => !validCaches.includes(cacheName))
    .map((cacheName) => caches.delete(cacheName))

  await Promise.all(deletePromises)
}

// 获取缓存大小
async function getCacheSize() {
  const cacheNames = await caches.keys()
  let totalSize = 0

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const keys = await cache.keys()
    totalSize += keys.length
  }

  return { totalEntries: totalSize, caches: cacheNames.length }
}

// 清理所有缓存
async function clearAllCaches() {
  const cacheNames = await caches.keys()
  await Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName)))
}

// 更新缓存
async function updateCache(urls) {
  const cache = await caches.open(STATIC_CACHE)
  await cache.addAll(urls)
}

// 处理后台同步
async function handleBackgroundSync() {
  try {
    // 获取待同步的数据
    const syncData = await getSyncData()

    if (syncData.length > 0) {
      // 尝试同步数据
      for (const data of syncData) {
        await syncDataToServer(data)
      }

      // 清理已同步的数据
      await clearSyncData()
    }
  } catch (error) {
    console.error("后台同步失败:", error)
  }
}

// 获取待同步数据
async function getSyncData() {
  // 从IndexedDB或localStorage获取待同步数据
  const syncKeys = Object.keys(localStorage).filter((key) => key.startsWith("sync-"))
  return syncKeys.map((key) => JSON.parse(localStorage.getItem(key)))
}

// 同步数据到服务器
async function syncDataToServer(data) {
  const response = await fetch("/api/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(`同步失败: ${response.status}`)
  }
}

// 清理已同步数据
async function clearSyncData() {
  const syncKeys = Object.keys(localStorage).filter((key) => key.startsWith("sync-"))
  syncKeys.forEach((key) => localStorage.removeItem(key))
}

// 显示通知
async function showNotification(data) {
  const options = {
    body: data.body,
    icon: data.icon || "/images/jinlan-logo-main.png",
    badge: "/images/jinlan-logo-main.png",
    image: data.image,
    tag: data.tag || "default",
    requireInteraction: data.requireInteraction || false,
    actions: data.actions || [],
    data: data.data || {},
  }

  await self.registration.showNotification(data.title, options)
}

// 错误处理
self.addEventListener("error", (event) => {
  console.error("Service Worker错误:", event.error)
})

self.addEventListener("unhandledrejection", (event) => {
  console.error("Service Worker未处理的Promise拒绝:", event.reason)
})

console.log("高级Service Worker已加载")
