/**
 * 访问根状态
 * 展示模块中如何访问 rootState 和 rootGetters
 */

// 设置模块
const settingsModule = {
  namespaced: true,
  
  state: () => ({
    theme: 'light'
  }),
  
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme
    }
  },
  
  getters: {
    /**
     * 在 getter 中访问根状态
     * 第三个参数是 rootState
     * 第四个参数是 rootGetters
     */
    fullTitle(state, getters, rootState, rootGetters) {
      // 访问根状态
      return `${rootState.appName} - ${state.theme} 主题`
    }
  },
  
  actions: {
    toggleTheme({ commit, state }) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      commit('SET_THEME', newTheme)
    },
    
    /**
     * 在 action 中访问根状态
     */
    logRootState({ rootState, rootGetters }) {
      console.log('根状态 appName:', rootState.appName)
      console.log('根状态 version:', rootState.version)
      console.log('根 getter appInfo:', rootGetters.appInfo)
      alert(`访问到根状态:\nappName: ${rootState.appName}\nversion: ${rootState.version}`)
    },
    
    /**
     * 在模块中提交根 mutation
     * 需要传入 { root: true }
     */
    updateRootVersion({ commit }) {
      // 第三个参数 { root: true } 表示提交根 mutation
      commit('UPDATE_VERSION', '2.0.0', { root: true })
      alert('已提交根 mutation: UPDATE_VERSION')
    }
  }
}

const store = new Vuex.Store({
  // 根状态
  state: {
    appName: 'Vuex 学习',
    version: '1.0.0'
  },
  
  // 根 mutations
  mutations: {
    UPDATE_VERSION(state, version) {
      state.version = version
    }
  },
  
  // 根 getters
  getters: {
    appInfo: state => `${state.appName} v${state.version}`
  },
  
  // 注册模块
  modules: {
    settings: settingsModule
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 根状态
    appName() {
      return this.$store.state.appName
    },
    version() {
      return this.$store.state.version
    },
    // 模块状态
    theme() {
      return this.$store.state.settings.theme
    },
    // 模块 getter（需要命名空间前缀）
    fullTitle() {
      return this.$store.getters['settings/fullTitle']
    }
  },
  
  methods: {
    toggleTheme() {
      this.$store.dispatch('settings/toggleTheme')
    },
    logFromModule() {
      this.$store.dispatch('settings/logRootState')
    },
    commitRootMutation() {
      this.$store.dispatch('settings/updateRootVersion')
    }
  }
})
