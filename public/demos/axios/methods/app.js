/**
 * HTTP 请求方法对比演示
 *
 * RESTful API 常用方法：
 * - GET: 获取资源（只读）
 * - POST: 创建新资源
 * - PUT: 替换整个资源
 * - PATCH: 部分更新资源
 * - DELETE: 删除资源
 */

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      result: null,
      error: null,
      lastMethod: '',
      lastUrl: ''
    }
  },

  computed: {
    formattedResult() {
      return JSON.stringify(this.result, null, 2)
    }
  },

  methods: {
    /**
     * GET 请求 - 获取资源
     * 用于读取数据，不会修改服务器数据
     */
    async testGet() {
      this.lastMethod = 'GET'
      this.lastUrl = '/posts/1'
      await this.sendRequest(() => axios.get('https://jsonplaceholder.typicode.com/posts/1'))
    },

    /**
     * POST 请求 - 创建资源
     * 用于提交新数据到服务器
     */
    async testPost() {
      this.lastMethod = 'POST'
      this.lastUrl = '/posts'
      await this.sendRequest(() =>
        axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: '新文章',
          body: '这是 POST 请求创建的文章',
          userId: 1
        })
      )
    },

    /**
     * PUT 请求 - 替换资源
     * 用于完全替换某个资源的内容
     */
    async testPut() {
      this.lastMethod = 'PUT'
      this.lastUrl = '/posts/1'
      await this.sendRequest(() =>
        axios.put('https://jsonplaceholder.typicode.com/posts/1', {
          id: 1,
          title: '完全替换的标题',
          body: '完全替换的内容',
          userId: 1
        })
      )
    },

    /**
     * PATCH 请求 - 部分更新
     * 只更新指定的字段，其他保持不变
     */
    async testPatch() {
      this.lastMethod = 'PATCH'
      this.lastUrl = '/posts/1'
      await this.sendRequest(() =>
        axios.patch('https://jsonplaceholder.typicode.com/posts/1', {
          title: '只更新标题' // 只更新 title 字段
        })
      )
    },

    /**
     * DELETE 请求 - 删除资源
     * 用于删除指定的资源
     */
    async testDelete() {
      this.lastMethod = 'DELETE'
      this.lastUrl = '/posts/1'
      await this.sendRequest(() => axios.delete('https://jsonplaceholder.typicode.com/posts/1'))
    },

    /**
     * 统一请求处理
     * @param {Function} requestFn - 请求函数
     */
    async sendRequest(requestFn) {
      this.loading = true
      this.error = null
      this.result = null

      try {
        console.log(`📤 发送 ${this.lastMethod} 请求...`)
        const response = await requestFn()

        this.result = {
          请求方法: this.lastMethod,
          响应状态: response.status,
          响应数据: response.data || '(空响应)'
        }

        console.log('✅ 请求成功:', response)
      } catch (err) {
        console.error('❌ 请求失败:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
