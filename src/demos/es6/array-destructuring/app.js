/**
 * 数组解构赋值示例
 */
new Vue({
  el: '#app',

  data() {
    return {
      results: []
    }
  },

  methods: {
    testBasic() {
      this.results = []

      const colors = ['红', '绿', '蓝']

      this.results.push('📌 <strong>基本解构：</strong>')
      this.results.push(`原数组: ${JSON.stringify(colors)}`)
      this.results.push('')

      // ES5 方式
      this.results.push('ES5 方式:')
      this.results.push('const first = colors[0]')
      this.results.push('const second = colors[1]')
      this.results.push('')

      // ES6 解构
      const [first, second, third] = colors

      this.results.push('ES6 解构:')
      this.results.push('const [first, second, third] = colors')
      this.results.push('')
      this.results.push(`first = <span class="success">"${first}"</span>`)
      this.results.push(`second = <span class="success">"${second}"</span>`)
      this.results.push(`third = <span class="success">"${third}"</span>`)
    },

    testSkip() {
      this.results = []

      const numbers = [1, 2, 3, 4, 5]

      this.results.push('📌 <strong>跳过元素：</strong>')
      this.results.push(`原数组: ${JSON.stringify(numbers)}`)
      this.results.push('')

      // 跳过中间元素
      const [first, , third, , fifth] = numbers

      this.results.push('const [first, , third, , fifth] = numbers')
      this.results.push('(用逗号跳过不需要的元素)')
      this.results.push('')
      this.results.push(`first = <span class="success">${first}</span>`)
      this.results.push(`third = <span class="success">${third}</span>`)
      this.results.push(`fifth = <span class="success">${fifth}</span>`)
    },

    testRest() {
      this.results = []

      const numbers = [1, 2, 3, 4, 5]

      this.results.push('📌 <strong>剩余元素 ...rest：</strong>')
      this.results.push(`原数组: ${JSON.stringify(numbers)}`)
      this.results.push('')

      // 剩余元素
      const [first, second, ...rest] = numbers

      this.results.push('const [first, second, ...rest] = numbers')
      this.results.push('')
      this.results.push(`first = <span class="success">${first}</span>`)
      this.results.push(`second = <span class="success">${second}</span>`)
      this.results.push(`rest = <span class="success">${JSON.stringify(rest)}</span>`)
      this.results.push('')
      this.results.push('💡 ...rest 必须放在最后')
    },

    testSwap() {
      this.results = []

      this.results.push('📌 <strong>交换变量（经典用法）：</strong>')
      this.results.push('')

      let a = 1
      let b = 2

      this.results.push(`交换前: a = ${a}, b = ${b}`)
      this.results.push('')

      // ES5 需要临时变量
      this.results.push('ES5 需要临时变量:')
      this.results.push('const temp = a; a = b; b = temp')
      this.results.push('')

      // ES6 解构交换
      ;[a, b] = [b, a]

      this.results.push('ES6 解构交换:')
      this.results.push('[a, b] = [b, a]')
      this.results.push('')
      this.results.push(
        `交换后: a = <span class="success">${a}</span>, b = <span class="success">${b}</span>`
      )
      this.results.push('')
      this.results.push('✨ 一行代码搞定，超级优雅！')
    }
  }
})
