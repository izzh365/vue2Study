/**
 * Props 单向数据流示例
 *
 * 知识点：
 * 1. Props 是单向数据流：父 → 子
 * 2. 子组件不能直接修改 prop
 * 3. 需要修改时，应该复制到本地 data 或使用 computed
 * 4. 如果需要通知父组件修改，使用 $emit
 */

// ==================== 展示计数器（只读） ====================
Vue.component('counter-display', {
  props: {
    count: {
      type: Number,
      required: true
    }
  },

  template: `
    <div>
      <div class="value-display">{{ count }}</div>
      <p style="text-align: center; color: #86868B; font-size: 13px;">
        接收到的 prop: {{ count }}
      </p>
    </div>
  `
})

// ==================== 错误示范：直接修改 prop ====================
Vue.component('wrong-counter', {
  props: {
    initialCount: {
      type: Number,
      default: 0
    }
  },

  template: `
    <div style="background: #FFEBEE; padding: 20px; border-radius: 12px;">
      <div class="value-display" style="color: #FF3B30;">{{ initialCount }}</div>
      <div class="controls">
        <button class="btn danger" @click="wrongIncrement">
          ❌ 直接修改 prop（错误）
        </button>
      </div>
      <p style="text-align: center; color: #C62828; font-size: 13px; margin-top: 12px;">
        点击按钮，观察控制台警告
      </p>
    </div>
  `,

  methods: {
    /**
     * ❌ 错误做法：直接修改 prop
     * Vue 会在控制台显示警告
     */
    wrongIncrement() {
      console.warn('⚠️ 尝试直接修改 prop...')
      // 这样做是错误的！Vue 会警告
      this.initialCount++
    }
  }
})

// ==================== 正确示范：使用本地 data ====================
Vue.component('correct-counter', {
  props: {
    initialCount: {
      type: Number,
      default: 0
    }
  },

  /**
   * ✅ 正确做法：把 prop 复制到本地 data
   * 后续修改本地 data 而不是 prop
   */
  data() {
    return {
      // 用 prop 初始化本地 data
      localCount: this.initialCount
    }
  },

  template: `
    <div style="background: #E8F5E9; padding: 20px; border-radius: 12px;">
      <div style="display: flex; gap: 20px; align-items: center; justify-content: center; margin-bottom: 16px;">
        <div style="text-align: center;">
          <div style="color: #86868B; font-size: 12px;">prop 值</div>
          <div style="font-size: 20px; color: #86868B;">{{ initialCount }}</div>
        </div>
        <div style="font-size: 20px;">→</div>
        <div style="text-align: center;">
          <div style="color: #2E7D32; font-size: 12px;">本地 data</div>
          <div style="font-size: 32px; font-weight: 700; color: #2E7D32;">{{ localCount }}</div>
        </div>
      </div>
      <div class="controls">
        <button class="btn success" @click="increment">
          ✅ 修改本地 data
        </button>
        <button class="btn primary" @click="reset">
          重置
        </button>
      </div>
    </div>
  `,

  methods: {
    /**
     * ✅ 正确做法：修改本地 data
     */
    increment() {
      this.localCount++
      console.log('✅ 正确：修改本地 data，当前值：', this.localCount)
    },

    /**
     * 重置为 prop 初始值
     */
    reset() {
      this.localCount = this.initialCount
      console.log('重置为 prop 初始值：', this.initialCount)
    }
  }
})

// ==================== Vue 实例（父组件） ====================
new Vue({
  el: '#app',

  data() {
    return {
      parentCount: 0
    }
  },

  created() {
    console.log('=== Props 单向数据流 ===')
    console.log('')
    console.log('📋 核心规则：')
    console.log('  1. 数据只能从父组件流向子组件')
    console.log('  2. 子组件不能直接修改 prop')
    console.log('')
    console.log('✅ 正确做法：')
    console.log('  1. 复制到本地 data')
    console.log('  2. 使用 computed 计算')
    console.log('  3. 用 $emit 通知父组件')
  }
})
