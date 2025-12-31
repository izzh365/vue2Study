/**
 * 暂时性死区 (TDZ) 示例
 * 说明：let/const 在声明前存在"死区"，不可访问
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
     * var 没有暂时性死区
     */
    testVarNoTDZ() {
      this.results = []
      this.results.push('📌 <strong>var 没有暂时性死区：</strong>')
      this.results.push('')
      this.results.push('console.log(name) // 声明前访问')
      this.results.push('var name = "张三"')
      this.results.push('')

      // var 可以在声明前访问（变量提升）
      // eslint-disable-next-line no-use-before-define
      const beforeValue = typeof varName === 'undefined' ? 'undefined' : varName
      this.results.push(
        `声明前访问: <span class="success">${beforeValue}</span> (不报错，只是 undefined)`
      )

      var varName = '张三'

      this.results.push(`声明后访问: <span class="success">${varName}</span>`)
      this.results.push('')
      this.results.push('💡 var 的变量提升让声明前访问不会报错，')
      this.results.push('   但这容易隐藏 bug，不是好事！')
    },

    /**
     * let 的暂时性死区
     */
    testLetTDZ() {
      this.results = []
      this.results.push('📌 <strong>let/const 有暂时性死区：</strong>')
      this.results.push('')
      this.results.push('console.log(name) // 声明前访问')
      this.results.push('let name = "张三"')
      this.results.push('')

      // 模拟 TDZ 报错
      this.results.push('执行结果:')
      this.results.push(
        '<span class="highlight">❌ ReferenceError: Cannot access \'name\' before initialization</span>'
      )
      this.results.push('')

      // 正确使用
      this.results.push('📌 <strong>正确的使用方式：</strong>')
      let name = '张三'
      this.results.push(`let name = "张三"`)
      this.results.push(`console.log(name) // 声明后访问: <span class="success">${name}</span>`)
      this.results.push('')

      // typeof 也不安全
      this.results.push('📌 <strong>注意：typeof 也不安全</strong>')
      this.results.push('typeof undeclaredVar // 返回 "undefined"，不报错')
      this.results.push('typeof letVar // <span class="highlight">在 TDZ 中会报错！</span>')
      this.results.push('')

      // 为什么需要 TDZ
      this.results.push('📌 <strong>为什么需要 TDZ？</strong>')
      this.results.push('1. 强制先声明后使用，代码更规范')
      this.results.push('2. 更早发现错误，避免 undefined 引发的 bug')
      this.results.push('3. 让变量的作用域更加清晰')
    },

    clearResults() {
      this.results = []
    }
  }
})
