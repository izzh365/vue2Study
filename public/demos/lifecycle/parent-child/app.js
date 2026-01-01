/**
 * 父子组件生命周期顺序
 *
 * 这是理解 Vue 组件化开发的重要知识点
 *
 * 挂载顺序：
 * 父 beforeCreate → 父 created → 父 beforeMount
 * → 子 beforeCreate → 子 created → 子 beforeMount → 子 mounted
 * → 父 mounted
 *
 * 更新顺序：
 * 父 beforeUpdate → 子 beforeUpdate → 子 updated → 父 updated
 *
 * 销毁顺序：
 * 父 beforeDestroy → 子 beforeDestroy → 子 destroyed → 父 destroyed
 */

// 子组件 A
Vue.component('child-a', {
  template: `
    <div style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin: 8px 0;">
      <strong>👦 子组件 A</strong>
      <p style="margin: 4px 0; font-size: 14px;">消息: {{ message }}</p>
    </div>
  `,

  props: ['message'],

  beforeCreate() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子A beforeCreate', phase: null })
  },
  created() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子A created' })
  },
  beforeMount() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子A beforeMount' })
  },
  mounted() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子A mounted' })
  },
  beforeUpdate() {
    this.$parent.$emit('hook-called', {
      type: 'child',
      hook: '子A beforeUpdate',
      phase: '更新阶段'
    })
  },
  updated() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子A updated' })
  },
  beforeDestroy() {
    this.$parent.$emit('hook-called', {
      type: 'child',
      hook: '子A beforeDestroy',
      phase: '销毁阶段'
    })
  },
  destroyed() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子A destroyed' })
  }
})

// 子组件 B
Vue.component('child-b', {
  template: `
    <div style="background: #e3f2fd; padding: 12px; border-radius: 8px; margin: 8px 0;">
      <strong>👧 子组件 B</strong>
      <p style="margin: 4px 0; font-size: 14px;">消息: {{ message }}</p>
    </div>
  `,

  props: ['message'],

  beforeCreate() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B beforeCreate' })
  },
  created() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B created' })
  },
  beforeMount() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B beforeMount' })
  },
  mounted() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B mounted' })
  },
  beforeUpdate() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B beforeUpdate' })
  },
  updated() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B updated' })
  },
  beforeDestroy() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B beforeDestroy' })
  },
  destroyed() {
    this.$parent.$emit('hook-called', { type: 'child', hook: '子B destroyed' })
  }
})

// 父组件
Vue.component('parent-component', {
  template: `
    <div class="card">
      <div class="card-title">
        <span>👨</span>
        <span>父组件内容</span>
      </div>
      <p style="margin-bottom: 12px;">父组件消息: {{ message }}</p>
      <child-a :message="message"></child-a>
      <child-b :message="message"></child-b>
    </div>
  `,

  props: ['message'],

  beforeCreate() {
    // 注意：此时 $emit 还不可用，需要延迟
    this.$nextTick(() => {
      this.$emit('hook-called', { type: 'parent', hook: '父 beforeCreate', phase: '挂载阶段' })
    })
  },
  created() {
    this.$emit('hook-called', { type: 'parent', hook: '父 created' })
  },
  beforeMount() {
    this.$emit('hook-called', { type: 'parent', hook: '父 beforeMount' })
  },
  mounted() {
    this.$emit('hook-called', { type: 'parent', hook: '父 mounted ✓' })
  },
  beforeUpdate() {
    this.$emit('hook-called', { type: 'parent', hook: '父 beforeUpdate', phase: '更新阶段' })
  },
  updated() {
    this.$emit('hook-called', { type: 'parent', hook: '父 updated ✓' })
  },
  beforeDestroy() {
    this.$emit('hook-called', { type: 'parent', hook: '父 beforeDestroy', phase: '销毁阶段' })
  },
  destroyed() {
    // 注意：destroyed 时 $emit 可能不工作
    console.log('父 destroyed')
  }
})

// 主 Vue 实例
new Vue({
  el: '#app',

  data() {
    return {
      // 是否挂载组件
      isMounted: false,

      // 消息
      message: 'Hello Vue!',

      // 时间线
      timeline: [],

      // 顺序计数
      order: 0,

      // 当前活跃组件
      activeComponent: '',

      // 当前钩子
      parentHook: '',
      child1Hook: '',
      child2Hook: ''
    }
  },

  methods: {
    /**
     * 挂载组件
     */
    mountComponents() {
      this.clearTimeline()
      this.isMounted = true
    },

    /**
     * 更新数据
     */
    updateComponents() {
      this.message = '更新于 ' + new Date().toLocaleTimeString()
    },

    /**
     * 销毁组件
     */
    destroyComponents() {
      this.isMounted = false

      // 延迟添加最后的销毁记录
      setTimeout(() => {
        this.timeline.push({
          order: ++this.order,
          type: 'parent',
          hook: '父 destroyed ✓',
          phase: null,
          active: false
        })
      }, 100)
    },

    /**
     * 清空时间线
     */
    clearTimeline() {
      this.timeline = []
      this.order = 0
    },

    /**
     * 钩子被调用时
     */
    onHookCalled(data) {
      this.order++

      // 设置活跃组件
      if (data.hook.includes('父')) {
        this.activeComponent = 'parent'
        this.parentHook = data.hook.replace('父 ', '')
      } else if (data.hook.includes('子A')) {
        this.activeComponent = 'child1'
        this.child1Hook = data.hook.replace('子A ', '')
      } else if (data.hook.includes('子B')) {
        this.activeComponent = 'child2'
        this.child2Hook = data.hook.replace('子B ', '')
      }

      // 添加到时间线
      this.timeline.push({
        order: this.order,
        type: data.type,
        hook: data.hook,
        phase: data.phase || null,
        active: true
      })

      // 移除活跃状态
      setTimeout(() => {
        const item = this.timeline[this.timeline.length - 1]
        if (item) item.active = false
        this.activeComponent = ''
      }, 300)
    }
  }
})
