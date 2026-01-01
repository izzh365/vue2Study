/**
 * 销毁时清理资源
 *
 * beforeDestroy 钩子的重要性：
 * - 组件销毁前最后的清理机会
 * - 防止内存泄漏
 * - 确保资源正确释放
 *
 * 必须清理的资源：
 * 1. 定时器（setInterval、setTimeout）
 * 2. 事件监听（addEventListener）
 * 3. 第三方库实例（ECharts、编辑器等）
 * 4. WebSocket 连接
 * 5. 订阅（Vuex、EventBus 等）
 */

// 定时器子组件
Vue.component('timer-component', {
  template: `
    <div class="card">
      <div class="card-title">
        <span>⏰</span>
        <span>定时器组件</span>
      </div>
      
      <div class="timer-status">
        <span class="status-dot" :class="{ active: isRunning, inactive: !isRunning }"></span>
        <span>{{ isRunning ? '运行中' : '已停止' }}</span>
      </div>
      
      <div class="timer-display">{{ formattedTime }}</div>
      
      <div style="text-align: center;">
        <button class="btn btn-primary" @click="toggleTimer">
          {{ isRunning ? '⏸️ 暂停' : '▶️ 继续' }}
        </button>
      </div>
    </div>
  `,

  data() {
    return {
      // 计时器值
      seconds: 0,

      // 定时器 ID
      timerId: null,

      // 是否运行中
      isRunning: false,

      // 模拟的资源
      resizeHandler: null
    }
  },

  computed: {
    /**
     * 格式化时间显示
     */
    formattedTime() {
      const mins = Math.floor(this.seconds / 60)
      const secs = this.seconds % 60
      return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }
  },

  /**
   * created - 初始化数据
   */
  created() {
    this.$emit('log', { type: 'info', msg: '[created] 定时器组件创建' })
  },

  /**
   * mounted - 启动定时器和事件监听
   */
  mounted() {
    this.$emit('log', { type: 'info', msg: '[mounted] 开始初始化资源...' })

    // 启动定时器
    this.startTimer()

    // 添加事件监听
    this.resizeHandler = () => {
      console.log('窗口大小变化')
    }
    window.addEventListener('resize', this.resizeHandler)
    this.$emit('log', { type: 'success', msg: '[mounted] ✓ 已添加 resize 事件监听' })
  },

  /**
   * beforeDestroy - 清理所有资源
   * 这是最关键的钩子！
   */
  beforeDestroy() {
    this.$emit('log', { type: 'warn', msg: '[beforeDestroy] 开始清理资源...' })

    // 1. 清除定时器
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
      this.$emit('log', { type: 'success', msg: '[beforeDestroy] ✓ 已清除定时器' })
    }

    // 2. 移除事件监听
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
      this.resizeHandler = null
      this.$emit('log', { type: 'success', msg: '[beforeDestroy] ✓ 已移除事件监听' })
    }

    // 3. 模拟清理其他资源
    this.$emit('log', { type: 'success', msg: '[beforeDestroy] ✓ 已关闭 WebSocket 连接' })
    this.$emit('log', { type: 'success', msg: '[beforeDestroy] ✓ 已销毁第三方库实例' })
  },

  /**
   * destroyed - 组件已销毁
   */
  destroyed() {
    // 注意：这里的 $emit 可能不会触发
    console.log('[destroyed] 组件已完全销毁')
  },

  methods: {
    /**
     * 启动定时器
     */
    startTimer() {
      if (this.timerId) return

      this.timerId = setInterval(() => {
        this.seconds++
      }, 1000)

      this.isRunning = true
      this.$emit('log', { type: 'success', msg: '[timer] ✓ 定时器已启动' })
    },

    /**
     * 停止定时器
     */
    stopTimer() {
      if (this.timerId) {
        clearInterval(this.timerId)
        this.timerId = null
      }
      this.isRunning = false
      this.$emit('log', { type: 'info', msg: '[timer] 定时器已暂停' })
    },

    /**
     * 切换定时器状态
     */
    toggleTimer() {
      if (this.isRunning) {
        this.stopTimer()
      } else {
        this.startTimer()
      }
    }
  }
})

// 主 Vue 实例
new Vue({
  el: '#app',

  data() {
    return {
      // 是否显示定时器组件
      showTimer: false,

      // 是否有泄漏的定时器
      hasLeakedTimer: false,

      // 清理状态
      cleanupStatus: {
        timer: '⏳',
        event: '⏳',
        socket: '⏳',
        library: '⏳'
      },

      // 日志
      logs: []
    }
  },

  methods: {
    /**
     * 创建定时器组件
     */
    createTimer() {
      this.showTimer = true
      this.hasLeakedTimer = false
      this.resetCleanupStatus()
      this.addLog({ type: 'info', msg: '🆕 创建定时器组件' })
    },

    /**
     * 销毁定时器组件
     */
    destroyTimer() {
      this.addLog({ type: 'warn', msg: '💥 销毁定时器组件...' })
      this.showTimer = false

      // 更新清理状态
      setTimeout(() => {
        this.cleanupStatus = {
          timer: '✅',
          event: '✅',
          socket: '✅',
          library: '✅'
        }
        this.addLog({ type: 'success', msg: '✅ 所有资源已清理完毕' })
      }, 100)
    },

    /**
     * 重置清理状态
     */
    resetCleanupStatus() {
      this.cleanupStatus = {
        timer: '⏳',
        event: '⏳',
        socket: '⏳',
        library: '⏳'
      }
    },

    /**
     * 添加日志
     */
    addLog(log) {
      const time = new Date().toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      this.logs.unshift({ time, ...log })

      if (this.logs.length > 20) {
        this.logs.pop()
      }
    },

    /**
     * 清空日志
     */
    clearLogs() {
      this.logs = []
    }
  }
})
