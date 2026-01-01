/**
 * Promise 在 Vue 中的应用
 * 
 * 常见场景：
 * 1. created/mounted 中获取初始数据
 * 2. methods 中的异步操作
 * 3. watch 中监听变化后请求数据
 * 
 * 最佳实践：
 * 1. 使用 async/await 替代 .then 链
 * 2. 使用 loading 状态控制 UI
 * 3. 使用 try/catch/finally 处理错误和清理
 * 4. 在回调中使用箭头函数保持 this 指向
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 用户列表状态
      loading: false,
      error: null,
      users: [],
      
      // 表单提交状态
      submitting: false,
      submitResult: null
    }
  },
  
  /**
   * created 钩子中获取初始数据
   * 使用 async/await 让代码更清晰
   */
  async created() {
    await this.fetchUsers()
  },
  
  methods: {
    /**
     * 模拟 API 请求
     */
    mockApi(data, delay = 1000, shouldFail = false) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) {
            reject(new Error('网络请求失败'))
          } else {
            resolve(data)
          }
        }, delay)
      })
    },
    
    /**
     * 获取用户列表
     * 演示 async/await + try/catch/finally
     */
    async fetchUsers() {
      // 1. 设置 loading 状态
      this.loading = true
      this.error = null
      
      try {
        // 2. 等待数据返回
        const users = await this.mockApi([
          { id: 1, name: '张三', email: 'zhangsan@example.com', avatar: '👨' },
          { id: 2, name: '李四', email: 'lisi@example.com', avatar: '👩' },
          { id: 3, name: '王五', email: 'wangwu@example.com', avatar: '🧑' }
        ])
        
        // 3. 更新数据
        this.users = users
        
      } catch (err) {
        // 4. 处理错误
        this.error = err.message
        
      } finally {
        // 5. 无论成功失败，都关闭 loading
        this.loading = false
      }
    },
    
    /**
     * 表单提交
     * 演示 methods 中的异步方法
     */
    async handleSubmit() {
      this.submitting = true
      this.submitResult = null
      
      try {
        await this.mockApi({ success: true }, 1500)
        
        this.submitResult = {
          success: true,
          message: '✅ 提交成功！'
        }
        
      } catch (err) {
        this.submitResult = {
          success: false,
          message: '❌ ' + err.message
        }
        
      } finally {
        this.submitting = false
      }
    }
  }
})
