/**
 * v-model 修饰符示例
 * 
 * Vue 提供了三个 v-model 修饰符：
 * 
 * 1. .lazy - 在 change 事件而非 input 事件时更新
 *    场景：避免实时更新带来的性能开销
 * 
 * 2. .number - 将用户输入自动转换为 number 类型
 *    场景：数字输入框，需要进行数学计算
 *    注意：如果值无法被 parseFloat() 解析，则返回原始值
 * 
 * 3. .trim - 自动去除用户输入的首尾空格
 *    场景：用户名、搜索关键词等
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // .lazy 对比
      normalText: '',
      lazyText: '',
      
      // .number 对比
      normalNumber: '',
      typedNumber: 0,
      
      // .trim 对比
      normalSpace: '',
      trimmedSpace: '',
      
      // 组合使用
      combined: ''
    }
  }
})
