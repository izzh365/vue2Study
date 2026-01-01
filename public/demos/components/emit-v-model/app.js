/**
 * 组件上的 v-model 示例
 *
 * 知识点：
 * 1. v-model 是 :value + @input 的语法糖
 * 2. 组件需要接收 value prop，触发 input 事件
 * 3. 可以通过 model 选项自定义 prop 和 event 名称
 * 4. 适用于需要双向绑定的自定义表单组件
 */

// ==================== 自定义输入框 ====================
Vue.component('my-input', {
  // 接收 value prop（v-model 传入）
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    }
  },

  template: `
    <input 
      class="custom-input"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    >
  `
})

// ==================== 星级评分组件 ====================
Vue.component('star-rating', {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      hoverIndex: 0
    }
  },

  methods: {
    /**
     * 设置评分
     */
    setRating(n) {
      // 触发 input 事件，这是 v-model 的关键
      this.$emit('input', n)
    }
  },

  template: `
    <div class="rating-stars">
      <span 
        v-for="n in 5" 
        :key="n" 
        class="star"
        :class="{ active: n <= value }"
        @click="setRating(n)"
        @mouseenter="hoverIndex = n"
        @mouseleave="hoverIndex = 0"
      >
        {{ n <= (hoverIndex || value) ? '⭐' : '☆' }}
      </span>
    </div>
  `
})

// ==================== 开关组件 ====================
Vue.component('my-switch', {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    toggle() {
      // 切换状态并触发 input 事件
      this.$emit('input', !this.value)
    }
  },

  template: `
    <div 
      class="switch" 
      :class="{ active: value }"
      @click="toggle"
    >
      <div class="switch-handle"></div>
    </div>
  `
})

// ==================== 自定义 checkbox（使用 model 选项） ====================
Vue.component('custom-checkbox', {
  // 自定义 v-model 的行为
  model: {
    prop: 'checked',   // 使用 checked 而不是默认的 value
    event: 'change'    // 使用 change 而不是默认的 input
  },

  props: {
    checked: {
      type: Boolean,
      default: false
    }
  },

  template: `
    <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
      <input 
        type="checkbox" 
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
        style="width: 18px; height: 18px;"
      >
      <span style="color: #1D1D1F;">我同意用户协议和隐私政策</span>
    </label>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 输入框
      username: '',
      password: '',
      // 评分
      rating: 3,
      // 开关
      darkMode: false,
      notifications: true,
      // 复选框
      agreed: false
    }
  },

  watch: {
    username(val) {
      console.log('[v-model] username 变化:', val)
    },
    rating(val) {
      console.log('[v-model] rating 变化:', val)
    },
    darkMode(val) {
      console.log('[v-model] darkMode 变化:', val)
    },
    agreed(val) {
      console.log('[v-model] agreed 变化:', val)
    }
  },

  created() {
    console.log('=== 组件上的 v-model ===')
    console.log('')
    console.log('📋 v-model 工作原理：')
    console.log('  <my-input v-model="value">')
    console.log('  等价于')
    console.log('  <my-input :value="value" @input="value = $event">')
    console.log('')
    console.log('💡 组件实现要点：')
    console.log('  1. props 中接收 value')
    console.log('  2. 通过 $emit(\'input\', newValue) 更新')
    console.log('')
    console.log('⚙️ model 选项（Vue 2.2+）：')
    console.log('  model: { prop: \'checked\', event: \'change\' }')
  }
})
