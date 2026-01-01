/**
 * 默认插槽示例
 *
 * 知识点：
 * 1. <slot></slot> 定义插槽占位
 * 2. 父组件可以传入任意内容
 * 3. 可以设置后备内容（默认内容）
 * 4. 插槽可以包含文本、HTML、其他组件
 */

// ==================== 卡片组件 ====================
Vue.component('my-card', {
  props: {
    title: {
      type: String,
      required: true
    }
  },

  template: `
    <div class="card-component">
      <div class="card-header">{{ title }}</div>
      <div class="card-body">
        <!-- 默认插槽：父组件传入的内容会出现在这里 -->
        <slot></slot>
      </div>
    </div>
  `
})

// ==================== 按钮组件 ====================
Vue.component('my-button', {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },

  template: `
    <button class="my-button" :class="type">
      <!-- 插槽接收按钮内容 -->
      <slot></slot>
    </button>
  `
})

// ==================== 提示框组件 ====================
Vue.component('alert-box', {
  props: {
    type: {
      type: String,
      default: 'info',
      validator: val => ['info', 'warning', 'error'].includes(val)
    }
  },

  computed: {
    icon() {
      const icons = {
        info: 'ℹ️',
        warning: '⚠️',
        error: '❌'
      }
      return icons[this.type]
    }
  },

  template: `
    <div class="alert-box" :class="type">
      <span class="alert-icon">{{ icon }}</span>
      <div class="alert-content">
        <slot></slot>
      </div>
    </div>
  `
})

// ==================== 带后备内容的按钮 ====================
Vue.component('submit-button', {
  template: `
    <button class="my-button primary" style="margin: 8px;">
      <!-- 后备内容：父组件不传内容时显示 -->
      <slot>提交</slot>
    </button>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== 默认插槽 ===')
    console.log('')
    console.log('📋 基本语法：')
    console.log('  子组件：<slot></slot>')
    console.log('  父组件：<my-comp>内容</my-comp>')
    console.log('')
    console.log('📋 后备内容：')
    console.log('  <slot>默认内容</slot>')
    console.log('')
    console.log('💡 插槽可以接收：')
    console.log('  - 文本')
    console.log('  - HTML 元素')
    console.log('  - 其他组件')
  }
})
