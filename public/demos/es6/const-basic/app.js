/**
 * const 基本用法示例
 * 说明：const 声明常量，必须初始化且不能重新赋值
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
     * const 基本用法演示
     */
    testConstBasic() {
      this.results = []
      this.results.push('📌 <strong>const 基本特性：</strong>')
      this.results.push('')
      
      // 1. 必须初始化
      const PI = 3.14159
      this.results.push(`const PI = 3.14159`)
      this.results.push(`PI 的值: <span class="success">${PI}</span>`)
      this.results.push('')
      
      // 2. 不能只声明不赋值
      this.results.push('📌 <strong>const 必须初始化：</strong>')
      this.results.push('const EMPTY; // ❌ <span class="highlight">SyntaxError: Missing initializer</span>')
      this.results.push('')
      
      // 3. 块级作用域
      this.results.push('📌 <strong>const 也有块级作用域：</strong>')
      if (true) {
        const blockConst = '块内常量'
        this.results.push(`if 块内: ${blockConst}`)
      }
      this.results.push('if 块外: blockConst 不可访问')
      this.results.push('')
      
      // 4. 常见使用场景
      this.results.push('📌 <strong>常见使用场景：</strong>')
      
      const MAX_SIZE = 100
      const API_URL = 'https://api.example.com'
      const COLORS = Object.freeze(['red', 'green', 'blue'])
      
      this.results.push(`配置常量: MAX_SIZE = ${MAX_SIZE}`)
      this.results.push(`API 地址: API_URL = "${API_URL}"`)
      this.results.push(`冻结数组: COLORS = ${JSON.stringify(COLORS)}`)
    },
    
    /**
     * 尝试重新赋值（会报错）
     */
    testConstReassign() {
      this.results = []
      this.results.push('📌 <strong>尝试给 const 重新赋值：</strong>')
      this.results.push('')
      this.results.push('const name = "张三"')
      this.results.push('name = "李四" // 尝试重新赋值')
      this.results.push('')
      
      try {
        const name = '张三'
        this.results.push(`初始值: ${name}`)
        
        // 这行会报错，但我们用 eval 来捕获
        // name = '李四'
        
        // 模拟错误
        throw new TypeError('Assignment to constant variable.')
      } catch (e) {
        this.results.push(`<span class="highlight">❌ TypeError: ${e.message}</span>`)
      }
      
      this.results.push('')
      this.results.push('⚠️ <span class="highlight">const 声明的变量不能重新赋值！</span>')
      this.results.push('💡 如果需要修改值，请使用 let')
    },
    
    clearResults() {
      this.results = []
    }
  }
})
