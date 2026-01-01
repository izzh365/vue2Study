/**
 * Props 类型验证示例
 *
 * 知识点：
 * 1. Props 可以指定类型验证
 * 2. 类型验证在开发环境下会在控制台显示警告
 * 3. 支持的类型：String, Number, Boolean, Array, Object, Date, Function, Symbol
 * 4. 可以指定多种类型：[String, Number]
 */

// ==================== 用户资料组件（带类型验证） ====================
Vue.component('user-profile', {
  props: {
    // String 类型
    name: {
      type: String
    },

    // Number 类型
    age: {
      type: Number
    },

    // Boolean 类型
    isVip: {
      type: Boolean
    },

    // Array 类型
    tags: {
      type: Array
    },

    // Object 类型
    profile: {
      type: Object
    },

    // Date 类型
    createdAt: {
      type: Date
    }
  },

  computed: {
    // 格式化日期
    formattedDate() {
      if (this.createdAt instanceof Date) {
        return this.createdAt.toLocaleDateString('zh-CN')
      }
      return '未知'
    },

    // 获取头像文字
    avatarText() {
      return this.name ? this.name.charAt(0) : '?'
    }
  },

  template: `
    <div class="user-profile">
      <div class="user-avatar">{{ avatarText }}</div>
      <div class="user-info">
        <div class="user-name">
          {{ name }}
          <span v-if="isVip" style="color: #FF9500;">👑 VIP</span>
        </div>
        <div class="user-meta">
          {{ age }} 岁 · 注册于 {{ formattedDate }}
        </div>
        <div class="user-tags">
          <span class="tag" v-for="tag in tags" :key="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  `
})

// ==================== 错误类型演示组件 ====================
Vue.component('wrong-type-demo', {
  props: {
    // 期望 Number 类型
    count: {
      type: Number
    },

    // 期望 Array 类型
    items: {
      type: Array
    }
  },

  template: `
    <div style="padding: 16px; background: #FFF3E0; border-radius: 8px;">
      <p style="color: #E65100;">
        ⚠️ 打开控制台查看类型警告
      </p>
      <p style="color: #86868B; font-size: 14px; margin-top: 8px;">
        count 收到的值类型：{{ typeof count }}<br>
        items 收到的值类型：{{ typeof items }}
      </p>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      user: {
        name: '张三',
        age: 28,
        isVip: true,
        tags: ['前端开发', 'Vue 爱好者', '开源贡献者'],
        profile: {
          company: 'Tech Corp',
          position: '高级工程师'
        },
        createdAt: new Date('2023-01-15')
      }
    }
  },

  created() {
    console.log('=== Props 类型验证 ===')
    console.log('')
    console.log('📋 支持的类型：')
    console.log('  String, Number, Boolean')
    console.log('  Array, Object, Date')
    console.log('  Function, Symbol')
    console.log('')
    console.log('💡 类型验证只在开发环境生效')
    console.log('   生产环境不会有性能开销')
  }
})
