/**
 * 局部组件注册示例
 *
 * 知识点：
 * 1. 使用 components 选项局部注册组件
 * 2. 局部组件只能在注册它的组件/实例中使用
 * 3. 推荐使用局部注册，避免全局污染
 */

// ==================== 定义组件对象 ====================
// 组件对象可以单独定义，然后在 components 中注册

const UserCard = {
  // 组件名称（便于调试）
  name: 'UserCard',

  // props 定义组件接收的属性
  props: {
    name: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: '成员'
    }
  },

  // computed 计算属性
  computed: {
    /**
     * 获取名字首字母作为头像
     */
    initial() {
      return this.name.charAt(0)
    }
  },

  // template 组件模板
  template: `
    <div class="user-card">
      <div class="user-avatar">{{ initial }}</div>
      <div class="user-info">
        <h4>{{ name }}</h4>
        <p>{{ role }}</p>
      </div>
    </div>
  `
}

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  // 局部注册组件
  // 语法：components: { '组件名': 组件对象 }
  components: {
    // ES6 简写：UserCard 等同于 'UserCard': UserCard
    // 在模板中可以使用 <user-card> 或 <UserCard>
    UserCard
  },

  data() {
    return {
      message: '局部组件只在当前实例中可用'
    }
  },

  created() {
    console.log('局部组件 UserCard 已注册')
    console.log('注意：在其他 Vue 实例中无法使用此组件')
  }
})
