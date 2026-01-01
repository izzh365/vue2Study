/**
 * Vue 生命周期钩子执行顺序演示
 *
 * 通俗比喻：生命周期就像人的一生
 * - 出生前（beforeCreate）→ 出生（created）
 * - 上学前（beforeMount）→ 上学（mounted）
 * - 工作中更新（beforeUpdate → updated）
 * - 退休前（beforeDestroy）→ 去世（destroyed）
 */

// 子组件：用于演示销毁阶段
Vue.component('lifecycle-child', {
  template: `
    <div style="background: #e8f5e9; padding: 16px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
      <p style="margin: 0; color: #2e7d32;">🧒 我是子组件 - 计数: {{ count }}</p>
      <button @click="count++" style="margin-top: 10px; padding: 6px 16px; border: none; border-radius: 6px; background: #4CAF50; color: white; cursor: pointer;">
        子组件 +1
      </button>
    </div>
  `,

  data() {
    return {
      count: 0
    }
  },

  // ==================== 创建阶段 ====================

  /**
   * beforeCreate - 实例刚创建
   * 此时 data 和 methods 还不可用
   */
  beforeCreate() {
    this.$emit('log', {
      hook: '[子组件 beforeCreate]',
      msg: 'data/methods 不可用'
    })
  },

  /**
   * created - 实例创建完成
   * 可以访问 data 和 methods，常用于发起请求
   */
  created() {
    this.$emit('log', {
      hook: '[子组件 created]',
      msg: '可以访问 data: count=' + this.count
    })
  },

  // ==================== 挂载阶段 ====================

  beforeMount() {
    this.$emit('log', {
      hook: '[子组件 beforeMount]',
      msg: 'DOM 还未挂载'
    })
  },

  mounted() {
    this.$emit('log', {
      hook: '[子组件 mounted]',
      msg: 'DOM 已挂载，可以操作 DOM'
    })
  },

  // ==================== 更新阶段 ====================

  beforeUpdate() {
    this.$emit('log', {
      hook: '[子组件 beforeUpdate]',
      msg: '数据变化，DOM 即将更新'
    })
  },

  updated() {
    this.$emit('log', {
      hook: '[子组件 updated]',
      msg: 'DOM 已更新完成'
    })
  },

  // ==================== 销毁阶段 ====================

  /**
   * beforeDestroy - 实例销毁前
   * 最后清理的机会：清除定时器、解绑事件
   */
  beforeDestroy() {
    this.$emit('log', {
      hook: '[子组件 beforeDestroy]',
      msg: '即将销毁，清理资源...'
    })
  },

  /**
   * destroyed - 实例已销毁
   * 所有绑定已解除
   */
  destroyed() {
    // 注意：这里 $emit 可能不会触发，因为已经销毁
    console.log('[子组件 destroyed] 已销毁')
  }
})

// 主 Vue 实例
new Vue({
  el: '#app',

  data() {
    return {
      message: 'Hello Vue 生命周期！',
      logs: [],
      showChild: true,
      currentPhase: ''
    }
  },

  // ==================== 创建阶段 ====================

  /**
   * beforeCreate
   * 时机：实例初始化之后，数据观测和事件配置之前
   * 特点：访问不到 data、computed、methods
   */
  beforeCreate() {
    // 此时 this.message 是 undefined
    console.log('beforeCreate: this.message =', this.message)
    this.currentPhase = 'create'
  },

  /**
   * created
   * 时机：实例创建完成，已完成数据观测
   * 特点：可以访问 data、computed、methods
   * 常用：发起 API 请求、初始化数据
   */
  created() {
    console.log('created: this.message =', this.message)
    this.addLog({
      hook: '[created]',
      msg: '实例创建完成，message=' + this.message
    })
  },

  // ==================== 挂载阶段 ====================

  /**
   * beforeMount
   * 时机：模板编译完成，但还没挂载到 DOM
   * 特点：$el 还不可用
   */
  beforeMount() {
    this.currentPhase = 'mount'
    this.addLog({
      hook: '[beforeMount]',
      msg: '模板已编译，即将挂载'
    })
  },

  /**
   * mounted
   * 时机：实例挂载到 DOM，el 被新创建的 vm.$el 替换
   * 特点：可以访问 DOM、初始化第三方库
   * 注意：不保证所有子组件都已挂载，需要 $nextTick
   */
  mounted() {
    this.addLog({
      hook: '[mounted]',
      msg: 'DOM 已挂载，可以访问 this.$el'
    })

    // 确保整个视图都渲染完成
    this.$nextTick(() => {
      this.addLog({
        hook: '[mounted $nextTick]',
        msg: '整个视图渲染完成'
      })
    })
  },

  // ==================== 更新阶段 ====================

  /**
   * beforeUpdate
   * 时机：数据更新时，虚拟 DOM 重新渲染之前
   * 特点：可以访问更新前的 DOM
   */
  beforeUpdate() {
    this.currentPhase = 'update'
    // 注意：这里不要用 addLog，会造成无限循环
    console.log('[beforeUpdate] 数据变化，DOM 即将更新')
  },

  /**
   * updated
   * 时机：虚拟 DOM 重新渲染并应用到真实 DOM
   * 注意：避免在此修改 data，可能导致无限循环
   */
  updated() {
    console.log('[updated] DOM 已更新')
  },

  // ==================== 销毁阶段 ====================

  beforeDestroy() {
    this.currentPhase = 'destroy'
    console.log('[beforeDestroy] 实例即将销毁')
  },

  destroyed() {
    console.log('[destroyed] 实例已销毁')
  },

  methods: {
    /**
     * 添加日志
     */
    addLog(log) {
      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      this.logs.unshift({
        time,
        hook: log.hook,
        msg: log.msg
      })

      // 限制日志数量
      if (this.logs.length > 20) {
        this.logs.pop()
      }
    },

    /**
     * 更新消息，触发更新周期
     */
    updateMessage() {
      this.message = '数据已更新：' + new Date().toLocaleTimeString()
      this.addLog({
        hook: '[data change]',
        msg: '触发更新周期'
      })
    },

    /**
     * 清空日志
     */
    clearLogs() {
      this.logs = []
    },

    /**
     * 切换子组件显示，演示销毁周期
     */
    toggleChild() {
      if (this.showChild) {
        this.addLog({
          hook: '[父组件]',
          msg: '准备销毁子组件...'
        })
      }
      this.showChild = !this.showChild
      if (this.showChild) {
        this.currentPhase = 'create'
      } else {
        this.currentPhase = 'destroy'
      }
    }
  }
})
