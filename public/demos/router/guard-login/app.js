/**
 * 实战：完整的登录验证系统
 *
 * 功能：
 * 1. 未登录时访问私有页面，跳转登录页
 * 2. 登录成功后跳回原目标页面
 * 3. 登录后无法再访问登录页
 */

// 模拟 token 存储
const auth = {
  isLoggedIn: false,
  username: '',

  login(username) {
    this.isLoggedIn = true
    this.username = username
    localStorage.setItem('token', 'mock-token-' + Date.now())
  },

  logout() {
    this.isLoggedIn = false
    this.username = ''
    localStorage.removeItem('token')
  },

  checkAuth() {
    const token = localStorage.getItem('token')
    this.isLoggedIn = !!token
    return this.isLoggedIn
  }
}

// 公开页面
const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color:#86868b">公开页面，无需登录</p></div>'
}

const About = {
  template: '<div><h4>ℹ️ 关于</h4><p style="color:#86868b">公开页面，无需登录</p></div>'
}

// 私有页面
const Dashboard = {
  template: '<div><h4>📊 仪表盘</h4><p style="color:#34c759">需要登录才能访问</p></div>'
}

const Profile = {
  template: '<div><h4>👤 个人中心</h4><p style="color:#34c759">需要登录才能访问</p></div>'
}

const Settings = {
  template: '<div><h4>⚙️ 设置</h4><p style="color:#34c759">需要登录才能访问</p></div>'
}

// 登录页
const Login = {
  template: `
    <div class="login-form">
      <h4>🔐 用户登录</h4>
      <input v-model="username" placeholder="用户名" @keyup.enter="handleLogin">
      <input v-model="password" type="password" placeholder="密码" @keyup.enter="handleLogin">
      <button @click="handleLogin" :disabled="!username || !password">
        登录
      </button>
      <p style="text-align:center;margin-top:12px;font-size:12px;color:#86868b">
        任意用户名密码即可登录
      </p>
    </div>
  `,
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.password) return

      // 执行登录
      auth.login(this.username)

      // 跳转到原目标页面或首页
      const redirect = this.$route.query.redirect || '/'
      this.$router.replace(redirect)
    }
  }
}

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  // 私有路由，通过 meta.requiresAuth 标记
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } }
]

const router = new VueRouter({ routes })

/**
 * ⭐ 全局前置守卫：登录验证
 */
router.beforeEach((to, from, next) => {
  // 检查目标路由是否需要登录
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 检查登录状态
    if (!auth.checkAuth()) {
      // 未登录，跳转登录页，保存原目标
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      // 已登录，放行
      next()
    }
  } else if (to.path === '/login' && auth.checkAuth()) {
    // 已登录用户访问登录页，重定向到首页
    next('/')
  } else {
    // 其他情况，放行
    next()
  }
})

new Vue({
  el: '#app',
  router,
  computed: {
    isLoggedIn() {
      return auth.isLoggedIn
    },
    username() {
      return auth.username
    }
  },
  methods: {
    logout() {
      auth.logout()
      this.$router.push('/')
    }
  },
  created() {
    // 初始化时检查登录状态
    auth.checkAuth()
  }
})
