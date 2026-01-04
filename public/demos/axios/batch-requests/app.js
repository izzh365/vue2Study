/**
 * 批量请求限流演示
 *
 * 问题：同时发送大量请求会导致：
 * 1. 服务器压力过大，可能返回 429 Too Many Requests
 * 2. 浏览器并发限制，请求排队
 * 3. 内存占用过高，页面卡顿
 *
 * 解决方案：分批执行，控制并发数
 */

new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      totalRequests: 10, // 总请求数
      batchSize: 3, // 每批并发数
      batches: [], // 批次列表
      completed: 0, // 已完成数
      totalTime: null // 总耗时
    }
  },

  computed: {
    /**
     * 计算进度百分比
     */
    progress() {
      return Math.round((this.completed / this.totalRequests) * 100)
    }
  },

  methods: {
    /**
     * 开始批量请求
     */
    async startBatchRequests() {
      this.loading = true
      this.completed = 0
      this.totalTime = null
      this.batches = []

      const startTime = Date.now()

      // 将请求分批
      const ids = Array.from({ length: this.totalRequests }, (_, i) => i + 1)
      const batchCount = Math.ceil(this.totalRequests / this.batchSize)

      for (let i = 0; i < batchCount; i++) {
        const start = i * this.batchSize
        const end = Math.min(start + this.batchSize, this.totalRequests)
        this.batches.push({
          start,
          end,
          status: 'pending',
          time: null
        })
      }

      // 逐批执行
      for (let i = 0; i < this.batches.length; i++) {
        const batch = this.batches[i]
        batch.status = 'running'

        const batchStart = Date.now()
        const batchIds = ids.slice(batch.start, batch.end)

        try {
          // 并发执行当前批次的所有请求
          await Promise.all(
            batchIds.map(id => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`))
          )

          // 更新进度
          this.completed += batchIds.length
          batch.time = Date.now() - batchStart
          batch.status = 'done'

          console.log(`批次 ${i + 1} 完成，耗时 ${batch.time}ms`)
        } catch (error) {
          console.error(`批次 ${i + 1} 失败:`, error)
          batch.status = 'done'
          batch.time = Date.now() - batchStart
          this.completed += batchIds.length
        }

        // 可选：批次间添加延迟，进一步降低服务器压力
        if (i < this.batches.length - 1) {
          await this.delay(100)
        }
      }

      this.totalTime = Date.now() - startTime
      this.loading = false
    },

    /**
     * 延迟函数
     */
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
})
