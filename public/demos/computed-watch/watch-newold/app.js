/**
 * watch 新旧值对比 Demo
 *
 * 【通俗比喻】
 * 就像股票软件的涨跌显示：
 * - 知道昨天收盘价（旧值）
 * - 知道今天价格（新值）
 * - 计算涨跌幅（对比结果）
 * - 显示红涨绿跌（根据对比做出响应）
 *
 * 【核心功能】
 * watch 回调函数接收两个参数：
 * 1. newValue - 变化后的新值
 * 2. oldValue - 变化前的旧值
 *
 * 这两个值可以用于：
 * - 计算变化量
 * - 记录变化历史
 * - 做差异化处理
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 当前分数
      score: 0,
      // 变化状态
      changeClass: 'neutral',
      changeArrow: '➖',
      changeText: '等待变化...',
      changeDetail: '点击按钮修改分数',
      // 变化历史
      history: []
    }
  },

  watch: {
    /**
     * 侦听 score 的变化
     * 利用新旧值对比，展示变化信息
     *
     * @param {number} newVal - 新分数
     * @param {number} oldVal - 旧分数
     */
    score(newVal, oldVal) {
      // 计算变化量
      const diff = newVal - oldVal

      // 根据变化方向更新状态
      if (diff > 0) {
        // 分数增加
        this.changeClass = 'positive'
        this.changeArrow = '📈'
        this.changeText = '分数上升'
        this.changeDetail = `从 ${oldVal} 增加到 ${newVal}（+${diff}）`
      } else if (diff < 0) {
        // 分数减少
        this.changeClass = 'negative'
        this.changeArrow = '📉'
        this.changeText = '分数下降'
        this.changeDetail = `从 ${oldVal} 减少到 ${newVal}（${diff}）`
      } else {
        // 没有变化（通常不会触发，但以防万一）
        this.changeClass = 'neutral'
        this.changeArrow = '➖'
        this.changeText = '没有变化'
        this.changeDetail = `分数保持 ${newVal}`
      }

      // 记录历史（保留最近5条）
      this.history.unshift({
        oldVal,
        newVal,
        diff
      })

      if (this.history.length > 5) {
        this.history.pop()
      }
    }
  }
})

/**
 * 【新旧值的实际应用场景】
 *
 * 1. 表单验证状态变化
 *    watch: {
 *      formData(newVal, oldVal) {
 *        // 检查哪个字段发生了变化
 *        // 只验证变化的字段
 *      }
 *    }
 *
 * 2. 页面滚动位置记录
 *    watch: {
 *      scrollY(newY, oldY) {
 *        if (newY > oldY) {
 *          console.log('向下滚动')
 *        } else {
 *          console.log('向上滚动')
 *        }
 *      }
 *    }
 *
 * 3. 路由参数变化处理
 *    watch: {
 *      '$route.params.id'(newId, oldId) {
 *        console.log(`从页面 ${oldId} 跳转到 ${newId}`)
 *        this.fetchData(newId)
 *      }
 *    }
 *
 * 【注意】
 * 对于对象和数组，newVal 和 oldVal 可能指向同一个引用！
 * 如果需要对比对象内部变化，需要使用深拷贝或 deep 选项。
 */
