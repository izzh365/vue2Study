/**
 * 箭头函数参数规则
 *
 * 总结：
 * - 0 个参数：() => ...
 * - 1 个参数：x => ... 或 (x) => ...
 * - 2+ 参数：(x, y) => ...
 * - 默认参数：(x = 1) => ...
 * - 剩余参数：(...args) => ...
 */
new Vue({
  el: '#app',

  data() {
    return {
      results: []
    }
  },

  methods: {
    /**
     * 测试所有参数规则
     */
    testAllRules() {
      this.results = []

      // 1. 无参数 - 必须写空括号
      const sayHi = () => 'Hello!'
      this.results.push(`1. 无参数: sayHi() = "${sayHi()}"`)

      // 2. 单参数 - 可省略括号
      const double = n => n * 2
      this.results.push(`2. 单参数: double(5) = ${double(5)}`)

      // 3. 多参数 - 必须写括号
      const add = (a, b) => a + b
      this.results.push(`3. 多参数: add(3, 7) = ${add(3, 7)}`)

      // 4. 默认参数
      const greet = (name = '访客') => `你好, ${name}`
      this.results.push(`4. 默认参数: greet() = "${greet()}"`)
      this.results.push(`4. 默认参数: greet('张三') = "${greet('张三')}"`)

      // 5. 剩余参数
      const sum = (...nums) => nums.reduce((a, b) => a + b, 0)
      this.results.push(`5. 剩余参数: sum(1,2,3,4,5) = ${sum(1, 2, 3, 4, 5)}`)

      console.log('所有测试通过！', this.results)
    }
  }
})
