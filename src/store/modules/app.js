// store/modules/app.js
// 应用级别状态管理模块

// ==================== State 状态 ====================
const state = {
  // 侧边栏是否展开
  sidebarOpen: true,

  // 当前激活的章节
  activeChapter: null,

  // 学习进度（章节完成状态）
  progress: {
    es6: false,
    lifecycle: false,
    directives: false,
    computedWatch: false,
    customDirectives: false,
    components: false,
    router: false,
    vuex: false,
    axios: false
  }
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
   * 获取总章节数量
   * @returns {Number} 总数量
   */
  totalChapters() {
    return 9
  },

  /**
   * 计算学习进度百分比
   * @param {Object} state - 状态
   * @param {Object} getters - getters
   * @returns {Number} 百分比
   */
  progressPercent(state, getters) {
    return Math.round((getters.completedCount / getters.totalChapters) * 100)
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
   * 标记章节完成
   * @param {Object} state - 状态
   * @param {String} chapter - 章节名
   */
  COMPLETE_CHAPTER(state, chapter) {
    if (state.progress.hasOwnProperty(chapter)) {
      state.progress[chapter] = true
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
   * 完成章节
   * @param {Object} context - 上下文
   * @param {String} chapter - 章节名
   */
  completeChapter({ commit }, chapter) {
    commit('COMPLETE_CHAPTER', chapter)
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
