/**
 * 组合 Actions
 * 展示 Action 中如何调用其他 Action
 */

const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    stockChecked: false,
    orderId: null,
    logs: []
  },
  
  mutations: {
    SET_AUTH(state, status) {
      state.isAuthenticated = status
    },
    SET_STOCK(state, status) {
      state.stockChecked = status
    },
    SET_ORDER(state, orderId) {
      state.orderId = orderId
    },
    ADD_LOG(state, log) {
      state.logs.push(log)
    },
    RESET(state) {
      state.isAuthenticated = false
      state.stockChecked = false
      state.orderId = null
      state.logs = []
    }
  },
  
  actions: {
    // Action 1: 验证用户
    checkAuth({ commit }) {
      commit('ADD_LOG', { 
        time: new Date().toLocaleTimeString(), 
        type: 'action',
        message: 'dispatch("checkAuth")' 
      })
      
      return new Promise(resolve => {
        setTimeout(() => {
          commit('SET_AUTH', true)
          commit('ADD_LOG', { 
            time: new Date().toLocaleTimeString(), 
            type: 'mutation',
            message: 'commit("SET_AUTH", true)' 
          })
          resolve()
        }, 800)
      })
    },
    
    // Action 2: 验证库存
    checkStock({ commit }) {
      commit('ADD_LOG', { 
        time: new Date().toLocaleTimeString(), 
        type: 'action',
        message: 'dispatch("checkStock")' 
      })
      
      return new Promise(resolve => {
        setTimeout(() => {
          commit('SET_STOCK', true)
          commit('ADD_LOG', { 
            time: new Date().toLocaleTimeString(), 
            type: 'mutation',
            message: 'commit("SET_STOCK", true)' 
          })
          resolve()
        }, 800)
      })
    },
    
    // Action 3: 创建订单
    createOrder({ commit }) {
      commit('ADD_LOG', { 
        time: new Date().toLocaleTimeString(), 
        type: 'action',
        message: 'dispatch("createOrder")' 
      })
      
      return new Promise(resolve => {
        setTimeout(() => {
          const orderId = 'ORD' + Date.now()
          commit('SET_ORDER', orderId)
          commit('ADD_LOG', { 
            time: new Date().toLocaleTimeString(), 
            type: 'mutation',
            message: `commit("SET_ORDER", "${orderId}")` 
          })
          resolve(orderId)
        }, 800)
      })
    },
    
    // 组合 Action: 结账流程
    async checkout({ dispatch, commit }) {
      commit('RESET')
      commit('ADD_LOG', { 
        time: new Date().toLocaleTimeString(), 
        type: 'action',
        message: '开始结账流程...' 
      })
      
      // 依次执行各个 action
      await dispatch('checkAuth')
      await dispatch('checkStock')
      const orderId = await dispatch('createOrder')
      
      commit('ADD_LOG', { 
        time: new Date().toLocaleTimeString(), 
        type: 'action',
        message: `✅ 结账完成! 订单号: ${orderId}` 
      })
      
      return orderId
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  data() {
    return {
      processing: false,
      currentStep: 0
    }
  },
  
  computed: {
    logs() {
      return this.$store.state.logs
    }
  },
  
  methods: {
    async startCheckout() {
      this.processing = true
      this.currentStep = 0
      
      // 模拟步骤进度
      const stepInterval = setInterval(() => {
        if (this.currentStep < 3) {
          this.currentStep++
        }
      }, 900)
      
      try {
        await this.$store.dispatch('checkout')
      } finally {
        clearInterval(stepInterval)
        this.currentStep = 3
        this.processing = false
      }
    },
    
    getStepClass(step) {
      if (this.currentStep === 0) return 'waiting'
      if (this.currentStep === step) return 'active'
      if (this.currentStep > step) return 'completed'
      return 'waiting'
    }
  }
})
