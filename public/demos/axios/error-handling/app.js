/**
 * Axios 错误捕获与分类
 *
 * 错误类型：
 * 1. 网络错误 (error.request 存在, error.response 不存在)
 * 2. 超时错误 (error.code === 'ECONNABORTED')
 * 3. HTTP 错误 (error.response 存在，状态码非 2xx)
 * 4. 请求配置错误 (发送请求前就出错)
 */

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      error: null
    }
  },

  methods: {
    /**
     * 触发网络错误
     * 访问不存在的域名
     */
    async triggerNetworkError() {
      this.loading = true
      this.error = null

      try {
        // 访问不存在的域名会触发网络错误
        await axios.get('https://this-domain-does-not-exist-12345.com/api')
      } catch (err) {
        this.error = this.classifyError(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 触发超时错误
     * 设置极短的超时时间
     */
    async triggerTimeoutError() {
      this.loading = true
      this.error = null

      try {
        // 1ms 的超时几乎必定触发超时错误
        await axios.get('https://jsonplaceholder.typicode.com/posts', {
          timeout: 1
        })
      } catch (err) {
        this.error = this.classifyError(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 触发 HTTP 错误
     * 请求返回 4xx/5xx 状态码
     */
    async triggerHttpError() {
      this.loading = true
      this.error = null

      try {
        // 请求 404 资源
        await axios.get('https://httpstat.us/404')
      } catch (err) {
        this.error = this.classifyError(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 正常请求（对照组）
     */
    async triggerSuccess() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')

        this.error = {
          type: '请求成功',
          message: '✅ 请求正常完成，无错误发生',
          detail: JSON.stringify(
            {
              status: response.status,
              dataPreview: response.data.title
            },
            null,
            2
          ),
          success: true
        }
      } catch (err) {
        this.error = this.classifyError(err)
      } finally {
        this.loading = false
      }
    },

    /**
     * 错误分类函数
     * 根据错误对象的属性判断错误类型
     */
    classifyError(error) {
      console.log('捕获到错误:', error)

      // 1. HTTP 错误（有响应）
      if (error.response) {
        return {
          type: 'HTTP 错误',
          message: `❌ 服务器返回错误状态码: ${error.response.status}`,
          detail: JSON.stringify(
            {
              status: error.response.status,
              statusText: error.response.statusText,
              url: error.config.url,
              判断条件: 'error.response 存在'
            },
            null,
            2
          ),
          success: false
        }
      }

      // 2. 超时错误
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        return {
          type: '超时错误',
          message: '⏱️ 请求超时，服务器响应太慢',
          detail: JSON.stringify(
            {
              code: error.code,
              timeout: error.config.timeout + 'ms',
              判断条件: "error.code === 'ECONNABORTED'"
            },
            null,
            2
          ),
          success: false
        }
      }

      // 3. 网络错误（请求已发送但无响应）
      if (error.request) {
        return {
          type: '网络错误',
          message: '🌐 网络连接失败，请检查网络',
          detail: JSON.stringify(
            {
              message: error.message,
              判断条件: 'error.request 存在, error.response 不存在'
            },
            null,
            2
          ),
          success: false
        }
      }

      // 4. 其他错误（请求配置错误等）
      return {
        type: '请求配置错误',
        message: '⚙️ 请求配置有误',
        detail: JSON.stringify(
          {
            message: error.message,
            判断条件: '其他情况'
          },
          null,
          2
        ),
        success: false
      }
    }
  }
})
