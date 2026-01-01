/**
 * 计数器综合案例
 *
 * 知识点：
 * 1. 子组件通过 $emit 触发事件通知父组件
 * 2. 父组件监听事件并更新数据
 * 3. 可以同时触发多个事件
 * 4. 结合 props 实现可配置组件
 */

// ==================== 计数器组件 ====================
Vue.component('my-counter', {
  props: {
    // 当前值
    value: {
      type: Number,
      default: 0
    },
    // 步长
    step: {
      type: Number,
      default: 1
    },
    // 最小值
    min: {
      type: Number,
      default: -Infinity
    },
    // 最大值
    max: {
      type: Number,
      default: Infinity
    }
  },

  computed: {
    /**
     * 是否可以减少
     */
    canDecrease() {
      return this.value - this.step >= this.min
    },

    /**
     * 是否可以增加
     */
    canIncrease() {
      return this.value + this.step <= this.max
    }
  },

  methods: {
    /**
     * 减少
     */
    decrease() {
      if (!this.canDecrease) {
        // 触发达到限制事件
        this.$emit('limit-reached', { type: 'min', value: this.min })
        return
      }
      const newValue = this.value - this.step
      // 触发 input 事件（用于 v-model）
      this.$emit('input', newValue)
      // 触发具体的减少事件
      this.$emit('decrease', this.step)
    },

    /**
     * 增加
     */
    increase() {
      if (!this.canIncrease) {
        this.$emit('limit-reached', { type: 'max', value: this.max })
        return
      }
      const newValue = this.value + this.step
      this.$emit('input', newValue)
      this.$emit('increase', this.step)
    }
  },

  template: `
    <div class="counter-box">
      <button 
        class="counter-btn decrease" 
        @click="decrease"
        :disabled="!canDecrease"
      >-</button>
      <span class="counter-value">{{ value }}</span>
      <button 
        class="counter-btn increase" 
        @click="increase"
        :disabled="!canIncrease"
      >+</button>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 基础计数器
      count1: 0,
      // 可配置步长
      count2: 50,
      step: 1,
      // 购物车
      cartItems: [
        { id: 1, name: '苹果', price: 5, quantity: 2 },
        { id: 2, name: '香蕉', price: 3, quantity: 3 },
        { id: 3, name: '橙子', price: 8, quantity: 1 }
      ],
      // 事件日志
      count3: 0,
      eventLogs: []
    }
  },

  computed: {
    /**
     * 总数量
     */
    totalQuantity() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    },

    /**
     * 总价格
     */
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },

  methods: {
    /**
     * 处理达到限制
     */
    handleLimitReached(info) {
      console.log(`达到${info.type === 'min' ? '最小' : '最大'}值: ${info.value}`)
    },

    /**
     * 更新购物车数量
     */
    updateQuantity(index, quantity) {
      this.cartItems[index].quantity = quantity
    },

    /**
     * 处理 input 事件
     */
    handleInput(value) {
      this.count3 = value
      const time = new Date().toLocaleTimeString()
      this.eventLogs.unshift(`[${time}] input 事件: 新值 = ${value}`)
    },

    /**
     * 处理增加事件
     */
    handleIncrease(step) {
      const time = new Date().toLocaleTimeString()
      this.eventLogs.unshift(`[${time}] increase 事件: 步长 = ${step}`)
    },

    /**
     * 处理减少事件
     */
    handleDecrease(step) {
      const time = new Date().toLocaleTimeString()
      this.eventLogs.unshift(`[${time}] decrease 事件: 步长 = ${step}`)
    }
  },

  created() {
    console.log('=== 计数器综合案例 ===')
    console.log('')
    console.log('📋 关键点：')
    console.log('  1. 子组件不直接修改 props')
    console.log('  2. 通过 $emit 通知父组件')
    console.log('  3. 父组件监听事件并更新数据')
    console.log('')
    console.log('💡 可以触发多个事件：')
    console.log('  - input: 通用的值变化事件')
    console.log('  - increase/decrease: 具体的操作事件')
    console.log('  - limit-reached: 边界事件')
  }
})
