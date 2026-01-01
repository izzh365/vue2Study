/**
 * 全局前置守卫 beforeEach 演示
 *
 * 用于：
 * - 登录验证
 * - 权限检查
 * - 页面访问控制
 */

// 模拟登录状态
const authState = Vue.observable({
  isLoggedIn: false,
  logs: []
})

function addLog(message) {
  const time = new Date().toLocaleTimeString()
  authState.logs.unshift(`[${time}] ${message}`)
  if (authState.logs.length > 8) authState.logs.pop()
}

// 页面组件
const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color:#86868b">公开页面，无需登录</p></div>'
}

const About = {
  template: '<div><h4>ℹ️ 关于</h4><p style="color:#86868b">公开页面，无需登录</p></div>'
}

const Dashboard = {
  template: '<div><h4>📊 仪表盘</h4><p style="color:#34c759">✅ 需要登录才能访问</p></div>'
}

const Profile = {
  template: '<div><h4>👤 个人中心</h4><p style="color:#34c759">✅ 需要登录才能访问</p></div>'
}

const Login = {
  template: `
    <div>
      <h4>🔐 登录页</h4>
      <p style="color:#ff9500">请先登录后再访问</p>
      <p style="font-size:13px;color:#86868b;margin-top:8px">
        尝试访问: {{ $route.query.redirect || '无' }}
      </p>
    </div>
  `
}

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  // 需要登录的路由，通过 meta 标记
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } }
]

const router = new VueRouter({ routes })

/**
 * ⭐ 全局前置守卫 beforeEach
 *
 * 参数：
 * - to: 即将进入的目标路由对象
 * - from: 当前导航正要离开的路由
 * - next: 必须调用以 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
  addLog(`beforeEach: ${from.path} → ${to.path}`)

  // 检查目标路由是否需要登录（通过 meta.requiresAuth）
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 需要登录
    if (!authState.isLoggedIn) {
      // 未登录，重定向到登录页
      addLog(`⛔ 未登录，重定向到登录页`)
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 保存原目标，登录后跳回
      })
    } else {
      // 已登录，放行
      addLog(`✅ 已登录，允许访问`)
      next()
    }
  } else {
    // 不需要登录的页面，直接放行
    next()
  }
})

new Vue({
  el: '#app',
  router,
  computed: {
    isLoggedIn() {
      return authState.isLoggedIn
    },
    logs() {
      return authState.logs
    }
  },
  methods: {
    toggleLogin() {
      authState.isLoggedIn = !authState.isLoggedIn
      addLog(authState.isLoggedIn ? '✅ 已登录' : '❌ 已退出')
    }
  }
})

/**
 * beforeEach 要点：
 *
 * 1. 每次路由跳转都会触发
 * 2. 必须调用 next() 才能继续
 * 3. 可通过 meta 字段标记路由属性
 * 4. 使用 to.matched.some() 检查嵌套路由
 * 5. next('/login') 时注意条件判断，避免无限循环
 */
