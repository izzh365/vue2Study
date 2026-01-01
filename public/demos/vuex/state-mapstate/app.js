/**
 * mapState 辅助函数演示
 * 展示 mapState 的各种用法
 */

// 从 Vuex 解构出 mapState
const { mapState } = Vuex

// 创建 Store
const store = new Vuex.Store({
  state: {
    count: 10,
    message: 'Vuex 状态管理',
    user: {
      name: '李四',
      role: '管理员'
    }
  }
})

// 根实例
new Vue({
  el: '#app',
  store,
  
  // 本地数据
  data() {
    return {
      localCount: 5
    }
  },
  
  computed: {
    // 方式1：对象写法
    ...mapState({
      // 箭头函数写法
      count: state => state.count,
      
      // 字符串别名：'msg' 映射到 state.message
      msg: 'message',
      
      // 普通函数：可以使用 this 访问本地数据
      countPlusLocal(state) {
        return state.count + this.localCount
      }
    }),
    
    // 方式2：数组写法（属性名与 state 键名相同）
    ...mapState(['message', 'user'])
  }
})
