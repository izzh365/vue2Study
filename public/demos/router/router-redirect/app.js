/**
 * 路由重定向与别名演示
 *
 * redirect: 重定向，URL 会改变
 * alias: 别名，URL 保持不变
 */

const Home = {
  template: `
    <div>
      <h3>🏠 首页</h3>
      <p>这是首页内容</p>
    </div>
  `
}

const About = {
  template: `
    <div>
      <h3>ℹ️ 关于页面</h3>
      <p>通过 /about 或别名 /info 都可以访问此页面</p>
    </div>
  `
}

const NotFound = {
  template: `
    <div style="text-align: center; padding: 20px;">
      <h3 style="color: #ff3b30;">🚫 404 - 页面未找到</h3>
      <p>您访问的路径 "{{ $route.path }}" 不存在</p>
      <router-link to="/" style="color: #007aff;">返回首页</router-link>
    </div>
  `
}

// 路由配置
const routes = [
  // 首页
  {
    path: '/',
    component: Home
  },

  // 重定向：访问 /home 会跳转到 /
  {
    path: '/home',
    redirect: '/' // URL 会变成 /
  },

  // 别名：访问 /info 和 /about 显示相同内容
  {
    path: '/about',
    component: About,
    alias: '/info' // URL 保持 /info，但显示 About 组件
  },

  // 动态重定向（函数形式）
  {
    path: '/redirect-to/:target',
    redirect: to => {
      // 根据参数动态重定向
      return '/' + to.params.target
    }
  },

  // 404 页面 - 必须放在最后！
  // * 匹配所有未定义的路由
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 重点总结：
 *
 * 1. redirect 重定向
 *    - 可以是字符串: redirect: '/home'
 *    - 可以是命名路由: redirect: { name: 'home' }
 *    - 可以是函数: redirect: to => '/target'
 *    - URL 会改变
 *
 * 2. alias 别名
 *    - 一个路由可以有多个访问路径
 *    - URL 不会改变
 *    - 适合 SEO 场景
 *
 * 3. 404 通配符
 *    - path: '*' 匹配所有路径
 *    - 必须放在 routes 数组最后
 *    - 否则会拦截其他路由
 */
