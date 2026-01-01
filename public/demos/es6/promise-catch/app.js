/**
 * Promise 错误处理演示
 * 
 * 三个重要方法：
 * 1. then(onFulfilled, onRejected) - 成功/失败回调
 * 2. catch(onRejected) - 错误处理（推荐）
 * 3. finally(onFinally) - 无论成功失败都执行
 * 
 * 最佳实践：
 * - 使用 .catch() 统一处理错误
 * - 使用 .finally() 执行清理操作（如关闭 loading）
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
     * 模拟可能失败的请求
     */
    mockRequest(shouldFail, step = '请求') {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error(`${step} 失败：网络错误`))
          } else {
            resolve(`${step} 成功`)
          }
        }, 500)
      })
    },
    
    /**
     * 测试 catch 捕获错误
     */
    testCatch() {
      this.logs = []
      this.addLog('📍 开始执行...', 'step')
      
      this.mockRequest(false, '第一步')
        .then(result => {
          this.addLog(`✓ ${result}`, 'success')
          // 在第二步抛出错误
          return this.mockRequest(true, '第二步')
        })
        .then(result => {
          // 这里不会执行
          this.addLog(`✓ ${result}`, 'success')
          return this.mockRequest(false, '第三步')
        })
        .then(result => {
          // 这里也不会执行
          this.addLog(`✓ ${result}`, 'success')
        })
        .catch(error => {
          // catch 捕获链中任何位置的错误
          this.addLog(`❌ catch 捕获到错误: ${error.message}`, 'error')
          this.addLog('💡 后续的 then 都被跳过了', 'step')
        })
    },
    
    /**
     * 测试正常执行（无错误）
     */
    testSuccess() {
      this.logs = []
      this.addLog('📍 开始执行...', 'step')
      
      this.mockRequest(false, '第一步')
        .then(result => {
          this.addLog(`✓ ${result}`, 'success')
          return this.mockRequest(false, '第二步')
        })
        .then(result => {
          this.addLog(`✓ ${result}`, 'success')
          return this.mockRequest(false, '第三步')
        })
        .then(result => {
          this.addLog(`✓ ${result}`, 'success')
          this.addLog('🎉 全部执行成功！', 'success')
        })
        .catch(error => {
          // 没有错误时不会执行
          this.addLog(`❌ ${error.message}`, 'error')
        })
    },
    
    /**
     * 测试 finally
     * finally 无论成功失败都会执行
     */
    testFinally(success) {
      this.logs = []
      this.addLog('📍 开始执行...', 'step')
      this.addLog('⏳ 显示 loading...', 'step')
      
      this.mockRequest(!success, '数据请求')
        .then(result => {
          this.addLog(`✓ ${result}`, 'success')
        })
        .catch(error => {
          this.addLog(`❌ ${error.message}`, 'error')
        })
        .finally(() => {
          // 无论成功失败都会执行
          this.addLog('🧹 finally: 关闭 loading', 'finally')
          this.addLog('💡 finally 常用于清理操作', 'finally')
        })
    }
  }
})
