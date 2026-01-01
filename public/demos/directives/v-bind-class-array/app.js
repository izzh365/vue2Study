/**
 * v-bind:class 数组语法
 * 
 * 数组语法格式：:class="[class1, class2, ...]"
 * - 数组元素可以是字符串变量
 * - 可以混合使用对象语法
 * - 可以使用三元表达式
 * 
 * 适用场景：
 * 1. 需要同时应用多个 class
 * 2. class 名称来自变量
 * 3. 需要条件切换不同的 class
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 基础数组语法
      activeClass: 'primary',
      sizeClass: 'large-text',
      
      // 混合语法
      colorClass: 'primary',
      isBold: true,
      isItalic: false,
      isUnderline: false,
      
      // 三元表达式
      isSuccess: true
    }
  }
})
