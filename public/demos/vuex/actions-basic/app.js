/**
 * Actions 基础用法
 * 展示同步与异步操作的区别
 */

const store = new Vuex.Store({
  state: {
    count: 0,
    loading: false
  },
  
  mutations: {
    increment(state) {
      state.count++
    },
    setLoading(state, status) {
      state.loading = status
    }
  },
  
  actions: {
    /**
     * 同步 Action
     * 直接提交 mutation
     */
    increment({ commit }) {
      commit('increment')
    },
    
    /**
     * 异步 Action
     * 1秒后提交 mutation
     */
    incrementAsync({ commit }) {
      commit('setLoading', true)
      
      setTimeout(() => {
        commit('increment')
        commit('setLoading', false)
      }, 1000)
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    count() {
      return this.$store.state.count
    },
    loading() {
      return this.$store.state.loading
    }
  },
  
  methods: {
    // 分发同步 action
    increment() {
      this.$store.dispatch('increment')
    },
    
    // 分发异步 action
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
    }
  }
})
