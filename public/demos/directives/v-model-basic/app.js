/**
 * v-model 双向绑定基础示例
 * 
 * v-model 实现表单输入和数据的双向绑定：
 * - 数据变化 → 视图自动更新
 * - 用户输入 → 数据自动更新
 * 
 * 本质：v-model 是语法糖
 * <input v-model="msg">
 * 等价于：
 * <input :value="msg" @input="msg = $event.target.value">
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 单行文本
      message: '',
      
      // 多行文本
      bio: '',
      
      // 名片信息
      cardInfo: {
        name: '',
        email: ''
      }
    }
  }
})
