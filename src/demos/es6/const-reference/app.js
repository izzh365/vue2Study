/**
 * const 与引用类型示例
 * 说明：const 锁定的是引用地址，对象内容可以修改
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
     * 修改对象属性（可以）
     */
    testModifyProperty() {
      this.results = []
      this.results.push('📌 <strong>修改 const 对象的属性：</strong>')
      this.results.push('')

      const user = {
        name: '张三',
        age: 18
      }

      this.results.push(`初始对象: ${JSON.stringify(user)}`)
      this.results.push('')
      this.results.push('执行: user.name = "李四"')
      this.results.push('执行: user.age = 20')

      // 修改属性是允许的
      user.name = '李四'
      user.age = 20

      this.results.push('')
      this.results.push(`修改后: <span class="success">${JSON.stringify(user)}</span>`)
      this.results.push('')
      this.results.push('✅ <span class="success">修改对象属性是允许的！</span>')
      this.results.push('💡 因为 const 锁定的是 user 这个"盒子"，')
      this.results.push('   而不是盒子里的内容')
    },

    /**
     * 添加新属性（可以）
     */
    testAddProperty() {
      this.results = []
      this.results.push('📌 <strong>给 const 对象添加新属性：</strong>')
      this.results.push('')

      const user = { name: '张三' }

      this.results.push(`初始对象: ${JSON.stringify(user)}`)
      this.results.push('')
      this.results.push('执行: user.age = 18')
      this.results.push('执行: user.email = "zhangsan@test.com"')

      // 添加属性是允许的
      user.age = 18
      user.email = 'zhangsan@test.com'

      this.results.push('')
      this.results.push(`添加后: <span class="success">${JSON.stringify(user)}</span>`)
      this.results.push('')
      this.results.push('✅ <span class="success">添加新属性也是允许的！</span>')

      // 数组也一样
      this.results.push('')
      this.results.push('📌 <strong>const 数组也一样：</strong>')

      const arr = [1, 2, 3]
      this.results.push(`初始数组: ${JSON.stringify(arr)}`)

      arr.push(4)
      arr[0] = 100

      this.results.push(`操作后: <span class="success">${JSON.stringify(arr)}</span>`)
    },

    /**
     * 重新赋值（不可以）
     */
    testReassign() {
      this.results = []
      this.results.push('📌 <strong>尝试给 const 对象重新赋值：</strong>')
      this.results.push('')

      this.results.push('const user = { name: "张三" }')
      this.results.push('user = { name: "李四" } // 尝试重新赋值')
      this.results.push('')

      try {
        // 模拟错误
        throw new TypeError('Assignment to constant variable.')
      } catch (e) {
        this.results.push(`<span class="highlight">❌ TypeError: ${e.message}</span>`)
      }

      this.results.push('')
      this.results.push('⚠️ <span class="highlight">不能重新赋值整个对象！</span>')
      this.results.push('')
      this.results.push('💡 <strong>总结：</strong>')
      this.results.push('   • 可以修改对象的属性')
      this.results.push('   • 可以添加/删除属性')
      this.results.push('   • 不能把变量指向新的对象')
    },

    clearResults() {
      this.results = []
    }
  }
})
