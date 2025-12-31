/**
 * 对象解构赋值示例
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
      
      const user = {
        name: '张三',
        age: 18,
        city: '北京'
      }
      
      this.results.push('📌 <strong>基本解构：</strong>')
      this.results.push(`原对象: ${JSON.stringify(user)}`)
      this.results.push('')
      
      // ES5 方式
      this.results.push('ES5 方式:')
      this.results.push('const name = user.name')
      this.results.push('const age = user.age')
      this.results.push('')
      
      // ES6 解构
      const { name, age, city } = user
      this.results.push('ES6 解构:')
      this.results.push('const { name, age, city } = user')
      this.results.push('')
      this.results.push(`name = <span class="success">"${name}"</span>`)
      this.results.push(`age = <span class="success">${age}</span>`)
      this.results.push(`city = <span class="success">"${city}"</span>`)
    },
    
    testRename() {
      this.results = []
      
      const user = { name: '张三', age: 18 }
      
      this.results.push('📌 <strong>解构时重命名：</strong>')
      this.results.push(`原对象: ${JSON.stringify(user)}`)
      this.results.push('')
      
      // 重命名
      const { name: userName, age: userAge } = user
      
      this.results.push('const { name: userName, age: userAge } = user')
      this.results.push('')
      this.results.push(`userName = <span class="success">"${userName}"</span>`)
      this.results.push(`userAge = <span class="success">${userAge}</span>`)
      this.results.push('')
      this.results.push('💡 冒号左边是属性名，右边是新变量名')
    },
    
    testDefault() {
      this.results = []
      
      const user = { name: '张三' }
      
      this.results.push('📌 <strong>默认值：</strong>')
      this.results.push(`原对象: ${JSON.stringify(user)} (没有 age 属性)`)
      this.results.push('')
      
      // 默认值
      const { name, age = 18, city = '未知' } = user
      
      this.results.push('const { name, age = 18, city = "未知" } = user')
      this.results.push('')
      this.results.push(`name = <span class="success">"${name}"</span>`)
      this.results.push(`age = <span class="success">${age}</span> (使用默认值)`)
      this.results.push(`city = <span class="success">"${city}"</span> (使用默认值)`)
    },
    
    testNested() {
      this.results = []
      
      const data = {
        user: {
          name: '张三',
          address: {
            city: '北京',
            street: '长安街'
          }
        }
      }
      
      this.results.push('📌 <strong>嵌套解构：</strong>')
      this.results.push('const data = {')
      this.results.push('  user: {')
      this.results.push('    name: "张三",')
      this.results.push('    address: { city: "北京", street: "长安街" }')
      this.results.push('  }')
      this.results.push('}')
      this.results.push('')
      
      // 嵌套解构
      const { user: { name, address: { city } } } = data
      
      this.results.push('const { user: { name, address: { city } } } = data')
      this.results.push('')
      this.results.push(`name = <span class="success">"${name}"</span>`)
      this.results.push(`city = <span class="success">"${city}"</span>`)
    }
  }
})
