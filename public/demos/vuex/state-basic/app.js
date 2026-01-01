/**
 * State 基础用法演示
 * 展示如何在 Vuex 中定义和访问状态
 */

// 创建 Vuex Store
const store = new Vuex.Store({
  state: {
    // 基本类型
    count: 100,
    message: 'Hello Vuex!',
    // 对象类型
    user: {
      name: '张三',
      age: 25,
      email: 'zhangsan@example.com'
    },
    // 数组类型
    todos: [
      { id: 1, text: '学习 Vue', done: true },
      { id: 2, text: '学习 Vuex', done: false }
    ]
  }
})

// 子组件 A
Vue.component('component-a', {
  template: `
    <div>
      <p>Count: <strong>{{ count }}</strong></p>
      <p>用户: <strong>{{ userName }}</strong></p>
    </div>
  `,
  computed: {
    // 通过 computed 访问 store.state
    count() {
      return this.$store.state.count
    },
    userName() {
      return this.$store.state.user.name
    }
  }
})

// 子组件 B
Vue.component('component-b', {
  template: `
    <div>
      <p>消息: <strong>{{ message }}</strong></p>
      <p>待办事项: <strong>{{ todoCount }}</strong> 条</p>
    </div>
  `,
  computed: {
    message() {
      return this.$store.state.message
    },
    todoCount() {
      return this.$store.state.todos.length
    }
  }
})

// 根实例
new Vue({
  el: '#app',
  store // 注入 store，让所有子组件都能通过 this.$store 访问
})
