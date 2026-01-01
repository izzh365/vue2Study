/**
 * 展开运算符混合本地计算属性
 * 展示如何将 mapState 与本地 computed 结合使用
 */

const { mapState } = Vuex

const store = new Vuex.Store({
  state: {
    count: 42,
    message: '来自 Vuex Store 的消息'
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 本地计算属性
    localTime() {
      return new Date().toLocaleTimeString()
    },
    
    // 依赖 store state 的本地计算属性
    doubleCount() {
      return this.count * 2
    },
    
    // 使用展开运算符将 mapState 返回的对象混入
    // mapState 返回 { count: fn, message: fn }
    // ...mapState 将其展开到 computed 对象中
    ...mapState(['count', 'message'])
  }
})
