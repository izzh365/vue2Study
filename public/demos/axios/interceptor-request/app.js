/**
 * 请求拦截器演示 - 添加 Token
 *
 * 请求拦截器的常见用途：
 * 1. 添加认证 Token
 * 2. 添加公共请求头
 * 3. 请求数据格式化
 * 4. 显示 loading 状态
 */

// 创建 axios 实例
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

// 用于存储 token 的变量（模拟）
let currentToken = null

// ==================== 请求拦截器 ====================

api.interceptors.request.use(
  config => {
    // 记录日志（Vue 实例中使用）
    if (window.vueApp) {
      window.vueApp.addLog('request', `📤 请求拦截器触发`)
      window.vueApp.addLog('info', `   URL: ${config.url}`)
    }

    // 如果有 token，添加到请求头
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`

      if (window.vueApp) {
        window.vueApp.addLog('info', `   ✅ 已添加 Token: ${currentToken}`)
      }
    } else {
      if (window.vueApp) {
        window.vueApp.addLog('info', `   ⚠️ 未设置 Token`)
      }
    }

    // 必须返回 config！
    return config
  },
  error => {
    if (window.vueApp) {
      window.vueApp.addLog('error', `❌ 请求拦截器错误: ${error.message}`)
    }
    return Promise.reject(error)
  }
)

// ==================== 响应拦截器 ====================

api.interceptors.response.use(
  response => {
    if (window.vueApp) {
      window.vueApp.addLog('response', `📥 响应拦截器触发`)
      window.vueApp.addLog('info', `   状态码: ${response.status}`)

      // 显示请求头中是否包含 Token
      const authHeader = response.config.headers.Authorization
      if (authHeader) {
        window.vueApp.addLog('info', `   请求头包含: Authorization: ${authHeader}`)
      }
    }
    return response
  },
  error => {
    if (window.vueApp) {
      window.vueApp.addLog('error', `❌ 响应错误: ${error.message}`)
    }
    return Promise.reject(error)
  }
)

// ==================== Vue 实例 ====================

const app = new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      token: null,
      tokenInput: '',
      logs: []
    }
  },

  created() {
    // 暴露 Vue 实例供拦截器使用
    window.vueApp = this
    this.addLog('info', '🚀 拦截器已配置完成')
  },

  methods: {
    /**
     * 设置 Token
     */
    setToken() {
      if (this.tokenInput.trim()) {
        this.token = this.tokenInput.trim()
        currentToken = this.token
        this.addLog('info', `🔑 Token 已设置: ${this.token}`)
        this.tokenInput = ''
      }
    },

    /**
     * 清除 Token
     */
    clearToken() {
      this.token = null
      currentToken = null
      this.addLog('info', '🗑️ Token 已清除')
    },

    /**
     * 发送请求
     */
    async sendRequest() {
      this.loading = true
      this.addLog('info', '─'.repeat(40))
      this.addLog('info', '🌐 开始发送请求...')

      try {
        const response = await api.get('/posts/1')
        this.addLog('response', `✅ 请求成功，数据: ${response.data.title.substring(0, 30)}...`)
      } catch (error) {
        this.addLog('error', `❌ 请求失败: ${error.message}`)
      } finally {
        this.loading = false
      }
    },

    /**
     * 添加日志
     */
    addLog(type, message) {
      this.logs.unshift({ type, message })
      if (this.logs.length > 50) {
        this.logs.pop()
      }
    }
  }
})
