/**
 * Props 自定义验证示例
 *
 * 知识点：
 * 1. validator 函数用于自定义验证逻辑
 * 2. 返回 true 表示验证通过，false 表示失败
 * 3. 验证失败会在控制台显示警告
 * 4. 常见场景：范围验证、枚举验证、格式验证
 */

// ==================== 评分组件（范围验证） ====================
Vue.component('star-rating', {
  props: {
    rating: {
      type: Number,
      required: true,
      /**
       * 自定义验证器
       * @param {number} value - 传入的值
       * @returns {boolean} - 是否验证通过
       */
      validator: function (value) {
        // 必须是 1-5 之间的整数
        const valid = value >= 1 && value <= 5 && Number.isInteger(value)
        if (!valid) {
          console.warn(`[star-rating] rating 必须是 1-5 之间的整数，收到：${value}`)
        }
        return valid
      }
    }
  },

  computed: {
    // 生成星星数组
    stars() {
      return [1, 2, 3, 4, 5].map(n => ({
        value: n,
        active: n <= Math.min(Math.max(this.rating, 1), 5)
      }))
    },

    // 评分文字
    ratingText() {
      const texts = ['', '很差', '较差', '一般', '较好', '很好']
      return texts[Math.min(Math.max(this.rating, 1), 5)] || ''
    }
  },

  template: `
    <div>
      <div class="rating-display">
        <span 
          v-for="star in stars" 
          :key="star.value"
          class="star"
          :class="star.active ? 'active' : 'inactive'"
        >
          {{ star.active ? '★' : '☆' }}
        </span>
      </div>
      <div class="rating-text">{{ ratingText }}</div>
    </div>
  `
})

// ==================== 进度条组件（百分比验证） ====================
Vue.component('progress-bar', {
  props: {
    // 百分比值
    percent: {
      type: Number,
      default: 0,
      validator: function (value) {
        // 必须是 0-100 之间的数字
        const valid = value >= 0 && value <= 100
        if (!valid) {
          console.warn(`[progress-bar] percent 必须是 0-100 之间的数字，收到：${value}`)
        }
        return valid
      }
    },

    // 颜色
    color: {
      type: String,
      default: '#007AFF'
    }
  },

  computed: {
    // 确保百分比在有效范围内
    safePercent() {
      return Math.min(100, Math.max(0, this.percent))
    }
  },

  template: `
    <div>
      <div class="progress-bar">
        <div 
          class="progress-fill"
          :style="{ 
            width: safePercent + '%',
            background: color
          }"
        ></div>
      </div>
      <div class="progress-text">{{ safePercent }}%</div>
    </div>
  `
})

// ==================== 状态徽章组件（枚举验证） ====================
Vue.component('status-badge', {
  props: {
    status: {
      type: String,
      default: 'pending',
      validator: function (value) {
        // 只允许这几个状态值
        const allowedValues = ['pending', 'processing', 'completed', 'failed']
        const valid = allowedValues.includes(value)
        if (!valid) {
          console.warn(
            `[status-badge] status 必须是 ${allowedValues.join('/')} 之一，收到：${value}`
          )
        }
        return valid
      }
    }
  },

  computed: {
    // 状态对应的文字（作为后备）
    statusText() {
      const texts = {
        pending: '待处理',
        processing: '处理中',
        completed: '已完成',
        failed: '已失败'
      }
      return texts[this.status] || this.status
    }
  },

  template: `
    <span class="status-badge" :class="status">
      <span class="badge-dot"></span>
      <slot>{{ statusText }}</slot>
    </span>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== Props 自定义验证 ===')
    console.log('')
    console.log('📋 validator 函数：')
    console.log('  - 接收 prop 的值作为参数')
    console.log('  - 返回 true 验证通过')
    console.log('  - 返回 false 验证失败（控制台警告）')
    console.log('')
    console.log('💡 常见验证场景：')
    console.log('  1. 范围验证：value >= min && value <= max')
    console.log("  2. 枚举验证：['a', 'b', 'c'].includes(value)")
    console.log('  3. 格式验证：正则表达式匹配')
  }
})
