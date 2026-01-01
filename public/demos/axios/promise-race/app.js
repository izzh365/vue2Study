/**
 * Promise.race 竞速请求演示
 * 
 * 特点：
 * - 返回最先完成的请求结果
 * - 其他请求会被忽略（但仍在后台执行）
 * - 如果最先完成的是失败，则整体失败
 * 
 * 适用场景：
 * - 超时控制（race 请求和超时 Promise）
 * - 多服务器选择最快的
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      winner: null,
      racers: [
        { name: '服务器 A (快)', icon: '🚀', status: '准备中', running: false, winner: false },
        { name: '服务器 B (中)', icon: '🚗', status: '准备中', running: false, winner: false },
        { name: '服务器 C (慢)', icon: '🐢', status: '准备中', running: false, winner: false }
      ]
    }
  },
  
  methods: {
    /**
     * 开始竞速请求
     */
    async startRace() {
      this.loading = true
      this.winner = null
      
      // 重置状态
      this.racers.forEach(r => {
        r.status = '请求中...'
        r.running = true
        r.winner = false
      })
      
      const startTime = Date.now()
      
      try {
        // 创建不同延迟的请求
        const createRequest = async (delayMs, index) => {
          // 使用 httpbin 的延迟 API
          const response = await axios.get(`https://httpbin.org/delay/${delayMs / 1000}`)
          return { index, time: Date.now() - startTime, data: response.data }
        }
        
        // Promise.race 只返回最快的
        const result = await Promise.race([
          createRequest(500, 0),   // 快
          createRequest(1500, 1),  // 中
          createRequest(3000, 2)   // 慢
        ])
        
        // 标记获胜者
        this.racers[result.index].winner = true
        this.racers[result.index].status = `✅ 获胜 (${result.time}ms)`
        this.racers[result.index].running = false
        
        // 其他标记为"被忽略"
        this.racers.forEach((r, i) => {
          if (i !== result.index) {
            r.status = '被忽略（仍在后台运行）'
            r.running = false
          }
        })
        
        this.winner = {
          name: this.racers[result.index].name,
          time: result.time
        }
        
        console.log('Race 获胜者:', result)
        
      } catch (error) {
        console.error('请求失败:', error)
        this.racers.forEach(r => {
          r.status = '❌ 失败'
          r.running = false
        })
        
      } finally {
        this.loading = false
      }
    }
  }
})
