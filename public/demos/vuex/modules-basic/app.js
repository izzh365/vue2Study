/**
 * 基础模块
 * 展示如何将 store 分割成模块
 */

// 用户模块
const userModule = {
  state: () => ({
    name: '游客',
    isLoggedIn: false
  }),
  
  mutations: {
    SET_USER(state, name) {
      state.name = name
      state.isLoggedIn = true
    },
    CLEAR_USER(state) {
      state.name = '游客'
      state.isLoggedIn = false
    }
  },
  
  actions: {
    login({ commit }, username) {
      commit('SET_USER', username)
    },
    logout({ commit }) {
      commit('CLEAR_USER')
    }
  },
  
  getters: {
    displayName: state => state.isLoggedIn ? state.name : '游客'
  }
}

// 计数模块
const counterModule = {
  state: () => ({
    count: 0
  }),
  
  mutations: {
    INCREMENT(state) {
      state.count++
    },
    DECREMENT(state) {
      state.count--
    }
  },
  
  actions: {
    increment({ commit }) {
      commit('INCREMENT')
    },
    decrement({ commit }) {
      commit('DECREMENT')
    }
  },
  
  getters: {
    doubleCount: state => state.count * 2
  }
}

// 创建 store，注册模块
const store = new Vuex.Store({
  modules: {
    user: userModule,
    counter: counterModule
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 访问模块 state：this.$store.state.模块名.属性
    userName() {
      return this.$store.state.user.name
    },
    counterValue() {
      return this.$store.state.counter.count
    },
    stateJson() {
      return JSON.stringify(this.$store.state, null, 2)
    }
  },
  
  methods: {
    // 不使用命名空间时，直接 dispatch action 名称
    login(name) {
      this.$store.dispatch('login', name)
    },
    logout() {
      this.$store.dispatch('logout')
    },
    increment() {
      this.$store.dispatch('increment')
    },
    decrement() {
      this.$store.dispatch('decrement')
    }
  }
})
