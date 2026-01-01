/**
 * mapMutations 辅助函数演示
 * 展示如何简化组件中的 mutation 提交
 */

const { mapMutations } = Vuex

const store = new Vuex.Store({
  state: {
    count: 0
  },
  
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    },
    incrementBy(state, n) {
      state.count += n
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
    // this.increment() → this.$store.commit('increment')
    // this.incrementBy(n) → this.$store.commit('incrementBy', n)
    ...mapMutations([
      'increment',
      'decrement',
      'incrementBy'
    ]),
    
    // 方式2：对象写法 - 重命名
    // this.add() → this.$store.commit('increment')
    // this.minus() → this.$store.commit('decrement')
    ...mapMutations({
      add: 'increment',
      minus: 'decrement'
    })
  }
})
