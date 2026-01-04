/**
 * HTTP 状态码处理演示
 *
 * 常见状态码：
 * - 200 OK: 请求成功
 * - 201 Created: 创建成功
 * - 400 Bad Request: 请求参数错误
 * - 401 Unauthorized: 未授权
 * - 403 Forbidden: 禁止访问
 * - 404 Not Found: 资源不存在
 * - 500 Internal Server Error: 服务器内部错误
 */

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
     * 测试 200 OK
     */
    async test200() {
      this.loading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
        this.result = {
          status: response.status,
          statusText: 'OK - 请求成功',
          type: 'success',
          message: '✅ 服务器成功返回请求的数据。这是最常见的成功状态码。'
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 测试 201 Created
     */
    async test201() {
      this.loading = true
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: '新文章',
          body: '文章内容',
          userId: 1
        })
        this.result = {
          status: response.status,
          statusText: 'Created - 创建成功',
          type: 'success',
          message: '✅ 新资源已成功创建。通常在 POST 请求创建数据后返回。'
        }
      } catch (err) {
        this.handleError(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 测试 404 Not Found
     */
    async test404() {
      this.loading = true
      try {
        // 请求不存在的资源
        await axios.get('https://jsonplaceholder.typicode.com/posts/99999')
        // JSONPlaceholder 对不存在的资源返回 {}，不是 404
        // 使用 httpstat.us 模拟
        await axios.get('https://httpstat.us/404')
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.result = {
            status: 404,
            statusText: 'Not Found - 资源不存在',
            type: 'warning',
            message: '⚠️ 请求的资源不存在。检查 URL 是否正确，或资源是否已被删除。'
          }
        } else {
          this.handleError(err)
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * 测试 500 Server Error
     */
    async test500() {
      this.loading = true
      try {
        // 使用 httpstat.us 模拟 500 错误
        await axios.get('https://httpstat.us/500')
      } catch (err) {
        if (err.response && err.response.status === 500) {
          this.result = {
            status: 500,
            statusText: 'Internal Server Error - 服务器错误',
            type: 'error',
            message: '❌ 服务器内部错误。这通常是服务端的问题，请稍后重试或联系管理员。'
          }
        } else {
          this.handleError(err)
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * 通用错误处理
     */
    handleError(err) {
      if (err.response) {
        this.result = {
          status: err.response.status,
          statusText: '请求失败',
          type: 'error',
          message: `错误: ${err.message}`
        }
      } else {
        this.result = {
          status: '---',
          statusText: '网络错误',
          type: 'error',
          message: '无法连接到服务器，请检查网络连接'
        }
      }
    }
  }
})
