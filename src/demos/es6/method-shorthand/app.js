/**
 * 方法简写示例
 */
new Vue({
  el: '#app',

  data() {
    return {
      results: []
    }
  },

  methods: {
    testMethodShorthand() {
      this.results = []

      // 创建一个计算器对象
      const calculator = {
        // 方法简写
        add(a, b) {
          return a + b
        },
        subtract(a, b) {
          return a - b
        },
        multiply(a, b) {
          return a * b
        },
        divide(a, b) {
          return b !== 0 ? a / b : 'Error'
        }
      }

      this.results.push('📌 <strong>使用方法简写创建计算器：</strong>')
      this.results.push('')
      this.results.push('const calculator = {')
      this.results.push('  add(a, b) { return a + b },')
      this.results.push('  subtract(a, b) { return a - b },')
      this.results.push('  ...')
      this.results.push('}')
      this.results.push('')

      this.results.push('📌 <strong>调用方法：</strong>')
      this.results.push(
        `calculator.add(10, 5) = <span class="success">${calculator.add(10, 5)}</span>`
      )
      this.results.push(
        `calculator.subtract(10, 5) = <span class="success">${calculator.subtract(10, 5)}</span>`
      )
      this.results.push(
        `calculator.multiply(10, 5) = <span class="success">${calculator.multiply(10, 5)}</span>`
      )
      this.results.push(
        `calculator.divide(10, 5) = <span class="success">${calculator.divide(10, 5)}</span>`
      )
      this.results.push('')

      // Vue 中的应用
      this.results.push('📌 <strong>Vue 中就是用的方法简写：</strong>')
      this.results.push('methods: {')
      this.results.push('  handleClick() { ... },  // 方法简写')
      this.results.push('  fetchData() { ... }')
      this.results.push('}')
    }
  }
})
