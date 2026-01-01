/**
 * computed 计算动态样式 Demo
 * 
 * 【通俗比喻】
 * 就像化妆师根据场合搭配妆容：
 * - 知道场合（数据）：晚宴、户外、商务
 * - 知道肤色（数据）：冷白皮、暖黄皮
 * - 自动搭配（computed）：眼影颜色 + 口红色号 + 腮红
 * 
 * 多个数据 → computed → 一个完整的样式对象
 * 
 * 【核心要点】
 * 1. 将多个样式相关的 data 整合成一个样式对象
 * 2. 使用 :style 绑定计算属性
 * 3. 适合需要动态计算的复杂样式
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 背景颜色
      bgColor: '#007aff',
      // 圆角大小
      borderRadius: 12,
      // 阴影大小
      shadowSize: 8,
      // 是否暗色主题
      isDarkTheme: false,
      
      // 可选颜色列表
      colors: [
        '#007aff',  // 蓝色
        '#34c759',  // 绿色
        '#ff9500',  // 橙色
        '#ff3b30',  // 红色
        '#af52de',  // 紫色
        '#5ac8fa',  // 浅蓝
        '#ff2d55',  // 粉色
        '#1d1d1f'   // 黑色
      ]
    }
  },
  
  computed: {
    /**
     * 计算属性：生成完整的样式对象
     * 
     * 【优势】
     * - 将分散的样式数据整合在一起
     * - 可以做复杂的样式逻辑计算
     * - 缓存机制避免重复计算
     * 
     * @returns {Object} 样式对象
     */
    boxStyle() {
      // 根据主题计算文字颜色
      const textColor = this.isDarkTheme ? '#ffffff' : this.getContrastColor(this.bgColor)
      
      // 根据阴影大小计算透明度
      const shadowOpacity = 0.1 + (this.shadowSize / 100)
      
      return {
        // 背景色
        backgroundColor: this.bgColor,
        
        // 圆角
        borderRadius: `${this.borderRadius}px`,
        
        // 动态阴影
        boxShadow: `0 ${this.shadowSize}px ${this.shadowSize * 2}px rgba(0, 0, 0, ${shadowOpacity})`,
        
        // 根据背景自动调整文字颜色
        color: textColor,
        
        // 主题相关的边框
        border: this.isDarkTheme ? '2px solid rgba(255,255,255,0.2)' : 'none'
      }
    }
  },
  
  methods: {
    /**
     * 根据背景色计算对比文字颜色
     * 浅色背景 → 深色文字
     * 深色背景 → 浅色文字
     * 
     * @param {string} hexColor - 十六进制颜色值
     * @returns {string} 对比色
     */
    getContrastColor(hexColor) {
      // 将 hex 转换为 RGB
      const r = parseInt(hexColor.slice(1, 3), 16)
      const g = parseInt(hexColor.slice(3, 5), 16)
      const b = parseInt(hexColor.slice(5, 7), 16)
      
      // 计算亮度（YIQ 公式）
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      
      // 亮度高于 128 用深色文字，否则用浅色
      return brightness > 128 ? '#1d1d1f' : '#ffffff'
    }
  }
})

/**
 * 【computed 样式的应用场景】
 * 
 * 1. 主题切换
 *    - 根据 isDark 切换一系列颜色变量
 *    
 * 2. 响应式布局
 *    - 根据 windowWidth 计算元素大小
 *    
 * 3. 进度条样式
 *    - 根据 progress 计算宽度和颜色
 *    
 * 4. 动画状态
 *    - 根据 isActive 切换 transform 等属性
 * 
 * 【与 class 绑定的区别】
 * 
 * :class（适合开关式样式）：
 * - { active: isActive }
 * - 样式写在 CSS 中
 * 
 * :style + computed（适合动态计算样式）：
 * - 颜色值需要计算
 * - 数值需要运算
 * - 多个属性相互依赖
 */
