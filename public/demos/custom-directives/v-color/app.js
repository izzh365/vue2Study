/**
 * v-color 颜色指令
 *
 * 📚 知识点：
 * 1. 指令参数 (arg)：v-color:background 中的 background
 * 2. 指令值 (value)：v-color="'red'" 中的 'red'
 * 3. update 钩子：响应数据变化
 *
 * 🎯 使用场景：
 * - 主题色动态切换
 * - 状态颜色显示（成功/失败）
 * - 用户自定义颜色
 */

// ==================== 全局指令：v-color ====================
Vue.directive('color', {
  /**
   * bind 钩子
   * 只调用一次，指令第一次绑定到元素时调用
   * 适合做一次性初始化设置
   *
   * @param {HTMLElement} el - 指令绑定的 DOM 元素
   * @param {Object} binding - 绑定对象
   *   - arg: 指令参数，如 v-color:background 中的 'background'
   *   - value: 指令的绑定值
   */
  bind: function (el, binding) {
    // 确定要设置的 CSS 属性
    // 默认设置 color（文字颜色）
    const property = binding.arg || 'color'

    // 设置样式
    el.style[property] = binding.value

    console.log(`v-color bind: 设置 ${property} = ${binding.value}`)
  },

  /**
   * update 钩子
   * 当指令的值发生变化时调用
   * 用于响应数据变化
   */
  update: function (el, binding) {
    // 值没变则不处理
    if (binding.value === binding.oldValue) return

    const property = binding.arg || 'color'
    el.style[property] = binding.value

    console.log(`v-color update: ${property} 从 ${binding.oldValue} 变为 ${binding.value}`)
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 当前选中的颜色
      selectedColor: '#007AFF',

      // 可选颜色列表
      colors: [
        '#007AFF', // 蓝
        '#34C759', // 绿
        '#FF9500', // 橙
        '#FF3B30', // 红
        '#AF52DE', // 紫
        '#5AC8FA', // 浅蓝
        '#FFCC00', // 黄
        '#1D1D1F' // 黑
      ]
    }
  }
})
