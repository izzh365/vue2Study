/**
 * 移除拦截器 - eject 示例
 *
 * 使用场景：
 * 1. 临时禁用某个拦截器（如调试时禁用 Token）
 * 2. 动态切换拦截器逻辑
 * 3. 某些请求不需要经过拦截器处理
 *
 * 关键点：
 * - interceptors.request.use() 返回拦截器 ID
 * - interceptors.request.eject(id) 移除指定拦截器
 * - 移除后的拦截器不会再执行
 */

// ==================== 创建 Axios 实例 ====================

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000
})

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      // 拦截器 ID，用于 eject
      interceptorId: null,
      // 拦截器是否激活
      interceptorActive: false,
      // 日志列表
      logs: []
    }
  },

  mounted() {
    // 页面加载时添加拦截器
    this.addInterceptor()
  },

  methods: {
    /**
     * 添加日志
     */
    addLog(message, type = 'info') {
      const time = new Date().toLocaleTimeString()
      this.logs.unshift({ time, message, type })
      // 只保留最近 10 条日志
      if (this.logs.length > 10) {
        this.logs.pop()
      }
    },

    /**
     * 添加拦截器
     * use() 方法返回一个 ID，用于后续移除
     */
    addInterceptor() {
      // 添加拦截器并保存返回的 ID
      this.interceptorId = api.interceptors.request.use(
        config => {
          // 模拟添加 Token
          config.headers['Authorization'] = 'Bearer my-secret-token'

          // 记录日志
          console.log('🔑 拦截器执行: 添加 Token')

          return config
        },
        error => Promise.reject(error)
      )

      this.interceptorActive = true
      this.addLog('✅ Token 拦截器已添加', 'success')
      this.addLog(`   拦截器 ID: ${this.interceptorId}`, 'info')
    },

    /**
     * 移除拦截器
     * 使用 eject(id) 方法
     */
    removeInterceptor() {
      if (this.interceptorId !== null) {
        // 使用保存的 ID 移除拦截器
        api.interceptors.request.eject(this.interceptorId)

        this.addLog(`🗑️ 拦截器已移除 (ID: ${this.interceptorId})`, 'warn')

        this.interceptorId = null
        this.interceptorActive = false
      }
    },

    /**
     * 发送测试请求
     * 观察拦截器启用/禁用时的不同行为
     */
    async makeRequest() {
      this.loading = true

      this.addLog('📤 发送请求...', 'info')

      try {
        // 使用自定义配置来检查请求头
        const response = await api.get('/posts/1', {
          // 使用 transformRequest 来查看最终的请求配置
          transformRequest: [
            (data, headers) => {
              // 检查是否有 Token
              const hasToken = headers['Authorization']
              if (hasToken) {
                this.addLog('🔐 请求头包含 Authorization', 'success')
              } else {
                this.addLog('⚠️ 请求头没有 Authorization', 'warn')
              }
              return data
            }
          ]
        })

        this.addLog('✅ 请求成功', 'success')
      } catch (err) {
        this.addLog(`❌ 请求失败: ${err.message}`, 'error')
      } finally {
        this.loading = false
      }
    }
  }
})
