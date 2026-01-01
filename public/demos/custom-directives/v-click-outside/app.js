/**
 * v-click-outside 点击外部指令
 *
 * 📚 知识点：
 * 1. 监听 document 点击事件
 * 2. 判断点击目标是否在元素外部
 * 3. 及时清理事件监听
 *
 * 🎯 使用场景：
 * - 下拉菜单关闭
 * - 弹窗关闭
 * - 搜索建议关闭
 * - 日期选择器关闭
 */

// ==================== 全局指令：v-click-outside ====================
Vue.directive('click-outside', {
  /**
   * bind 钩子
   * 绑定 document 点击事件
   */
  bind: function (el, binding, vnode) {
    // 定义点击处理函数
    el._clickOutsideHandler = function (event) {
      // 检查点击是否在元素外部
      // el.contains(event.target) 判断点击目标是否是元素的子元素
      if (!(el === event.target || el.contains(event.target))) {
        // 点击在外部，执行回调
        if (typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    }

    // 延迟绑定，避免当前点击事件被捕获
    setTimeout(() => {
      document.addEventListener('click', el._clickOutsideHandler)
    }, 0)

    console.log('v-click-outside: 已绑定')
  },

  /**
   * unbind 钩子
   * 移除事件监听
   */
  unbind: function (el) {
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
      delete el._clickOutsideHandler
      console.log('v-click-outside: 已解绑')
    }
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      // Demo 1: 下拉菜单
      dropdownOpen: false,
      selectedItem: '',
      menuItems: ['首页', '产品', '关于我们', '联系我们'],

      // Demo 2: 搜索框
      searchKeyword: '',
      showSearchResults: false,
      searchData: [
        'Vue.js 入门教程',
        'Vue Router 使用指南',
        'Vuex 状态管理',
        'Vue 组件化开发',
        'Vue 自定义指令',
        'Vue 生命周期'
      ],

      // Demo 3: 弹窗
      modalOpen: false
    }
  },

  computed: {
    /**
     * 过滤搜索结果
     */
    filteredResults() {
      if (!this.searchKeyword) return this.searchData

      return this.searchData.filter(item =>
        item.toLowerCase().includes(this.searchKeyword.toLowerCase())
      )
    }
  },

  methods: {
    // ========== 下拉菜单 ==========
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },

    closeDropdown() {
      this.dropdownOpen = false
      console.log('下拉菜单已关闭')
    },

    selectItem(item) {
      this.selectedItem = item
      this.dropdownOpen = false
    },

    // ========== 搜索框 ==========
    closeSearch() {
      this.showSearchResults = false
      console.log('搜索结果已关闭')
    },

    selectSearch(result) {
      this.searchKeyword = result
      this.showSearchResults = false
    },

    // ========== 弹窗 ==========
    closeModal() {
      this.modalOpen = false
      console.log('弹窗已关闭')
    }
  }
})
