/**
 * 箭头函数的注意事项和限制
 * 
 * 箭头函数不是普通函数的完全替代品！
 * 
 * 限制：
 * 1. 没有 arguments 对象（用剩余参数代替）
 * 2. 不能作为构造函数（不能 new）
 * 3. 没有 prototype 属性
 * 4. 不能用 call/apply/bind 改变 this
 * 5. 不能用作 Generator 函数
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      testResult: null
    }
  },
  
  methods: {
    /**
     * 测试箭头函数的各种限制
     */
    testLimitations() {
      let results = []
      
      // 1. 测试 arguments
      function normalFn() {
        return Array.from(arguments).join(', ')
      }
      results.push(`1. 普通函数 arguments: [${normalFn(1, 2, 3)}]`)
      
      // 箭头函数用剩余参数代替
      const arrowFn = (...args) => args.join(', ')
      results.push(`   箭头函数剩余参数: [${arrowFn(1, 2, 3)}]`)
      
      // 2. 测试构造函数
      function NormalPerson(name) {
        this.name = name
      }
      const person = new NormalPerson('张三')
      results.push(`2. 普通函数构造: ${person.name}`)
      
      // 箭头函数不能 new
      const ArrowPerson = (name) => { this.name = name }
      try {
        new ArrowPerson('李四')
      } catch (e) {
        results.push(`   箭头函数 new 报错: ${e.message}`)
      }
      
      // 3. 测试 prototype
      results.push(`3. 普通函数 prototype: ${typeof NormalPerson.prototype}`)
      results.push(`   箭头函数 prototype: ${typeof ArrowPerson.prototype}`)
      
      // 4. 测试 call/apply/bind
      const obj = { name: '目标对象' }
      
      function normalThis() {
        return this.name
      }
      
      const arrowThis = () => this.name  // this 是 Vue 实例
      
      results.push(`4. 普通函数 call: ${normalThis.call(obj)}`)
      results.push(`   箭头函数 call: ${arrowThis.call(obj)} (无法改变，还是 Vue 实例)`)
      
      this.testResult = results.join('<br>')
    }
  }
})
