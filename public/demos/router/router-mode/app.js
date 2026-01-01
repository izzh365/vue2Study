/**
 * 路由模式对比演示
 *
 * Vue Router 支持两种模式：
 * 1. hash 模式（默认）- 使用 URL 的 hash 部分
 * 2. history 模式 - 使用 HTML5 History API
 */

const Home = { template: '<div>🏠 首页内容</div>' }
const About = { template: '<div>ℹ️ 关于页面</div>' }
const Contact = { template: '<div>📞 联系方式</div>' }

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/contact', component: Contact }
]

// Hash 模式（默认）
// URL 格式：http://example.com/#/about
const router = new VueRouter({
  mode: 'hash', // 默认值，可以省略
  routes
})

// History 模式需要这样配置：
// const router = new VueRouter({
//   mode: 'history',
//   routes
// })

new Vue({
  el: '#app',
  router,
  computed: {
    currentUrl() {
      return window.location.href
    }
  },
  // 监听路由变化更新 URL 显示
  watch: {
    $route() {
      this.$forceUpdate()
    }
  }
})

/**
 * 模式选择建议：
 *
 * 选择 Hash 模式，如果：
 * - 项目简单，不需要 SEO
 * - 无法配置服务器
 * - 需要兼容老浏览器
 *
 * 选择 History 模式，如果：
 * - 需要美观的 URL
 * - 需要 SEO
 * - 可以配置服务器
 *
 * History 模式服务器配置示例（Nginx）：
 *
 * location / {
 *   try_files $uri $uri/ /index.html;
 * }
 *
 * 这样当访问 /about 时，服务器会返回 index.html，
 * 然后由前端路由接管。
 */
