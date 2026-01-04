/**
 * Axios 请求配置详解
 *
 * 常用配置项：
 * - url: 请求地址
 * - method: 请求方法
 * - baseURL: 基础 URL，会自动拼接
 * - timeout: 超时时间（毫秒）
 * - headers: 请求头
 * - params: URL 参数（GET）
 * - data: 请求体（POST/PUT/PATCH）
 * - responseType: 响应数据类型
 */

new Vue({
  el: '#app',

  data() {
    return {
      // 请求配置
      config: {
        method: 'get',
        timeout: 5000,
        headerName: 'X-Custom-Header',
        headerValue: 'demo-value'
      },
      loading: false,
      result: null,
      error: null
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
     * 发送带配置的请求
     * 演示如何使用完整配置对象
     */
    async sendRequest() {
      this.loading = true
      this.error = null
      this.result = null

      try {
        // 构建请求配置对象
        const requestConfig = {
          // 请求 URL
          url: 'https://jsonplaceholder.typicode.com/posts/1',

          // 请求方法
          method: this.config.method,

          // 超时时间（毫秒）
          timeout: this.config.timeout,

          // 自定义请求头
          headers: {
            'Content-Type': 'application/json',
            [this.config.headerName]: this.config.headerValue
          }
        }

        // 如果是 POST/PUT，添加请求体
        if (['post', 'put'].includes(this.config.method)) {
          requestConfig.data = {
            title: '配置演示',
            body: '这是请求体数据',
            userId: 1
          }
        }

        console.log('📤 请求配置:', requestConfig)

        // 发送请求
        const response = await axios(requestConfig)

        // 展示配置和响应
        this.result = {
          发送的配置: {
            method: requestConfig.method.toUpperCase(),
            url: requestConfig.url,
            timeout: requestConfig.timeout + 'ms',
            headers: requestConfig.headers
          },
          响应数据: response.data
        }
      } catch (err) {
        console.error('请求失败:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    },

    /**
     * 测试超时配置
     * 使用故意延迟的请求来触发超时
     */
    async testTimeout() {
      this.loading = true
      this.error = null
      this.result = null

      try {
        // 设置极短的超时时间
        const response = await axios({
          url: 'https://jsonplaceholder.typicode.com/posts',
          method: 'get',
          timeout: 1 // 1毫秒，几乎肯定会超时
        })

        this.result = response.data
      } catch (err) {
        // 超时会抛出错误
        if (err.code === 'ECONNABORTED' || err.message.includes('timeout')) {
          this.error = '请求超时！已超过设定的超时时间'
        } else {
          this.error = err.message
        }
        console.log('💡 这是预期的超时错误，用于演示 timeout 配置')
      } finally {
        this.loading = false
      }
    }
  }
})
