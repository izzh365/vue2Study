/**
 * v-focus 自动聚焦指令
 *
 * 📚 知识点：
 * 1. 自定义指令的基本结构
 * 2. inserted 钩子：元素插入 DOM 时调用
 * 3. el 参数：指令绑定的元素
 *
 * 🎯 使用场景：
 * - 登录页的用户名输入框
 * - 搜索框
 * - 弹窗中的第一个输入框
 */

// ==================== 全局指令：v-focus ====================
// 最简单的自定义指令，让元素自动获得焦点
Vue.directive('focus', {
  /**
   * inserted 钩子函数
   * 当被绑定元素插入到父节点时调用（仅保证父节点存在）
   *
   * @param {HTMLElement} el - 指令绑定的 DOM 元素
   */
  inserted: function (el) {
    // 让元素获得焦点
    el.focus()
    console.log('v-focus: 元素已自动聚焦', el)
  }
})

// ==================== 全局指令：v-focus-if ====================
// 条件聚焦指令，只在值为 true 时聚焦
Vue.directive('focus-if', {
  /**
   * inserted 钩子：元素插入时判断是否聚焦
   */
  inserted: function (el, binding) {
    if (binding.value) {
      el.focus()
      console.log('v-focus-if: 条件为 true，已聚焦')
    }
  },

  /**
   * update 钩子：指令值更新时重新判断
   *
   * @param {HTMLElement} el - 指令绑定的元素
   * @param {Object} binding - 包含指令信息的对象
   *   - value: 指令的绑定值（新值）
   *   - oldValue: 指令绑定的前一个值
   */
  update: function (el, binding) {
    // 值变为 true 时聚焦
    if (binding.value && !binding.oldValue) {
      // 使用 nextTick 确保 DOM 更新完成
      Vue.nextTick(() => {
        el.focus()
        console.log('v-focus-if: 条件变为 true，已聚焦')
      })
    }
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 控制条件聚焦
      shouldFocus: false
    }
  },

  methods: {
    /**
     * 聚焦到指定的输入框
     * @param {string} refName - ref 名称
     */
    focusInput(refName) {
      // 通过 $refs 访问 DOM 元素
      const input = this.$refs[refName]
      if (input) {
        input.focus()
        console.log(`手动聚焦到: ${refName}`)
      }
    }
  }
})
