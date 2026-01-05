// scrollTracking.js
// 页面滚动跟踪工具 - 自动标记已读完的章节

import store from '@/store'

/**
 * 滚动跟踪器类
 */
class ScrollTracker {
  constructor() {
    this.scrollTimer = null
    this.isTracking = false
    this.currentChapter = null
    this.hasCompleted = false // 添加标记，防止重复触发
    this.hasScrolled = false // 标记用户是否有过滚动行为
  }

  /**
   * 开始跟踪页面滚动
   * @param {String} chapterKey - 章节标识 (如 'es6', 'lifecycle')
   */
  start(chapterKey) {
    if (!chapterKey) return

    this.currentChapter = chapterKey
    this.isTracking = true
    this.hasCompleted = false // 重置完成标记
    this.hasScrolled = false // 重置滚动标记

    // 添加滚动监听
    window.addEventListener('scroll', this.handleScroll)

    // 延迟初始检查，确保页面内容已渲染
    // 只有当页面高度足够且用户未滚动时才需要此检查
    setTimeout(() => {
      if (this.isTracking && !this.hasScrolled) {
        this.checkScrollPosition()
      }
    }, 1000)
  }

  /**
   * 停止跟踪
   */
  stop() {
    this.isTracking = false
    this.currentChapter = null
    window.removeEventListener('scroll', this.handleScroll)
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }
  }

  /**
   * 处理滚动事件（防抖）
   */
  handleScroll = () => {
    if (!this.isTracking) return
    
    // 标记用户已经滚动过
    this.hasScrolled = true

    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer)
    }

    this.scrollTimer = setTimeout(() => {
      this.checkScrollPosition()
    }, 300)
  }

  /**
   * 检查滚动位置
   * 判断是否滚动到页面底部
   */
  checkScrollPosition() {
    if (!this.currentChapter || this.hasCompleted) return // 已完成则不再检查

    // 获取滚动信息
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    
    // 防止短页面误判：页面总高度必须大于视口高度的1.5倍
    const minHeight = windowHeight * 1.5
    if (documentHeight < minHeight) {
      console.log(`⚠️ 页面内容太短 (${documentHeight}px < ${minHeight.toFixed(0)}px)，跳过完成检查`)
      return
    }

    // 计算滚动百分比
    const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100

    // 滚动到 95% 以上认为已读完（留一点余量，避免精确像素问题）
    if (scrollPercent >= 95) {
      // 立即设置标记，避免在 markAsComplete 异步过程中重复触发
      this.hasCompleted = true
      
      console.log(`📖 章节 ${this.currentChapter} 已读完 (${scrollPercent.toFixed(1)}%)`)

      // 标记为已完成
      this.markAsComplete(this.currentChapter)
    }
  }

  /**
   * 标记章节为已完成
   * @param {String} chapterKey - 章节标识
   */
  markAsComplete(chapterKey) {
    // 检查是否已经完成
    const progress = store.getters['app/progress']
    
    console.log(`🔍 检查章节: ${chapterKey}`)
    console.log(`📊 当前进度对象:`, progress)
    console.log(`📌 该章节是否存在: ${Object.prototype.hasOwnProperty.call(progress, chapterKey)}`)
    console.log(`✓ 该章节是否完成: ${progress[chapterKey]}`)
    
    if (progress[chapterKey]) {
      console.log(`⏭️ 章节 ${chapterKey} 已完成，跳过`)
      return // 已经完成，不重复标记
    }

    // 提交到 Vuex
    console.log(`📤 提交完成到 Vuex: ${chapterKey}`)
    store.dispatch('app/completeChapter', chapterKey)

    // 显示提示（可选）
    console.log(`✅ 恭喜！章节"${this.getChapterName(chapterKey)}"已完成`)
  }

  /**
   * 获取章节名称
   * @param {String} key - 章节 key
   * @returns {String} 章节名称
   */
  getChapterName(key) {
    // 直接返回 key，因为 key 已经是可读的格式（如 es6-const-let）
    return key
  }

  /**
   * 重置当前章节的完成状态
   * 用于重新学习某章节时
   */
  reset() {
    if (this.currentChapter) {
      store.dispatch('app/uncompleteChapter', this.currentChapter)
    }
  }
}

// 创建单例实例
const scrollTracker = new ScrollTracker()

export default scrollTracker
