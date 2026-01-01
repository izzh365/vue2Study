/**
 * Axios 响应结构解析
 * 
 * 响应对象包含以下属性：
 * - data: 服务器返回的数据（最常用）
 * - status: HTTP 状态码
 * - statusText: 状态文本描述
 * - headers: 响应头对象
 * - config: 请求配置对象
 * - request: 原始 XMLHttpRequest 对象
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      parts: []
    }
  },
  
  methods: {
    async fetchData() {
      this.loading = true
      this.parts = []
      
      try {
        // 发送请求，获取完整响应对象
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
        
        console.log('完整响应对象:', response)
        
        // 解析响应的各个部分
        this.parts = [
          {
            name: 'response.data',
            type: typeof response.data,
            desc: '🎯 服务器返回的数据（最常用！）',
            value: JSON.stringify(response.data, null, 2),
            important: true
          },
          {
            name: 'response.status',
            type: 'number',
            desc: `HTTP 状态码`,
            value: response.status.toString(),
            important: true
          },
          {
            name: 'response.statusText',
            type: 'string',
            desc: `状态文本描述`,
            value: response.statusText || '(空)'
          },
          {
            name: 'response.headers',
            type: 'object',
            desc: '响应头信息',
            value: JSON.stringify({
              'content-type': response.headers['content-type'],
              'cache-control': response.headers['cache-control']
            }, null, 2)
          },
          {
            name: 'response.config',
            type: 'object',
            desc: '请求配置信息',
            value: JSON.stringify({
              method: response.config.method,
              url: response.config.url,
              timeout: response.config.timeout
            }, null, 2)
          },
          {
            name: 'response.request',
            type: 'XMLHttpRequest',
            desc: '原始请求对象（浏览器环境）',
            value: null
          }
        ]
        
      } catch (error) {
        console.error('请求失败:', error)
        this.parts = [{
          name: 'error',
          type: 'Error',
          desc: '请求失败',
          value: error.message,
          important: false
        }]
        
      } finally {
        this.loading = false
      }
    }
  }
})
