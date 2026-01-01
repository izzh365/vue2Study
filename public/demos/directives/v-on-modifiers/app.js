/**
 * 事件修饰符示例
 * 
 * Vue 提供了多种事件修饰符，简化常见的事件处理逻辑：
 * 
 * 事件修饰符：
 * - .stop     阻止事件冒泡
 * - .prevent  阻止默认行为
 * - .capture  使用捕获模式
 * - .self     只当 event.target 是当前元素
 * - .once     只触发一次
 * - .passive  不阻止默认行为（提升滚动性能）
 * 
 * 按键修饰符：
 * - .enter .tab .delete .esc .space
 * - .up .down .left .right
 * - .ctrl .alt .shift .meta
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 事件日志
      logs: [],
      
      // 表单
      formText: '',
      submitted: false,
      
      // 计数器
      normalCount: 0,
      onceCount: 0,
      
      // 按键输入
      keyInput: '',
      submittedKey: ''
    }
  },
  
  methods: {
    /**
     * 添加日志
     * @param {string} msg - 日志消息
     */
    addLog(msg) {
      const time = new Date().toLocaleTimeString()
      this.logs.unshift(`[${time}] ${msg}`)
      
      if (this.logs.length > 10) {
        this.logs.pop()
      }
    },
    
    /**
     * 处理链接点击
     * 使用 .prevent 后，不会跳转到链接地址
     */
    handleLinkClick() {
      alert('链接被点击，但由于 .prevent 修饰符，页面不会跳转！')
    },
    
    /**
     * 处理表单提交
     * 使用 .prevent 后，页面不会刷新
     */
    handleSubmit() {
      if (this.formText.trim()) {
        this.submitted = true
        console.log('表单已提交：', this.formText)
        
        // 2秒后重置
        setTimeout(() => {
          this.submitted = false
        }, 2000)
      }
    },
    
    /**
     * 处理回车键
     */
    handleEnter() {
      if (this.keyInput.trim()) {
        this.submittedKey = this.keyInput
        this.keyInput = ''
      }
    }
  }
})
