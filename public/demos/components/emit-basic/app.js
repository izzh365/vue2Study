/**
 * $emit 基本用法示例
 *
 * 知识点：
 * 1. $emit 用于子组件向父组件通信
 * 2. 语法：this.$emit('事件名', 数据)
 * 3. 父组件用 @事件名="处理函数" 监听
 * 4. 事件名建议使用 kebab-case（短横线命名）
 */

// ==================== 子组件按钮 ====================
Vue.component('child-button', {
  data() {
    return {
      messages: [
        '你好，父组件！👋',
        '我是子组件发来的消息 📨',
        '今天天气真好 ☀️',
        '学习 Vue 很开心 🎉'
      ]
    }
  },

  methods: {
    /**
     * 发送消息给父组件
     * 使用 $emit 触发自定义事件
     */
    sendMessage() {
      // 随机选择一条消息
      const randomIndex = Math.floor(Math.random() * this.messages.length)
      const message = this.messages[randomIndex]

      // 触发 notify 事件，传递消息数据
      this.$emit('notify', message)

      console.log('[子组件] 触发 notify 事件，数据：', message)
    }
  },

  template: `
    <div style="text-align: center;">
      <button class="btn primary" @click="sendMessage">
        📤 发送消息给父组件
      </button>
      <p style="color: #86868B; font-size: 13px; margin-top: 12px;">
        点击触发 $emit('notify', message)
      </p>
    </div>
  `
})

// ==================== 动作面板组件 ====================
Vue.component('action-panel', {
  data() {
    return {
      itemId: 1001
    }
  },

  methods: {
    // 触发保存事件
    save() {
      this.$emit('action-save', {
        id: this.itemId,
        action: 'save',
        timestamp: Date.now()
      })
    },

    // 触发删除事件
    remove() {
      this.$emit('action-delete', {
        id: this.itemId,
        action: 'delete',
        timestamp: Date.now()
      })
    },

    // 触发发布事件
    publish() {
      this.$emit('action-publish', {
        id: this.itemId,
        action: 'publish',
        timestamp: Date.now()
      })
    }
  },

  template: `
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px;">
      <p style="color: #86868B; margin-bottom: 16px; text-align: center;">
        子组件可以触发多种不同的事件
      </p>
      <div class="button-group" style="justify-content: center;">
        <button class="btn success" @click="save">
          💾 保存
        </button>
        <button class="btn warning" @click="remove">
          🗑️ 删除
        </button>
        <button class="btn primary" @click="publish">
          🚀 发布
        </button>
      </div>
    </div>
  `
})

// ==================== Vue 实例（父组件） ====================
new Vue({
  el: '#app',

  data() {
    return {
      parentMessage: '',
      eventLogs: []
    }
  },

  methods: {
    /**
     * 处理子组件的 notify 事件
     * @param {string} message - 子组件传递的消息
     */
    handleNotify(message) {
      this.parentMessage = message
      console.log('[父组件] 收到 notify 事件，消息：', message)
    },

    /**
     * 处理各种动作事件
     * @param {string} actionName - 动作名称
     * @param {object} data - 事件数据
     */
    handleAction(actionName, data) {
      const time = new Date().toLocaleTimeString()
      
      this.eventLogs.unshift({
        time: time,
        event: `action-${data.action}`,
        data: JSON.stringify(data)
      })

      // 只保留最近 10 条日志
      if (this.eventLogs.length > 10) {
        this.eventLogs.pop()
      }

      console.log(`[父组件] 收到 ${actionName} 事件：`, data)
    }
  },

  created() {
    console.log('=== $emit 基本用法 ===')
    console.log('')
    console.log('📤 $emit 的作用：')
    console.log('  子组件向父组件发送消息/事件')
    console.log('')
    console.log('📋 使用方式：')
    console.log('  子组件：this.$emit(\'event-name\', data)')
    console.log('  父组件：@event-name="handler"')
  }
})
