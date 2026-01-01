/**
 * 命名空间模块
 * 展示 namespaced: true 的作用
 */

// 模块 A - 带命名空间
const moduleA = {
  namespaced: true,  // 开启命名空间
  
  state: () => ({
    count: 0
  }),
  
  mutations: {
    // 实际路径：'moduleA/INCREMENT'
    INCREMENT(state) {
      state.count++
    }
  },
  
  actions: {
    // 实际路径：'moduleA/increment'
    increment({ commit }) {
      // 模块内部的 commit 不需要加前缀
      commit('INCREMENT')
    }
  },
  
  getters: {
    // 实际路径：'moduleA/doubleCount'
    doubleCount: state => state.count * 2
  }
}

// 模块 B - 带命名空间
const moduleB = {
  namespaced: true,
  
  state: () => ({
    count: 0
  }),
  
  mutations: {
    // 实际路径：'moduleB/INCREMENT'
    // 与 moduleA 的同名 mutation 不冲突
    INCREMENT(state) {
      state.count++
    }
  },
  
  actions: {
    // 实际路径：'moduleB/increment'
    increment({ commit }) {
      commit('INCREMENT')
    }
  },
  
  getters: {
    doubleCount: state => state.count * 2
  }
}

const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    countA() {
      return this.$store.state.moduleA.count
    },
    countB() {
      return this.$store.state.moduleB.count
    }
  },
  
  methods: {
    incrementA() {
      // 使用命名空间时，需要加上模块前缀
      this.$store.dispatch('moduleA/increment')
    },
    incrementB() {
      this.$store.dispatch('moduleB/increment')
    }
  }
})
