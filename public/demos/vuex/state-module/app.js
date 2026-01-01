/**
 * 模块中的 State
 * 展示 Vuex 模块化后如何访问各模块的 state
 */

// 用户模块
const userModule = {
  // 模块中的 state 必须是函数
  state: () => ({
    name: '王五',
    isLoggedIn: true,
    avatar: 'avatar.jpg'
  })
}

// 购物车模块
const cartModule = {
  state: () => ({
    items: [
      { id: 1, name: 'iPhone 15', price: 6999 },
      { id: 2, name: 'AirPods Pro', price: 1999 },
      { id: 3, name: 'MacBook Air', price: 8999 }
    ],
    total: 17997
  })
}

// 创建 Store（包含模块）
const store = new Vuex.Store({
  // 根状态
  state: {
    appName: 'Vue2 学习项目',
    version: '1.0.0'
  },
  
  // 注册模块
  modules: {
    user: userModule,
    cart: cartModule
  }
})

new Vue({
  el: '#app',
  store
})
