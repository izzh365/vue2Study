/**
 * v-for 列表渲染基础示例
 * 
 * v-for 语法格式：
 * 
 * 1. 遍历数组：
 *    v-for="item in items"
 *    v-for="(item, index) in items"
 * 
 * 2. 遍历对象：
 *    v-for="value in object"
 *    v-for="(value, key) in object"
 *    v-for="(value, key, index) in object"
 * 
 * 3. 遍历数字：
 *    v-for="n in 10"  // 1 到 10
 * 
 * ⚠️ 重要：始终为 v-for 提供 key
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 简单数组
      fruits: ['苹果', '香蕉', '橙子', '葡萄'],
      
      // 颜色数组
      colors: ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF'],
      
      // 对象数组（最常见）
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员', avatar: '👨‍💼' },
        { id: 2, name: '李四', email: 'lisi@example.com', role: '编辑', avatar: '👩‍💻' },
        { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户', avatar: '👨‍🎨' }
      ],
      
      // 普通对象
      userProfile: {
        姓名: '张三',
        年龄: 25,
        城市: '北京',
        职业: '前端工程师'
      }
    }
  }
})
