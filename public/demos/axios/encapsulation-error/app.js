/**
 * 统一错误处理示例
 *
 * 错误处理策略：
 * 1. HTTP 错误（4xx, 5xx）：根据状态码显示友好提示
 * 2. 网络错误：提示检查网络连接
 * 3. 超时错误：提示请求超时
 * 4. 业务错误：根据业务错误码处理
 *
 * 特殊处理：
 * - 401：自动跳转登录页
 * - 403：提示权限不足
 * - 断网：显示离线提示
 */

// ==================== Toast 工具 ====================

const Toast = {
  show(message, type = 'error') {
    // 通过 Vue 实例显示 Toast
    if (window.vueApp) {
      window.vueApp.showToast(message, type)
    }
  },
  error(message) {
    this.show(message, 'error')
  },
  warning(message) {
    this.show(message, 'warning')
  },
  success(message) {
    this.show(message, 'success')
  }
}

// ==================== 封装的 request ====================

const request = axios.create({
  timeout: 5000
})

// 响应拦截器 - 统一错误处理
request.interceptors.response.use(
  response => response.data,
  error => {
    console.log('❌ 捕获错误:', error)

    // 错误信息
    let errorMessage = '请求失败'
    let errorType = 'error'
    let errorDetail = {}

    if (error.response) {
      // ==================== HTTP 错误 ====================
      const status = error.response.status

      // 状态码 -> 友好提示的映射
      const errorMessages = {
        400: { message: '请求参数错误', type: 'warning' },
        401: { message: '登录已过期，请重新登录', type: 'error', action: 'logout' },
        403: { message: '没有权限访问该资源', type: 'warning' },
        404: { message: '请求的资源不存在', type: 'warning' },
        408: { message: '请求超时，请稍后重试', type: 'warning' },
        500: { message: '服务器开小差了，请稍后重试', type: 'error' },
        502: { message: '网关错误', type: 'error' },
        503: { message: '服务暂不可用', type: 'error' },
        504: { message: '网关超时', type: 'error' }
      }

      const errorConfig = errorMessages[status] || {
        message: `HTTP 错误: ${status}`,
        type: 'error'
      }

      errorMessage = errorConfig.message
      errorType = errorConfig.type

      errorDetail = {
        type: 'HTTP Error',
        status,
        statusText: error.response.statusText,
        url: error.config.url,
        message: errorMessage
      }

      // 特殊处理：401 未授权
      if (status === 401) {
        // 清除本地 Token
        localStorage.removeItem('token')
        // 实际项目中跳转到登录页
        // window.location.href = '/login'
        console.log('🔐 需要重新登录')
      }
    } else if (error.code === 'ECONNABORTED') {
      // ==================== 超时错误 ====================
      errorMessage = '请求超时，请检查网络后重试'
      errorType = 'warning'
      errorDetail = {
        type: 'Timeout Error',
        message: errorMessage,
        timeout: error.config.timeout
      }
    } else if (error.message === 'Network Error') {
      // ==================== 网络错误 ====================
      errorMessage = '网络连接失败，请检查网络'
      errorType = 'error'
      errorDetail = {
        type: 'Network Error',
        message: errorMessage,
        online: navigator.onLine
      }
    } else {
      // ==================== 其他错误 ====================
      errorMessage = error.message || '未知错误'
      errorDetail = {
        type: 'Unknown Error',
        message: errorMessage
      }
    }

    // 显示 Toast 提示
    Toast[errorType](errorMessage)

    // 返回格式化的错误
    return Promise.reject({
      message: errorMessage,
      type: errorType,
      detail: errorDetail,
      originalError: error
    })
  }
)

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',

  data() {
    return {
      toast: {
        show: false,
        message: '',
        type: 'error'
      },
      result: null
    }
  },

  created() {
    // 保存 Vue 实例引用，供 Toast 使用
    window.vueApp = this
  },

  methods: {
    /**
     * 显示 Toast
     */
    showToast(message, type) {
      this.toast = { show: true, message, type }

      // 3 秒后自动隐藏
      setTimeout(() => {
        this.toast.show = false
      }, 3000)
    },

    /**
     * 触发不同类型的错误
     */
    async triggerError(errorType) {
      this.result = null

      try {
        if (errorType === 'network') {
          // 模拟网络错误：访问不存在的域名
          await request.get('http://localhost:99999/api')
        } else {
          // 使用 httpstat.us 模拟各种 HTTP 状态码
          await request.get(`https://httpstat.us/${errorType}`)
        }
      } catch (err) {
        this.result = JSON.stringify(err.detail, null, 2)
      }
    }
  }
})
