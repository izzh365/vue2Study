/**
 * computed 排序列表 Demo
 * 
 * 【通俗比喻】
 * 就像图书馆的书架管理员：
 * - 书本（原数据）始终在固定位置
 * - 管理员只是提供不同的"导览视图"
 * - 按作者排序、按出版日期排序，书没动，只是看的顺序变了
 * - computed 就是这个"智能导览系统"
 * 
 * 【核心要点】
 * 1. 排序不应该修改原数组
 * 2. 使用 slice() 或 [...arr] 创建副本
 * 3. 根据 sortKey 动态选择排序规则
 * 4. computed 的缓存确保只有排序条件变化时才重新排序
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 当前排序方式
      sortKey: 'default',
      
      // 原始商品数据（不应该被修改）
      products: [
        { id: 1, name: 'MacBook Pro', price: 14999, sales: 520 },
        { id: 2, name: 'iPhone 15', price: 6999, sales: 2350 },
        { id: 3, name: 'AirPods Pro', price: 1899, sales: 1580 },
        { id: 4, name: 'iPad Air', price: 4799, sales: 890 },
        { id: 5, name: 'Apple Watch', price: 2999, sales: 1120 }
      ]
    }
  },
  
  computed: {
    /**
     * 计算属性：排序后的商品列表
     * 
     * 【重要】使用 slice() 创建数组副本
     * 原因：sort() 会修改原数组，我们需要保持原数据不变
     * 
     * @returns {Array} 排序后的商品数组副本
     */
    sortedProducts() {
      // ⚠️ 必须先复制数组！直接 sort 会修改原数组
      const copy = this.products.slice()
      
      switch (this.sortKey) {
        case 'price-asc':
          // 价格升序：便宜的在前
          return copy.sort((a, b) => a.price - b.price)
          
        case 'price-desc':
          // 价格降序：贵的在前
          return copy.sort((a, b) => b.price - a.price)
          
        case 'sales-desc':
          // 销量降序：卖得多的在前
          return copy.sort((a, b) => b.sales - a.sales)
          
        default:
          // 默认按 ID 顺序
          return copy
      }
    }
  }
})

/**
 * 【为什么用 computed 而不是 methods？】
 * 
 * 假设页面上有多处使用 sortedProducts：
 * - 商品列表展示
 * - 显示商品数量
 * - 底部也显示一份
 * 
 * computed：
 * - 只有 sortKey 或 products 变化时才重新排序
 * - 多次访问 sortedProducts 都用缓存
 * 
 * methods：
 * - 每次渲染都要重新排序
 * - 性能浪费
 * 
 * 【最佳实践】
 * 1. 永远不要直接修改原数组
 * 2. 使用 slice() 或展开运算符 [...arr] 创建副本
 * 3. 复杂排序逻辑可以抽成单独的函数
 * 4. 支持多字段排序时，可以使用或运算符链接
 *    例如：(a, b) => a.price - b.price || a.sales - b.sales
 */
