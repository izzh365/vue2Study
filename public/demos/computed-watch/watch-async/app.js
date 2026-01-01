/**
 * watch 执行异步请求 Demo
 * 
 * 【通俗比喻】
 * 就像智能客服系统：
 * - 监听用户的输入框（watch 关键词）
 * - 用户输入时不急着响应（防抖）
 * - 用户停止输入后，才去数据库查询（异步请求）
 * - 显示"正在查询..."（loading 状态）
 * - 展示查询结果
 * 
 * 【核心要点】
 * 1. watch 非常适合处理异步操作
 * 2. computed 只能同步返回结果，watch 可以异步
 * 3. 结合防抖提升性能和体验
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 搜索关键词
      keyword: '',
      // 加载状态
      loading: false,
      // 搜索结果
      results: [],
      // 防抖定时器
      debounceTimer: null
    }
  },
  
  computed: {
    // 状态样式类
    statusClass() {
      if (this.loading) return 'loading'
      if (this.keyword === '') return 'idle'
      if (this.results.length > 0) return 'success'
      return 'empty'
    },
    // 状态图标
    statusIcon() {
      if (this.loading) return '⏳'
      if (this.keyword === '') return '💭'
      if (this.results.length > 0) return '✅'
      return '😕'
    },
    // 状态文字
    statusText() {
      if (this.loading) return '正在搜索...'
      if (this.keyword === '') return '输入关键词开始搜索'
      if (this.results.length > 0) return `找到 ${this.results.length} 个结果`
      return '没有找到匹配的用户'
    }
  },
  
  watch: {
    /**
     * 侦听搜索关键词变化
     * 
     * 【重点】在 watch 中执行异步操作的最佳实践：
     * 1. 使用防抖避免频繁请求
     * 2. 维护 loading 状态
     * 3. 处理边界情况（空值等）
     */
    keyword(newVal) {
      // 清除之前的定时器（防抖核心）
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }
      
      // 如果关键词为空，清空结果
      if (!newVal.trim()) {
        this.results = []
        return
      }
      
      // 设置新的定时器，500ms 后执行搜索
      this.debounceTimer = setTimeout(() => {
        this.searchUsers(newVal)
      }, 500)
    }
  },
  
  methods: {
    /**
     * 搜索用户（模拟 API 请求）
     * @param {string} keyword - 搜索关键词
     */
    async searchUsers(keyword) {
      this.loading = true
      
      try {
        // 模拟 API 请求延迟
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // 模拟用户数据
        const allUsers = [
          { id: 1, name: '张三', email: 'zhangsan@example.com' },
          { id: 2, name: '张伟', email: 'zhangwei@example.com' },
          { id: 3, name: '李四', email: 'lisi@example.com' },
          { id: 4, name: '李明', email: 'liming@example.com' },
          { id: 5, name: '王五', email: 'wangwu@example.com' },
          { id: 6, name: '王芳', email: 'wangfang@example.com' },
          { id: 7, name: '赵六', email: 'zhaoliu@example.com' },
          { id: 8, name: '陈七', email: 'chenqi@example.com' }
        ]
        
        // 根据关键词过滤
        const searchLower = keyword.toLowerCase()
        this.results = allUsers.filter(user => 
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
        )
        
      } catch (error) {
        console.error('搜索失败:', error)
        this.results = []
      } finally {
        this.loading = false
      }
    }
  },
  
  /**
   * 组件销毁时清理定时器
   * 防止内存泄漏
   */
  beforeDestroy() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
  }
})

/**
 * 【为什么用 watch 而不是 computed？】
 * 
 * computed 只能做同步计算：
 * computed: {
 *   results() {
 *     // ❌ 无法在这里发起异步请求
 *     // ❌ 无法使用 await
 *     // ❌ 无法显示 loading 状态
 *     return ???
 *   }
 * }
 * 
 * watch 可以做任何异步操作：
 * watch: {
 *   keyword(val) {
 *     // ✅ 可以 await
 *     // ✅ 可以维护 loading
 *     // ✅ 可以防抖节流
 *     this.searchUsers(val)
 *   }
 * }
 * 
 * 【防抖 vs 节流】
 * 
 * 防抖（Debounce）：等用户停止操作后才执行
 * - 适合：搜索框、表单验证
 * - 实现：每次清除旧定时器，设置新定时器
 * 
 * 节流（Throttle）：固定间隔执行一次
 * - 适合：滚动事件、resize 事件
 * - 实现：检查距离上次执行是否超过间隔
 * 
 * 【实际项目建议】
 * 使用 lodash 的 debounce 函数，更健壮：
 * 
 * import { debounce } from 'lodash'
 * 
 * watch: {
 *   keyword: debounce(function(val) {
 *     this.searchUsers(val)
 *   }, 500)
 * }
 */
