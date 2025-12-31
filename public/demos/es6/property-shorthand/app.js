/**
 * 属性简写示例
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      results: []
    }
  },
  
  methods: {
    testShorthand() {
      this.results = []
      
      // 定义变量
      const name = '张三'
      const age = 18
      const city = '北京'
      
      this.results.push('📌 <strong>定义变量：</strong>')
      this.results.push(`const name = "${name}"`)
      this.results.push(`const age = ${age}`)
      this.results.push(`const city = "${city}"`)
      this.results.push('')
      
      // ES5 写法
      this.results.push('📌 <strong>ES5 创建对象：</strong>')
      const userES5 = {
        name: name,
        age: age,
        city: city
      }
      this.results.push(`{ name: name, age: age, city: city }`)
      this.results.push(`结果: ${JSON.stringify(userES5)}`)
      this.results.push('')
      
      // ES6 简写
      this.results.push('📌 <strong>ES6 属性简写：</strong>')
      const userES6 = { name, age, city }
      this.results.push(`{ name, age, city }`)
      this.results.push(`结果: <span class="success">${JSON.stringify(userES6)}</span>`)
      this.results.push('')
      
      // 混合使用
      this.results.push('📌 <strong>混合使用：</strong>')
      const email = 'test@example.com'
      const mixed = {
        name,           // 简写
        age,            // 简写
        gender: '男',    // 普通写法
        email           // 简写
      }
      this.results.push(`{ name, age, gender: '男', email }`)
      this.results.push(`结果: <span class="success">${JSON.stringify(mixed)}</span>`)
    }
  }
})
