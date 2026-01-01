/**
 * 路由独享守卫 beforeEnter 演示
 *
 * 在路由配置中直接定义，只对当前路由生效
 */

// 模拟用户角色状态
const userState = Vue.observable({
  role: 'guest',
  logs: []
})

function addLog(message) {
  const time = new Date().toLocaleTimeString()
  userState.logs.unshift(`[${time}] ${message}`)
  if (userState.logs.length > 6) userState.logs.pop()
}

// 页面组件
const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color:#86868b">所有人都可以访问</p></div>'
}

const UserCenter = {
  template: '<div><h4>👤 用户中心</h4><p style="color:#86868b">登录用户可访问</p></div>'
}

const AdminPanel = {
  template: `
    <div>
      <h4>👑 管理后台</h4>
      <p style="color:#34c759">欢迎管理员！</p>
    </div>
  `
}

const Forbidden = {
  template: `
    <div>
      <h4 style="color:#ff3b30">⛔ 403 无权限</h4>
      <p style="color:#86868b">您没有访问该页面的权限</p>
    </div>
  `
}

const routes = [
  { path: '/', component: Home },
  { path: '/user', component: UserCenter },
  { path: '/forbidden', component: Forbidden },
  {
    path: '/admin',
    component: AdminPanel,
    /**
     * ⭐ 路由独享守卫 beforeEnter
     * 只在进入这个路由时执行
     */
    beforeEnter: (to, from, next) => {
      addLog(`beforeEnter: 进入管理后台`)
      addLog(`  当前角色: ${userState.role}`)

      if (userState.role === 'admin') {
        addLog(`  ✅ 权限验证通过`)
        next() // 放行
      } else {
        addLog(`  ⛔ 权限不足，跳转到 403`)
        next('/forbidden') // 跳转到无权限页
      }
    }
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  computed: {
    role() {
      return userState.role
    },
    logs() {
      return userState.logs
    }
  },
  methods: {
    setRole(role) {
      userState.role = role
      addLog(`切换角色为: ${role}`)
    }
  }
})

/**
 * beforeEnter 特点：
 *
 * 1. 在路由配置中定义（routes 数组里）
 * 2. 只对该路由生效
 * 3. 适合：
 *    - 特定页面的权限验证
 *    - 某个路由的特殊逻辑
 *
 * 对比：
 * - beforeEach: 全局，所有路由
 * - beforeEnter: 单个路由独享
 * - beforeRouteEnter: 组件内定义
 */
