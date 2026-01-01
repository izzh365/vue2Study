/**
 * 更新周期演示
 *
 * 更新周期触发条件：
 * 1. data 中的响应式数据发生变化
 * 2. 父组件传入的 props 发生变化
 * 3. 强制更新 $forceUpdate()
 *
 * 执行顺序：
 * 数据变化 → beforeUpdate → 虚拟DOM重新渲染 → updated
 */

new Vue({
  el: '#app',

  data() {
    return {
      // 计数器
      count: 0,

      // 更新计数
      updateCount: 0,

      // 当前步骤
      currentStep: '',

      // 步骤完成状态
      stepsDone: {
        before: false,
        render: false,
        after: false
      },

      // beforeUpdate 时的 DOM 值
      beforeUpdateValue: '-',

      // updated 后的 DOM 值
      afterUpdateValue: '-',

      // 日志
      logs: []
    }
  },

  /**
   * beforeUpdate
   *
   * 时机：数据更新时，DOM 重新渲染之前
   *
   * 特点：
   * 1. 可以访问更新前的 DOM
   * 2. 可以在这里获取更新前的状态
   * 3. 不要在这里修改 data（可能导致无限循环）
   */
  beforeUpdate() {
    this.currentStep = 'before'
    this.stepsDone.before = true

    // 获取更新前的 DOM 值
    const displayEl = this.$refs.countDisplay
    if (displayEl) {
      this.beforeUpdateValue = displayEl.textContent
    }

    this.addLog(`[beforeUpdate] 数据已变化，DOM显示: ${this.beforeUpdateValue}`)

    // 模拟渲染过程
    setTimeout(() => {
      this.currentStep = 'render'
      this.stepsDone.render = true
    }, 50)
  },

  /**
   * updated
   *
   * 时机：DOM 重新渲染并应用更新后
   *
   * 注意事项：
   * 1. 不要在这里修改响应式数据！会导致无限循环
   * 2. 如需操作更新后的 DOM，这是正确的时机
   * 3. 如需监听特定数据变化，建议用 watch
   */
  updated() {
    this.currentStep = 'after'
    this.stepsDone.after = true

    // 获取更新后的 DOM 值
    const displayEl = this.$refs.countDisplay
    if (displayEl) {
      // 直接读取，不要赋值给 data（会触发循环）
      const newValue = displayEl.textContent

      // 使用 $nextTick 确保在本次更新完成后再更新日志
      this.$nextTick(() => {
        this.afterUpdateValue = newValue
        this.updateCount++
        this.addLog(`[updated] DOM已更新，显示: ${newValue}`)

        // 重置步骤状态
        setTimeout(() => {
          this.currentStep = ''
        }, 500)
      })
    }
  },

  methods: {
    /**
     * 添加日志
     */
    addLog(msg) {
      const time = new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      this.logs.unshift(`[${time}] ${msg}`)

      // 限制日志数量
      if (this.logs.length > 10) {
        this.logs.pop()
      }
    }
  }
})
