/**
 * 动态路由基础演示
 * 
 * 动态路由参数以冒号 : 开头
 * 例如 /user/:id 可以匹配 /user/1, /user/2, /user/abc 等
 */

// 模拟用户数据
const users = {
  1: { name: '张三', email: 'zhangsan@vue.com', role: '管理员' },
  2: { name: '李四', email: 'lisi@vue.com', role: '编辑' },
  3: { name: '王五', email: 'wangwu@vue.com', role: '用户' }
}

// 首页组件
const Home = {
  template: `
    <div class="placeholder">
      <p>👆 点击上方用户查看详情</p>
    </div>
  `
}

// 用户详情组件
const UserDetail = {
  template: `
    <div class="user-detail">
      <div class="avatar">{{ user ? user.name[0] : '?' }}</div>
      <h4>{{ user ? user.name : '未知用户' }}</h4>
      <p>📧 {{ user ? user.email : '-' }}</p>
      <p>🏷️ {{ user ? user.role : '-' }}</p>
      <p style="margin-top: 12px; font-size: 14px; color: #86868b;">
        用户ID: <strong style="color: #007aff;">{{ $route.params.id }}</strong>
      </p>
    </div>
  `,
  computed: {
    /**
     * 根据路由参数获取用户信息
     * $route.params.id 对应路由中的 :id
     */
    user() {
      const id = this.$route.params.id
      return users[id] || null
    }
  }
}

// 路由配置
const routes = [
  { path: '/', component: Home },
  { 
    path: '/user/:id',  // :id 是动态参数
    component: UserDetail 
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 知识点总结：
 * 
 * 1. 定义动态参数：path: '/user/:id'
 *    - :id 是动态部分，可以匹配任意值
 *    - 参数名可以自定义，如 :userId, :postId
 * 
 * 2. 获取参数值：this.$route.params.id
 *    - 在模板中：{{ $route.params.id }}
 *    - 在组件中：this.$route.params.id
 * 
 * 3. 参数值总是字符串类型
 *    - 如需数字：parseInt($route.params.id)
 */
