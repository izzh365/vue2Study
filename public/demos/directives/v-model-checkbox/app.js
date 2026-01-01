/**
 * v-model 复选框和单选框示例
 * 
 * 不同类型的绑定规则：
 * 
 * 1. 单个复选框 → 布尔值
 *    v-model="checked" → true/false
 * 
 * 2. 多个复选框 → 数组
 *    v-model="selected" + value="xxx"
 *    选中时 value 加入数组，取消时移除
 * 
 * 3. 单选框 → 字符串/任意值
 *    v-model="picked" + value="xxx"
 *    选中哪个，picked 就等于哪个的 value
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 单个复选框 - 布尔值
      agreed: false,
      notifications: true,
      
      // 水果选项
      fruitOptions: [
        { value: 'apple', label: '苹果', emoji: '🍎' },
        { value: 'banana', label: '香蕉', emoji: '🍌' },
        { value: 'orange', label: '橙子', emoji: '🍊' },
        { value: 'grape', label: '葡萄', emoji: '🍇' },
        { value: 'watermelon', label: '西瓜', emoji: '🍉' }
      ],
      
      // 多个复选框 - 数组
      selectedFruits: ['apple'],
      
      // 性别选项
      genderOptions: [
        { value: 'male', label: '男', emoji: '👨' },
        { value: 'female', label: '女', emoji: '👩' },
        { value: 'other', label: '保密', emoji: '🤐' }
      ],
      
      // 单选框 - 字符串
      gender: ''
    }
  }
})
