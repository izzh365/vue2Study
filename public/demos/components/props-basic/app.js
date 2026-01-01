/**
 * Props 基本传值示例
 *
 * 知识点：
 * 1. Props 是父组件向子组件传递数据的方式
 * 2. 使用 v-bind (:) 绑定动态数据
 * 3. 子组件通过 props 选项声明接收
 * 4. Props 是单向数据流（父 → 子）
 */

// ==================== 欢迎卡片组件 ====================
Vue.component('welcome-card', {
  // 最简单的 props 声明方式：数组
  props: ['name'],

  template: `
    <div class="welcome-card">
      <div class="welcome-greeting">欢迎回来</div>
      <div class="welcome-name">{{ name || '访客' }} 👋</div>
    </div>
  `
})

// ==================== 产品项组件 ====================
Vue.component('product-item', {
  // 接收多个 props
  props: ['name', 'price', 'icon'],

  template: `
    <div class="product-simple">
      <div class="product-icon">{{ icon }}</div>
      <div class="product-details">
        <div class="product-name">{{ name }}</div>
        <div class="product-price">¥{{ price }}</div>
      </div>
    </div>
  `
})

// ==================== Vue 实例（父组件） ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 用户名（将传递给 welcome-card）
      userName: '张三',

      // 产品列表（将传递给 product-item）
      products: [
        { id: 1, name: 'iPhone 15', price: 5999, icon: '📱' },
        { id: 2, name: 'MacBook Air', price: 7999, icon: '💻' },
        { id: 3, name: 'AirPods Pro', price: 1799, icon: '🎧' }
      ]
    }
  },

  created() {
    console.log('=== Props 基本传值 ===')
    console.log('')
    console.log('📦 Props 的作用：')
    console.log('  父组件通过 props 向子组件传递数据')
    console.log('')
    console.log('🔄 数据流向：')
    console.log('  父组件 data → props → 子组件')
    console.log('')
    console.log('💡 使用方式：')
    console.log('  1. 子组件声明 props: [\'name\']')
    console.log('  2. 父组件使用 :name="value" 传递')
  }
})
