/**
 * 可选参数与通配符演示
 * 
 * 1. 可选参数：:param? - 参数可有可无
 * 2. 通配符：* - 匹配任意路径
 */

// 分类页面（可选参数）
const Category = {
  template: `
    <div>
      <h4>📂 {{ categoryName }}</h4>
      <p style="margin-top: 8px; font-size: 14px;">
        参数值: <code>{{ $route.params.type || '(空)' }}</code>
      </p>
      <p style="font-size: 13px; color: #86868b; margin-top: 8px;">
        路由模式: /category/:type?
      </p>
    </div>
  `,
  computed: {
    categoryName() {
      const types = {
        tech: '🔧 技术文章',
        life: '🌸 生活随笔',
        game: '🎮 游戏攻略'
      }
      return types[this.$route.params.type] || '📚 全部分类'
    }
  }
}

// 文档页面（通配符）
const Docs = {
  template: `
    <div>
      <h4>📖 文档页面</h4>
      <p style="margin-top: 8px; font-size: 14px;">
        完整路径: <code>{{ $route.params.pathMatch }}</code>
      </p>
      <p style="font-size: 13px; color: #86868b; margin-top: 8px;">
        路由模式: /docs/*
      </p>
    </div>
  `
}

// 404 页面
const NotFound = {
  template: `
    <div style="text-align: center;">
      <h4 style="color: #ff3b30;">🚫 404 页面不存在</h4>
      <p style="margin-top: 8px; font-size: 14px;">
        路径: <code>{{ $route.path }}</code>
      </p>
      <p style="font-size: 13px; color: #86868b; margin-top: 8px;">
        pathMatch: {{ $route.params.pathMatch }}
      </p>
    </div>
  `
}

const routes = [
  // 可选参数：? 表示参数可选
  { 
    path: '/category/:type?', 
    component: Category 
  },
  
  // 通配符：匹配 /docs 下的所有路径
  { 
    path: '/docs/*', 
    component: Docs 
  },
  
  // 404：匹配所有未定义路由（必须放最后）
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
 * 1. 可选参数 :param?
 *    - /category/:type? 可匹配 /category 和 /category/xxx
 *    - 没有参数时 $route.params.type 为 undefined
 * 
 * 2. 通配符 *
 *    - /docs/* 匹配 /docs/a/b/c
 *    - 匹配的部分存储在 $route.params.pathMatch
 * 
 * 3. 路由匹配优先级
 *    - 按定义顺序匹配
 *    - 通配符 * 放在最后，用于 404
 */
