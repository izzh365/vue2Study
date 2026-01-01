/**
 * v-on 事件绑定基础示例
 *
 * v-on 指令用于监听 DOM 事件
 * - 完整语法：v-on:事件名="表达式"
 * - 简写语法：@事件名="表达式"
 *
 * 这是 Vue 中最常用的指令之一
 */

new Vue({
  el: '#app',

  data() {
    return {
      // 计数器
      count: 0,

      // 消息显示
      message: '点击按钮试试',

      // 事件日志
      logs: []
    }
  },

  methods: {
    /**
     * 打招呼方法
     * 演示最基础的方法调用
     */
    sayHello() {
      this.message = '你好！我是 Vue！'
    },

    /**
     * 显示当前时间
     * 在方法中可以执行任何 JavaScript 逻辑
     */
    showTime() {
      const now = new Date()
      this.message = `现在时间：${now.toLocaleTimeString()}`
    },

    /**
     * 生成随机数
     */
    randomNumber() {
      const num = Math.floor(Math.random() * 100) + 1
      this.message = `随机数字：${num}`
    },

    /**
     * 添加事件日志
     * @param {string} eventType - 事件类型
     */
    addLog(eventType) {
      const time = new Date().toLocaleTimeString()
      this.logs.unshift(`[${time}] ${eventType}`)

      // 最多保留 10 条日志
      if (this.logs.length > 10) {
        this.logs.pop()
      }
    }
  }
})
