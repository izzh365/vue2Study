/**
 * Payload 载荷演示
 * 展示如何给 mutation 传递参数
 */

const store = new Vuex.Store({
  state: {
    count: 0
  },
  
  mutations: {
    /**
     * 带数字 payload 的 mutation
     * @param {Object} state - Vuex state
     * @param {number} n - 要增加的数值
     */
    incrementBy(state, n) {
      state.count += n
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  data() {
    return {
      customValue: ''
    }
  },
  
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  
  methods: {
    add(n) {
      // 提交 mutation 并传入 payload
      this.$store.commit('incrementBy', n)
    },
    
    addCustom() {
      if (this.customValue) {
        this.$store.commit('incrementBy', this.customValue)
        this.customValue = ''
      }
    }
  }
})
