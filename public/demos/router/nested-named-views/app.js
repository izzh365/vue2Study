/**
 * 命名视图演示
 *
 * 有时候一个页面需要同时展示多个视图，而不是嵌套
 * 可以给 router-view 添加 name 属性来区分
 */

// 首页组件
const HomeHeader = {
  template: '<div>🏠 首页头部</div>'
}

const HomeSidebar = {
  template: `
    <div>
      <h5>📌 首页导航</h5>
      <ul>
        <li>🔥 热门</li>
        <li>⭐ 推荐</li>
        <li>📅 最新</li>
      </ul>
    </div>
  `
}

const HomeMain = {
  template: `
    <div>
      <h4>🏠 首页主内容</h4>
      <p style="color: #86868b; margin-top: 8px; font-size: 14px;">
        这是默认 router-view 渲染的内容
      </p>
    </div>
  `
}

const HomeFooter = {
  template: '<div>© 2024 Vue Router 学习项目</div>'
}

// 关于页组件
const AboutHeader = {
  template: '<div>ℹ️ 关于我们</div>'
}

const AboutSidebar = {
  template: `
    <div>
      <h5>📌 关于导航</h5>
      <ul>
        <li>🏢 公司</li>
        <li>👥 团队</li>
        <li>📞 联系</li>
      </ul>
    </div>
  `
}

const AboutMain = {
  template: `
    <div>
      <h4>ℹ️ 关于我们</h4>
      <p style="color: #86868b; margin-top: 8px; font-size: 14px;">
        这是一个学习 Vue Router 的项目
      </p>
    </div>
  `
}

const AboutFooter = {
  template: '<div>联系邮箱：about@vue.com</div>'
}

// 路由配置 - 使用 components (复数)
const routes = [
  {
    path: '/',
    // ⭐ 使用 components 配置多个命名视图
    components: {
      // name: 组件
      header: HomeHeader,
      sidebar: HomeSidebar,
      default: HomeMain, // 没有 name 的 router-view
      footer: HomeFooter
    }
  },
  {
    path: '/about',
    components: {
      header: AboutHeader,
      sidebar: AboutSidebar,
      default: AboutMain,
      footer: AboutFooter
    }
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 命名视图要点：
 *
 * 1. 模板中使用 name 属性
 *    <router-view name="sidebar"></router-view>
 *    <router-view></router-view>  <!-- 默认 default -->
 *
 * 2. 路由配置使用 components（复数！）
 *    components: {
 *      sidebar: SidebarComponent,
 *      default: MainComponent  // 对应没有 name 的 router-view
 *    }
 *
 * 应用场景：
 * - 复杂布局（头部、侧边栏、主内容、底部）
 * - 不同页面使用不同的布局组件
 */
