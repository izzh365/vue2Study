/**
 * 购物车实战案例
 *
 * 综合运用 filter、map、reduce 实现购物车功能
 * 这是前端开发中最常见的场景
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 购物车商品列表
      cartItems: [
        { id: 1, name: 'iPhone 15 Pro', price: 8999, quantity: 1, emoji: '📱', selected: true },
        { id: 2, name: 'AirPods Pro 2', price: 1899, quantity: 2, emoji: '🎧', selected: true },
        { id: 3, name: 'MacBook Air M3', price: 9499, quantity: 1, emoji: '💻', selected: false },
        { id: 4, name: 'Apple Watch S9', price: 2999, quantity: 1, emoji: '⌚', selected: true },
        { id: 5, name: 'iPad mini 6', price: 3799, quantity: 1, emoji: '📱', selected: false }
      ]
    }
  },

  computed: {
    /**
     * 已选中的商品数量
     * filter + length
     */
    selectedCount() {
      return this.cartItems.filter(item => item.selected).length
    },

    /**
     * 已选商品的总数量
     * filter + map + reduce
     */
    totalQuantity() {
      return this.cartItems
        .filter(item => item.selected) // 过滤选中的
        .map(item => item.quantity) // 提取数量
        .reduce((sum, qty) => sum + qty, 0) // 累加
    },

    /**
     * 已选商品的总价
     * filter + map + reduce（链式调用）
     */
    totalPrice() {
      return this.cartItems
        .filter(item => item.selected) // 1. 只计算选中的商品
        .map(item => item.price * item.quantity) // 2. 计算每个商品的小计
        .reduce((total, subtotal) => total + subtotal, 0) // 3. 累加得到总价
    },

    /**
     * 全选状态
     * 使用 every 判断是否全部选中
     */
    selectAll: {
      get() {
        return this.cartItems.length > 0 && this.cartItems.every(item => item.selected)
      },
      set(value) {
        this.cartItems.forEach(item => {
          item.selected = value
        })
      }
    }
  },

  methods: {
    /**
     * 增加数量
     */
    increaseQty(item) {
      item.quantity++
    },

    /**
     * 减少数量
     */
    decreaseQty(item) {
      if (item.quantity > 1) {
        item.quantity--
      }
    },

    /**
     * 切换全选
     */
    toggleSelectAll() {
      const newValue = this.selectAll
      this.cartItems.forEach(item => {
        item.selected = newValue
      })
    },

    /**
     * 删除选中的商品
     * 使用 filter 保留未选中的
     */
    removeSelected() {
      // filter 返回 selected 为 false 的商品（即保留未选中的）
      this.cartItems = this.cartItems.filter(item => !item.selected)
    }
  }
})
