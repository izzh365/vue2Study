/**
 * 嵌套路由基础演示
 *
 * 嵌套路由的核心：
 * 1. 父组件中需要有 <router-view>
 * 2. 路由配置中使用 children 定义子路由
 */

const Home = {
  template: `
    <div style="background: white; padding: 20px; border-radius: 12px; text-align: center;">
      <h4>🏠 首页</h4>
      <p style="color: #86868b;">点击上方用户查看嵌套路由效果</p>
    </div>
  `
}

// 用户信息
const users = {
  1: { name: '张三', email: 'zhangsan@vue.com' },
  2: { name: '李四', email: 'lisi@vue.com' }
}

// 父路由组件 - 用户页面布局
const User = {
  template: `
    <div class="user-layout">
      <!-- 用户头部 -->
      <div class="user-header">
        <h4>👤 {{ user.name }}</h4>
        <p>{{ user.email }}</p>
      </div>
      
      <!-- 子路由导航 -->
      <nav class="user-nav">
        <router-link :to="'/user/' + $route.params.id + '/profile'">
          📋 个人资料
        </router-link>
        <router-link :to="'/user/' + $route.params.id + '/posts'">
          📝 我的文章
        </router-link>
        <router-link :to="'/user/' + $route.params.id + '/settings'">
          ⚙️ 设置
        </router-link>
      </nav>
      
      <!-- ⭐ 子路由出口 -->
      <div class="user-content">
        <router-view></router-view>
      </div>
    </div>
  `,
  computed: {
    user() {
      return users[this.$route.params.id] || { name: '未知', email: '-' }
    }
  }
}

// 子路由组件
const UserProfile = {
  template: `
    <div>
      <h5>📋 个人资料</h5>
      <p style="color: #86868b; margin-top: 8px;">这是用户 {{ $route.params.id }} 的个人资料页面</p>
    </div>
  `
}

const UserPosts = {
  template: `
    <div>
      <h5>📝 我的文章</h5>
      <ul style="color: #86868b; margin-top: 8px; padding-left: 20px;">
        <li>Vue 入门教程</li>
        <li>JavaScript 进阶</li>
        <li>CSS 动画技巧</li>
      </ul>
    </div>
  `
}

const UserSettings = {
  template: `
    <div>
      <h5>⚙️ 账号设置</h5>
      <p style="color: #86868b; margin-top: 8px;">修改密码、绑定邮箱等设置选项</p>
    </div>
  `
}

// 路由配置
const routes = [
  { path: '/', component: Home },
  {
    path: '/user/:id',
    component: User,
    // ⭐ 子路由配置
    children: [
      // 注意：子路由的 path 不要以 / 开头
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts },
      { path: 'settings', component: UserSettings }
    ]
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 嵌套路由要点：
 *
 * 1. 父组件必须包含 <router-view>
 *    - 子路由内容会渲染到这里
 *
 * 2. children 中的 path 不要以 / 开头
 *    - path: 'profile' ✅
 *    - path: '/profile' ❌ (会变成根路径)
 *
 * 3. 完整路径 = 父路径 + 子路径
 *    - /user/1 + profile = /user/1/profile
 */
