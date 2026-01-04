/**
 * 拦截器执行顺序示例
 *
 * 核心知识点：
 *
 * 【请求拦截器】- 后添加的先执行（类似栈 LIFO）
 * 如果添加顺序是 A → B → C
 * 执行顺序是 C → B → A → 发送请求
 *
 * 【响应拦截器】- 先添加的先执行（类似队列 FIFO）
 * 如果添加顺序是 A → B → C
 * 执行顺序是 收到响应 → A → B → C
 *
 * 原理：
 * Axios 内部使用 Promise 链实现
 * 请求拦截器用 unshift 添加（后进先出）
 * 响应拦截器用 push 添加（先进先出）
 */

// ==================== 创建 Axios 实例 ====================

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000
})

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      timeline: []
    }
  },

  methods: {
    /**
     * 添加时间线记录
     */
    addTimeline(message, type) {
      const time = new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
      })
      this.timeline.push({ time, message, type })
    },

    /**
     * 测试拦截器执行顺序
     */
    async testOrder() {
      this.loading = true
      this.timeline = []

      // 先移除所有已有的拦截器
      api.interceptors.request.handlers = []
      api.interceptors.response.handlers = []

      // ==================== 按顺序添加请求拦截器 ====================

      // 请求拦截器 A（第一个添加）
      api.interceptors.request.use(config => {
        this.addTimeline('📤 请求拦截器 A 执行（第1个添加）', 'request')
        return config
      })

      // 请求拦截器 B（第二个添加）
      api.interceptors.request.use(config => {
        this.addTimeline('📤 请求拦截器 B 执行（第2个添加）', 'request')
        return config
      })

      // 请求拦截器 C（第三个添加）
      api.interceptors.request.use(config => {
        this.addTimeline('📤 请求拦截器 C 执行（第3个添加）', 'request')
        return config
      })

      // ==================== 按顺序添加响应拦截器 ====================

      // 响应拦截器 A（第一个添加）
      api.interceptors.response.use(response => {
        this.addTimeline('📥 响应拦截器 A 执行（第1个添加）', 'response')
        return response
      })

      // 响应拦截器 B（第二个添加）
      api.interceptors.response.use(response => {
        this.addTimeline('📥 响应拦截器 B 执行（第2个添加）', 'response')
        return response
      })

      // 响应拦截器 C（第三个添加）
      api.interceptors.response.use(response => {
        this.addTimeline('📥 响应拦截器 C 执行（第3个添加）', 'response')
        return response
      })

      // ==================== 发送请求 ====================

      try {
        await api.get('/posts/1')
        this.addTimeline('✅ 请求完成，数据已返回', 'response')
      } catch (err) {
        this.addTimeline('❌ 请求失败: ' + err.message, 'response')
      } finally {
        this.loading = false
      }

      // 打印完整的执行顺序说明
      console.log('='.repeat(50))
      console.log('拦截器执行顺序分析：')
      console.log('请求拦截器添加顺序: A → B → C')
      console.log('请求拦截器执行顺序: C → B → A（后添加的先执行）')
      console.log('-'.repeat(50))
      console.log('响应拦截器添加顺序: A → B → C')
      console.log('响应拦截器执行顺序: A → B → C（先添加的先执行）')
      console.log('='.repeat(50))
    }
  }
})
