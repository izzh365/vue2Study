/**
 * v-if 条件渲染示例
 * 
 * v-if 指令用于条件性地渲染内容：
 * - 条件为 true：渲染元素到 DOM
 * - 条件为 false：元素从 DOM 中移除
 * 
 * 相关指令：
 * - v-if：条件渲染
 * - v-else：否则
 * - v-else-if：否则如果
 * 
 * 注意：v-else、v-else-if 必须紧跟在 v-if 或 v-else-if 后面
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 显示消息
      showMessage: true,
      
      // 登录状态
      isLoggedIn: false,
      
      // 分数
      score: 85
    }
  }
})
