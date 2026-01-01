/**
 * mapActions 辅助函数
 * 展示如何简化组件中的 action 分发
 */

const { mapActions } = Vuex

const store = new Vuex.Store({
  state: {
    count: 0
  },
  
  mutations: {
    increment(state) {
      state.count++
    },
    incrementBy(state, n) {
      state.count += n
    }
  },
  
  actions: {
    increment({ commit }) {
      commit('increment')
    },
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 500)
    },
    incrementBy({ commit }, n) {
      commit('incrementBy', n)
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  
  methods: {
    // 方式1：数组写法 - 直接映射
    // this.increment() → this.$store.dispatch('increment')
    // this.incrementBy(n) → this.$store.dispatch('incrementBy', n)
    ...mapActions([
      'increment',
      'incrementAsync',
      'incrementBy'
    ]),
    
    // 方式2：对象写法 - 重命名
    // this.add() → this.$store.dispatch('increment')
    // this.asyncAdd() → this.$store.dispatch('incrementAsync')
    ...mapActions({
      add: 'increment',
      asyncAdd: 'incrementAsync'
    })
  }
})
