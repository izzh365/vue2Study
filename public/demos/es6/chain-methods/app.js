/**
 * 高阶函数链式调用
 *
 * 因为 filter 和 map 都返回新数组，所以可以链式调用
 * 这是函数式编程的典型模式
 *
 * 链式调用的优点：
 * 1. 代码更简洁
 * 2. 逻辑更清晰（数据管道）
 * 3. 每一步都是纯函数，易于测试
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 商品数据
      products: [
        { id: 1, name: '苹果', price: 5, quantity: 10 },
        { id: 2, name: '牛排', price: 68, quantity: 2 },
        { id: 3, name: '香蕉', price: 3, quantity: 15 },
        { id: 4, name: '红酒', price: 128, quantity: 1 },
        { id: 5, name: '面包', price: 12, quantity: 3 },
        { id: 6, name: '芝士', price: 55, quantity: 2 }
      ],
      // 计算结果
      totalPrice: 0,
      // 是否显示结果
      showResult: false
    }
  },

  methods: {
    /**
     * 链式调用示例
     * 计算价格 > 50 的商品总价
     */
    calculateTotal() {
      console.log('=== 链式调用过程 ===')

      // 第一步：filter - 过滤出价格 > 50 的商品
      const filtered = this.products.filter(item => item.price > 50)
      console.log(
        '1. filter 结果:',
        filtered.map(i => i.name)
      )

      // 第二步：map - 计算每个商品的小计
      const subtotals = filtered.map(item => item.price * item.quantity)
      console.log('2. map 结果 (小计):', subtotals)

      // 第三步：reduce - 累加得到总价
      const total = subtotals.reduce((sum, subtotal) => sum + subtotal, 0)
      console.log('3. reduce 结果 (总价):', total)

      // 实际开发中，一般这样写（一行搞定）
      this.totalPrice = this.products
        .filter(item => item.price > 50) // 过滤：价格 > 50
        .map(item => item.price * item.quantity) // 映射：计算小计
        .reduce((sum, subtotal) => sum + subtotal, 0) // 归约：累加总价

      this.showResult = true

      console.log('最终结果:', this.totalPrice)
    }
  }
})
