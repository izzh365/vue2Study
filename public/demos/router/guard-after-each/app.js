/**
 * 全局后置钩子 afterEach 演示
 *
 * 用于：
 * - 更新页面标题
 * - 发送页面访问统计
 * - 关闭加载进度条
 */

const appState = Vue.observable({
  pageTitle: '首页',
  logs: []
})

function addLog(message) {
  const time = new Date().toLocaleTimeString()
  appState.logs.unshift(`[${time}] ${message}`)
  if (appState.logs.length > 6) appState.logs.pop()
}

// 页面组件
const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color:#86868b">欢迎访问我们的网站</p></div>'
}

const Products = {
  template: '<div><h4>📦 产品介绍</h4><p style="color:#86868b">我们的产品和服务</p></div>'
}

const News = {
  template: '<div><h4>📰 新闻动态</h4><p style="color:#86868b">最新新闻和公告</p></div>'
}

const Contact = {
  template: '<div><h4>📞 联系我们</h4><p style="color:#86868b">联系方式和地址</p></div>'
}

const routes = [
  { path: '/', component: Home, meta: { title: '首页' } },
  { path: '/products', component: Products, meta: { title: '产品介绍' } },
  { path: '/news', component: News, meta: { title: '新闻动态' } },
  { path: '/contact', component: Contact, meta: { title: '联系我们' } }
]

const router = new VueRouter({ routes })

/**
 * ⭐ 全局后置钩子 afterEach
 *
 * 特点：
 * - 导航完成后触发
 * - 没有 next 参数（无法改变导航）
 * - 适合做一些"收尾工作"
 */
router.afterEach((to, from) => {
  // 1. 更新页面标题
  const title = to.meta.title || '默认标题'
  appState.pageTitle = title
  document.title = title // 修改浏览器标题

  // 2. 记录日志（模拟发送统计）
  addLog(`afterEach: 进入「${title}」页面`)
  addLog(`  统计: PV +1, 来源: ${from.path || '直接访问'}`)

  // 3. 关闭加载进度条（如 NProgress）
  // NProgress.done()
})

new Vue({
  el: '#app',
  router,
  computed: {
    pageTitle() {
      return appState.pageTitle
    },
    logs() {
      return appState.logs
    }
  }
})

/**
 * afterEach 常见用途：
 *
 * 1. 更新页面标题
 *    document.title = to.meta.title
 *
 * 2. 发送页面访问统计
 *    analytics.send('pageview', to.fullPath)
 *
 * 3. 关闭加载进度条
 *    NProgress.done()
 *
 * 4. 滚动到页面顶部
 *    window.scrollTo(0, 0)
 *
 * 注意：afterEach 没有 next，不能改变导航
 */
