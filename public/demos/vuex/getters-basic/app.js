/**
 * Getters 基础用法
 * 展示如何定义和使用 Vuex Getters
 */

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '学习 Vue 基础语法', done: true },
      { id: 2, text: '学习 Vue 组件化', done: true },
      { id: 3, text: '学习 Vuex 状态管理', done: false },
      { id: 4, text: '学习 Vue Router', done: false },
      { id: 5, text: '完成项目实战', done: false }
    ]
  },
  
  getters: {
    // 过滤已完成的待办
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    },
    
    // 过滤未完成的待办
    pendingTodos(state) {
      return state.todos.filter(todo => !todo.done)
    },
    
    // 已完成数量
    doneCount(state) {
      return state.todos.filter(todo => todo.done).length
    },
    
    // 未完成数量
    pendingCount(state) {
      return state.todos.filter(todo => !todo.done).length
    },
    
    // 总数
    totalCount(state) {
      return state.todos.length
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 直接访问 state
    allTodos() {
      return this.$store.state.todos
    },
    
    // 通过属性访问 getters（有缓存）
    doneTodos() {
      return this.$store.getters.doneTodos
    },
    
    doneCount() {
      return this.$store.getters.doneCount
    },
    
    pendingCount() {
      return this.$store.getters.pendingCount
    },
    
    totalCount() {
      return this.$store.getters.totalCount
    }
  }
})
