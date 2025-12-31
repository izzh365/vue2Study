/**
 * var 变量提升示例
 * 说明：var 声明的变量会被提升到作用域顶部
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
     * 演示 var 变量提升
     */
    testHoisting() {
      this.results = []
      
      // 这段代码实际执行顺序：
      // var name;          <- 声明被提升到顶部
      // console.log(name); <- undefined
      // name = '张三';     <- 赋值留在原地
      
      this.results.push('📌 <strong>代码书写顺序：</strong>')
      this.results.push('1. console.log(name) // 在声明前访问')
      this.results.push('2. var name = "张三"')
      this.results.push('')
      this.results.push('📌 <strong>实际执行顺序（变量提升后）：</strong>')
      this.results.push('1. var name // 声明被提升，值为 undefined')
      this.results.push('2. console.log(name) // <span class="highlight">输出: undefined</span>')
      this.results.push('3. name = "张三" // 赋值留在原地')
      this.results.push('')
      
      // 实际演示
      this.results.push('📌 <strong>实际运行结果：</strong>')
      
      // eslint-disable-next-line no-use-before-define
      this.results.push(`声明前访问 name: <span class="highlight">${name}</span>`)
      
      var name = '张三'
      
      this.results.push(`声明后访问 name: <span class="success">${name}</span>`)
      
      this.results.push('')
      this.results.push('⚠️ <span class="highlight">这就是 var 的问题：变量可以在声明前使用，容易造成 bug！</span>')
    },
    
    clearResults() {
      this.results = []
    }
  }
})
