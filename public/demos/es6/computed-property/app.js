/**
 * 计算属性名示例
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      keyName: 'dynamicKey',
      keyValue: 'dynamicValue',
      results: []
    }
  },
  
  methods: {
    testComputedProperty() {
      this.results = []
      
      const key = this.keyName || 'defaultKey'
      const value = this.keyValue || 'defaultValue'
      
      // 使用计算属性名
      const obj = {
        [key]: value
      }
      
      this.results.push('📌 <strong>计算属性名语法：</strong>')
      this.results.push(`const key = "${key}"`)
      this.results.push(`const value = "${value}"`)
      this.results.push('')
      this.results.push('const obj = {')
      this.results.push(`  [key]: value  // 等同于 "${key}": "${value}"`)
      this.results.push('}')
      this.results.push('')
      this.results.push(`结果: <span class="success">${JSON.stringify(obj)}</span>`)
      this.results.push('')
      
      // 表达式
      this.results.push('📌 <strong>还可以使用表达式：</strong>')
      const index = 1
      const data = {
        ['item_' + index]: '第一项',
        ['item_' + (index + 1)]: '第二项'
      }
      this.results.push(`['item_' + 1]: '第一项'`)
      this.results.push(`['item_' + 2]: '第二项'`)
      this.results.push(`结果: <span class="success">${JSON.stringify(data)}</span>`)
    },
    
    testPrefix() {
      this.results = []
      
      const prefix = 'user_'
      const fields = ['name', 'age', 'email']
      
      // 批量创建带前缀的属性
      const obj = {}
      fields.forEach((field, index) => {
        obj[prefix + field] = `值${index + 1}`
      })
      
      this.results.push('📌 <strong>批量创建带前缀的属性：</strong>')
      this.results.push(`const prefix = "${prefix}"`)
      this.results.push(`const fields = ${JSON.stringify(fields)}`)
      this.results.push('')
      this.results.push('fields.forEach(field => {')
      this.results.push('  obj[prefix + field] = value')
      this.results.push('})')
      this.results.push('')
      this.results.push(`结果: <span class="success">${JSON.stringify(obj, null, 2)}</span>`)
    }
  }
})
