/**
 * let 块级作用域示例
 * 说明：let 声明的变量只在当前代码块内有效
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
     * 测试 var 没有块级作用域
     */
    testVar() {
      this.results = []
      this.results.push('📌 <strong>使用 var 声明：</strong>')
      this.results.push('')
      
      // var 没有块级作用域
      if (true) {
        var message = '我是在 if 块内用 var 声明的'
        this.results.push(`if 块内: <span class="success">${message}</span>`)
      }
      
      // 在 if 块外仍然可以访问
      this.results.push(`if 块外: <span class="highlight">${message}</span>`)
      this.results.push('')
      this.results.push('⚠️ <span class="highlight">问题：var 声明的变量泄漏到了 if 块外面！</span>')
    },
    
    /**
     * 测试 let 有块级作用域
     */
    testLet() {
      this.results = []
      this.results.push('📌 <strong>使用 let 声明：</strong>')
      this.results.push('')
      
      // let 有块级作用域
      if (true) {
        let secret = '我是在 if 块内用 let 声明的'
        this.results.push(`if 块内: <span class="success">${secret}</span>`)
      }
      
      // 在 if 块外无法访问
      this.results.push('if 块外: 尝试访问 secret...')
      
      try {
        // 这里实际上访问不到 secret，我们模拟这个效果
        // eslint-disable-next-line no-undef
        // console.log(secret) // 会报错 ReferenceError
        this.results.push('<span class="highlight">❌ ReferenceError: secret is not defined</span>')
      } catch (e) {
        this.results.push(`<span class="highlight">❌ ${e.message}</span>`)
      }
      
      this.results.push('')
      this.results.push('✅ <span class="success">let 的优势：变量被限制在代码块内，不会泄漏！</span>')
      
      // 对比示例
      this.results.push('')
      this.results.push('📌 <strong>更多示例：</strong>')
      
      for (let i = 0; i < 3; i++) {
        // i 只在 for 循环内有效
      }
      // 这里访问不到 i
      this.results.push('for 循环后，i 不可访问（let 有块级作用域）')
      
      {
        let blockVar = '块级变量'
        this.results.push(`独立代码块内: ${blockVar}`)
      }
      // blockVar 在这里不可访问
      this.results.push('代码块外，blockVar 不可访问')
    },
    
    clearResults() {
      this.results = []
    }
  }
})
