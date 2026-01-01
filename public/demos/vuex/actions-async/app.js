/**
 * 异步请求数据
 * 展示在 Action 中处理 API 请求
 */

const store = new Vuex.Store({
  state: {
    users: [],
    loading: false,
    error: null
  },
  
  mutations: {
    SET_LOADING(state, status) {
      state.loading = status
    },
    SET_USERS(state, users) {
      state.users = users
    },
    SET_ERROR(state, error) {
      state.error = error
    }
  },
  
  actions: {
    /**
     * 获取用户列表
     * 模拟 API 请求
     */
    async fetchUsers({ commit }) {
      commit('SET_LOADING', true)
      commit('SET_ERROR', null)
      
      try {
        // 模拟 API 请求延迟
        const users = await new Promise((resolve, reject) => {
          setTimeout(() => {
            // 模拟成功返回
            resolve([
              { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
              { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑' },
              { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
              { id: 4, name: '赵六', email: 'zhaoliu@example.com', role: '用户' }
            ])
            
            // 模拟失败（取消注释测试）
            // reject(new Error('网络错误'))
          }, 1500)
        })
        
        commit('SET_USERS', users)
      } catch (error) {
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    users() {
      return this.$store.state.users
    },
    loading() {
      return this.$store.state.loading
    },
    error() {
      return this.$store.state.error
    }
  },
  
  methods: {
    fetchUsers() {
      this.$store.dispatch('fetchUsers')
    }
  }
})
