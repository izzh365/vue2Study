/**
 * Promise.allSettled 容错处理演示
 * 
 * 特点：
 * - 等待所有请求完成（无论成功失败）
 * - 返回每个请求的结果和状态
 * - 一个失败不影响其他请求
 * - 结果格式: { status: 'fulfilled' | 'rejected', value | reason }
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      results: []
    }
  },
  
  methods: {
    /**
     * 使用 Promise.allSettled 并发请求
     * 故意让一个请求失败，展示容错能力
     */
    async fetchAllSettled() {
      this.loading = true
      this.results = []
      
      try {
        // 三个请求，其中一个会失败
        const promises = [
          axios.get('https://jsonplaceholder.typicode.com/users/1'),
          axios.get('https://httpstat.us/404'),  // 故意失败
          axios.get('https://jsonplaceholder.typicode.com/posts/1')
        ]
        
        const names = ['获取用户', '获取订单（404）', '获取文章']
        
        // Promise.allSettled 等待所有完成
        const settledResults = await Promise.allSettled(promises)
        
        console.log('allSettled 结果:', settledResults)
        
        // 处理每个结果
        this.results = settledResults.map((result, index) => {
          if (result.status === 'fulfilled') {
            // 成功的请求
            return {
              name: names[index],
              status: 'fulfilled',
              preview: JSON.stringify(result.value.data, null, 2).substring(0, 150) + '...'
            }
          } else {
            // 失败的请求
            return {
              name: names[index],
              status: 'rejected',
              reason: result.reason.message
            }
          }
        })
        
        // 统计成功和失败
        const fulfilled = this.results.filter(r => r.status === 'fulfilled').length
        const rejected = this.results.filter(r => r.status === 'rejected').length
        console.log(`完成: ${fulfilled} 成功, ${rejected} 失败`)
        
      } catch (error) {
        // allSettled 不会进入 catch（除非语法错误）
        console.error('意外错误:', error)
        
      } finally {
        this.loading = false
      }
    }
  }
})
