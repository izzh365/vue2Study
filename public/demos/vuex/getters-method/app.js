/**
 * Getter 返回函数（带参数）
 * 展示如何让 getter 接受参数
 */

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '学习 JavaScript', done: true },
      { id: 2, text: '学习 Vue 2', done: true },
      { id: 3, text: '学习 Vuex', done: false },
      { id: 4, text: '学习 Vue Router', done: false },
      { id: 5, text: '完成项目', done: false }
    ]
  },
  
  getters: {
    /**
     * 返回函数的 getter
     * 通过闭包接收参数
     * 注意：这种方式不会被缓存！
     */
    getTodoById: (state) => (id) => {
      return state.todos.find(todo => todo.id === id)
    },
    
    // 另一个例子：按状态筛选
    getTodosByStatus: (state) => (done) => {
      return state.todos.filter(todo => todo.done === done)
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  data() {
    return {
      searchId: 1
    }
  },
  
  computed: {
    foundTodo() {
      // 通过方法访问，传入参数
      return this.$store.getters.getTodoById(this.searchId)
    }
  }
})
