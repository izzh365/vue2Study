/**
 * $emit 传递参数示例
 *
 * 知识点：
 * 1. $emit 可以传递任意类型的数据
 * 2. 常见做法：传递一个对象包含多个属性
 * 3. 父组件的处理函数接收子组件传递的参数
 */

// ==================== 购物车商品项组件 ====================
Vue.component('cart-item', {
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  methods: {
    /**
     * 减少数量
     */
    decrease() {
      if (this.item.quantity > 1) {
        // 传递对象，包含 id 和新数量
        this.$emit('update-quantity', {
          id: this.item.id,
          quantity: this.item.quantity - 1
        })
      }
    },

    /**
     * 增加数量
     */
    increase() {
      // 传递对象，包含 id 和新数量
      this.$emit('update-quantity', {
        id: this.item.id,
        quantity: this.item.quantity + 1
      })
    },

    /**
     * 删除商品
     */
    remove() {
      // 传递商品 id
      this.$emit('remove-item', this.item.id)
    }
  },

  template: `
    <div class="cart-item">
      <div class="cart-image">{{ item.icon }}</div>
      <div class="cart-info">
        <div class="cart-name">{{ item.name }}</div>
        <div class="cart-price">¥{{ item.price }}</div>
      </div>
      <div class="cart-quantity">
        <button 
          class="qty-btn" 
          @click="decrease"
          :disabled="item.quantity <= 1"
        >−</button>
        <span class="qty-value">{{ item.quantity }}</span>
        <button class="qty-btn" @click="increase">+</button>
      </div>
      <button class="cart-remove" @click="remove">🗑️</button>
    </div>
  `
})

// ==================== Vue 实例（父组件） ====================
new Vue({
  el: '#app',

  data() {
    return {
      cartItems: [
        { id: 1, name: 'iPhone 15 Pro', price: 7999, quantity: 1, icon: '📱' },
        { id: 2, name: 'AirPods Pro', price: 1799, quantity: 2, icon: '🎧' },
        { id: 3, name: 'Apple Watch', price: 2999, quantity: 1, icon: '⌚' }
      ]
    }
  },

  computed: {
    /**
     * 计算总数量
     */
    totalQuantity() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0)
    },

    /**
     * 计算总价
     */
    totalPrice() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
  },

  methods: {
    /**
     * 处理更新数量事件
     * @param {object} payload - { id, quantity }
     */
    updateQuantity(payload) {
      console.log('[父组件] 收到 update-quantity 事件：', payload)

      const item = this.cartItems.find(i => i.id === payload.id)
      if (item) {
        item.quantity = payload.quantity
      }
    },

    /**
     * 处理删除商品事件
     * @param {number} itemId - 商品ID
     */
    removeItem(itemId) {
      console.log('[父组件] 收到 remove-item 事件，ID：', itemId)

      const index = this.cartItems.findIndex(i => i.id === itemId)
      if (index > -1) {
        this.cartItems.splice(index, 1)
      }
    }
  },

  created() {
    console.log('=== $emit 传递参数 ===')
    console.log('')
    console.log('📦 传递方式：')
    console.log("  this.$emit('event-name', payload)")
    console.log('')
    console.log('💡 最佳实践：')
    console.log('  传递对象，便于扩展和理解')
    console.log('  { id: 1, quantity: 2, ... }')
  }
})
