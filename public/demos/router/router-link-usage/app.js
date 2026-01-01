/**
 * router-link 使用方式演示
 * 
 * router-link 是 Vue Router 提供的导航组件
 * 它会被渲染成 <a> 标签，但不会触发页面刷新
 */

// 路由组件
const Home = {
  template: `<div><strong>🏠 首页</strong> - 当前路径: {{ $route.path }}</div>`
}

const About = {
  template: `<div><strong>ℹ️ 关于</strong> - 当前路径: {{ $route.path }}</div>`
}

const User = {
  template: `
    <div>
      <strong>👤 用户详情</strong>
      <p>用户ID: {{ $route.params.id }}</p>
    </div>
  `
}

const Search = {
  template: `
    <div>
      <strong>🔍 搜索结果</strong>
      <p>关键词: {{ $route.query.keyword }}</p>
    </div>
  `
}

// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { 
    path: '/user/:id',  // 动态路由参数
    name: 'user',       // 命名路由
    component: User 
  },
  { path: '/search', component: Search }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * router-link 的 to 属性可以是：
 * 
 * 1. 字符串路径：to="/about"
 * 2. 对象（path）：:to="{ path: '/about' }"
 * 3. 对象（name）：:to="{ name: 'user', params: { id: 123 }}"
 * 4. 带 query：:to="{ path: '/search', query: { keyword: 'vue' }}"
 * 
 * 使用 name（命名路由）的好处：
 * - 修改 path 时不需要修改所有 router-link
 * - 更易读、更易维护
 */
