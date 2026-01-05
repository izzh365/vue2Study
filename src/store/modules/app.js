// store/modules/app.js
// 应用级别状态管理模块

// ==================== 默认进度结构 ====================
const defaultProgress = {
  // ES6 (5个)
  'es6-const-let': false,
  'es6-object-enhance': false,
  'es6-higher-order': false,
  'es6-arrow-function': false,
  'es6-promise-async': false,
  // 生命周期 (1个)
  'lifecycle-detail': false,
  // 指令 (5个)
  'directives-v-bind': false,
  'directives-v-on': false,
  'directives-v-model': false,
  'directives-v-if-show': false,
  'directives-v-for': false,
  // 计算属性 (2个)
  'computed-watch-computed': false,
  'computed-watch-watch': false,
  // 自定义指令 (1个)
  'custom-directives-main': false,
  // 组件化 (5个)
  'components-basic': false,
  'components-props': false,
  'components-emit': false,
  'components-refs': false,
  'components-slot': false,
  // 路由 (5个)
  'router-basic': false,
  'router-dynamic': false,
  'router-nested': false,
  'router-programmatic': false,
  'router-guards': false,
  // Vuex (5个)
  'vuex-state': false,
  'vuex-getters': false,
  'vuex-mutations': false,
  'vuex-actions': false,
  'vuex-modules': false,
  // Axios (5个)
  'axios-basic': false,
  'axios-response': false,
  'axios-concurrent': false,
  'axios-interceptors': false,
  'axios-encapsulation': false
}

// ==================== 初始化从 localStorage 加载进度 ====================
const loadProgressFromStorage = () => {
  try {
    const saved = localStorage.getItem('vue2_learning_progress')
    if (saved) {
      const savedProgress = JSON.parse(saved)
      // 合并保存的进度和默认结构，确保新增加的章节也能被追踪
      return { ...defaultProgress, ...savedProgress }
    }
    return defaultProgress
  } catch (e) {
    console.error('加载学习进度失败:', e)
    return defaultProgress
  }
}

// ==================== State 状态 ====================
const state = {
  // 侧边栏是否展开
  sidebarOpen: true,

  // 清屏模式（隐藏侧边栏和标题）
  cleanMode: localStorage.getItem('vue2_clean_mode') === 'true' || false,

  // 当前激活的章节
  activeChapter: null,

  // 学习进度（章节完成状态）
  progress: loadProgressFromStorage()
}

// ==================== Getters 计算属性 ====================
const getters = {
  /**
   * 获取完成的章节数量
   * @param {Object} state - 状态
   * @returns {Number} 完成数量
   */
  completedCount(state) {
    return Object.values(state.progress).filter(v => v).length
  },

  /**
   * 获取总小节数量
   * @returns {Number} 总数量
   */
  totalChapters() {
    return 34 // ES6(5) + 生命周期(1) + 指令(5) + 计算属性(2) + 自定义指令(1) + 组件化(5) + 路由(5) + Vuex(5) + Axios(5)
  },

  /**
   * 计算学习进度百分比
   * @param {Object} state - 状态
   * @param {Object} getters - getters
   * @returns {Number} 百分比
   */
  progressPercent(state, getters) {
    return Math.round((getters.completedCount / getters.totalChapters) * 100)
  },

  /**
   * 获取进度对象
   * @param {Object} state - 状态
   * @returns {Object} 进度对象
   */
  progress(state) {
    return state.progress
  },

  /**
   * 获取清屏模式状态
   * @param {Object} state - 状态
   * @returns {Boolean} 是否清屏模式
   */
  cleanMode(state) {
    return state.cleanMode
  }
}

// ==================== Mutations 同步修改 ====================
const mutations = {
  /**
   * 切换侧边栏状态
   * @param {Object} state - 状态
   */
  TOGGLE_SIDEBAR(state) {
    state.sidebarOpen = !state.sidebarOpen
  },

  /**
   * 设置侧边栏状态
   * @param {Object} state - 状态
   * @param {Boolean} value - 开关值
   */
  SET_SIDEBAR(state, value) {
    state.sidebarOpen = value
  },

  /**
   * 设置当前章节
   * @param {Object} state - 状态
   * @param {String} chapter - 章节名
   */
  SET_ACTIVE_CHAPTER(state, chapter) {
    state.activeChapter = chapter
  },

  /**
   * 切换清屏模式
   * @param {Object} state - 状态
   */
  TOGGLE_CLEAN_MODE(state) {
    state.cleanMode = !state.cleanMode
    // 保存到 localStorage
    try {
      localStorage.setItem('vue2_clean_mode', state.cleanMode.toString())
      // 清屏模式开启时自动关闭侧边栏
      if (state.cleanMode) {
        state.sidebarOpen = false
      }
    } catch (e) {
      console.error('保存清屏模式状态失败:', e)
    }
  },

  /**
   * 标记章节完成
   * @param {Object} state - 状态
   * @param {String} chapter - 章节名
   */
  COMPLETE_CHAPTER(state, chapter) {
    console.log(`🔄 MUTATION: COMPLETE_CHAPTER 被调用，章节: ${chapter}`)
    console.log(
      `🔍 章节是否存在于 progress: ${Object.prototype.hasOwnProperty.call(state.progress, chapter)}`
    )

    if (Object.prototype.hasOwnProperty.call(state.progress, chapter)) {
      console.log(`📝 更新前: ${chapter} = ${state.progress[chapter]}`)
      state.progress[chapter] = true
      console.log(`✓ 更新后: ${chapter} = ${state.progress[chapter]}`)

      // 保存到 localStorage
      try {
        const progressJson = JSON.stringify(state.progress)
        console.log(`💾 保存到 localStorage:`, progressJson)
        localStorage.setItem('vue2_learning_progress', progressJson)
        console.log(`✅ localStorage 保存成功`)
      } catch (e) {
        console.error('❌ 保存学习进度失败:', e)
      }
    } else {
      console.warn(`⚠️ 章节 ${chapter} 不存在于 progress 对象中！`)
    }
  },

  /**
   * 取消章节完成
   * @param {Object} state - 状态
   * @param {String} chapter - 章节名
   */
  UNCOMPLETE_CHAPTER(state, chapter) {
    if (Object.prototype.hasOwnProperty.call(state.progress, chapter)) {
      state.progress[chapter] = false
      // 保存到 localStorage
      try {
        localStorage.setItem('vue2_learning_progress', JSON.stringify(state.progress))
      } catch (e) {
        console.error('保存学习进度失败:', e)
      }
    }
  },

  /**
   * 重置所有进度
   * @param {Object} state - 状态
   */
  RESET_PROGRESS(state) {
    Object.keys(state.progress).forEach(key => {
      state.progress[key] = false
    })
    // 清除 localStorage
    try {
      localStorage.removeItem('vue2_learning_progress')
    } catch (e) {
      console.error('重置学习进度失败:', e)
    }
  }
}

// ==================== Actions 异步操作 ====================
const actions = {
  /**
   * 切换侧边栏
   * @param {Object} context - 上下文
   */
  toggleSidebar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },

  /**
   * 切换清屏模式
   * @param {Object} context - 上下文
   */
  toggleCleanMode({ commit }) {
    commit('TOGGLE_CLEAN_MODE')
  },

  /**
   * 完成章节
   * @param {Object} context - 上下文
   * @param {String} chapter - 章节名
   */
  completeChapter({ commit }, chapter) {
    commit('COMPLETE_CHAPTER', chapter)
  },

  /**
   * 取消完成章节
   * @param {Object} context - 上下文
   * @param {String} chapter - 章节名
   */
  uncompleteChapter({ commit }, chapter) {
    commit('UNCOMPLETE_CHAPTER', chapter)
  },

  /**
   * 切换章节完成状态
   * @param {Object} context - 上下文
   * @param {String} chapter - 章节名
   */
  toggleChapter({ state, commit }, chapter) {
    if (state.progress[chapter]) {
      commit('UNCOMPLETE_CHAPTER', chapter)
    } else {
      commit('COMPLETE_CHAPTER', chapter)
    }
  },

  /**
   * 重置所有进度
   * @param {Object} context - 上下文
   */
  resetProgress({ commit }) {
    commit('RESET_PROGRESS')
  }
}

// 导出模块
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
