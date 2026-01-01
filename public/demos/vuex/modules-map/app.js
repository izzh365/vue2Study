/**
 * mapState 与模块
 * 展示在命名空间模块中使用辅助函数
 */

const { mapState, mapGetters, mapMutations, mapActions } = Vuex

// 用户模块
const userModule = {
  namespaced: true,
  
  state: () => ({
    name: '游客',
    email: 'guest@example.com',
    avatar: '👤'
  }),
  
  mutations: {
    SET_USER(state, { name, email }) {
      state.name = name
      state.email = email
      state.avatar = name.charAt(0)
    },
    SET_EMAIL(state, email) {
      state.email = email
    }
  },
  
  actions: {
    login({ commit }) {
      commit('SET_USER', {
        name: '张三',
        email: 'zhangsan@example.com'
      })
    }
  },
  
  getters: {
    displayName: state => state.name || '游客'
  }
}

const store = new Vuex.Store({
  modules: {
    user: userModule
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 方式1：mapState 传入命名空间作为第一个参数
    ...mapState('user', ['name', 'email', 'avatar']),
    
    // 方式2：mapGetters 同样支持
    ...mapGetters('user', ['displayName'])
  },
  
  methods: {
    // mapMutations 传入命名空间
    ...mapMutations('user', ['SET_EMAIL']),
    
    // mapActions 传入命名空间
    ...mapActions('user', ['login']),
    
    updateEmail() {
      const newEmail = 'newemail@example.com'
      // 直接调用映射的 mutation
      this.SET_EMAIL(newEmail)
    }
  }
})
