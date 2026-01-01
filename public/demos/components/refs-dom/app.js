/**
 * ref 获取 DOM 元素示例
 *
 * 知识点：
 * 1. 通过 ref 属性给 DOM 元素命名
 * 2. 通过 this.$refs.name 访问 DOM 元素
 * 3. 必须在 mounted 之后访问
 * 4. 常用于操作 DOM、集成第三方库
 */

new Vue({
  el: '#app',

  data() {
    return {
      inputValue: 'Hello Vue!',
      elementStyle: {
        padding: '40px',
        fontSize: '18px'
      },
      elementInfo: null,
      ctx: null // Canvas 上下文
    }
  },

  /**
   * mounted 钩子
   * 此时 DOM 已渲染，可以访问 $refs
   */
  mounted() {
    console.log('mounted: 可以访问 $refs 了')

    // 自动聚焦输入框
    this.$refs.myInput.focus()

    // 初始化 Canvas
    this.initCanvas()
  },

  methods: {
    // ==================== 输入框操作 ====================

    /**
     * 聚焦输入框
     */
    focusInput() {
      // 通过 $refs 访问 DOM 元素
      this.$refs.myInput.focus()
      console.log('已聚焦输入框')
    },

    /**
     * 选中输入框内容
     */
    selectInput() {
      this.$refs.myInput.select()
      console.log('已选中输入框内容')
    },

    /**
     * 清空输入框
     */
    clearInput() {
      this.inputValue = ''
      // 清空后自动聚焦
      this.$refs.myInput.focus()
    },

    // ==================== 读取 DOM 信息 ====================

    /**
     * 读取元素信息
     */
    readElementInfo() {
      const el = this.$refs.demoElement
      // getBoundingClientRect() 返回元素的大小和位置信息
      const rect = el.getBoundingClientRect()

      this.elementInfo = {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        left: Math.round(rect.left),
        top: Math.round(rect.top),
        tagName: el.tagName
      }

      console.log('元素信息:', this.elementInfo)
    },

    /**
     * 改变元素大小
     */
    changeSize(size) {
      if (size === 'large') {
        this.elementStyle = {
          padding: '60px',
          fontSize: '24px'
        }
      } else {
        this.elementStyle = {
          padding: '20px',
          fontSize: '14px'
        }
      }

      // DOM 更新后重新读取信息
      this.$nextTick(() => {
        this.readElementInfo()
      })
    },

    // ==================== Canvas 操作 ====================

    /**
     * 初始化 Canvas
     */
    initCanvas() {
      const canvas = this.$refs.canvas
      this.ctx = canvas.getContext('2d')
      console.log('Canvas 初始化完成')
    },

    /**
     * 画圆
     */
    drawCircle() {
      const x = Math.random() * 350 + 25
      const y = Math.random() * 150 + 25
      const radius = Math.random() * 20 + 10
      const color = this.getRandomColor()

      this.ctx.beginPath()
      this.ctx.arc(x, y, radius, 0, Math.PI * 2)
      this.ctx.fillStyle = color
      this.ctx.fill()
    },

    /**
     * 画矩形
     */
    drawRect() {
      const x = Math.random() * 300
      const y = Math.random() * 100
      const width = Math.random() * 80 + 20
      const height = Math.random() * 60 + 20
      const color = this.getRandomColor()

      this.ctx.fillStyle = color
      this.ctx.fillRect(x, y, width, height)
    },

    /**
     * 写文字
     */
    drawText() {
      const x = Math.random() * 250 + 20
      const y = Math.random() * 150 + 30
      const color = this.getRandomColor()

      this.ctx.font = '20px Arial'
      this.ctx.fillStyle = color
      this.ctx.fillText('Hello Vue!', x, y)
    },

    /**
     * 清空 Canvas
     */
    clearCanvas() {
      const canvas = this.$refs.canvas
      this.ctx.clearRect(0, 0, canvas.width, canvas.height)
    },

    /**
     * 生成随机颜色
     */
    getRandomColor() {
      const colors = ['#667eea', '#764ba2', '#FF3B30', '#34C759', '#FF9500', '#5AC8FA']
      return colors[Math.floor(Math.random() * colors.length)]
    }
  },

  created() {
    console.log('=== ref 获取 DOM 元素 ===')
    console.log('')
    console.log('📋 使用步骤：')
    console.log('  1. 模板中添加 ref="name"')
    console.log('  2. 通过 this.$refs.name 访问')
    console.log('')
    console.log('⚠️ 注意：')
    console.log('  - created 中不能访问（DOM 未渲染）')
    console.log('  - mounted 之后才能访问')
  }
})
