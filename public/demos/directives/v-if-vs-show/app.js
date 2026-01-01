/**
 * v-if vs v-show 对比示例
 * 
 * 核心区别：
 * 
 * v-if：
 * - 真正的条件渲染
 * - 条件为 false 时，元素不会渲染到 DOM
 * - 切换时会销毁和重建元素
 * - 有更高的切换开销
 * 
 * v-show：
 * - 简单的 CSS 显隐
 * - 元素始终渲染到 DOM
 * - 只是切换 display: none
 * - 有更高的初始渲染开销
 * 
 * 使用建议：
 * - 频繁切换：用 v-show
 * - 条件很少改变：用 v-if
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      showContent: true,
      toggleCount: 0
    }
  },
  
  methods: {
    /**
     * 切换显示状态
     */
    toggleBoth() {
      this.showContent = !this.showContent
      this.toggleCount++
    }
  }
})
