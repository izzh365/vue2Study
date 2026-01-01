/**
 * 箭头函数返回值规则
 * 
 * 1. 单表达式：省略 {} 和 return，自动返回
 * 2. 返回对象：必须用 () 包裹，否则 {} 被当成函数体
 * 3. 多语句：必须用 {} 和显式 return
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      singleResult: null,
      objectResult: null,
      wrongResult: null,
      multiResult: null
    }
  },
  
  methods: {
    /**
     * 测试单表达式自动返回
     */
    testSingleExpr() {
      // 单表达式，省略 {} 和 return
      const double = n => n * 2
      
      this.singleResult = `double(10) = ${double(10)}`
      console.log(this.singleResult)
    },
    
    /**
     * 测试返回对象的正确写法
     */
    testReturnObject() {
      this.wrongResult = null
      
      // ✅ 正确：用括号包裹对象
      const getUser = () => ({ name: '张三', age: 18 })
      
      const user = getUser()
      this.objectResult = `getUser() = ${JSON.stringify(user)}`
      console.log('正确写法:', user)
    },
    
    /**
     * 测试返回对象的错误写法
     */
    testWrongObject() {
      this.objectResult = null
      
      // ❌ 错误：花括号被当成函数体，name: '张三' 被当成 label 语句
      // const getUser = () => { name: '张三', age: 18 }  // 语法错误
      
      // 演示：不加括号时，返回 undefined
      const getWrong = () => {
        // 这里 name: '张三' 被当作 label 语句，函数没有 return
        'label' // 这行什么都不做
      }
      
      this.wrongResult = `错误写法返回: ${getWrong()} (undefined，因为没有 return)`
      console.log('错误写法:', getWrong())
    },
    
    /**
     * 测试多语句需要显式 return
     */
    testMultiLine() {
      const calculate = (a, b) => {
        const sum = a + b
        const product = a * b
        return { sum, product }  // 必须显式 return
      }
      
      const result = calculate(3, 4)
      this.multiResult = `calculate(3, 4) = { sum: ${result.sum}, product: ${result.product} }`
      console.log('多语句结果:', result)
    }
  }
})
