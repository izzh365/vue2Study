/**
 * async/await 语法演示
 *
 * async/await 是 ES2017 引入的语法糖，让异步代码更直观
 *
 * 关键点：
 * 1. async 函数总是返回 Promise
 * 2. await 暂停执行，等待 Promise 完成
 * 3. await 只能在 async 函数内使用
 * 4. 使用 try/catch 处理错误
 */
new Vue({
  el: '#app',

  data() {
    return {
      logs: []
    }
  },

  methods: {
    /**
     * 添加日志
     */
    addLog(message, type = 'step') {
      this.logs.push({ message, type })
    },

    /**
     * 模拟 API 请求
     */
    mockApi(name, data, delay = 800, shouldFail = false) {
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
     * 使用 async/await 的示例
     * 注意：这是一个 async 函数
     */
    async runAsyncAwait() {
      this.logs = []
      this.addLog('🚀 开始执行 async 函数...', 'step')

      try {
        // await 会暂停执行，等待 Promise 完成
        this.addLog('📍 await getUser()...', 'step')
        const user = await this.mockApi('getUser', { id: 1, name: '张三' })
        this.addLog(`✓ 获取用户成功: ${JSON.stringify(user)}`, 'data')

        // 可以直接使用上一步的结果
        this.addLog('📍 await getOrders()...', 'step')
        const orders = await this.mockApi('getOrders', [
          { id: 101, product: '手机' },
          { id: 102, product: '电脑' }
        ])
        this.addLog(`✓ 获取订单成功: ${JSON.stringify(orders)}`, 'data')

        // 继续下一步
        this.addLog('📍 await getDetails()...', 'step')
        const details = await this.mockApi('getDetails', { total: 2, amount: 8999 })
        this.addLog(`✓ 获取详情成功: ${JSON.stringify(details)}`, 'data')

        this.addLog('🎉 全部请求完成！代码像同步一样清晰', 'data')
      } catch (error) {
        // try/catch 捕获错误
        this.addLog(`❌ 错误: ${error.message}`, 'error')
      }
    },

    /**
     * 测试错误处理
     */
    async runWithError() {
      this.logs = []
      this.addLog('🚀 开始执行（会在第二步失败）...', 'step')

      try {
        this.addLog('📍 await 第一步...', 'step')
        const step1 = await this.mockApi('step1', { status: 'ok' }, 500)
        this.addLog(`✓ 第一步成功: ${JSON.stringify(step1)}`, 'data')

        // 这一步会失败
        this.addLog('📍 await 第二步（将失败）...', 'step')
        const step2 = await this.mockApi('step2', null, 500, true)
        this.addLog(`✓ 第二步成功: ${JSON.stringify(step2)}`, 'data')

        // 这里不会执行
        this.addLog('📍 await 第三步...', 'step')
      } catch (error) {
        // 错误被 catch 捕获
        this.addLog(`❌ catch 捕获错误: ${error.message}`, 'error')
        this.addLog('💡 后续代码不会执行，直接跳到 catch', 'step')
      }
    }
  }
})
