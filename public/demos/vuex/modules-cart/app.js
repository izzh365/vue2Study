/**
 * 综合案例 - 用户与购物车
 * 展示多个模块之间的协作
 */

const { mapState, mapGetters, mapActions } = Vuex

// 用户模块
const userModule = {
  namespaced: true,
  
  state: () => ({
    name: '',
    balance: 0,
    isLoggedIn: false
  }),
  
  mutations: {
    SET_USER(state, { name, balance }) {
      state.name = name
      state.balance = balance
      state.isLoggedIn = true
    },
    CLEAR_USER(state) {
      state.name = ''
      state.balance = 0
      state.isLoggedIn = false
    },
    DEDUCT_BALANCE(state, amount) {
      state.balance -= amount
    }
  },
  
  actions: {
    login({ commit }, userData) {
      commit('SET_USER', userData)
    },
    logout({ commit, dispatch }) {
      commit('CLEAR_USER')
      // 清空购物车（跨模块调用）
      dispatch('cart/clearCart', null, { root: true })
    }
  }
}

// 购物车模块
const cartModule = {
  namespaced: true,
  
  state: () => ({
    items: []
  }),
  
  mutations: {
    ADD_ITEM(state, product) {
      const existing = state.items.find(i => i.id === product.id)
      if (existing) {
        existing.quantity++
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    REMOVE_ITEM(state, productId) {
      const index = state.items.findIndex(i => i.id === productId)
      if (index > -1) {
        state.items.splice(index, 1)
      }
    },
    UPDATE_QTY(state, { id, quantity }) {
      const item = state.items.find(i => i.id === id)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          const index = state.items.indexOf(item)
          state.items.splice(index, 1)
        }
      }
    },
    CLEAR_CART(state) {
      state.items = []
    }
  },
  
  actions: {
    addToCart({ commit }, product) {
      commit('ADD_ITEM', product)
    },
    increaseQty({ commit, state }, productId) {
      const item = state.items.find(i => i.id === productId)
      if (item) {
        commit('UPDATE_QTY', { id: productId, quantity: item.quantity + 1 })
      }
    },
    decreaseQty({ commit, state }, productId) {
      const item = state.items.find(i => i.id === productId)
      if (item) {
        commit('UPDATE_QTY', { id: productId, quantity: item.quantity - 1 })
      }
    },
    clearCart({ commit }) {
      commit('CLEAR_CART')
    },
    // 结算 - 跨模块操作
    checkout({ commit, state, rootState }) {
      const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      
      if (rootState.user.balance >= total) {
        // 扣除余额（提交根模块的 mutation）
        commit('user/DEDUCT_BALANCE', total, { root: true })
        // 清空购物车
        commit('CLEAR_CART')
        alert('结算成功！')
      } else {
        alert('余额不足！')
      }
    }
  },
  
  getters: {
    cartCount: state => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: state => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }
}

// 商品模块
const productModule = {
  namespaced: true,
  
  state: () => ({
    list: [
      { id: 1, name: 'iPhone 15', price: 7999, icon: '📱' },
      { id: 2, name: 'MacBook Pro', price: 14999, icon: '💻' },
      { id: 3, name: 'AirPods Pro', price: 1899, icon: '🎧' },
      { id: 4, name: 'iPad Air', price: 4799, icon: '📲' }
    ]
  })
}

const store = new Vuex.Store({
  modules: {
    user: userModule,
    cart: cartModule,
    product: productModule
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 用户模块
    ...mapState('user', ['isLoggedIn', 'balance']),
    userName() {
      return this.$store.state.user.name
    },
    
    // 商品模块
    products() {
      return this.$store.state.product.list
    },
    
    // 购物车模块
    cartItems() {
      return this.$store.state.cart.items
    },
    ...mapGetters('cart', ['cartCount', 'cartTotal'])
  },
  
  methods: {
    // 用户模块 actions
    ...mapActions('user', ['login', 'logout']),
    
    // 购物车模块 actions
    ...mapActions('cart', ['addToCart', 'increaseQty', 'decreaseQty', 'checkout'])
  }
})
