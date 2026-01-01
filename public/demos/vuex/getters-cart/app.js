/**
 * 购物车案例 - Getters 实战
 * 展示 Getters 在实际项目中的应用
 */

const { mapGetters } = Vuex

const store = new Vuex.Store({
  state: {
    cart: [
      { id: 1, name: 'iPhone 15', price: 6999, quantity: 1, icon: '📱' },
      { id: 2, name: 'AirPods Pro', price: 1999, quantity: 2, icon: '🎧' },
      { id: 3, name: 'Apple Watch', price: 2999, quantity: 1, icon: '⌚' }
    ]
  },
  
  getters: {
    // 购物车商品列表
    cartItems: state => state.cart,
    
    // 商品种类数
    itemTypes: state => state.cart.length,
    
    // 商品总数量
    totalQuantity: state => {
      return state.cart.reduce((sum, item) => sum + item.quantity, 0)
    },
    
    // 商品总价（未折扣）
    subtotal: state => {
      return state.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity
      }, 0)
    },
    
    // 折扣金额（满100减10）
    discount: (state, getters) => {
      const subtotal = getters.subtotal
      return Math.floor(subtotal / 100) * 10
    },
    
    // 最终价格
    finalPrice: (state, getters) => {
      return getters.subtotal - getters.discount
    }
  },
  
  mutations: {
    increaseQuantity(state, id) {
      const item = state.cart.find(i => i.id === id)
      if (item) item.quantity++
    },
    decreaseQuantity(state, id) {
      const item = state.cart.find(i => i.id === id)
      if (item && item.quantity > 1) item.quantity--
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    ...mapGetters([
      'cartItems',
      'itemTypes',
      'totalQuantity',
      'discount',
      'finalPrice'
    ])
  },
  
  methods: {
    increase(id) {
      this.$store.commit('increaseQuantity', id)
    },
    decrease(id) {
      this.$store.commit('decreaseQuantity', id)
    }
  }
})
