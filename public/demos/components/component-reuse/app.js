/**
 * 组件复用示例
 *
 * 知识点：
 * 1. 组件可以被多次使用，每次使用都是独立的实例
 * 2. 通过 props 传入不同数据，展示不同内容
 * 3. 每个实例有独立的 data（因为 data 是函数）
 * 4. 组件复用是 Vue 组件化的核心价值
 */

// ==================== 产品卡片组件 ====================
Vue.component('product-card', {
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    originalPrice: {
      type: Number,
      default: 0
    },
    stock: {
      type: Number,
      default: 0
    },
    icon: {
      type: String,
      default: '📦'
    }
  },

  // 每个实例独立的数据
  data() {
    return {
      quantity: 0
    }
  },

  computed: {
    // 库存状态文字
    stockText() {
      if (this.stock === 0) return '已售罄'
      if (this.stock < 10) return `仅剩 ${this.stock} 件`
      return `库存 ${this.stock} 件`
    },

    // 是否低库存
    isLowStock() {
      return this.stock > 0 && this.stock < 10
    }
  },

  methods: {
    // 加入购物车
    addToCart() {
      if (this.stock > 0) {
        this.$emit('add-cart', {
          name: this.name,
          price: this.price
        })
      }
    }
  },

  template: `
    <div class="product-card">
      <div class="product-image">{{ icon }}</div>
      <div class="product-info">
        <div class="product-name">{{ name }}</div>
        <div class="product-price">
          ¥{{ price }}
          <span v-if="originalPrice" class="original">¥{{ originalPrice }}</span>
        </div>
        <div class="product-stock" :class="{ low: isLowStock }">
          {{ stockText }}
        </div>
      </div>
      <button 
        class="product-btn" 
        @click="addToCart"
        :disabled="stock === 0"
      >
        {{ stock > 0 ? '加入购物车' : '暂时缺货' }}
      </button>
    </div>
  `
})

// ==================== 用户卡片组件 ====================
Vue.component('user-card', {
  props: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: '用户'
    },
    avatar: {
      type: String,
      default: '👤'
    }
  },

  template: `
    <div class="user-card">
      <div class="user-avatar">{{ avatar }}</div>
      <div class="user-name">{{ name }}</div>
      <div class="user-role">{{ role }}</div>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 产品数据
      products: [
        { id: 1, name: 'iPhone 15 Pro', price: 7999, originalPrice: 8999, stock: 50, icon: '📱' },
        { id: 2, name: 'MacBook Pro', price: 12999, originalPrice: 14999, stock: 8, icon: '💻' },
        { id: 3, name: 'AirPods Pro', price: 1799, originalPrice: 1999, stock: 120, icon: '🎧' },
        { id: 4, name: 'Apple Watch', price: 2999, originalPrice: 0, stock: 0, icon: '⌚' }
      ],

      // 用户数据
      users: [
        { id: 1, name: '张三', role: '管理员', avatar: '👨‍💼' },
        { id: 2, name: '李四', role: '开发者', avatar: '👨‍💻' },
        { id: 3, name: '王五', role: '设计师', avatar: '👩‍🎨' },
        { id: 4, name: '赵六', role: '产品经理', avatar: '👩‍💼' }
      ],

      // 购物车
      cart: []
    }
  },

  computed: {
    // 购物车商品数量
    cartCount() {
      return this.cart.length
    },

    // 购物车总金额
    cartTotal() {
      return this.cart.reduce((sum, item) => sum + item.price, 0)
    }
  },

  methods: {
    // 添加到购物车
    addToCart(product) {
      this.cart.push(product)
      console.log(`已添加 ${product.name} 到购物车，当前购物车：`, this.cart)
    }
  },

  created() {
    console.log('=== 组件复用示例 ===')
    console.log('')
    console.log('📦 产品卡片组件被复用了', this.products.length, '次')
    console.log('👥 用户卡片组件被复用了', this.users.length, '次')
    console.log('')
    console.log('💡 每个组件实例都是独立的，有自己的数据和状态')
  }
})
