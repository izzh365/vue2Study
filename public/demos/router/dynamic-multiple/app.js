/**
 * 多个动态参数演示
 * 
 * 一个路由可以有多个动态参数
 * 如：/user/:userId/post/:postId
 */

const Home = {
  template: `
    <div style="text-align: center; color: #86868b; padding: 20px;">
      👆 点击上方链接查看用户文章
    </div>
  `
}

// 模拟数据
const posts = {
  '1-101': { title: 'Vue 入门教程', content: '这是张三写的 Vue 基础文章...' },
  '1-102': { title: 'Vue Router 详解', content: '这是张三写的路由文章...' },
  '2-201': { title: 'JavaScript 进阶', content: '这是李四写的 JS 文章...' },
  '3-301': { title: 'CSS 动画技巧', content: '这是王五写的 CSS 文章...' }
}

const users = {
  1: '张三',
  2: '李四', 
  3: '王五'
}

// 文章详情组件
const PostDetail = {
  template: `
    <div>
      <h4 style="margin-bottom: 12px;">📄 {{ post ? post.title : '文章不存在' }}</h4>
      <p style="color: #86868b; margin-bottom: 16px;">{{ post ? post.content : '-' }}</p>
      
      <!-- 显示所有路由参数 -->
      <div class="params-display">
        <div class="param-item">
          <div class="label">用户ID (:userId)</div>
          <div class="value">{{ $route.params.userId }}</div>
        </div>
        <div class="param-item">
          <div class="label">文章ID (:postId)</div>
          <div class="value">{{ $route.params.postId }}</div>
        </div>
      </div>
      
      <div class="route-pattern">
        路由模式: /user/:userId/post/:postId<br>
        当前路径: {{ $route.path }}
      </div>
    </div>
  `,
  computed: {
    post() {
      const { userId, postId } = this.$route.params
      return posts[\`\${userId}-\${postId}\`]
    }
  }
}

const routes = [
  { path: '/', component: Home },
  { 
    // 多个动态参数
    path: '/user/:userId/post/:postId', 
    component: PostDetail 
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 多参数路由要点：
 * 
 * 1. 定义：path: '/user/:userId/post/:postId'
 * 
 * 2. 访问：
 *    - $route.params.userId
 *    - $route.params.postId
 * 
 * 3. 解构使用：
 *    const { userId, postId } = this.$route.params
 */
