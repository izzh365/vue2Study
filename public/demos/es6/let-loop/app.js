/**
 * let 在 for 循环中的经典应用
 * 说明：解决 var 在循环中的闭包问题
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      buttons: [],
      results: []
    }
  },
  
  methods: {
    /**
     * 使用 var 创建按钮（问题版本）
     */
    createVarButtons() {
      this.buttons = []
      this.results = []
      this.results.push('📌 <strong>使用 var 创建 5 个按钮：</strong>')
      this.results.push('for (var i = 0; i < 5; i++) { ... }')
      this.results.push('')
      
      // 使用 var 的问题
      const handlers = []
      for (var i = 0; i < 5; i++) {
        handlers.push(() => {
          // 当点击时，循环已经结束，i 变成了 5
          this.results.push(`点击了按钮，i = <span class="highlight">${i}</span>`)
        })
      }
      
      // 创建按钮
      for (let j = 0; j < 5; j++) {
        this.buttons.push({
          id: j,
          handler: handlers[j]
        })
      }
      
      this.results.push('⚠️ 点击任意按钮，看看输出什么...')
      this.results.push('<span class="highlight">预期每个按钮输出对应的数字 0-4</span>')
    },
    
    /**
     * 使用 let 创建按钮（正确版本）
     */
    createLetButtons() {
      this.buttons = []
      this.results = []
      this.results.push('📌 <strong>使用 let 创建 5 个按钮：</strong>')
      this.results.push('for (let i = 0; i < 5; i++) { ... }')
      this.results.push('')
      
      // 使用 let 解决问题
      const handlers = []
      for (let i = 0; i < 5; i++) {
        handlers.push(() => {
          // 每次循环都有独立的 i
          this.results.push(`点击了按钮，i = <span class="success">${i}</span>`)
        })
      }
      
      // 创建按钮
      for (let j = 0; j < 5; j++) {
        this.buttons.push({
          id: j,
          handler: handlers[j]
        })
      }
      
      this.results.push('✅ 点击任意按钮，看看输出什么...')
      this.results.push('<span class="success">每个按钮会输出正确的数字！</span>')
    },
    
    clearAll() {
      this.buttons = []
      this.results = []
    }
  }
})
