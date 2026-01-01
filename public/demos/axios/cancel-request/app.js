/**
 * Axios 取消请求演示
 * 
 * 使用 AbortController（推荐，现代浏览器）
 * 
 * 适用场景：
 * 1. 用户取消操作（如搜索时输入新内容）
 * 2. 组件卸载时取消未完成的请求
 * 3. 防止竞态条件（只需要最新请求的结果）
 * 4. 超时控制
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      status: null,
      statusDetail: '',
      logs: [],
      // 存储 AbortController 实例
      abortController: null
    }
  },
  
  computed: {
    statusClass() {
      if (this.loading) return 'loading'
      if (this.status === '请求已取消') return 'cancelled'
      if (this.status === '请求成功') return 'success'
      return 'error'
    },
    statusIcon() {
      if (this.loading) return '⏳'
      if (this.status === '请求已取消') return '🛑'
      if (this.status === '请求成功') return '✅'
      return '❌'
    }
  },
  
  methods: {
    /**
     * 发送慢速请求
     * 使用延迟 API 模拟慢速请求
     */
    async startRequest() {
      this.loading = true
      this.logs = []
      this.status = '请求中...'
      this.statusDetail = '正在等待服务器响应'
      
      // 创建新的 AbortController
      this.abortController = new AbortController()
      
      this.addLog('创建 AbortController')
      this.addLog('发送请求到服务器...')
      
      try {
        // 使用 httpbin 的延迟 API，延迟 5 秒响应
        const response = await axios.get('https://httpbin.org/delay/5', {
          // 将 signal 传给 axios
          signal: this.abortController.signal
        })
        
        this.status = '请求成功'
        this.statusDetail = `状态码: ${response.status}`
        this.addLog('✅ 请求成功完成')
        
      } catch (error) {
        // 检查是否是取消错误
        if (axios.isCancel(error)) {
          this.status = '请求已取消'
          this.statusDetail = '用户主动取消了请求'
          this.addLog('🛑 请求被用户取消')
        } else if (error.name === 'CanceledError') {
          // AbortController 取消的错误
          this.status = '请求已取消'
          this.statusDetail = 'AbortController 取消请求'
          this.addLog('🛑 请求被 AbortController 取消')
        } else {
          this.status = '请求失败'
          this.statusDetail = error.message
          this.addLog('❌ 请求失败: ' + error.message)
        }
        
      } finally {
        this.loading = false
        this.abortController = null
      }
    },
    
    /**
     * 取消请求
     */
    cancelRequest() {
      if (this.abortController) {
        this.addLog('调用 abortController.abort()')
        // 调用 abort() 取消请求
        this.abortController.abort()
      }
    },
    
    /**
     * 添加日志
     */
    addLog(message) {
      const time = new Date().toLocaleTimeString()
      this.logs.push(`[${time}] ${message}`)
    }
  },
  
  /**
   * 组件销毁前取消未完成的请求
   * 这是最佳实践！
   */
  beforeDestroy() {
    if (this.abortController) {
      this.abortController.abort()
    }
  }
})
