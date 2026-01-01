/**
 * 默认子路由演示
 *
 * 当 path 为空字符串时，该子路由会作为默认子路由
 * 访问父路由时自动显示默认子路由的内容
 */

// 默认子路由 - 概览页面
const Overview = {
  template: `
    <div>
      <h5 style="margin-bottom: 12px;">📊 数据概览</h5>
      <div class="stat-cards">
        <div class="stat-card">
          <div class="number">1,234</div>
          <div class="label">总用户数</div>
        </div>
        <div class="stat-card">
          <div class="number">567</div>
          <div class="label">今日订单</div>
        </div>
        <div class="stat-card">
          <div class="number">89%</div>
          <div class="label">转化率</div>
        </div>
        <div class="stat-card">
          <div class="number">¥12,345</div>
          <div class="label">今日收入</div>
        </div>
      </div>
    </div>
  `
}

const Users = {
  template: `
    <div>
      <h5>👥 用户管理</h5>
      <p style="color: #86868b; margin-top: 8px;">用户列表、权限管理...</p>
    </div>
  `
}

const Orders = {
  template: `
    <div>
      <h5>📦 订单管理</h5>
      <p style="color: #86868b; margin-top: 8px;">订单列表、发货管理...</p>
    </div>
  `
}

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: {
      template: '<router-view></router-view>'
    },
    children: [
      // ⭐ 默认子路由：path 为空字符串
      // 访问 /dashboard 时会渲染 Overview 组件
      {
        path: '',
        component: Overview
      },
      { path: 'users', component: Users },
      { path: 'orders', component: Orders }
    ]
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 默认子路由的两种写法：
 *
 * 写法1：path 为空字符串
 * children: [
 *   { path: '', component: DefaultChild }
 * ]
 *
 * 写法2：使用 redirect
 * {
 *   path: '/dashboard',
 *   redirect: '/dashboard/overview',
 *   children: [
 *     { path: 'overview', component: Overview }
 *   ]
 * }
 *
 * 区别：
 * - 写法1：URL 保持 /dashboard
 * - 写法2：URL 变为 /dashboard/overview
 */
