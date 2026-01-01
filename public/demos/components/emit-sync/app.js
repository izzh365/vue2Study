/**
 * .sync 修饰符示例
 *
 * 知识点：
 * 1. .sync 是 props + $emit 的语法糖
 * 2. 子组件必须触发 'update:propName' 事件
 * 3. 可以同时使用多个 .sync 属性
 * 4. Vue 3 中被 v-model 替代
 */

// ==================== 对话框组件 ====================
Vue.component('my-dialog', {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '对话框'
    }
  },

  methods: {
    /**
     * 关闭对话框
     * 使用 'update:propName' 格式触发事件
     */
    close() {
      // 这是 .sync 的关键：必须使用 'update:visible' 格式
      this.$emit('update:visible', false)
      console.log('[子组件] 触发 update:visible 事件，值：false')
    },

    /**
     * 点击遮罩层关闭
     */
    handleOverlayClick(e) {
      if (e.target.classList.contains('modal-overlay')) {
        this.close()
      }
    }
  },

  template: `
    <transition name="fade">
      <div v-if="visible" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">{{ title }}</div>
            <button class="modal-close" @click="close">×</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button class="btn secondary" @click="close">取消</button>
            <button class="btn primary" @click="close">确定</button>
          </div>
        </div>
      </div>
    </transition>
  `
})

// ==================== 用户表单组件（多属性 .sync） ====================
Vue.component('user-form', {
  props: {
    name: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: 0
    },
    email: {
      type: String,
      default: ''
    }
  },

  methods: {
    /**
     * 更新姓名
     */
    updateName(e) {
      this.$emit('update:name', e.target.value)
    },

    /**
     * 更新年龄
     */
    updateAge(e) {
      this.$emit('update:age', parseInt(e.target.value) || 0)
    },

    /**
     * 更新邮箱
     */
    updateEmail(e) {
      this.$emit('update:email', e.target.value)
    }
  },

  template: `
    <div style="background: #F9FAFB; padding: 20px; border-radius: 12px;">
      <div style="margin-bottom: 16px;">
        <label style="display: block; color: #86868B; font-size: 13px; margin-bottom: 4px;">
          姓名
        </label>
        <input 
          type="text" 
          :value="name" 
          @input="updateName"
          style="width: 100%; padding: 10px 12px; border: 2px solid #E5E5EA; border-radius: 8px; font-size: 15px; outline: none;"
          placeholder="请输入姓名"
        >
      </div>
      <div style="margin-bottom: 16px;">
        <label style="display: block; color: #86868B; font-size: 13px; margin-bottom: 4px;">
          年龄
        </label>
        <input 
          type="number" 
          :value="age" 
          @input="updateAge"
          style="width: 100%; padding: 10px 12px; border: 2px solid #E5E5EA; border-radius: 8px; font-size: 15px; outline: none;"
          placeholder="请输入年龄"
        >
      </div>
      <div>
        <label style="display: block; color: #86868B; font-size: 13px; margin-bottom: 4px;">
          邮箱
        </label>
        <input 
          type="email" 
          :value="email" 
          @input="updateEmail"
          style="width: 100%; padding: 10px 12px; border: 2px solid #E5E5EA; border-radius: 8px; font-size: 15px; outline: none;"
          placeholder="请输入邮箱"
        >
      </div>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      showDialog: false,
      showDialog2: false,
      formData: {
        name: '张三',
        age: 28,
        email: 'zhangsan@example.com'
      }
    }
  },

  watch: {
    showDialog(val) {
      console.log('[父组件] showDialog 变化：', val)
    }
  },

  created() {
    console.log('=== .sync 修饰符 ===')
    console.log('')
    console.log('📋 .sync 是语法糖：')
    console.log('  :prop.sync="value"')
    console.log('  等价于')
    console.log('  :prop="value" @update:prop="val => value = val"')
    console.log('')
    console.log('💡 子组件必须触发：')
    console.log("  this.$emit('update:propName', newValue)")
  }
})
