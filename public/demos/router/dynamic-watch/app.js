/**
 * 响应路由参数变化演示
 *
 * 重要：当路由参数变化时（如 /user/1 → /user/2），
 * Vue 会复用已有的组件实例，不会重新创建！
 *
 * 这意味着组件的 created、mounted 等生命周期钩子不会再次调用。
 * 需要使用 watch 或 beforeRouteUpdate 来响应变化。
 */

// 存储日志（在根实例中共享）
const logs = Vue.observable([])

function addLog(message, type = '') {
  const time = new Date().toLocaleTimeString()
  logs.unshift({ time, message, type })
  if (logs.length > 10) logs.pop()
}

// 模拟用户数据
const users = {
  1: { name: '张三', bio: 'Vue 开发者' },
  2: { name: '李四', bio: 'React 爱好者' },
  3: { name: '王五', bio: '全栈工程师' }
}

// 用户详情组件
const UserDetail = {
  template: `
    <div class="user-card">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else>
        <h4>👤 {{ user.name }}</h4>
        <p style="color: #86868b;">{{ user.bio }}</p>
        <p style="margin-top: 12px; font-size: 14px;">
          当前用户ID: <strong style="color: #007aff;">{{ $route.params.id }}</strong>
        </p>
      </div>
    </div>
  `,
  data() {
    return {
      user: {},
      loading: false
    }
  },

  // 组件创建时（只执行一次！）
  created() {
    addLog('created() 执行 - 组件创建', 'warn')
    this.fetchUser()
  },

  // 方式1：使用 watch 监听 $route
  watch: {
    $route(to, from) {
      addLog(`watch: 路由从 ${from.path} 变为 ${to.path}`, 'info')
      this.fetchUser()
    }
  },

  // 方式2：使用 beforeRouteUpdate 导航守卫
  beforeRouteUpdate(to, from, next) {
    addLog(`beforeRouteUpdate: ${from.params.id} → ${to.params.id}`, 'info')
    next()
  },

  methods: {
    // 模拟异步获取用户数据
    async fetchUser() {
      this.loading = true
      addLog(`fetchUser() - 获取用户 ${this.$route.params.id}`)

      // 模拟网络延迟
      await new Promise(r => setTimeout(r, 500))

      const id = this.$route.params.id
      this.user = users[id] || { name: '未知', bio: '-' }
      this.loading = false

      addLog(`数据加载完成: ${this.user.name}`)
    }
  }
}

const routes = [
  { path: '/', redirect: '/user/1' },
  { path: '/user/:id', component: UserDetail }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  data: { logs }
})

/**
 * 两种响应方式对比：
 *
 * 1. watch $route
 *    watch: {
 *      '$route'(to, from) {
 *        this.fetchData()
 *      }
 *    }
 *
 * 2. beforeRouteUpdate 守卫
 *    beforeRouteUpdate(to, from, next) {
 *      this.fetchData()
 *      next()
 *    }
 *
 * 建议：
 * - 简单场景用 watch
 * - 需要阻止导航或执行异步操作时用 beforeRouteUpdate
 */
