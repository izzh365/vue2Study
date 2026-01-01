/**
 * GET 请求基础演示
 * 
 * 知识点：
 * 1. axios.get(url) 发起 GET 请求
 * 2. 使用 params 传递 URL 参数
 * 3. 响应对象包含 data、status、headers 等
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 用户 ID
      userId: 1,
      // 请求状态
      loading: false,
      // 响应结果
      result: null,
      // 错误信息
      error: null,
      // 状态码
      status: null
    }
  },
  
  computed: {
    /**
     * 格式化结果显示
     */
    formattedResult() {
      return JSON.stringify(this.result, null, 2)
    }
  },
  
  methods: {
    /**
     * 获取单个用户信息
     * 使用公开的 JSONPlaceholder API
     */
    async fetchUser() {
      this.loading = true
      this.error = null
      this.result = null
      
      try {
        // 方式1：直接在 URL 中拼接参数
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/users/${this.userId}`
        )
        
        // 响应对象结构
        console.log('完整响应对象:', response)
        console.log('响应数据:', response.data)
        console.log('状态码:', response.status)
        console.log('响应头:', response.headers)
        
        this.result = response.data
        this.status = response.status
      } catch (err) {
        // 错误处理
        this.error = err.message || '请求失败'
        console.error('请求错误:', err)
      } finally {
        this.loading = false
      }
    },
    
    /**
     * 获取用户的文章列表
     * 演示使用 params 参数
     */
    async fetchPosts() {
      this.loading = true
      this.error = null
      this.result = null
      
      try {
        // 方式2：使用 params 对象传递参数
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              userId: this.userId,
              _limit: 3  // 限制返回条数
            }
          }
        )
        
        // 实际请求 URL: /posts?userId=1&_limit=3
        this.result = response.data
        this.status = response.status
      } catch (err) {
        this.error = err.message || '请求失败'
      } finally {
        this.loading = false
      }
    }
  }
})
