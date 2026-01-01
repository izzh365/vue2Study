/**
 * Promise 基本用法演示
 * 
 * Promise 三种状态：
 * 1. pending（进行中）：初始状态
 * 2. fulfilled（已成功）：操作成功完成
 * 3. rejected（已失败）：操作失败
 * 
 * 状态特点：
 * - 状态只能从 pending 变为 fulfilled 或 rejected
 * - 状态一旦改变，就不会再变
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      status: 'pending',
      statusText: '等待操作...',
      result: ''
    }
  },
  
  methods: {
    /**
     * 模拟网络请求（返回 Promise）
     * @param {boolean} shouldSucceed - 是否成功
     * @returns {Promise}
     */
    fetchData(shouldSucceed) {
      // 创建一个新的 Promise
      return new Promise((resolve, reject) => {
        // 更新状态为进行中
        this.status = 'pending'
        this.statusText = '⏳ pending（请求中...）'
        this.result = ''
        
        // 模拟网络延迟（1秒）
        setTimeout(() => {
          if (shouldSucceed) {
            // 成功：调用 resolve
            resolve({
              code: 200,
              message: '请求成功',
              data: {
                id: 1,
                name: '张三',
                email: 'zhangsan@example.com'
              }
            })
          } else {
            // 失败：调用 reject
            reject(new Error('网络错误：服务器无响应'))
          }
        }, 1000)
      })
    },
    
    /**
     * 模拟成功的请求
     */
    mockSuccess() {
      // 调用 fetchData 并处理结果
      this.fetchData(true)
        .then(response => {
          // then 接收 resolve 传递的数据
          this.status = 'success'
          this.statusText = '✅ fulfilled（请求成功）'
          this.result = JSON.stringify(response, null, 2)
        })
        .catch(error => {
          // catch 接收 reject 传递的错误
          this.status = 'error'
          this.statusText = '❌ rejected（请求失败）'
          this.result = error.message
        })
    },
    
    /**
     * 模拟失败的请求
     */
    mockFail() {
      this.fetchData(false)
        .then(response => {
          this.status = 'success'
          this.statusText = '✅ fulfilled（请求成功）'
          this.result = JSON.stringify(response, null, 2)
        })
        .catch(error => {
          this.status = 'error'
          this.statusText = '❌ rejected（请求失败）'
          this.result = error.message
        })
    }
  }
})
