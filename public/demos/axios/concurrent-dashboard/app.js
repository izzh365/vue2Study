/**
 * 仪表盘数据并发加载 - 实战案例
 * 
 * 场景：页面初始化时需要同时加载多个接口数据
 * 方案：使用 Promise.all 并发请求，减少总等待时间
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      loadTime: null,
      stats: {
        users: null,
        posts: null,
        comments: null,
        todos: null
      }
    }
  },
  
  methods: {
    /**
     * 加载仪表盘数据
     * 使用 Promise.all 并发请求 4 个接口
     */
    async loadDashboard() {
      this.loading = true
      this.loadTime = null
      
      // 重置数据
      this.stats = {
        users: null,
        posts: null,
        comments: null,
        todos: null
      }
      
      const startTime = Date.now()
      
      try {
        // 并发请求 4 个接口
        const [users, posts, comments, todos] = await Promise.all([
          axios.get('https://jsonplaceholder.typicode.com/users'),
          axios.get('https://jsonplaceholder.typicode.com/posts'),
          axios.get('https://jsonplaceholder.typicode.com/comments'),
          axios.get('https://jsonplaceholder.typicode.com/todos')
        ])
        
        // 更新统计数据
        this.stats = {
          users: users.data.length,
          posts: posts.data.length,
          comments: comments.data.length,
          todos: todos.data.length
        }
        
        this.loadTime = Date.now() - startTime
        
        console.log('仪表盘数据加载完成:', this.stats)
        
      } catch (error) {
        console.error('加载失败:', error)
        alert('数据加载失败，请重试')
        
      } finally {
        this.loading = false
      }
    }
  },
  
  /**
   * 页面加载时自动获取数据
   */
  mounted() {
    this.loadDashboard()
  }
})
