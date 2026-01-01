/**
 * 全局组件注册示例
 *
 * 知识点：
 * 1. 使用 Vue.component() 全局注册组件
 * 2. 全局组件可以在任何 Vue 实例中使用
 * 3. 注册必须在 new Vue() 之前完成
 */

// ==================== 全局注册组件 ====================
// 语法：Vue.component('组件名', { 组件选项 })
// 注意：全局注册必须在创建 Vue 实例之前

Vue.component('my-alert', {
  // props 接收父组件传递的数据
  props: {
    type: {
      type: String,
      default: 'info',
      validator: function (value) {
        return ['success', 'warning', 'info'].includes(value)
      }
    }
  },

  // template 定义组件的模板
  template: `
    <div class="alert-box" :class="'alert-' + type">
      <slot></slot>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      message: '全局组件可以在任何地方使用'
    }
  },

  /**
   * 生命周期钩子 - created
   * 此时可以访问 data，但 DOM 还未挂载
   */
  created() {
    console.log('Vue 实例创建完成')
    console.log('全局组件 my-alert 已注册，可在模板中使用')
  }
})
