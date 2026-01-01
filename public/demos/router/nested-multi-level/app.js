/**
 * 多级嵌套路由演示
 * 
 * 嵌套路由可以继续嵌套，形成多级结构
 * 常用于复杂的后台管理系统
 */

// 二级组件 - 账号设置
const Account = {
  template: `
    <div class="level-box level-2">
      <div class="level-header">👤 Level 2: 账号设置</div>
      <div class="level-nav">
        <router-link to="/settings/account/profile">基本信息</router-link>
        <router-link to="/settings/account/avatar">头像</router-link>
      </div>
      <div class="level-content">
        <router-view></router-view>
      </div>
    </div>
  `
}

// 三级组件
const Profile = {
  template: `
    <div class="level-box level-3">
      <div class="level-header">📋 Level 3: 基本信息</div>
      <div class="level-content">
        <p style="font-size: 14px; color: #86868b;">
          这是第三级路由内容<br>
          路径：/settings/account/profile
        </p>
      </div>
    </div>
  `
}

const Avatar = {
  template: `
    <div class="level-box level-3">
      <div class="level-header">🖼️ Level 3: 头像设置</div>
      <div class="level-content">
        <p style="font-size: 14px; color: #86868b;">
          上传和更换头像<br>
          路径：/settings/account/avatar
        </p>
      </div>
    </div>
  `
}

// 二级组件 - 安全设置
const Security = {
  template: `
    <div class="level-box level-2">
      <div class="level-header">🔒 Level 2: 安全设置</div>
      <div class="level-nav">
        <router-link to="/settings/security/password">密码</router-link>
        <router-link to="/settings/security/2fa">两步验证</router-link>
      </div>
      <div class="level-content">
        <router-view></router-view>
      </div>
    </div>
  `
}

const Password = {
  template: `
    <div class="level-box level-3">
      <div class="level-header">🔑 Level 3: 修改密码</div>
      <div class="level-content">
        <p style="font-size: 14px; color: #86868b;">修改登录密码</p>
      </div>
    </div>
  `
}

const TwoFA = {
  template: `
    <div class="level-box level-3">
      <div class="level-header">📱 Level 3: 两步验证</div>
      <div class="level-content">
        <p style="font-size: 14px; color: #86868b;">设置两步验证保护账号</p>
      </div>
    </div>
  `
}

// 路由配置 - 三级嵌套
const routes = [
  { path: '/', redirect: '/settings/account/profile' },
  {
    path: '/settings',
    component: { template: '<router-view></router-view>' },
    children: [
      {
        path: 'account',
        component: Account,
        children: [
          { path: '', redirect: 'profile' },
          { path: 'profile', component: Profile },
          { path: 'avatar', component: Avatar }
        ]
      },
      {
        path: 'security',
        component: Security,
        children: [
          { path: '', redirect: 'password' },
          { path: 'password', component: Password },
          { path: '2fa', component: TwoFA }
        ]
      }
    ]
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 多级嵌套结构：
 * 
 * /settings
 *   └── /account           (二级)
 *       ├── /profile       (三级)
 *       └── /avatar        (三级)
 *   └── /security          (二级)
 *       ├── /password      (三级)
 *       └── /2fa           (三级)
 * 
 * 注意事项：
 * - 每一级都需要 <router-view>
 * - 嵌套层级不宜过深（建议不超过3层）
 * - 合理使用默认子路由和重定向
 */
