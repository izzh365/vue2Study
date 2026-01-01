/**
 * 箭头函数基本语法
 * 
 * ES6 引入的箭头函数，语法更简洁
 * 基本形式：(参数) => { 函数体 }
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      addResult: null,
      doubleResult: null
    }
  },
  
  methods: {
    /**
     * 测试加法函数
     */
    testAdd() {
      // ES5 写法
      var addES5 = function(a, b) {
        return a + b
      }
      
      // ES6 箭头函数写法
      const addES6 = (a, b) => {
        return a + b
      }
      
      // 两种写法结果相同
      console.log('ES5:', addES5(3, 5))
      console.log('ES6:', addES6(3, 5))
      
      this.addResult = addES6(3, 5)
    },
    
    /**
     * 测试更简洁的写法
     */
    testDouble() {
      // 完整写法
      const doubleFull = (n) => {
        return n * 2
      }
      
      // 简写：单参数省略括号，单表达式省略 return 和花括号
      const doubleShort = n => n * 2
      
      console.log('完整写法:', doubleFull(10))
      console.log('简写:', doubleShort(10))
      
      this.doubleResult = doubleShort(10)
    }
  }
})
