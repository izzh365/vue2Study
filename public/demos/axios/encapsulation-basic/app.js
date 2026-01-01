/**
 * Axios 基础封装示例
 * 
 * 封装的核心步骤：
 * 1. 创建 axios 实例（axios.create）
 * 2. 配置默认选项（baseURL, timeout 等）
 * 3. 添加请求拦截器（Token, Loading 等）
 * 4. 添加响应拦截器（解包数据, 错误处理）
 * 5. 导出实例供业务使用
 */

// ==================== 封装的 request.js ====================

/**
 * 创建 axios 实例
 * 为什么不直接用 axios？
 * 因为创建实例可以有独立的配置，不会影响全局 axios
 */
const request = axios.create({
  // 基础 URL，所有请求会自动拼接
  // 实际项目中从环境变量读取：process.env.VUE_APP_API_URL
  baseURL: 'https://jsonplaceholder.typicode.com',
  
  // 请求超时时间（毫秒）
  timeout: 10000,
  
  // 默认请求头
  headers: {
    'Content-Type': 'application/json'
  }
})

// ==================== 请求拦截器 ====================

request.interceptors.request.use(
  config => {
    console.log('📤 [Request]', config.method.toUpperCase(), config.url)
    
    // 从 localStorage 获取 Token
    const token = localStorage.getItem('token')
    
    // 如果有 Token，添加到请求头
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    // 可以在这里添加 loading 状态
    // store.commit('SET_LOADING', true)
    
    return config
  },
  error => {
    console.error('❌ 请求配置错误:', error)
    return Promise.reject(error)
  }
)

// ==================== 响应拦截器 ====================

request.interceptors.response.use(
  response => {
    console.log('📥 [Response]', response.status, response.config.url)
    
    // 直接返回 data，简化调用方代码
    // 这样在组件中就不用每次都写 res.data
    return response.data
  },
  error => {
    console.error('❌ 响应错误:', error.message)
    
    // 统一错误处理
    let errorMessage = '请求失败'
    
    if (error.response) {
      // 服务器返回了错误状态码
      const status = error.response.status
      
      switch (status) {
        case 401:
          errorMessage = '未授权，请重新登录'
          // 可以跳转到登录页
          // router.push('/login')
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求的资源不存在'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        default:
          errorMessage = `HTTP 错误: ${status}`
      }
    } else if (error.code === 'ECONNABORTED') {
      errorMessage = '请求超时'
    } else {
      errorMessage = '网络错误'
    }
    
    // 可以在这里显示错误提示
    // Toast.error(errorMessage)
    
    return Promise.reject({ message: errorMessage, originalError: error })
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
  
  created() {
    // 模拟登录后保存的 Token
    localStorage.setItem('token', 'demo-token-123456')
  },
  
  methods: {
    /**
     * 测试封装后的请求
     */
    async testRequest() {
      this.loading = true
      this.result = null
      
      try {
        // 使用封装后的 request
        // 注意：不需要写完整的 URL，自动拼接 baseURL
        // 返回值已经是 data，不用再取 .data
        const data = await request.get('/posts/1')
        
        this.result = {
          title: '✅ 请求成功',
          message: '封装后的请求自动添加了 Token，响应自动解包了 data',
          data: JSON.stringify(data, null, 2)
        }
      } catch (err) {
        this.result = {
          title: '❌ 请求失败',
          message: err.message
        }
      } finally {
        this.loading = false
      }
    }
  }
})
