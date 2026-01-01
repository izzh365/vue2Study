/**
 * v-loading 加载状态指令
 *
 * 📚 知识点：
 * 1. 动态创建 DOM 元素（遮罩层）
 * 2. 控制元素的 position 样式
 * 3. 多个指令配合使用
 *
 * 🎯 使用场景：
 * - 表格数据加载
 * - 表单提交
 * - 页面区块加载
 */

// ==================== 全局指令：v-loading ====================
Vue.directive('loading', {
  /**
   * bind 钩子
   * 创建加载遮罩层元素
   */
  bind: function (el, binding) {
    // 确保容器有定位属性
    const position = getComputedStyle(el).position
    if (position === 'static') {
      el.style.position = 'relative'
    }

    // 创建遮罩层
    const mask = document.createElement('div')
    mask.className = 'v-loading-mask'
    mask.innerHTML = `
      <div class="v-loading-spinner"></div>
      <div class="v-loading-text">加载中...</div>
    `

    // 初始隐藏
    mask.style.display = 'none'

    // 保存引用
    el._loadingMask = mask

    // 添加到容器
    el.appendChild(mask)

    // 根据初始值决定是否显示
    if (binding.value) {
      mask.style.display = 'flex'
    }
  },

  /**
   * update 钩子
   * 根据绑定值显示/隐藏加载状态
   */
  update: function (el, binding) {
    if (!el._loadingMask) return

    if (binding.value) {
      el._loadingMask.style.display = 'flex'
      console.log('v-loading: 显示加载状态')
    } else {
      el._loadingMask.style.display = 'none'
      console.log('v-loading: 隐藏加载状态')
    }
  },

  /**
   * unbind 钩子
   * 移除遮罩层元素
   */
  unbind: function (el) {
    if (el._loadingMask) {
      el.removeChild(el._loadingMask)
      delete el._loadingMask
    }
  }
})

// ==================== 全局指令：v-loading-text ====================
// 配合 v-loading 使用，设置自定义加载文字
Vue.directive('loading-text', {
  bind: function (el, binding) {
    // 保存自定义文字
    el._loadingText = binding.value
  },

  update: function (el, binding) {
    el._loadingText = binding.value

    // 更新遮罩层文字
    if (el._loadingMask) {
      const textEl = el._loadingMask.querySelector('.v-loading-text')
      if (textEl) {
        textEl.textContent = binding.value || '加载中...'
      }
    }
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // Demo 1
      loading1: false,
      list1: [],

      // Demo 2
      loading2: false,
      list2: []
    }
  },

  methods: {
    /**
     * 加载数据示例 1
     */
    loadData1() {
      this.loading1 = true
      this.list1 = []

      // 模拟网络请求
      setTimeout(() => {
        this.list1 = [
          { id: 1, name: '商品销售额', value: '¥ 128,500' },
          { id: 2, name: '订单数量', value: '1,234 单' },
          { id: 3, name: '用户访问量', value: '56,789 次' },
          { id: 4, name: '转化率', value: '3.2%' }
        ]
        this.loading1 = false
      }, 2000)
    },

    /**
     * 加载数据示例 2
     */
    loadData2() {
      this.loading2 = true
      this.list2 = []

      // 模拟网络请求
      setTimeout(() => {
        this.list2 = [
          { id: 1, name: '张三', email: 'zhangsan@example.com' },
          { id: 2, name: '李四', email: 'lisi@example.com' },
          { id: 3, name: '王五', email: 'wangwu@example.com' }
        ]
        this.loading2 = false
      }, 2500)
    }
  }
})
