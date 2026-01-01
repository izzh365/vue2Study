/**
 * Promise.all 并发请求演示
 * 
 * 特点：
 * - 同时发送多个请求
 * - 等待所有请求完成
 * - 任一失败则整体失败
 * - 总耗时 ≈ 最慢请求的耗时
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      totalTime: null,
      savedTime: null,
      requests: [
        { name: '获取用户列表', icon: '👤', status: '', message: '等待中...', time: 0 },
        { name: '获取文章列表', icon: '📝', status: '', message: '等待中...', time: 0 },
        { name: '获取评论列表', icon: '💬', status: '', message: '等待中...', time: 0 }
      ]
    }
  },
  
  methods: {
    /**
     * 使用 Promise.all 并发请求
     */
    async fetchAll() {
      this.loading = true
      this.totalTime = null
      this.savedTime = null
      
      // 重置状态
      this.requests.forEach(req => {
        req.status = 'loading'
        req.message = '请求中...'
        req.time = 0
      })
      
      const startTime = Date.now()
      
      try {
        // 创建请求函数并记录单个耗时
        const createRequest = async (url, index) => {
          const reqStart = Date.now()
          const response = await axios.get(url)
          const reqTime = Date.now() - reqStart
          
          this.requests[index].time = reqTime
          this.requests[index].status = 'success'
          this.requests[index].message = `✅ 成功 (${reqTime}ms)`
          
          return response.data
        }
        
        // Promise.all 并发请求
        const [users, posts, comments] = await Promise.all([
          createRequest('https://jsonplaceholder.typicode.com/users?_limit=3', 0),
          createRequest('https://jsonplaceholder.typicode.com/posts?_limit=5', 1),
          createRequest('https://jsonplaceholder.typicode.com/comments?_limit=5', 2)
        ])
        
        // 计算总耗时
        this.totalTime = Date.now() - startTime
        
        // 计算节省的时间（相比串行）
        const serialTime = this.requests.reduce((sum, req) => sum + req.time, 0)
        this.savedTime = serialTime - this.totalTime
        
        console.log('并发请求完成:', { users, posts, comments })
        
      } catch (error) {
        console.error('请求失败:', error)
        
        // 找到失败的请求
        this.requests.forEach(req => {
          if (req.status === 'loading') {
            req.status = 'error'
            req.message = '❌ 请求失败'
          }
        })
        
      } finally {
        this.loading = false
      }
    }
  }
})
