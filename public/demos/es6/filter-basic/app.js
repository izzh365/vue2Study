/**
 * filter 高阶函数 - 基本用法
 *
 * filter() 方法创建一个新数组，包含所有通过测试的元素
 * 语法：array.filter(callback(element, index, array))
 *
 * 重要特点：
 * 1. 不会修改原数组
 * 2. 返回一个新数组
 * 3. callback 返回 true 的元素会被保留
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 原始数组 - 不会被修改
      numbers: [10, 25, 30, 45, 60, 75, 80, 95, 100],
      // 过滤后的结果
      filteredNumbers: [],
      // 过滤描述
      filterDescription: ''
    }
  },

  methods: {
    /**
     * 过滤出大于 50 的数字
     * 使用箭头函数简洁写法
     */
    filterGreaterThan50() {
      // filter 接收一个函数，返回 true 的元素会被保留
      this.filteredNumbers = this.numbers.filter(num => num > 50)
      this.filterDescription = '条件：num > 50'

      // 打印详细过程
      console.log('原数组:', this.numbers)
      console.log('过滤条件: num > 50')
      console.log('结果:', this.filteredNumbers)
    },

    /**
     * 过滤出偶数
     * 使用取余运算符 %
     */
    filterEven() {
      // num % 2 === 0 表示能被2整除，即偶数
      this.filteredNumbers = this.numbers.filter(num => num % 2 === 0)
      this.filterDescription = '条件：num % 2 === 0（偶数）'

      console.log('过滤条件: num % 2 === 0')
      console.log('结果:', this.filteredNumbers)
    },

    /**
     * 过滤出 10 的倍数
     */
    filterMultipleOf10() {
      this.filteredNumbers = this.numbers.filter(num => num % 10 === 0)
      this.filterDescription = '条件：num % 10 === 0（10的倍数）'

      console.log('过滤条件: num % 10 === 0')
      console.log('结果:', this.filteredNumbers)
    }
  }
})
