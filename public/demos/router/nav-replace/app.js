/**
 * push vs replace 对比演示
 *
 * push: 添加新的历史记录，可以后退
 * replace: 替换当前历史记录，无法后退到被替换的页面
 */

const logs = Vue.observable([])

function addLog(message) {
  const time = new Date().toLocaleTimeString()
  logs.unshift(`[${time}] ${message}`)
  if (logs.length > 6) logs.pop()
}

const Home = {
  template: '<div><h4>🏠 首页</h4></div>',
  created() {
    addLog('进入首页')
  }
}

const PageA = {
  template: '<div><h4>📄 Page A</h4><p style="color:#86868b">通过 push 到达</p></div>',
  created() {
    addLog('push → Page A')
  }
}

const PageB = {
  template: '<div><h4>📄 Page B</h4><p style="color:#86868b">通过 push 到达</p></div>',
  created() {
    addLog('push → Page B')
  }
}

const PageC = {
  template: '<div><h4>📄 Page C</h4><p style="color:#ff9500">通过 replace 到达</p></div>',
  created() {
    addLog('replace → Page C (替换了上一条记录)')
  }
}

const PageD = {
  template: '<div><h4>📄 Page D</h4><p style="color:#ff9500">通过 replace 到达</p></div>',
  created() {
    addLog('replace → Page D (替换了上一条记录)')
  }
}

const routes = [
  { path: '/', component: Home },
  { path: '/page-a', component: PageA },
  { path: '/page-b', component: PageB },
  { path: '/page-c', component: PageC },
  { path: '/page-d', component: PageD }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  data: { logs },
  methods: {
    /**
     * push - 添加历史记录
     */
    usePush(path) {
      this.$router.push(path)
    },

    /**
     * replace - 替换当前历史记录
     */
    useReplace(path) {
      this.$router.replace(path)
    }
  }
})

/**
 * push vs replace 区别：
 *
 * push('/b')：
 * 历史: [A] → [A, B]
 * 可以后退回 A
 *
 * replace('/b')：
 * 历史: [A] → [B]
 * A 被替换，无法后退
 *
 * replace 适用场景：
 * - 登录成功后跳转（不允许后退回登录页）
 * - 404 页面重定向
 * - 权限不足时跳转
 */
