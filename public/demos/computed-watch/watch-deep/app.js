/**
 * watch deep 深度监听 Demo
 *
 * 【通俗比喻】
 * 普通 watch 像门口保安：
 * - 只看"整个箱子"有没有被换掉
 * - 箱子里面东西变了，他不知道
 *
 * deep: true 像安检机器：
 * - 能透视箱子内部
 * - 任何层级的东西变了都能发现
 *
 * 【问题场景】
 * 表单数据通常是嵌套对象：
 * userInfo: {
 *   name: '张三',
 *   address: {       ← 嵌套对象
 *     city: '北京'   ← 修改这里，普通 watch 监听不到
 *   }
 * }
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 嵌套结构的用户信息
      userInfo: {
        name: '张三',
        age: 25,
        // 嵌套的地址对象
        address: {
          province: '北京',
          city: '北京',
          detail: '朝阳区xxx街道'
        }
      },
      // 监听日志
      logs: []
    }
  },

  watch: {
    /**
     * 深度监听 userInfo
     *
     * 【关键配置】deep: true
     * 会递归监听对象内部所有属性的变化
     */
    userInfo: {
      /**
       * handler 处理函数
       * @param {Object} newVal - 新值
       * @param {Object} oldVal - 旧值
       *
       * 【注意】
       * 对于对象，newVal 和 oldVal 是同一个引用！
       * 因为对象是原地修改的，不是替换
       */
      handler(newVal, oldVal) {
        // 由于是同一引用，这里只能知道"变了"，但不知道"从什么变成什么"
        this.addLog('🔔 userInfo 发生变化')
        this.addLog(`   当前值: ${JSON.stringify(newVal)}`)

        // 实际项目中，可能触发自动保存
        console.log('表单数据变化，触发自动保存...')
      },

      /**
       * 深度监听
       * 监听对象内部任意层级的变化
       */
      deep: true
    },

    /**
     * 【替代方案】直接监听具体路径
     * 可以精确知道哪个属性变了，以及新旧值
     */
    'userInfo.address.city': {
      handler(newVal, oldVal) {
        this.addLog(`📍 城市变化: "${oldVal}" → "${newVal}"`)
      }
    }
  },

  methods: {
    /**
     * 添加日志
     * @param {string} message - 日志内容
     */
    addLog(message) {
      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', { hour12: false })

      // 根据消息内容选择图标
      let icon = '📝'
      if (message.includes('城市')) icon = '📍'
      if (message.includes('userInfo')) icon = '🔄'

      this.logs.unshift({
        message: message.replace(/^[📝📍🔔🔄]\s*/, ''),
        time,
        icon
      })

      // 保留最近 10 条
      if (this.logs.length > 10) {
        this.logs.pop()
      }
    }
  }
})

/**
 * 【deep: true 的性能注意】
 *
 * 深度监听会遍历对象的所有属性
 * 如果对象很大、层级很深，会有性能开销
 *
 * 【优化策略】
 *
 * 1. 精确监听（推荐）
 *    如果只关心某个具体属性，直接监听路径：
 *    watch: {
 *      'userInfo.address.city'(newVal) { ... }
 *    }
 *
 * 2. 使用计算属性中转
 *    computed: {
 *      userCity() {
 *        return this.userInfo.address.city
 *      }
 *    },
 *    watch: {
 *      userCity(val) { ... }
 *    }
 *
 * 【新旧值相同的问题】
 *
 * 深度监听对象时，handler 收到的 newVal 和 oldVal 是同一个引用
 * 因为 Vue 是原地修改对象，不是创建新对象
 *
 * 如果需要对比新旧值，有两种方案：
 * 1. 监听具体路径，可以拿到准确的新旧值
 * 2. 在修改前手动保存一份旧值的深拷贝
 */
