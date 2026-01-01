/**
 * watch 侦听器基本用法 Demo
 * 
 * 【通俗比喻】
 * watch 就像一个专注的保安：
 * - 盯着特定的"门"（某个数据）
 * - 一旦有人进出（数据变化），立即行动
 * - 可以记录"谁走了（旧值）"和"谁来了（新值）"
 * 
 * 【watch vs computed】
 * - computed：我要一个计算结果（同步的、声明式的）
 * - watch：数据变了我要做点什么（可异步、命令式的）
 * 
 * 【适用场景】
 * 1. 数据变化时发起 API 请求
 * 2. 数据变化时执行耗时操作
 * 3. 需要获取新旧值对比
 * 4. 需要执行副作用（如修改 DOM、打日志）
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 被侦听的数据
      question: '',
      // 日志记录
      logs: []
    }
  },
  
  /**
   * watch 选项
   * 监听 data 中数据的变化
   */
  watch: {
    /**
     * 侦听 question 的变化
     * 
     * 函数名必须与要侦听的数据属性名一致
     * 
     * @param {string} newValue - 变化后的新值
     * @param {string} oldValue - 变化前的旧值
     */
    question(newValue, oldValue) {
      // 记录日志
      this.addLog(`question 从 "${oldValue}" 变为 "${newValue}"`)
      
      // 如果以问号结尾，模拟异步"思考"后回答
      if (newValue.includes('?')) {
        this.addLog('🤔 检测到问题，正在思考...')
        
        // 模拟异步操作
        setTimeout(() => {
          this.addLog('💡 回答：是的，Vue 很好学！')
        }, 1000)
      }
    }
  },
  
  methods: {
    /**
     * 添加带时间戳的日志
     * @param {string} message - 日志内容
     */
    addLog(message) {
      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', { hour12: false })
      
      this.logs.unshift({
        time,
        message
      })
      
      // 保留最近 20 条
      if (this.logs.length > 20) {
        this.logs.pop()
      }
    }
  }
})

/**
 * 【watch 的两种写法】
 * 
 * 写法一：函数式（简写）
 * watch: {
 *   question(newVal, oldVal) {
 *     // ...
 *   }
 * }
 * 
 * 写法二：对象式（完整）
 * watch: {
 *   question: {
 *     handler(newVal, oldVal) {
 *       // ...
 *     },
 *     immediate: true,  // 立即执行
 *     deep: true        // 深度监听
 *   }
 * }
 * 
 * 【注意事项】
 * 1. 不要在 watch 中无限修改被侦听的数据，会造成死循环
 * 2. watch 的回调函数中可以使用异步操作
 * 3. 可以同时侦听多个属性，每个属性单独配置
 */
