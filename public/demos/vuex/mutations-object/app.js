/**
 * 对象风格提交演示
 * 展示使用对象作为 payload 的方式
 */

const store = new Vuex.Store({
  state: {
    users: [],
    nextId: 1
  },
  
  mutations: {
    /**
     * 添加用户
     * 对象风格提交时，整个对象作为 payload
     * @param {Object} state - Vuex state
     * @param {Object} payload - 包含 id, name, email
     */
    addUser(state, payload) {
      state.users.push({
        id: payload.id,
        name: payload.name,
        email: payload.email
      })
    }
  }
})

new Vue({
  el: '#app',
  store,
  
  data() {
    return {
      form: {
        name: '',
        email: ''
      }
    }
  },
  
  computed: {
    users() {
      return this.$store.state.users
    }
  },
  
  methods: {
    addUser() {
      if (this.form.name && this.form.email) {
        // 对象风格提交
        // 整个对象作为 payload 传入 mutation
        this.$store.commit({
          type: 'addUser',
          id: Date.now(),
          name: this.form.name,
          email: this.form.email
        })
        
        // 清空表单
        this.form = { name: '', email: '' }
      }
    }
  }
})
