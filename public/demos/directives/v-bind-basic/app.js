/**
 * v-bind 基本用法
 * 
 * v-bind 用于动态绑定 HTML 属性
 * 
 * 语法：
 * - 完整写法：v-bind:属性="表达式"
 * - 简写（推荐）：:属性="表达式"
 * 
 * 常见用途：
 * 1. 绑定 href、src 等属性
 * 2. 动态绑定 class 和 style
 * 3. 绑定 disabled、checked 等布尔属性
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 网站链接
      websiteUrl: 'https://v2.vuejs.org/',
      websiteName: 'Vue 2 官方文档',
      
      // 动态 title
      dynamicTitle: '这是一个动态的 title 属性',
      
      // 布尔属性
      isDisabled: false
    }
  }
})
