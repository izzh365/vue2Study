/**
 * v-on 传递参数示例
 * 
 * 调用方法时可以传递参数：
 * - @click="method('参数')"  传递单个参数
 * - @click="method(a, b, c)" 传递多个参数
 * - @click="method(item)"    传递对象
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 问候语
      greeting: '点击按钮问候不同的人',
      
      // 计算结果
      calcResult: '点击按钮进行计算',
      
      // 商品列表
      products: [
        { id: 1, name: '苹果', emoji: '🍎', price: 5 },
        { id: 2, name: '香蕉', emoji: '🍌', price: 3 },
        { id: 3, name: '橙子', emoji: '🍊', price: 4 },
        { id: 4, name: '葡萄', emoji: '🍇', price: 8 }
      ],
      
      // 选中的商品
      selectedProduct: null
    }
  },
  
  methods: {
    /**
     * 问候方法
     * @param {string} name - 被问候人的名字
     */
    greet(name) {
      this.greeting = `你好，${name}！欢迎来到 Vue 世界！`
    },
    
    /**
     * 计算方法
     * @param {string} operator - 运算符
     * @param {number} a - 第一个数
     * @param {number} b - 第二个数
     */
    calculate(operator, a, b) {
      let result
      
      switch (operator) {
        case '+':
          result = a + b
          break
        case '-':
          result = a - b
          break
        case '×':
          result = a * b
          break
        case '÷':
          result = a / b
          break
        default:
          result = 0
      }
      
      this.calcResult = `${a} ${operator} ${b} = ${result}`
    },
    
    /**
     * 选择商品
     * @param {Object} product - 商品对象
     */
    selectProduct(product) {
      this.selectedProduct = product
      console.log('选择了商品：', product)
    }
  }
})
