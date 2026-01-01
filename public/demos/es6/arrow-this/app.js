/**
 * 箭头函数 this 指向
 *
 * 核心区别：
 * - 普通函数：this 由调用方式决定（动态绑定）
 * - 箭头函数：this 由定义位置决定（词法绑定），继承外层作用域
 *
 * 这是箭头函数最重要的特性！
 */
new Vue({
  el: '#app',

  data() {
    return {
      name: 'Vue 实例',
      normalResult: null,
      arrowResult: null
    }
  },

  methods: {
    /**
     * 测试普通函数的 this 问题
     */
    testNormalThis() {
      this.normalResult = null

      const self = this // 传统解决方案：保存 this 引用

      // 普通函数中的 this 指向取决于调用方式
      setTimeout(function () {
        // 这里的 this 不是 Vue 实例！
        // 在浏览器中是 window，严格模式下是 undefined
        console.log('普通函数中 this:', this)
        console.log('普通函数中 this.name:', this ? this.name : 'undefined')

        // 使用 self 可以访问
        self.normalResult = `❌ 普通函数的 this.name = undefined（this 指向了 window）`
      }, 500)
    },

    /**
     * 测试箭头函数的 this
     */
    testArrowThis() {
      this.arrowResult = null

      // 箭头函数继承外层的 this（即 Vue 实例）
      setTimeout(() => {
        // 这里的 this 就是 Vue 实例！
        console.log('箭头函数中 this:', this)
        console.log('箭头函数中 this.name:', this.name)

        this.arrowResult = `✅ 箭头函数的 this.name = "${this.name}"（正确访问到 Vue 实例）`
      }, 500)
    }
  }
})
