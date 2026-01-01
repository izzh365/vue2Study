/**
 * Getter 访问其他 Getter
 * 展示 getters 的第二个参数
 */

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '任务一', done: true },
      { id: 2, text: '任务二', done: true },
      { id: 3, text: '任务三', done: true },
      { id: 4, text: '任务四', done: false },
      { id: 5, text: '任务五', done: false }
    ]
  },
  
  getters: {
    // 基础 getter：过滤已完成
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    },
    
    // 访问其他 getter：使用 doneTodos 的结果
    // 第二个参数 getters 可以访问其他 getter
    doneTodosCount(state, getters) {
      return getters.doneTodos.length
    },
    
    // 组合使用：计算完成率
    completionRate(state, getters) {
      if (state.todos.length === 0) return 0
      return Math.round(getters.doneTodosCount / state.todos.length * 100)
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    totalCount() {
      return this.$store.state.todos.length
    },
    doneTodos() {
      return this.$store.getters.doneTodos
    },
    doneTodosCount() {
      return this.$store.getters.doneTodosCount
    },
    completionRate() {
      return this.$store.getters.completionRate
    }
  }
})
