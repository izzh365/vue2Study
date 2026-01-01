/**
 * Action 返回 Promise
 * 展示如何在组件中等待 Action 完成
 */

const store = new Vuex.Store({
  state: {
    data: null
  },
  
  mutations: {
    SET_DATA(state, data) {
      state.data = data
    }
  },
  
  actions: {
    /**
     * 返回 Promise 的 Action
     * 组件可以通过 .then() 或 await 等待完成
     */
    fetchData({ commit }) {
      return new Promise((resolve) => {
        // 模拟异步操作
        setTimeout(() => {
          const data = '从服务器获取的数据: ' + new Date().toLocaleTimeString()
          commit('SET_DATA', data)
          
          // resolve 返回数据给调用方
          resolve(data)
        }, 2000)
      })
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  data() {
    return {
      step: 0,
      processing: false,
      result: null
    }
  },
  
  methods: {
    async startProcess() {
      this.processing = true
      this.result = null
      this.step = 1
      
      // 模拟各步骤
      await this.delay(500)
      this.step = 2
      
      // 分发 action 并等待完成
      // dispatch 返回 Promise
      const data = await this.$store.dispatch('fetchData')
      
      this.step = 3
      await this.delay(300)
      
      this.step = 4
      await this.delay(300)
      
      this.step = 5
      this.result = data
      this.processing = false
    },
    
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }
  }
})
