// store/index.js
// Vuex 状态管理入口

import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块
import app from './modules/app'

// 注册 Vuex 插件
Vue.use(Vuex)

// ==================== 创建 Store 实例 ====================

export default new Vuex.Store({
  // 模块
  modules: {
    app
  },

  // 严格模式（仅开发环境）
  strict: process.env.NODE_ENV !== 'production'
})
