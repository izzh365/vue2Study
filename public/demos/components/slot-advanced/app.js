/**
 * 插槽综合案例
 *
 * 知识点：
 * 1. 默认插槽 + 具名插槽 + 作用域插槽综合使用
 * 2. 实际项目中的常见组件封装模式
 * 3. 通过插槽实现高度可定制的组件
 */

// ==================== Tab 组件 ====================
Vue.component('my-tabs', {
  template: `
    <div class="tabs-component">
      <div class="tabs-header">
        <slot name="tabs"></slot>
      </div>
      <div class="tabs-body">
        <slot name="content"></slot>
      </div>
    </div>
  `
})

// ==================== 折叠面板组件 ====================
Vue.component('my-accordion', {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      openIndex: 0 // 默认打开第一个
    }
  },

  methods: {
    toggle(index) {
      this.openIndex = this.openIndex === index ? -1 : index
    },

    isOpen(index) {
      return this.openIndex === index
    }
  },

  template: `
    <div class="accordion">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="accordion-item"
      >
        <div 
          class="accordion-header"
          @click="toggle(index)"
        >
          <slot name="header" :item="item" :isOpen="isOpen(index)"></slot>
        </div>
        <div v-show="isOpen(index)" class="accordion-body">
          <slot name="content" :item="item"></slot>
        </div>
      </div>
    </div>
  `
})

// ==================== 可定制列表组件 ====================
Vue.component('custom-list', {
  props: {
    items: {
      type: Array,
      required: true
    }
  },

  template: `
    <div class="virtual-list">
      <template v-if="items.length > 0">
        <template v-for="(item, index) in items">
          <slot name="item" :item="item" :index="index"></slot>
        </template>
      </template>
      <slot v-else name="empty">
        <div style="text-align: center; padding: 40px;">暂无数据</div>
      </slot>
    </div>
  `
})

// ==================== 模态框组件 ====================
Vue.component('my-modal', {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    close() {
      this.$emit('update:visible', false)
    },

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
            <span class="modal-title">
              <slot name="header">对话框</slot>
            </span>
            <button class="modal-close" @click="close">×</button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button class="btn secondary" @click="close">关闭</button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  `
})

// ==================== 特性卡片网格 ====================
Vue.component('feature-grid', {
  props: {
    features: {
      type: Array,
      required: true
    }
  },

  template: `
    <div class="card-grid">
      <template v-for="feature in features">
        <slot name="card" :feature="feature"></slot>
      </template>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // Tab 状态
      activeTab: 'profile',

      // FAQ 列表
      faqList: [
        {
          title: '什么是 Vue.js？',
          content:
            'Vue.js 是一套构建用户界面的渐进式 JavaScript 框架，易于上手，同时也可以构建大型应用。'
        },
        {
          title: '什么是组件化？',
          content: '组件化是将页面拆分成独立、可复用的部分，每个组件包含自己的模板、逻辑和样式。'
        },
        {
          title: '什么是插槽？',
          content: '插槽是一种内容分发机制，允许父组件向子组件传递模板内容，实现组件的灵活定制。'
        }
      ],

      // 用户列表
      userList: [
        { id: 1, name: '张三', department: '技术部' },
        { id: 2, name: '李四', department: '产品部' },
        { id: 3, name: '王五', department: '设计部' },
        { id: 4, name: '赵六', department: '市场部' },
        { id: 5, name: '孙七', department: '运营部' }
      ],

      // 特性列表
      features: [
        { icon: '🚀', title: '高性能', description: '虚拟 DOM 和智能更新策略' },
        { icon: '📦', title: '组件化', description: '可复用的组件系统' },
        { icon: '🔧', title: '易扩展', description: '丰富的插件生态' },
        { icon: '📱', title: '响应式', description: '自适应各种设备' }
      ],

      // 模态框状态
      showConfirmModal: false,
      showFormModal: false
    }
  },

  methods: {
    getAvatarColor(index) {
      const colors = ['#667eea', '#764ba2', '#11998e', '#38ef7d', '#f093fb', '#f5576c']
      return colors[index % colors.length]
    },

    viewUser(user) {
      alert('查看用户：' + user.name)
    },

    handleConfirm() {
      alert('确认删除！')
      this.showConfirmModal = false
    }
  },

  created() {
    console.log('=== 插槽综合案例 ===')
    console.log('')
    console.log('📋 组件设计模式：')
    console.log('  1. 使用具名插槽分离结构')
    console.log('  2. 使用作用域插槽暴露数据')
    console.log('  3. 提供默认内容作为后备')
    console.log('')
    console.log('💡 最佳实践：')
    console.log('  - 组件负责布局和逻辑')
    console.log('  - 内容和样式由父组件定制')
  }
})
