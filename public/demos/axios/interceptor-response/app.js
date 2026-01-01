/**
 * 响应拦截器 - 统一处理示例
 * 
 * 响应拦截器的主要职责：
 * 1. 统一解包响应数据（直接返回 response.data）
 * 2. 统一错误处理和提示
 * 3. 处理业务错误码
 * 4. Token 过期自动刷新
 */

// ==================== 创建 Axios 实例 ====================

const api = axios.create({
  timeout: 5000
})

// ==================== 响应拦截器配置 ====================

api.interceptors.response.use(
  /**
   * 响应成功处理
   * HTTP 状态码 2xx 时触发
   * @param {Object} response - 完整的响应对象
   * @returns {any} 返回值会传递给请求的 .then()
   */
  response => {
    console.log('✅ 响应拦截器 - 成功', response.status)
    
    // 【核心】直接返回 data，简化调用方代码
    // 这样在组件中就不用每次都写 res.data 了
    return response.data
  },
  
  /**
   * 响应错误处理
   * HTTP 状态码非 2xx 或网络错误时触发
   * @param {Object} error - 错误对象
   * @returns {Promise} 返回 rejected Promise
   */
  error => {
    console.log('❌ 响应拦截器 - 错误', error)
    
    // 统一错误处理
    let errorMessage = '未知错误'
    
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status
      
      // 根据状态码给出友好提示
      const statusMessages = {
        400: '请求参数错误',
        401: '未授权，请重新登录',
        403: '拒绝访问，权限不足',
        404: '请求的资源不存在',
        408: '请求超时',
        500: '服务器内部错误',
        502: '网关错误',
        503: '服务不可用',
        504: '网关超时'
      }
      
      errorMessage = statusMessages[status] || `HTTP 错误: ${status}`
      
      // 特殊处理：401 未授权，可以跳转到登录页
      if (status === 401) {
        // window.location.href = '/login'
        console.log('🔐 需要重新登录')
      }
    } else if (error.request) {
      // 请求发出但没有收到响应
      errorMessage = '网络错误，请检查网络连接'
    } else {
      // 请求配置出错
      errorMessage = error.message
    }
    
    // 可以在这里显示全局提示（如 Toast）
    // Toast.error(errorMessage)
    
    // 返回统一的错误格式
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
      result: null
    }
  },
  
  methods: {
    /**
     * 测试成功请求
     * 响应拦截器会自动解包 response.data
     */
    async testSuccess() {
      this.loading = true
      this.result = null
      
      try {
        // 使用拦截器后，直接获得的就是 data
        // 不用再写 res.data
        const data = await api.get('https://jsonplaceholder.typicode.com/posts/1')
        
        this.result = {
          success: true,
          title: '✅ 请求成功',
          message: '响应拦截器自动解包了 response.data',
          data: JSON.stringify(data, null, 2)
        }
      } catch (err) {
        this.result = {
          success: false,
          title: '❌ 请求失败',
          message: err.message
        }
      } finally {
        this.loading = false
      }
    },
    
    /**
     * 测试 404 错误
     */
    async test404() {
      this.loading = true
      this.result = null
      
      try {
        await api.get('https://jsonplaceholder.typicode.com/posts/999999')
      } catch (err) {
        // 响应拦截器已经转换成友好的错误信息
        this.result = {
          success: false,
          title: '❌ 404 错误',
          message: err.message  // "请求的资源不存在"
        }
      } finally {
        this.loading = false
      }
    },
    
    /**
     * 测试 500 错误
     */
    async test500() {
      this.loading = true
      this.result = null
      
      try {
        // 使用 httpstat.us 模拟 500 错误
        await api.get('https://httpstat.us/500')
      } catch (err) {
        this.result = {
          success: false,
          title: '❌ 500 错误',
          message: err.message  // "服务器内部错误"
        }
      } finally {
        this.loading = false
      }
    }
  }
})
