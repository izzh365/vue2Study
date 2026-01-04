/**
 * 统一响应处理演示
 *
 * 封装好处：
 * 1. 业务代码更简洁
 * 2. 错误处理统一
 * 3. 便于添加全局 loading
 * 4. 便于统一错误提示
 */

// ==================== 封装统一请求工具 ====================

/**
 * 创建带有统一处理的请求实例
 */
const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

/**
 * 响应拦截器 - 统一处理响应
 */
request.interceptors.response.use(
  // 成功响应处理
  response => {
    console.log('✅ 响应拦截器 - 成功')

    // 直接返回 data，省去每次 .data 的操作
    return response.data
  },

  // 错误响应处理
  error => {
    console.log('❌ 响应拦截器 - 错误')

    // 统一错误处理
    let message = '未知错误'

    if (error.response) {
      // HTTP 错误
      const status = error.response.status
      switch (status) {
        case 400:
          message = '请求参数错误'
          break
        case 401:
          message = '未授权，请登录'
          break
        case 403:
          message = '拒绝访问'
          break
        case 404:
          message = '请求的资源不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `服务器错误 (${status})`
      }
    } else if (error.request) {
      message = '网络错误，请检查连接'
    } else {
      message = error.message
    }

    // 可以在这里显示全局错误提示
    console.error('统一错误提示:', message)

    // 返回统一格式的错误
    return Promise.reject({
      success: false,
      message,
      originalError: error
    })
  }
)

// ==================== Vue 实例 ====================

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      results: []
    }
  },

  methods: {
    /**
     * 测试成功请求
     * 使用封装后的 request，直接获取 data
     */
    async testRequest() {
      this.loading = true
      this.results = []

      try {
        // 直接获取 data，不需要 response.data
        const posts = await request.get('/posts', {
          params: { _limit: 3 }
        })

        this.results = [
          { label: '请求状态', value: '✅ 成功' },
          { label: '数据类型', value: Array.isArray(posts) ? 'Array' : typeof posts },
          { label: '数据数量', value: posts.length + ' 条' },
          { label: '第一条标题', value: posts[0].title.substring(0, 30) + '...' }
        ]
      } catch (err) {
        this.results = [
          { label: '请求状态', value: '❌ 失败' },
          { label: '错误信息', value: err.message }
        ]
      } finally {
        this.loading = false
      }
    },

    /**
     * 测试错误处理
     * 故意请求不存在的资源
     */
    async testError() {
      this.loading = true
      this.results = []

      try {
        // 请求不存在的资源
        await request.get('https://httpstat.us/404')
      } catch (err) {
        // 捕获统一格式的错误
        this.results = [
          { label: '请求状态', value: '❌ 失败（预期内）' },
          { label: '统一错误信息', value: err.message },
          { label: '说明', value: '错误已在拦截器中统一处理' }
        ]
      } finally {
        this.loading = false
      }
    }
  }
})
