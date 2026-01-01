/**
 * Promise.all 并发请求演示
 *
 * Promise.all(iterable)
 * - 接收一个 Promise 数组（或可迭代对象）
 * - 返回一个新的 Promise
 * - 所有 Promise 都成功时，返回结果数组
 * - 任意一个失败时，立即返回失败
 *
 * 应用场景：
 * - 同时请求多个接口，等待全部完成
 * - 页面初始化时加载多个数据源
 */
new Vue({
  el: '#app',

  data() {
    return {
      loading: false,
      tasks: {
        user: { status: '', icon: '👤', time: '延迟 800ms' },
        orders: { status: '', icon: '📦', time: '延迟 1200ms' },
        products: { status: '', icon: '🛍️', time: '延迟 600ms' }
      },
      result: '',
      resultType: '',
      totalTime: 0,
      serialTime: 0
    }
  },

  methods: {
    /**
     * 模拟 API 请求
     */
    mockApi(name, data, delay, shouldFail = false) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error(`${name} 请求失败`))
          } else {
            resolve(data)
          }
        }, delay)
      })
    },

    /**
     * 重置状态
     */
    resetTasks() {
      this.tasks.user = { status: '', icon: '👤', time: '延迟 800ms' }
      this.tasks.orders = { status: '', icon: '📦', time: '延迟 1200ms' }
      this.tasks.products = { status: '', icon: '🛍️', time: '延迟 600ms' }
      this.result = ''
      this.resultType = ''
      this.totalTime = 0
    },

    /**
     * 全部成功的示例
     */
    async runAllSuccess() {
      this.resetTasks()
      this.loading = true

      // 标记为进行中
      this.tasks.user.status = 'pending'
      this.tasks.orders.status = 'pending'
      this.tasks.products.status = 'pending'

      const startTime = Date.now()

      try {
        // Promise.all 并行执行多个请求
        const results = await Promise.all([
          this.mockApi('user', { id: 1, name: '张三' }, 800).then(data => {
            this.tasks.user.status = 'success'
            this.tasks.user.icon = '✅'
            return data
          }),
          this.mockApi('orders', [{ id: 101 }, { id: 102 }], 1200).then(data => {
            this.tasks.orders.status = 'success'
            this.tasks.orders.icon = '✅'
            return data
          }),
          this.mockApi('products', [{ name: 'iPhone' }], 600).then(data => {
            this.tasks.products.status = 'success'
            this.tasks.products.icon = '✅'
            return data
          })
        ])

        this.totalTime = Date.now() - startTime
        this.serialTime = 800 + 1200 + 600 // 串行需要的时间

        this.resultType = 'success'
        this.result = JSON.stringify(
          {
            user: results[0],
            orders: results[1],
            products: results[2]
          },
          null,
          2
        )
      } catch (error) {
        this.resultType = 'error'
        this.result = error.message
      }

      this.loading = false
    },

    /**
     * 有一个失败的示例
     */
    async runOneFail() {
      this.resetTasks()
      this.loading = true

      this.tasks.user.status = 'pending'
      this.tasks.orders.status = 'pending'
      this.tasks.products.status = 'pending'

      try {
        await Promise.all([
          this.mockApi('user', { id: 1 }, 800).then(data => {
            this.tasks.user.status = 'success'
            this.tasks.user.icon = '✅'
            return data
          }),
          // 这个会失败
          this.mockApi('orders', null, 500, true).catch(err => {
            this.tasks.orders.status = 'error'
            this.tasks.orders.icon = '❌'
            throw err // 继续抛出
          }),
          this.mockApi('products', [{ name: 'iPhone' }], 600).then(data => {
            this.tasks.products.status = 'success'
            this.tasks.products.icon = '✅'
            return data
          })
        ])
      } catch (error) {
        this.resultType = 'error'
        this.result = `Promise.all 失败！\n原因：${error.message}\n\n⚠️ 注意：只要有一个失败，整个 Promise.all 就会失败`
      }

      this.loading = false
    }
  }
})
