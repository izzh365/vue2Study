/**
 * computed getter/setter 示例
 *
 * 【核心概念】
 * 默认情况下，computed 只提供 getter（只读）
 * 当你需要"逆向"设置值时，可以提供 setter
 *
 * 【通俗比喻】
 * getter 像是 "读取公式的结果"
 * setter 像是 "通过结果反推原始值"
 *
 * 例如：
 * - getter: 姓 + 名 = 全名（张 + 三 = 张三）
 * - setter: 全名 → 拆分出姓和名（李四 → 李 + 四）
 */
new Vue({
  el: '#app',

  data() {
    return {
      firstName: '张',
      lastName: '三',
      logs: []
    }
  },

  computed: {
    /**
     * fullName 完整写法（包含 getter 和 setter）
     */
    fullName: {
      /**
       * getter - 读取时调用
       * 就像公式：返回 firstName + lastName
       */
      get() {
        this.logs.unshift({
          type: 'get',
          text: `📖 getter 被调用: "${this.firstName}" + "${this.lastName}" = "${this.firstName + this.lastName}"`
        })
        // 限制日志数量
        if (this.logs.length > 10) this.logs.pop()

        return this.firstName + this.lastName
      },

      /**
       * setter - 写入时调用
       * 接收新值，需要手动更新依赖的数据
       * @param {string} newValue - 用户输入的新值
       */
      set(newValue) {
        // 按空格拆分姓名
        const names = newValue.split(' ')

        // 更新原始数据
        this.firstName = names[0] || ''
        this.lastName = names.slice(1).join(' ') || ''

        this.logs.unshift({
          type: 'set',
          text: `✏️ setter 被调用: "${newValue}" → 姓="${this.firstName}", 名="${this.lastName}"`
        })
        // 限制日志数量
        if (this.logs.length > 10) this.logs.pop()
      }
    }
  }
})
