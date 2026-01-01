/**
 * mounted 钩子操作 DOM
 * 
 * mounted 是操作 DOM 的最佳时机：
 * 1. 此时 $el 已经创建并挂载
 * 2. 可以通过 $refs 访问 DOM 元素
 * 3. 适合初始化需要 DOM 的第三方库
 * 
 * 注意：
 * - mounted 不保证所有子组件也都挂载完成
 * - 如需等待整个视图渲染完成，使用 $nextTick
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 输入框值
      inputValue: '',
      
      // 盒子尺寸信息
      boxInfo: {
        width: 0,
        height: 0,
        top: 0
      },
      
      // 图表数据
      chartData: [30, 50, 80, 45, 60],
      
      // 状态
      elExists: false,
      refsCount: 0
    }
  },
  
  /**
   * mounted 钩子
   * 
   * 最佳实践：
   * 1. 操作 DOM 元素（聚焦、滚动、测量等）
   * 2. 初始化第三方 UI 库（ECharts、地图、编辑器等）
   * 3. 添加 DOM 事件监听（window.resize 等）
   * 4. 使用 $refs 访问 DOM 或子组件
   */
  mounted() {
    console.log('mounted: 开始执行')
    
    // 用例1：自动聚焦输入框
    this.autoFocus()
    
    // 用例2：测量 DOM 元素尺寸
    this.measureBox()
    
    // 用例3：初始化图表（模拟）
    this.initChart()
    
    // 检查状态
    this.checkMountedStatus()
    
    // 添加窗口事件监听
    window.addEventListener('resize', this.handleResize)
    
    console.log('mounted: 执行完毕')
  },
  
  /**
   * beforeDestroy - 记得清理事件监听
   */
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    console.log('beforeDestroy: 已清理 resize 事件监听')
  },
  
  methods: {
    /**
     * 用例1：自动聚焦
     * 在 mounted 中通过 $refs 访问 DOM 元素
     */
    autoFocus() {
      // $refs.autoFocusInput 是真实的 DOM 元素
      const input = this.$refs.autoFocusInput
      if (input) {
        input.focus()
        console.log('已自动聚焦到输入框')
      }
    },
    
    /**
     * 用例2：测量 DOM 元素尺寸
     * 使用 getBoundingClientRect() 获取元素信息
     */
    measureBox() {
      const box = this.$refs.measureBox
      if (box) {
        const rect = box.getBoundingClientRect()
        this.boxInfo = {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          top: Math.round(rect.top)
        }
        console.log('盒子尺寸:', this.boxInfo)
      }
    },
    
    /**
     * 用例3：初始化图表
     * 模拟第三方库初始化
     */
    initChart() {
      const container = this.$refs.chartContainer
      if (container) {
        console.log('图表容器尺寸:', container.offsetWidth, 'x', container.offsetHeight)
        // 在这里可以初始化 ECharts 等库
        // const chart = echarts.init(container)
        // chart.setOption({...})
      }
    },
    
    /**
     * 随机更新图表数据
     */
    randomizeChart() {
      this.chartData = this.chartData.map(() => 
        Math.floor(Math.random() * 80) + 20
      )
    },
    
    /**
     * 图表动画效果
     */
    animateChart() {
      // 先归零
      this.chartData = [0, 0, 0, 0, 0]
      
      // 延迟后恢复
      setTimeout(() => {
        this.chartData = [30, 50, 80, 45, 60]
      }, 100)
    },
    
    /**
     * 检查 mounted 状态
     */
    checkMountedStatus() {
      // 检查 $el 是否存在
      this.elExists = !!this.$el
      
      // 统计 $refs 数量
      this.refsCount = Object.keys(this.$refs).length
      
      console.log('$el 存在:', this.elExists)
      console.log('$refs 数量:', this.refsCount)
    },
    
    /**
     * 窗口大小变化处理
     */
    handleResize() {
      console.log('窗口大小变化，重新测量...')
      this.measureBox()
    }
  }
})
