/**
 * 拦截器 - 全局 Loading 管理
 * 
 * 实现思路：
 * 1. 使用计数器 loadingCount 记录正在进行的请求数
 * 2. 请求拦截器：loadingCount++
 * 3. 响应拦截器（成功/失败都要）：loadingCount--
 * 4. loadingCount > 0 时显示 Loading 遮罩
 * 
 * 优点：
 * - 并发请求时不会闪烁（多个请求共享一个 Loading）
 * - 任意请求结束后，如果还有其他请求进行中，Loading 继续显示
 */

// ==================== 全局状态 ====================

// 用于存储 Vue 实例引用，以便在拦截器中操作 Vue 数据
let vueApp = null

// ==================== 创建 Axios 实例 ====================

const api = axios.create({
  timeout: 10000
})

// ==================== 请求拦截器 - 增加计数 ====================

api.interceptors.request.use(
  config => {
    console.log('📤 请求开始:', config.url)
    
    // 请求开始，计数 +1
    if (vueApp) {
      vueApp.loadingCount++
      vueApp.totalRequests++
    }
    
    return config
  },
  error => {
    // 请求配置出错，也要减少计数
    if (vueApp) {
      vueApp.loadingCount--
    }
    return Promise.reject(error)
  }
)

// ==================== 响应拦截器 - 减少计数 ====================

api.interceptors.response.use(
  response => {
    console.log('✅ 请求成功:', response.config.url)
    
    // 请求完成，计数 -1
    if (vueApp) {
      vueApp.loadingCount--
      vueApp.completedRequests++
    }
    
    return response.data
  },
  error => {
    console.log('❌ 请求失败:', error.config?.url)
    
    // 请求失败也要减少计数！这点很重要
    if (vueApp) {
      vueApp.loadingCount--
      vueApp.completedRequests++
    }
    
    return Promise.reject(error)
  }
)

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',
  
  data() {
    return {
      // Loading 计数器
      loadingCount: 0,
      // 统计数据
      totalRequests: 0,
      completedRequests: 0,
      // 结果列表
      results: []
    }
  },
  
  created() {
    // 保存 Vue 实例引用，供拦截器使用
    vueApp = this
  },
  
  methods: {
    /**
     * 单个请求
     * Loading 显示 → 请求完成 → Loading 隐藏
     */
    async singleRequest() {
      this.results = []
      
      try {
        const data = await api.get('https://jsonplaceholder.typicode.com/posts/1')
        this.results.push(`✅ 获取到文章: ${data.title.substring(0, 30)}...`)
      } catch (err) {
        this.results.push('❌ 请求失败')
      }
    },
    
    /**
     * 并发多个请求
     * 展示：多个请求同时进行时，Loading 不会闪烁
     * 只有当所有请求都完成后，Loading 才会消失
     */
    async multipleRequests() {
      this.results = []
      
      const requests = [
        api.get('https://jsonplaceholder.typicode.com/posts/1'),
        api.get('https://jsonplaceholder.typicode.com/posts/2'),
        api.get('https://jsonplaceholder.typicode.com/posts/3')
      ]
      
      try {
        const results = await Promise.all(requests)
        results.forEach((data, index) => {
          this.results.push(`✅ 文章${index + 1}: ${data.title.substring(0, 25)}...`)
        })
      } catch (err) {
        this.results.push('❌ 部分请求失败')
      }
    },
    
    /**
     * 串行请求
     * 展示：连续请求时，Loading 持续显示
     */
    async sequentialRequests() {
      this.results = []
      
      try {
        // 第一个请求
        const user = await api.get('https://jsonplaceholder.typicode.com/users/1')
        this.results.push(`✅ 用户: ${user.name}`)
        
        // 第二个请求（依赖第一个的结果）
        const posts = await api.get(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
        this.results.push(`✅ 该用户有 ${posts.length} 篇文章`)
      } catch (err) {
        this.results.push('❌ 请求失败')
      }
    }
  }
})
