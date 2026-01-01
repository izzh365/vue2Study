/**
 * v-bind:style 对象语法
 * 
 * 对象语法格式：:style="{ property: value }"
 * 
 * 注意事项：
 * 1. CSS 属性名使用驼峰命名（backgroundColor 而非 background-color）
 * 2. 也可以使用短横线命名，但需要用引号包裹（'background-color'）
 * 3. Vue 会自动添加浏览器前缀
 * 
 * 推荐用法：
 * - 简单样式：直接在模板中写
 * - 复杂样式：使用 computed 返回样式对象
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 基础示例
      bgColor: '#007AFF',
      textColor: 'white',
      fontSize: 18,
      
      // 可选颜色
      colors: ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#5856D6', '#AF52DE'],
      
      // 样式对象示例
      padding: 20,
      borderRadius: 12,
      
      // 变换示例
      rotation: 0
    }
  },
  
  computed: {
    /**
     * 使用计算属性返回样式对象
     * 推荐用法：逻辑复杂时使用
     */
    boxStyle() {
      return {
        padding: this.padding + 'px',
        borderRadius: this.borderRadius + 'px',
        backgroundColor: '#e3f2fd',
        border: '2px solid #007AFF',
        transition: 'all 0.3s'
      }
    }
  }
})
