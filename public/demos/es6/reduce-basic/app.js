/**
 * reduce 高阶函数 - 基本用法
 *
 * reduce() 对数组中的每个元素执行 reducer 函数，将其归约为单一值
 * 语法：array.reduce(callback(accumulator, currentValue, index, array), initialValue)
 *
 * 参数说明：
 * - accumulator：累加器，保存每次计算后的返回值
 * - currentValue：当前正在处理的元素
 * - initialValue：初始值（非常重要！建议总是提供）
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 原始数组
      numbers: [1, 2, 3, 4, 5],
      // 计算结果
      result: null,
      // 当前运算符
      currentOperator: '+',
      // 执行过程
      processSteps: []
    }
  },

  methods: {
    /**
     * 求和
     * 典型的 reduce 应用
     */
    calculateSum() {
      this.currentOperator = '+'
      this.processSteps = []

      // reduce 的核心：累加器 + 当前值 = 新累加器
      this.result = this.numbers.reduce((sum, current, index) => {
        const newSum = sum + current
        this.processSteps.push(`sum=${sum} + current=${current} → 新sum=${newSum}`)
        return newSum
      }, 0) // 0 是初始值

      console.log('求和结果:', this.result)
    },

    /**
     * 求积
     * 初始值设为 1
     */
    calculateProduct() {
      this.currentOperator = '×'
      this.processSteps = []

      this.result = this.numbers.reduce((product, current, index) => {
        const newProduct = product * current
        this.processSteps.push(`product=${product} × current=${current} → 新product=${newProduct}`)
        return newProduct
      }, 1) // 求积初始值为 1

      console.log('求积结果:', this.result)
    },

    /**
     * 求最大值
     * 使用 Math.max 比较
     */
    findMax() {
      this.currentOperator = 'vs'
      this.processSteps = []

      this.result = this.numbers.reduce((max, current) => {
        const newMax = Math.max(max, current)
        this.processSteps.push(`max(${max}, ${current}) → 新max=${newMax}`)
        return newMax
      }, -Infinity) // 初始值设为负无穷，确保任何数都比它大

      console.log('最大值:', this.result)
    }
  }
})
