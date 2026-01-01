/**
 * 使用常量定义 Mutation 类型
 * 大型项目的最佳实践
 */

// 定义 mutation 类型常量
// 在实际项目中，通常放在单独的 mutation-types.js 文件中
const ADD_TODO = 'ADD_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const REMOVE_TODO = 'REMOVE_TODO'

const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '学习 Vue', done: true },
      { id: 2, text: '学习 Vuex', done: false }
    ]
  },
  
  mutations: {
    // 使用常量作为 mutation 名称
    // ES6 计算属性名语法
    [ADD_TODO](state, payload) {
      state.todos.push({
        id: Date.now(),
        text: payload.text,
        done: false
      })
    },
    
    [TOGGLE_TODO](state, id) {
      const todo = state.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
      }
    },
    
    [REMOVE_TODO](state, id) {
      const index = state.todos.findIndex(t => t.id === id)
      if (index > -1) {
        state.todos.splice(index, 1)
      }
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  data() {
    return {
      newTodo: ''
    }
  },
  
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  
  methods: {
    addTodo() {
      if (this.newTodo.trim()) {
        // 使用常量提交 mutation
        this.$store.commit(ADD_TODO, { text: this.newTodo })
        this.newTodo = ''
      }
    },
    
    toggleTodo(id) {
      this.$store.commit(TOGGLE_TODO, id)
    },
    
    removeTodo(id) {
      this.$store.commit(REMOVE_TODO, id)
    }
  }
})
