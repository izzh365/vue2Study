/**
 * 编程式导航传递参数演示
 *
 * 两种参数类型：
 * 1. params - 路径参数（动态路由）
 * 2. query - 查询参数（URL 问号后的参数）
 */

const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color:#86868b">点击上方按钮测试参数传递</p></div>'
}

const User = {
  template: `
    <div>
      <h4>👤 用户详情</h4>
      <p style="color: #007aff; margin-top: 8px;">
        用户ID（params）: {{ $route.params.id }}
      </p>
    </div>
  `
}

const Search = {
  template: `
    <div>
      <h4>🔍 搜索结果</h4>
      <p style="margin-top: 8px;">
        <span style="color: #34c759;">关键词: {{ $route.query.keyword }}</span>
      </p>
      <p v-if="$route.query.page">
        <span style="color: #86868b;">页码: {{ $route.query.page }}</span>
      </p>
      <p v-if="$route.query.sort">
        <span style="color: #86868b;">排序: {{ $route.query.sort }}</span>
      </p>
    </div>
  `
}

const routes = [
  { path: '/', component: Home },
  { path: '/user/:id', name: 'user', component: User },
  { path: '/search', component: Search }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  methods: {
    /**
     * 使用 params（路径参数）
     * URL: /user/123
     */
    goWithParams(id) {
      // 方式1：使用 name + params（推荐）
      this.$router.push({
        name: 'user',
        params: { id: id }
      })

      // 方式2：直接拼接路径
      // this.$router.push(`/user/${id}`)
    },

    /**
     * 使用 query（查询参数）
     * URL: /search?keyword=vue
     */
    goWithQuery(keyword) {
      this.$router.push({
        path: '/search',
        query: { keyword: keyword }
      })
    },

    /**
     * 多个 query 参数
     * URL: /search?keyword=javascript&page=1&sort=newest
     */
    goWithQueryMultiple() {
      this.$router.push({
        path: '/search',
        query: {
          keyword: 'javascript',
          page: 1,
          sort: 'newest'
        }
      })
    }
  }
})

/**
 * params vs query 对比：
 *
 * params（路径参数）:
 * - URL: /user/123
 * - 需要在路由定义中声明 :id
 * - 使用 name + params（不能用 path + params）
 * - 页面刷新后依然存在
 *
 * query（查询参数）:
 * - URL: /search?keyword=vue
 * - 无需在路由中定义
 * - 可以用 path + query
 * - 更适合筛选、搜索等场景
 */
