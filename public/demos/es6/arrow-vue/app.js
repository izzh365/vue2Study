/**
 * 箭头函数在 Vue 中的正确用法
 *
 * Vue 2 官方文档明确说明：
 * - 不要在 methods、computed、watch、生命周期钩子中使用箭头函数
 * - 因为箭头函数绑定父作用域，this 不会指向 Vue 实例
 *
 * 推荐使用箭头函数的场景：
 * - 数组方法回调（filter、map、reduce）
 * - 定时器回调（setTimeout、setInterval）
 * - Promise 回调（then、catch）
 * - 事件监听器回调（addEventListener）
 */
new Vue({
  el: '#app',

  data() {
    return {
      items: [
        { id: 1, name: '苹果', active: true },
        { id: 2, name: '香蕉', active: false },
        { id: 3, name: '橙子', active: true }
      ],
      goodResult: null
    }
  },

  // ✅ 正确：使用普通函数定义 computed
  computed: {
    // 正确写法
    activeItems() {
      // ✅ 在这里面可以用箭头函数
      return this.items.filter(item => item.active)
    }
  },

  // ✅ 正确：使用普通函数定义 methods
  methods: {
    // ✅ 正确：方法用普通函数
    testGoodUsage() {
      // ✅ 在回调中用箭头函数
      const names = this.items
        .filter(item => item.active) // 箭头函数 OK
        .map(item => item.name) // 箭头函数 OK

      // 模拟异步操作
      setTimeout(() => {
        // ✅ 箭头函数中 this 正确指向 Vue 实例
        this.goodResult = `激活的商品: ${names.join(', ')}`
      }, 300)
    }

    // ❌ 错误示例（不要这样写！）
    // wrongMethod: () => {
    //   this.something  // this 是 undefined！
    // }
  }
})
