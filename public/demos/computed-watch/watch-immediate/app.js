/**
 * watch immediate 立即执行 Demo
 * 
 * 【通俗比喻】
 * 想象你雇了一个保姆照顾孩子：
 * - 默认模式：保姆今天来上班，但要等孩子"有动静"才开始干活
 * - immediate 模式：保姆来了立刻先检查一遍孩子状态
 * 
 * 【问题场景】
 * 组件加载时，往往需要根据初始数据请求接口：
 * - 分类 ID → 获取该分类的商品列表
 * - 用户 ID → 获取用户详情
 * 
 * 如果不用 immediate，需要在 created 中调用一次，
 * 又在 watch 中写一次，代码重复！
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 分类列表
      categories: [
        { id: 'fruit', name: '水果', icon: '🍎' },
        { id: 'drink', name: '饮料', icon: '🥤' },
        { id: 'snack', name: '零食', icon: '🍪' }
      ],
      // 当前选中的分类（初始有值）
      selectedCategory: 'fruit',
      // 加载状态
      loading: false,
      // 商品列表
      products: []
    }
  },
  
  computed: {
    // 状态显示样式
    statusClass() {
      if (this.loading) return 'loading'
      if (this.products.length > 0) return 'success'
      return 'error'
    },
    // 状态文字
    statusText() {
      if (this.loading) return '⏳ 加载中...'
      if (this.products.length > 0) return `✅ 成功加载 ${this.products.length} 个商品`
      return '❌ 暂无数据'
    }
  },
  
  watch: {
    /**
     * 侦听分类变化 - 使用对象语法
     * 
     * 【重点】immediate: true
     * 组件创建后立即执行一次 handler
     * 不需要在 created 中手动调用
     */
    selectedCategory: {
      /**
       * handler 是实际的处理函数
       * @param {string} newCategory - 新分类 ID
       */
      handler(newCategory) {
        console.log(`分类变化: ${newCategory}，开始获取商品...`)
        this.fetchProducts(newCategory)
      },
      
      /**
       * 【关键配置】
       * immediate: true 表示立即执行
       * 组件创建完成后，watch 会立刻用当前值调用一次 handler
       */
      immediate: true
    }
  },
  
  methods: {
    /**
     * 模拟获取商品数据
     * @param {string} category - 分类 ID
     */
    fetchProducts(category) {
      this.loading = true
      this.products = []
      
      // 模拟 API 请求延迟
      setTimeout(() => {
        // 模拟不同分类的数据
        const mockData = {
          fruit: [
            { id: 1, name: '红富士苹果', price: 8.5, icon: '🍎' },
            { id: 2, name: '进口香蕉', price: 5.9, icon: '🍌' },
            { id: 3, name: '阳光橙子', price: 6.8, icon: '🍊' }
          ],
          drink: [
            { id: 4, name: '可口可乐', price: 3.5, icon: '🥤' },
            { id: 5, name: '农夫山泉', price: 2.0, icon: '💧' },
            { id: 6, name: '星巴克咖啡', price: 28.0, icon: '☕' }
          ],
          snack: [
            { id: 7, name: '乐事薯片', price: 7.9, icon: '🍟' },
            { id: 8, name: '奥利奥饼干', price: 9.9, icon: '🍪' },
            { id: 9, name: '德芙巧克力', price: 15.9, icon: '🍫' }
          ]
        }
        
        this.products = mockData[category] || []
        this.loading = false
      }, 800)
    }
  }
})

/**
 * 【immediate 的工作原理】
 * 
 * 1. 组件创建（created 阶段）
 * 2. Vue 设置响应式系统
 * 3. 如果 watch 有 immediate: true
 *    → 立即用当前值调用一次 handler
 * 4. 之后正常监听变化
 * 
 * 【对比代码量】
 * 
 * ❌ 不用 immediate（需要写两遍）：
 * 
 * created() {
 *   this.fetchProducts(this.selectedCategory)  // 第一遍
 * },
 * watch: {
 *   selectedCategory(val) {
 *     this.fetchProducts(val)  // 第二遍，代码重复
 *   }
 * }
 * 
 * ✅ 使用 immediate（只写一遍）：
 * 
 * watch: {
 *   selectedCategory: {
 *     handler(val) {
 *       this.fetchProducts(val)  // 只需写一遍
 *     },
 *     immediate: true
 *   }
 * }
 * 
 * 【最佳实践】
 * 需要在初始化时执行一次的 watch，都应该加 immediate: true
 */
