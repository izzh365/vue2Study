/**
 * Props 默认值和必填示例
 *
 * 知识点：
 * 1. default: 设置默认值
 * 2. required: true 表示必填
 * 3. 对象/数组类型的默认值必须用函数返回
 * 4. 验证只在开发环境生效
 */

// ==================== 按钮组件（演示默认值） ====================
Vue.component('my-button', {
  props: {
    // 按钮文字 - 必填项
    text: {
      type: String,
      required: true
    },

    // 按钮类型 - 有默认值
    type: {
      type: String,
      default: 'primary',
      // 自定义验证器（后面会详细讲）
      validator: function(value) {
        return ['primary', 'success', 'warning', 'danger'].includes(value)
      }
    },

    // 按钮大小 - 有默认值
    size: {
      type: String,
      default: 'medium',
      validator: function(value) {
        return ['small', 'medium', 'large'].includes(value)
      }
    },

    // 是否圆角 - 布尔值默认值
    rounded: {
      type: Boolean,
      default: false
    },

    // 图标 - 可选项
    icon: {
      type: String,
      default: ''
    }
  },

  computed: {
    // 计算 class
    btnClass() {
      return [
        'custom-btn',
        this.type,
        this.size,
        { 'rounded': this.rounded }
      ]
    }
  },

  template: `
    <button :class="btnClass">
      <span v-if="icon">{{ icon }}</span>
      {{ text }}
    </button>
  `
})

// ==================== 消息卡片组件（演示必填项） ====================
Vue.component('message-card', {
  props: {
    // 消息类型
    type: {
      type: String,
      default: 'info',
      validator: value => ['info', 'success', 'warning', 'error'].includes(value)
    },

    // 标题 - 必填（但允许用 slot 替代）
    title: {
      type: String,
      default: '提示'
    }
  },

  computed: {
    // 根据类型返回图标
    typeIcon() {
      const icons = {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
      }
      return icons[this.type] || 'ℹ️'
    }
  },

  template: `
    <div class="message-card" :class="type">
      <div class="message-icon">{{ typeIcon }}</div>
      <div class="message-content">
        <div class="message-title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="message-text">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  `
})

// ==================== 列表组件（演示数组默认值） ====================
Vue.component('list-component', {
  props: {
    // 数组类型的默认值必须用函数返回！
    items: {
      type: Array,
      // ✅ 正确写法：用函数返回
      default: function() {
        return ['默认项目 1', '默认项目 2', '默认项目 3']
      }
      // 也可以用箭头函数简写
      // default: () => ['默认项目 1', '默认项目 2', '默认项目 3']
    },

    // 对象类型同理
    config: {
      type: Object,
      default: function() {
        return {
          showIndex: true,
          bordered: false
        }
      }
    }
  },

  template: `
    <div style="background: #F9FAFB; padding: 16px; border-radius: 12px; margin-bottom: 12px;">
      <div style="color: #86868B; font-size: 13px; margin-bottom: 8px;">
        {{ items === customItems ? '自定义列表' : '使用默认值列表' }}
      </div>
      <ul style="margin: 0; padding-left: 20px;">
        <li v-for="(item, index) in items" :key="index" style="margin: 4px 0; color: #1D1D1F;">
          {{ item }}
        </li>
      </ul>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      customItems: ['苹果', '香蕉', '橙子', '葡萄']
    }
  },

  created() {
    console.log('=== Props 默认值和必填 ===')
    console.log('')
    console.log('📋 关键配置：')
    console.log('  required: true  - 必填项')
    console.log('  default: value  - 默认值')
    console.log('')
    console.log('⚠️ 注意：')
    console.log('  对象/数组类型的 default 必须是函数！')
    console.log('  default: () => [] 或 default: () => ({})')
  }
})
