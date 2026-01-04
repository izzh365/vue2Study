/**
 * 创建 Axios 实例演示
 *
 * axios.create() 的优势：
 * 1. 为不同 API 服务创建独立实例
 * 2. 每个实例有独立的配置（baseURL、超时、请求头等）
 * 3. 便于项目模块化管理
 * 4. 拦截器相互独立，互不影响
 */

// ==================== 创建自定义实例 ====================

/**
 * 实例 1：JSONPlaceholder API
 * 用于演示数据的 RESTful API
 */
const jsonApi = axios.create({
  // 基础 URL，请求时会自动拼接
  baseURL: 'https://jsonplaceholder.typicode.com',

  // 超时时间
  timeout: 5000,

  // 默认请求头
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Source': 'json-instance'
  }
})

/**
 * 实例 2：HTTPBin API
 * 用于测试 HTTP 请求的服务
 */
const httpbinApi = axios.create({
  baseURL: 'https://httpbin.org',
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Source': 'httpbin-instance'
  }
})

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
     * 使用 jsonApi 实例请求
     * 注意：只需要写相对路径，baseURL 会自动拼接
     */
    async useJsonApi() {
      this.loading = true

      try {
        // 只需写路径，不需要完整 URL
        // 实际请求：https://jsonplaceholder.typicode.com/posts?_limit=3
        const response = await jsonApi.get('/posts', {
          params: { _limit: 3 }
        })

        this.results.unshift({
          source: '📦 jsonApi 实例',
          time: new Date().toLocaleTimeString(),
          data: JSON.stringify(
            response.data.map(p => ({
              id: p.id,
              title: p.title.substring(0, 30) + '...'
            })),
            null,
            2
          )
        })

        console.log('jsonApi 请求成功:', response.config)
      } catch (err) {
        console.error('请求失败:', err)
        this.results.unshift({
          source: '📦 jsonApi 实例',
          time: new Date().toLocaleTimeString(),
          data: '❌ 请求失败: ' + err.message
        })
      } finally {
        this.loading = false
      }
    },

    /**
     * 使用 httpbinApi 实例请求
     * 这个 API 会返回请求的详细信息
     */
    async useHttpbinApi() {
      this.loading = true

      try {
        // httpbin.org/get 会返回请求信息
        const response = await httpbinApi.get('/get', {
          params: { demo: 'axios-instance' }
        })

        this.results.unshift({
          source: '🌐 httpbinApi 实例',
          time: new Date().toLocaleTimeString(),
          data: JSON.stringify(
            {
              url: response.data.url,
              headers: {
                'Content-Type': response.data.headers['Content-Type'],
                'X-Custom-Source': response.data.headers['X-Custom-Source']
              },
              args: response.data.args
            },
            null,
            2
          )
        })

        console.log('httpbinApi 请求成功:', response.config)
      } catch (err) {
        console.error('请求失败:', err)
        this.results.unshift({
          source: '🌐 httpbinApi 实例',
          time: new Date().toLocaleTimeString(),
          data: '❌ 请求失败: ' + err.message
        })
      } finally {
        this.loading = false
      }
    }
  }
})
