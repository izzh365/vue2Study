/**
 * Mutations 基础用法
 * 展示如何定义和提交 mutation
 */

const store = new Vuex.Store({
  state: {
    count: 0,
    logs: []
  },
  
  mutations: {
    /**
     * increment mutation
     * @param {Object} state - Vuex state
     */
    increment(state) {
      state.count++
      state.logs.unshift(`[${new Date().toLocaleTimeString()}] commit('increment') → count = ${state.count}`)
    },
    
    /**
     * decrement mutation
     * @param {Object} state - Vuex state
     */
    decrement(state) {
      state.count--
      state.logs.unshift(`[${new Date().toLocaleTimeString()}] commit('decrement') → count = ${state.count}`)
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
    logs() {
      return this.$store.state.logs
    }
  },
  
  methods: {
    // 通过 commit 提交 mutation
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  }
})
