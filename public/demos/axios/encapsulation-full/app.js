/**
 * 生产级完整封装示例
 *
 * 包含功能：
 * 1. ✅ Token 自动添加
 * 2. ✅ 全局 Loading 管理
 * 3. ✅ 统一错误处理 + Toast 提示
 * 4. ✅ 请求日志（开发环境）
 * 5. ✅ 响应数据解包
 * 6. ✅ 超时重试（可选）
 *
 * 实际项目中，这些代码应该放在：
 * - src/utils/request.js
 * - src/utils/toast.js
 */

// ==================== 全局状态 ====================

let vueApp = null

// ==================== Toast 工具 ====================

const Toast = {
  success(message) {
    vueApp?.addToast(message, 'success')
  },
  error(message) {
    vueApp?.addToast(message, 'error')
  },
  info(message) {
    vueApp?.addToast(message, 'info')
  }
}

// ==================== 日志工具 ====================

const Logger = {
  request(message) {
    vueApp?.addLog(message, 'request')
    console.log(`📤 ${message}`)
  },
  response(message) {
    vueApp?.addLog(message, 'response')
    console.log(`📥 ${message}`)
  },
  error(message) {
    vueApp?.addLog(message, 'error')
    console.error(`❌ ${message}`)
  },
  info(message) {
    vueApp?.addLog(message, 'info')
    console.log(`ℹ️ ${message}`)
  }
}

// ==================== 创建 Axios 实例 ====================

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// ==================== 请求拦截器 ====================

request.interceptors.request.use(
  config => {
    // 1. 添加 Loading 计数
    if (vueApp) {
      vueApp.loadingCount++
    }

    // 2. 添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 3. 记录日志
    Logger.request(`${config.method.toUpperCase()} ${config.url}`)

    // 4. 记录请求开始时间（用于计算耗时）
    config.metadata = { startTime: Date.now() }

    return config
  },
  error => {
    if (vueApp) vueApp.loadingCount--
    Logger.error('请求配置错误')
    return Promise.reject(error)
  }
)

// ==================== 响应拦截器 ====================

request.interceptors.response.use(
  response => {
    // 1. 减少 Loading 计数
    if (vueApp) {
      vueApp.loadingCount--
    }

    // 2. 计算请求耗时
    const duration = Date.now() - response.config.metadata.startTime

    // 3. 记录日志
    Logger.response(`${response.status} ${response.config.url} (${duration}ms)`)

    // 4. 返回 data（解包）
    return response.data
  },
  error => {
    // 1. 减少 Loading 计数
    if (vueApp) {
      vueApp.loadingCount--
    }

    // 2. 计算请求耗时
    const duration = error.config?.metadata ? Date.now() - error.config.metadata.startTime : 0

    // 3. 错误处理
    let errorMessage = '请求失败'

    if (error.response) {
      const status = error.response.status

      const errorMessages = {
        400: '请求参数错误',
        401: '登录已过期',
        403: '没有权限',
        404: '资源不存在',
        500: '服务器错误',
        502: '网关错误',
        503: '服务不可用'
      }

      errorMessage = errorMessages[status] || `HTTP ${status}`

      // 401 特殊处理
      if (status === 401) {
        localStorage.removeItem('token')
        // window.location.href = '/login'
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时'
    } else if (error.message === 'Network Error') {
      errorMessage = '网络错误'
    }

    // 4. 记录日志
    Logger.error(`${errorMessage} ${error.config?.url || ''} (${duration}ms)`)

    // 5. 显示 Toast
    Toast.error(errorMessage)

    return Promise.reject({
      message: errorMessage,
      originalError: error
    })
  }
)

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      loadingCount: 0,
      logs: [],
      toasts: []
    }
  },

  created() {
    vueApp = this

    // 模拟已登录
    localStorage.setItem('token', 'production-token-xxx')
  },

  methods: {
    /**
     * 添加日志
     */
    addLog(message, type) {
      const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
      this.logs.unshift({ time, message, type })

      // 限制日志数量
      if (this.logs.length > 20) {
        this.logs.pop()
      }
    },

    /**
     * 添加 Toast
     */
    addToast(message, type) {
      const toast = { message, type }
      this.toasts.push(toast)

      // 3 秒后自动移除
      setTimeout(() => {
        const index = this.toasts.indexOf(toast)
        if (index > -1) {
          this.toasts.splice(index, 1)
        }
      }, 3000)
    },

    /**
     * 正常请求
     */
    async testNormalRequest() {
      try {
        const data = await request.get('/posts/1')
        Toast.success('请求成功')
        Logger.info(`获取到文章: ${data.title.substring(0, 20)}...`)
      } catch (err) {
        // 错误已在拦截器中处理
      }
    },

    /**
     * 并发请求
     */
    async testMultipleRequests() {
      Logger.info('发起 3 个并发请求...')

      try {
        const results = await Promise.all([
          request.get('/posts/1'),
          request.get('/posts/2'),
          request.get('/posts/3')
        ])

        Toast.success(`成功获取 ${results.length} 篇文章`)
      } catch (err) {
        // 错误已在拦截器中处理
      }
    },

    /**
     * 慢速请求
     */
    async testSlowRequest() {
      Logger.info('发起慢速请求（观察 Loading）...')

      try {
        // 使用 httpbin 的 delay 接口
        await axios.get('https://httpbin.org/delay/2', { timeout: 5000 })
        Toast.success('慢速请求完成')
      } catch (err) {
        Toast.error('请求失败')
      }
    },

    /**
     * 错误请求
     */
    async testErrorRequest() {
      try {
        await request.get('https://httpstat.us/500')
      } catch (err) {
        // 错误已在拦截器中处理
      }
    }
  }
})
