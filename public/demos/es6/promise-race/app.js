/**
 * Promise.race 竞速演示
 * 
 * Promise.race(iterable)
 * - 接收一个 Promise 数组
 * - 返回第一个完成的 Promise 结果
 * - 不管是成功还是失败，谁先完成就返回谁
 * 
 * 应用场景：
 * - 请求超时控制
 * - 多个数据源，使用最快响应的
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      racing: false,
      delays: [800, 500, 1200],  // 随机延迟
      progress: [0, 0, 0],
      winner: '',
      timeoutResult: { type: '', message: '' }
    }
  },
  
  methods: {
    /**
     * 随机生成延迟
     */
    randomDelays() {
      this.delays = [
        300 + Math.floor(Math.random() * 700),
        300 + Math.floor(Math.random() * 700),
        300 + Math.floor(Math.random() * 700)
      ]
    },
    
    /**
     * 模拟请求
     */
    mockRequest(name, delay, index) {
      const startTime = Date.now()
      const maxDelay = Math.max(...this.delays)
      
      // 更新进度条的定时器
      const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime
        this.progress[index] = Math.min((elapsed / delay) * 100, 100)
        this.$forceUpdate()
        
        if (elapsed >= delay) {
          clearInterval(progressInterval)
        }
      }, 50)
      
      return new Promise(resolve => {
        setTimeout(() => {
          clearInterval(progressInterval)
          this.progress[index] = 100
          resolve(name)
        }, delay)
      })
    },
    
    /**
     * 开始赛跑
     */
    async startRace() {
      this.racing = true
      this.winner = ''
      this.progress = [0, 0, 0]
      this.randomDelays()
      
      try {
        // Promise.race 返回第一个完成的结果
        const winner = await Promise.race([
          this.mockRequest('🚗 请求A', this.delays[0], 0),
          this.mockRequest('🚙 请求B', this.delays[1], 1),
          this.mockRequest('🚕 请求C', this.delays[2], 2)
        ])
        
        this.winner = winner
      } catch (error) {
        console.error(error)
      }
      
      // 等待其他请求完成动画
      await new Promise(resolve => setTimeout(resolve, Math.max(...this.delays) + 100))
      this.racing = false
    },
    
    /**
     * 超时控制示例
     */
    async testTimeout(shouldTimeout) {
      this.timeoutResult = { type: '', message: '请求中...' }
      
      // 创建超时 Promise
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('请求超时（超过 1000ms）'))
        }, 1000)
      })
      
      // 创建请求 Promise
      const requestPromise = new Promise(resolve => {
        const delay = shouldTimeout ? 2000 : 500
        setTimeout(() => {
          resolve('请求成功！数据已返回')
        }, delay)
      })
      
      try {
        // 谁先完成就用谁的结果
        const result = await Promise.race([requestPromise, timeoutPromise])
        this.timeoutResult = { type: 'success', message: '✅ ' + result }
      } catch (error) {
        this.timeoutResult = { type: 'error', message: '❌ ' + error.message }
      }
    }
  }
})
