/**
 * $router.push() 编程式导航演示
 *
 * push 方法用于跳转到新页面，会在历史记录中添加新记录
 */

const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color: #86868b;">欢迎回到首页</p></div>'
}

const About = {
  template: '<div><h4>ℹ️ 关于</h4><p style="color: #86868b;">关于我们页面</p></div>'
}

const Contact = {
  template: '<div><h4>📞 联系我们</h4><p style="color: #86868b;">联系方式页面</p></div>'
}

const User = {
  template: `
    <div>
      <h4>👤 用户详情</h4>
      <p style="color: #86868b;">用户ID: {{ $route.params.id }}</p>
    </div>
  `
}

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/user/:id', name: 'user', component: User }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  methods: {
    /**
     * 方式1：字符串路径
     */
    pushString(path) {
      this.$router.push(path)
    },

    /**
     * 方式2：对象形式（path）
     */
    pushObject(path) {
      this.$router.push({ path: path })
    },

    /**
     * 方式3：命名路由 + params
     * 使用 name 更安全，URL 变更不影响
     */
    pushNamed(name, id) {
      this.$router.push({
        name: name,
        params: { id: id }
      })
    }
  }
})

/**
 * push 方法的几种写法：
 *
 * 1. 字符串：this.$router.push('/about')
 *
 * 2. 对象（path）：
 *    this.$router.push({ path: '/about' })
 *
 * 3. 对象（name + params）：
 *    this.$router.push({ name: 'user', params: { id: 123 }})
 *
 * 4. 对象（path + query）：
 *    this.$router.push({ path: '/search', query: { q: 'vue' }})
 *
 * 注意：path 和 params 不能同时使用！
 * 如果提供了 path，params 会被忽略
 */
