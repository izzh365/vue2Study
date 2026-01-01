/**
 * data 必须是函数示例
 *
 * 知识点：
 * 1. 组件的 data 必须是一个函数，返回一个对象
 * 2. 每次创建组件实例时，调用 data() 返回新对象
 * 3. 这样每个组件实例都有独立的数据副本
 */

// ==================== 正确示范：data 是函数 ====================
Vue.component('counter-box', {
  props: {
    label: {
      type: String,
      default: '计数器'
    }
  },

  /**
   * ✅ 正确写法：data 是一个函数
   * 每次创建组件实例时，都会调用这个函数
   * 返回一个全新的对象，所以每个实例的数据是独立的
   */
  data: function () {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count++
    }
  },

  template: `
    <div class="counter">
      <div class="counter-label">{{ label }}</div>
      <div class="counter-value">{{ count }}</div>
      <button @click="increment">+1</button>
    </div>
  `
})

// ==================== 错误示范：data 是对象 ====================
// 这个共享对象会被所有组件实例引用
const sharedData = {
  count: 0
}

Vue.component('bad-counter', {
  props: {
    label: {
      type: String,
      default: '共享计数器'
    }
  },

  /**
   * ❌ 错误写法：返回同一个对象引用
   * 所有组件实例都共享这个对象
   * 一个实例修改，所有实例都受影响
   */
  data: function () {
    // 返回的是同一个对象引用，不是新对象！
    return sharedData
  },

  methods: {
    increment() {
      this.count++
    }
  },

  template: `
    <div class="counter" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
      <div class="counter-label">{{ label }}</div>
      <div class="counter-value">{{ count }}</div>
      <button @click="increment">+1</button>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== data 必须是函数的原因 ===')
    console.log('1. 组件可能被复用多次')
    console.log('2. 每个实例需要独立的数据')
    console.log('3. 函数返回新对象，保证数据隔离')
  }
})
