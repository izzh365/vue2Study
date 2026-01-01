/**
 * v-bind:class 对象语法
 * 
 * 对象语法格式：:class="{ className: boolean }"
 * - 当布尔值为 true 时，添加该 class
 * - 当布尔值为 false 时，移除该 class
 * 
 * 优点：
 * 1. 可以同时绑定多个 class
 * 2. 可以与原有 class 共存
 * 3. 复杂逻辑可使用 computed 属性
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 基础示例
      isActive: false,
      
      // 多 class 示例
      isActive2: true,
      isLarge: false,
      isRounded: false,
      hasShadow: true,
      
      // computed 示例
      computedActive: true,
      computedError: false
    }
  },
  
  computed: {
    /**
     * 使用计算属性返回 class 对象
     * 推荐用法：逻辑复杂时使用
     */
    boxClasses() {
      return {
        active: this.computedActive && !this.computedError,
        large: this.computedActive,
        shadow: !this.computedError
      }
    }
  }
})
