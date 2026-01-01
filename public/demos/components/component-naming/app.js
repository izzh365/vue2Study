/**
 * 组件命名规范示例
 *
 * 知识点：
 * 1. PascalCase（大驼峰）：MyComponent
 * 2. kebab-case（短横线）：my-component
 * 3. Vue 会自动在两种命名之间转换
 * 4. DOM 模板中必须使用 kebab-case
 */

// ==================== 使用 PascalCase 注册组件 ====================
// 注册时使用 PascalCase 是推荐做法

Vue.component('TestBox', {
  props: {
    message: {
      type: String,
      default: '默认消息'
    }
  },

  template: `
    <div class="test-box">
      📦 {{ message }}
    </div>
  `
})

// ==================== 多单词组件名示例 ====================

// 商品卡片组件
Vue.component('ProductCard', {
  props: ['title', 'price'],

  template: `
    <div class="test-box">
      <strong>{{ title }}</strong>
      <span>¥{{ price }}</span>
    </div>
  `
})

// 用户头像组件
Vue.component('UserAvatar', {
  props: {
    name: String,
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    }
  },

  template: `
    <div class="test-box">
      👤 {{ name }}
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== 组件命名规范 ===')
    console.log('')
    console.log('📋 两种命名方式：')
    console.log('  1. PascalCase: MyComponent')
    console.log('  2. kebab-case: my-component')
    console.log('')
    console.log('💡 最佳实践：')
    console.log('  - 注册时使用 PascalCase')
    console.log('  - 模板中可用 kebab-case 或 PascalCase')
    console.log('  - DOM 模板必须用 kebab-case')
    console.log('  - 组件名必须是多单词')
  }
})
