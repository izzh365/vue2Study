/**
 * mapGetters 辅助函数
 * 展示 mapGetters 的数组和对象写法
 */

const { mapGetters } = Vuex

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '任务一', done: true },
      { id: 2, text: '任务二', done: true },
      { id: 3, text: '任务三', done: false },
      { id: 4, text: '任务四', done: false },
      { id: 5, text: '任务五', done: false }
    ]
  },
  
  getters: {
    doneTodos: state => state.todos.filter(t => t.done),
    pendingTodos: state => state.todos.filter(t => !t.done),
    doneCount: state => state.todos.filter(t => t.done).length,
    pendingCount: state => state.todos.filter(t => !t.done).length,
    totalCount: state => state.todos.length
  }
})

new Vue({
  el: '#app',
  store,
  
  computed: {
    // 方式1：数组写法 - 直接映射（名称相同）
    ...mapGetters([
      'doneTodos',
      'pendingTodos',
      'totalCount'
    ]),
    
    // 方式2：对象写法 - 可以重命名
    ...mapGetters({
      completedCount: 'doneCount',     // this.completedCount -> store.getters.doneCount
      unfinishedCount: 'pendingCount'  // this.unfinishedCount -> store.getters.pendingCount
    })
  }
})
