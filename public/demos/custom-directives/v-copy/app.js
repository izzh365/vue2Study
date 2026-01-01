/**
 * v-copy 一键复制指令
 *
 * 📚 知识点：
 * 1. bind 钩子中绑定事件
 * 2. unbind 钩子中解绑事件（防止内存泄漏）
 * 3. 使用 Clipboard API 或降级方案
 *
 * 🎯 使用场景：
 * - 邀请码复制
 * - 分享链接复制
 * - 代码块复制
 */

// ==================== 全局指令：v-copy ====================
Vue.directive('copy', {
  /**
   * bind 钩子
   * 绑定点击事件，实现复制功能
   */
  bind: function (el, binding) {
    // 保存要复制的文本
    el._copyText = binding.value

    // 定义点击处理函数
    el._copyHandler = async function () {
      const text = el._copyText

      if (!text) {
        console.warn('v-copy: 没有要复制的内容')
        return
      }

      try {
        // 优先使用现代 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
        } else {
          // 降级方案：使用 execCommand
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.left = '-9999px'
          document.body.appendChild(textarea)
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
        }

        console.log('v-copy: 复制成功', text)

        // 触发自定义成功回调
        if (el._copyCallback) {
          el._copyCallback(text)
        }
      } catch (err) {
        console.error('v-copy: 复制失败', err)
      }
    }

    // 绑定点击事件
    el.addEventListener('click', el._copyHandler)
  },

  /**
   * update 钩子
   * 当绑定值变化时更新要复制的文本
   */
  update: function (el, binding) {
    // 更新要复制的文本
    el._copyText = binding.value

    // 如果有 callback 参数，保存回调
    if (binding.arg === 'callback' && typeof binding.value === 'function') {
      el._copyCallback = binding.value
    }
  },

  /**
   * unbind 钩子
   * 指令与元素解绑时调用
   * 必须移除事件监听，防止内存泄漏！
   */
  unbind: function (el) {
    // 移除事件监听
    el.removeEventListener('click', el._copyHandler)
    // 清理引用
    delete el._copyText
    delete el._copyHandler
    delete el._copyCallback

    console.log('v-copy: 已解绑')
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // 邀请码
      inviteCode: 'VUE2-LEARN-2024',
      // 分享链接
      shareLink: 'https://vue2-learning.example.com/share?code=abc123',
      // 代码文本
      codeText: `const sayHello = (name) => {
  return \`Hello, \${name}!\`
}`,
      // 复制状态
      copied1: false,
      copied2: false,
      copied3: false,
      // Toast
      showToast: false,
      toastMessage: ''
    }
  },

  methods: {
    /**
     * 复制成功回调
     */
    onCopySuccess(text) {
      this.copied1 = true
      this.showToastMessage('邀请码已复制到剪贴板')

      setTimeout(() => {
        this.copied1 = false
      }, 2000)
    },

    /**
     * 处理链接复制
     */
    handleCopy2() {
      this.copied2 = true
      this.showToastMessage('链接已复制')

      setTimeout(() => {
        this.copied2 = false
      }, 2000)
    },

    /**
     * 处理代码复制
     */
    handleCopy3() {
      this.copied3 = true
      this.showToastMessage('代码已复制')

      setTimeout(() => {
        this.copied3 = false
      }, 2000)
    },

    /**
     * 显示 Toast 提示
     */
    showToastMessage(message) {
      this.toastMessage = message
      this.showToast = true

      setTimeout(() => {
        this.showToast = false
      }, 2000)
    }
  }
})
