/**
 * 编程式导航实战应用：登录跳转
 *
 * 场景：
 * 1. 用户登录成功后跳转到 Dashboard
 * 2. 使用 replace 防止用户后退回登录页
 * 3. 退出登录后返回登录页
 */

// 模拟用户状态
const userState = Vue.observable({
  isLoggedIn: false,
  username: ''
})

// 登录页组件
const Login = {
  template: `
    <div class="login-form">
      <h4>🔐 用户登录</h4>
      <div class="form-group">
        <label>用户名</label>
        <input v-model="username" placeholder="请输入用户名">
      </div>
      <div class="form-group">
        <label>密码</label>
        <input type="password" v-model="password" placeholder="请输入密码">
      </div>
      <button 
        class="submit-btn" 
        @click="handleLogin"
        :disabled="!username || !password || loading"
      >
        {{ loading ? '登录中...' : '登 录' }}
      </button>
      <p style="text-align: center; margin-top: 12px; font-size: 13px; color: #86868b;">
        提示：输入任意用户名和密码即可登录
      </p>
    </div>
  `,
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true

      // 模拟登录请求
      await new Promise(r => setTimeout(r, 1000))

      // 更新状态
      userState.isLoggedIn = true
      userState.username = this.username

      this.loading = false

      // ⭐ 登录成功后使用 replace 跳转
      // 这样用户无法后退到登录页
      this.$router.replace('/dashboard')
    }
  }
}

// 仪表盘组件
const Dashboard = {
  template: `
    <div class="dashboard">
      <div class="avatar">👤</div>
      <h4>欢迎回来，{{ username }}！</h4>
      <p>这是您的个人仪表盘</p>
      <button class="logout-btn" @click="handleLogout">退出登录</button>
    </div>
  `,
  computed: {
    username() {
      return userState.username || '用户'
    }
  },
  methods: {
    handleLogout() {
      // 清除状态
      userState.isLoggedIn = false
      userState.username = ''

      // ⭐ 退出后使用 replace 跳转到登录页
      this.$router.replace('/login')
    }
  },
  // 路由守卫：未登录时重定向
  beforeRouteEnter(to, from, next) {
    if (!userState.isLoggedIn) {
      next('/login')
    } else {
      next()
    }
  }
}

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  computed: {
    isLoggedIn() {
      return userState.isLoggedIn
    }
  }
})

/**
 * 实战要点：
 *
 * 1. 登录成功后使用 replace 而非 push
 *    - 用户无法后退到登录页
 *    - 避免重复提交登录表单
 *
 * 2. 退出登录同样使用 replace
 *    - 防止用户后退到需要登录的页面
 *
 * 3. 配合路由守卫使用
 *    - beforeRouteEnter 检查登录状态
 *    - 未登录时重定向到登录页
 */
