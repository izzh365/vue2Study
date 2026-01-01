/**
 * $watch 动态监听与取消 Demo
 * 
 * 【通俗比喻】
 * 就像安保公司的监控系统：
 * - 白天营业时：开启监控（startWatch）
 * - 晚上关店后：关闭监控（unwatch）节省电费
 * - 需要时随时可以重新开启
 * 
 * 【核心概念】
 * Vue 的 $watch 方法：
 * - 可以在运行时动态添加监听
 * - 返回一个取消函数，调用后停止监听
 * - 比 watch 选项更灵活
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 计数器
      count: 0,
      // 是否正在监听
      isWatching: false,
      // 取消监听的函数（保存以便后续调用）
      unwatchFn: null,
      // 日志记录
      logs: []
    }
  },
  
  methods: {
    /**
     * 切换监听状态
     */
    toggleWatch() {
      if (this.isWatching) {
        this.stopWatch()
      } else {
        this.startWatch()
      }
    },
    
    /**
     * 开始监听
     * 使用 $watch 方法动态创建侦听器
     */
    startWatch() {
      // 如果已经在监听，不重复创建
      if (this.isWatching) return
      
      this.addLog('🟢 开始监听 count 变化')
      
      /**
       * this.$watch 方法
       * 
       * 参数1: 要监听的表达式（字符串或函数）
       * 参数2: 回调函数
       * 参数3: 选项对象（可选）
       * 
       * 返回值: 取消监听的函数
       */
      this.unwatchFn = this.$watch(
        // 监听 count 属性
        'count',
        
        // 变化时的回调
        (newVal, oldVal) => {
          const diff = newVal - oldVal
          const arrow = diff > 0 ? '📈' : '📉'
          this.addLog(`${arrow} count: ${oldVal} → ${newVal} (${diff > 0 ? '+' : ''}${diff})`)
        },
        
        // 选项
        {
          // 也可以加 immediate、deep 等选项
          // immediate: true
        }
      )
      
      this.isWatching = true
    },
    
    /**
     * 停止监听
     * 调用之前保存的取消函数
     */
    stopWatch() {
      if (!this.isWatching) return
      
      // 调用取消函数
      if (this.unwatchFn) {
        this.unwatchFn()
        this.unwatchFn = null
      }
      
      this.addLog('🔴 停止监听 count 变化')
      this.isWatching = false
    },
    
    /**
     * 添加日志
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
  },
  
  /**
   * 组件销毁时确保清理
   */
  beforeDestroy() {
    if (this.unwatchFn) {
      this.unwatchFn()
    }
  }
})

/**
 * 【$watch vs watch 选项】
 * 
 * watch 选项（声明式）：
 * - 在组件选项中定义
 * - 组件创建时自动开始监听
 * - 组件销毁时自动停止
 * - 适合：始终需要监听的场景
 * 
 * $watch 方法（命令式）：
 * - 在代码中动态调用
 * - 可以随时开始、随时停止
 * - 需要手动管理生命周期
 * - 适合：条件性监听、临时监听
 * 
 * 【$watch 的高级用法】
 * 
 * 1. 监听表达式（函数）
 *    this.$watch(
 *      // 返回要监听的值
 *      () => this.a + this.b,
 *      (newSum) => {
 *        console.log('a + b =', newSum)
 *      }
 *    )
 * 
 * 2. 监听对象属性路径
 *    this.$watch('user.profile.name', (newName) => {
 *      console.log('用户名变了:', newName)
 *    })
 * 
 * 3. 一次性监听
 *    const unwatch = this.$watch('status', (val) => {
 *      if (val === 'ready') {
 *        this.doSomething()
 *        unwatch()  // 触发一次后自动取消
 *      }
 *    })
 * 
 * 【实际应用场景】
 * 
 * 1. 权限控制
 *    - VIP 用户开启实时监控功能
 *    - 普通用户关闭以节省资源
 * 
 * 2. 条件性监听
 *    - 只在编辑模式下监听表单变化
 *    - 预览模式不需要监听
 * 
 * 3. 临时任务
 *    - 等待某个条件满足后停止监听
 *    - 类似 Promise 的 resolve
 */
