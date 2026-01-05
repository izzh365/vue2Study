// scrollTrackingMixin.js
// 页面滚动跟踪混入 - 在章节页面中自动启用滚动跟踪

import scrollTracker from './scrollTracking'

/**
 * 滚动跟踪混入
 * 使用方式：在章节页面组件中 mixins: [scrollTrackingMixin]
 */
export default {
  /**
   * 组件挂载时启动跟踪
   */
  mounted() {
    // 从路由 meta 中获取章节标识
    const chapterKey = this.$route.meta?.chapterKey

    if (chapterKey) {
      console.log(`📖 开始跟踪章节: ${chapterKey}`)
      scrollTracker.start(chapterKey)
    }
  },

  /**
   * 组件销毁前停止跟踪
   */
  beforeDestroy() {
    console.log('📖 停止跟踪')
    scrollTracker.stop()
  }
}
