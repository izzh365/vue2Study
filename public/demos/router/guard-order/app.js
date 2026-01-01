/**
 * 导航守卫执行顺序演示
 *
 * 完整顺序：
 * 1. 失活组件 beforeRouteLeave
 * 2. 全局 beforeEach
 * 3. 路由 beforeEnter
 * 4. 激活组件 beforeRouteEnter
 * 5. 全局 afterEach
 * 6. beforeRouteEnter 的 next 回调
 */

const logs = Vue.observable([])
let order = 0

function addLog(message, type) {
  order++
  logs.push({
    order,
    message,
    type: 'log-' + type
  })
}

function clearLogs() {
  logs.splice(0)
  order = 0
}

// 组件工厂函数
function createPage(name) {
  return {
    template: `<div><h4>📄 ${name}</h4></div>`,

    beforeRouteEnter(to, from, next) {
      addLog(`${name}: beforeRouteEnter`, 'component')
      next(vm => {
        addLog(`${name}: beforeRouteEnter → next(vm) 回调`, 'component')
      })
    },

    beforeRouteLeave(to, from, next) {
      addLog(`${name}: beforeRouteLeave`, 'component')
      next()
    }
  }
}

const Home = createPage('首页')
const PageA = createPage('页面A')
const PageB = createPage('页面B')

const routes = [
  { path: '/', component: Home },
  {
    path: '/page-a',
    component: PageA,
    beforeEnter: (to, from, next) => {
      addLog('页面A: beforeEnter (路由独享)', 'route')
      next()
    }
  },
  {
    path: '/page-b',
    component: PageB,
    beforeEnter: (to, from, next) => {
      addLog('页面B: beforeEnter (路由独享)', 'route')
      next()
    }
  }
]

const router = new VueRouter({ routes })

// 全局前置守卫
router.beforeEach((to, from, next) => {
  addLog(`全局 beforeEach: ${from.path} → ${to.path}`, 'global')
  next()
})

// 全局后置钩子
router.afterEach((to, from) => {
  addLog('全局 afterEach', 'global')
})

new Vue({
  el: '#app',
  router,
  data: { logs },
  methods: { clearLogs }
})

/**
 * 完整导航解析流程：
 *
 * 1. 导航被触发
 * 2. 在失活组件里调用 beforeRouteLeave
 * 3. 调用全局 beforeEach
 * 4. 在重用组件里调用 beforeRouteUpdate (如果有)
 * 5. 在路由配置里调用 beforeEnter
 * 6. 解析异步路由组件
 * 7. 在被激活组件里调用 beforeRouteEnter
 * 8. 调用全局 beforeResolve (如果有)
 * 9. 导航被确认
 * 10. 调用全局 afterEach
 * 11. DOM 更新
 * 12. 调用 beforeRouteEnter 中 next 的回调函数
 */
