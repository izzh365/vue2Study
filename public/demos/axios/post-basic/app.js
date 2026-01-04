/**
 * POST 请求基础演示
 *
 * 知识点：
 * 1. axios.post(url, data) 发起 POST 请求
 * 2. 数据默认以 JSON 格式发送
 * 3. Content-Type 自动设置为 application/json
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 要提交的数据
      postData: {
        title: 'Hello Axios',
        body: '这是使用 Axios 发送的 POST 请求内容'
      },
      // 请求状态
      loading: false,
      // 响应结果
      result: null,
      // 错误信息
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
     * 创建文章
     * 使用 JSONPlaceholder 的 POST 接口
     */
    async createPost() {
      this.loading = true
      this.error = null
      this.result = null

      try {
        // POST 请求 - 第二个参数是请求体数据
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: this.postData.title,
          body: this.postData.body,
          userId: 1
        })

        // 服务器返回创建的资源（包含生成的 id）
        console.log('创建成功:', response.data)
        console.log('状态码:', response.status) // 通常是 201

        this.result = response.data
      } catch (err) {
        this.error = err.message || '请求失败'
        console.error('请求错误:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
