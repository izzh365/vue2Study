/**
 * Props 解耦路由参数
 *
 * 使用 props: true 可以将路由参数作为 props 传递给组件
 * 这样组件不再依赖 $route，更易复用和测试
 */

// 模拟用户数据
const users = {
  1: { name: '张三', role: '管理员' },
  2: { name: '李四', role: '编辑' },
  3: { name: '王五', role: '用户' }
}

// ✅ 使用 props 的组件（推荐）
const UserWithProps = {
  // 直接声明 id 为 prop
  props: ['id'],

  template: `
    <div>
      <h4>👤 {{ user.name }}</h4>
      <p style="color: #86868b;">{{ user.role }}</p>
      <p style="margin-top: 12px; font-size: 14px;">
        ID (来自 props): <strong style="color: #34c759;">{{ id }}</strong>
      </p>
      <p style="font-size: 13px; color: #86868b; margin-top: 8px;">
        ✅ 组件不依赖 $route，可以独立使用
      </p>
    </div>
  `,

  computed: {
    user() {
      // 使用 props 中的 id
      return users[this.id] || { name: '未知', role: '-' }
    }
  }
}

// 路由配置
const routes = [
  { path: '/', redirect: '/user/1' },
  {
    path: '/user/:id',
    component: UserWithProps,
    // ✅ 启用 props
    // 布尔模式：将 params 作为 props 传递
    props: true
  }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * props 的三种模式：
 *
 * 1. 布尔模式（最常用）
 *    props: true
 *    将 $route.params 作为 props 传递
 *
 * 2. 对象模式（静态 props）
 *    props: { newsletter: true }
 *    传递固定的 props
 *
 * 3. 函数模式（最灵活）
 *    props: route => ({
 *      id: route.params.id,
 *      query: route.query.q
 *    })
 *    可以转换和组合各种值
 *
 * 解耦的好处：
 * - 组件可以独立于路由使用
 * - 更容易测试（直接传 props）
 * - 代码更清晰
 */
