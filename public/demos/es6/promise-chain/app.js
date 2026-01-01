/**
 * Promise 链式调用演示
 *
 * 关键点：
 * 1. then() 方法返回一个新的 Promise
 * 2. then() 中 return 的值会传给下一个 then()
 * 3. 如果 return 一个 Promise，下一个 then() 会等待它完成
 *
 * 流水线处理：
 * Promise → .then(处理1) → .then(处理2) → .then(处理3) → 最终结果
 */
new Vue({
  el: '#app',

  data() {
    return {
      running: false,
      steps: [
        { title: '初始值', desc: 'Promise.resolve(5) 返回初始数字 5', status: '', result: '' },
        { title: '第一个 then()', desc: 'n => n * 2（翻倍）', status: '', result: '' },
        { title: '第二个 then()', desc: 'n => n + 10（加10）', status: '', result: '' },
        { title: '第三个 then()', desc: 'n => `结果是: ${n}`（转字符串）', status: '', result: '' }
      ]
    }
  },

  methods: {
    /**
     * 延迟函数（模拟异步）
     */
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },

    /**
     * 重置步骤状态
     */
    resetSteps() {
      this.steps.forEach(step => {
        step.status = ''
        step.result = ''
      })
    },

    /**
     * 运行链式调用演示
     * 观察每一步的数据如何传递
     */
    async runChain() {
      this.running = true
      this.resetSteps()

      // 使用 Promise 链式调用
      await Promise.resolve(5)
        .then(async n => {
          // 第一步：初始值
          this.steps[0].status = 'active'
          await this.delay(800)
          this.steps[0].result = n
          this.steps[0].status = 'done'

          // 第二步：翻倍
          this.steps[1].status = 'active'
          await this.delay(800)
          const doubled = n * 2
          this.steps[1].result = `${n} × 2 = ${doubled}`
          this.steps[1].status = 'done'

          return doubled // 传给下一个 then
        })
        .then(async n => {
          // 第三步：加10
          this.steps[2].status = 'active'
          await this.delay(800)
          const added = n + 10
          this.steps[2].result = `${n} + 10 = ${added}`
          this.steps[2].status = 'done'

          return added // 传给下一个 then
        })
        .then(async n => {
          // 第四步：转字符串
          this.steps[3].status = 'active'
          await this.delay(800)
          const str = `结果是: ${n}`
          this.steps[3].result = `"${str}"`
          this.steps[3].status = 'done'

          return str
        })

      this.running = false
    }
  }
})
