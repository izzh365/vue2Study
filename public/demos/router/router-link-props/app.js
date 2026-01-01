/**
 * router-link 常用属性演示
 * 
 * 主要属性：
 * - to: 目标路由
 * - active-class: 激活时的类名
 * - exact: 精确匹配
 * - tag: 渲染成其他标签
 * - replace: 不留历史记录
 */

const Home = {
  template: `
    <div>
      <strong>🏠 首页</strong>
      <p>路径: {{ $route.path }}</p>
    </div>
  `
}

const About = {
  template: `
    <div>
      <strong>ℹ️ 关于</strong>
      <p>路径: {{ $route.path }}</p>
    </div>
  `
}

const Team = {
  template: `
    <div>
      <strong>👥 团队</strong>
      <p>路径: {{ $route.path }}</p>
    </div>
  `
}

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/about/team', component: Team }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * router-link 属性说明：
 * 
 * 1. active-class="my-class"
 *    - 当链接处于激活状态时添加的类
 *    - 默认是 "router-link-active"
 *    - 注意：/about 激活时，/ 也会被激活（因为包含关系）
 * 
 * 2. exact
 *    - 精确匹配模式
 *    - 只有路径完全一致才激活
 *    - 常用于首页链接
 * 
 * 3. tag="button"
 *    - 改变渲染的标签
 *    - 可以是 button、li、div 等
 *    - 仍然保持导航功能
 * 
 * 4. replace
 *    - 导航时替换当前历史记录
 *    - 用户无法通过后退按钮返回
 *    - 适合登录后跳转等场景
 * 
 * 5. exact-active-class
 *    - 精确匹配时的类名
 *    - 默认是 "router-link-exact-active"
 */
