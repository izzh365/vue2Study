/**
 * map 高阶函数 - 基本用法
 *
 * map() 方法创建一个新数组，对原数组每个元素调用 callback
 * 语法：array.map(callback(element, index, array))
 *
 * 重要特点：
 * 1. 不会修改原数组
 * 2. 返回新数组，长度与原数组相同
 * 3. 一对一映射：原数组有多少个元素，新数组就有多少个
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 原始数组
      numbers: [1, 2, 3, 4, 5],
      // 映射结果
      mappedResult: [],
      // 当前公式
      currentFormula: ''
    }
  },

  methods: {
    /**
     * 数组元素翻倍
     * 每个元素 × 2
     */
    doubleNumbers() {
      // map 接收一个函数，对每个元素进行转换
      this.mappedResult = this.numbers.map(num => num * 2)
      this.currentFormula = 'numbers.map(num => num * 2)'

      console.log('原数组:', this.numbers)
      console.log('翻倍后:', this.mappedResult)
    },

    /**
     * 计算平方
     * 每个元素的平方
     */
    squareNumbers() {
      this.mappedResult = this.numbers.map(num => num * num)
      this.currentFormula = 'numbers.map(num => num * num)'

      console.log('原数组:', this.numbers)
      console.log('平方后:', this.mappedResult)
    },

    /**
     * 添加前缀
     * 数字转换为带前缀的字符串
     */
    addPrefix() {
      // map 可以改变元素类型
      this.mappedResult = this.numbers.map(num => `第${num}名`)
      this.currentFormula = 'numbers.map(num => `第${num}名`)'

      console.log('原数组:', this.numbers)
      console.log('加前缀:', this.mappedResult)
    }
  }
})
