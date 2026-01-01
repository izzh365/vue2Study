/**
 * $event 事件对象示例
 *
 * $event 是 Vue 提供的特殊变量，代表原生 DOM 事件对象
 *
 * 使用场景：
 * - 获取事件类型、目标元素
 * - 获取鼠标位置
 * - 获取键盘按键信息
 * - 阻止默认行为（也可用修饰符）
 */

new Vue({
  el: '#app',

  data() {
    return {
      // 事件信息
      eventInfo: null,

      // 按钮信息
      btnInfo: null,

      // 鼠标位置
      mousePos: null,

      // 点击标记
      clickMarkers: [],

      // 按键信息
      keyInfo: null
    }
  },

  methods: {
    /**
     * 处理点击事件
     * @param {Event} event - 原生事件对象
     */
    handleClick(event) {
      this.eventInfo = {
        type: event.type,
        target: event.target.tagName,
        timeStamp: Math.round(event.timeStamp) + 'ms'
      }

      // 打印完整事件对象供学习
      console.log('完整事件对象：', event)
    },

    /**
     * 处理按钮点击，同时接收自定义参数和事件对象
     * @param {string} type - 按钮类型
     * @param {Event} event - 事件对象
     */
    handleBtnClick(type, event) {
      this.btnInfo = {
        type: type,
        text: event.target.innerText,
        width: event.target.offsetWidth
      }
    },

    /**
     * 追踪鼠标移动
     * @param {MouseEvent} event - 鼠标事件对象
     */
    trackMouse(event) {
      this.mousePos = {
        x: event.offsetX,
        y: event.offsetY
      }
    },

    /**
     * 追踪点击位置
     * @param {MouseEvent} event - 鼠标事件对象
     */
    trackClick(event) {
      // 添加点击标记
      this.clickMarkers.push({
        x: event.offsetX,
        y: event.offsetY
      })

      // 使用 setTimeout 移除标记（动画结束后）
      setTimeout(() => {
        this.clickMarkers.shift()
      }, 500)
    },

    /**
     * 处理键盘按下
     * @param {KeyboardEvent} event - 键盘事件对象
     */
    handleKeyDown(event) {
      this.keyInfo = {
        key: event.key,
        keyCode: event.keyCode,
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey
      }
    }
  }
})
