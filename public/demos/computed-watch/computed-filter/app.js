/**
 * computed 过滤列表示例
 * 
 * 【最佳实践】
 * 使用 computed 实现列表过滤/搜索功能
 * 
 * 【优势】
 * 1. 自动响应搜索关键词变化
 * 2. 结果会被缓存，相同关键词不重复计算
 * 3. 不修改原始数据
 * 
 * 【Vue 官方推荐】
 * 当需要在 v-for 中使用过滤后的数据时
 * 应该使用 computed 而不是在模板中使用 filter()
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 搜索关键词
      searchText: '',
      
      // 用户列表（模拟数据）
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com' },
        { id: 2, name: '李四', email: 'lisi@example.com' },
        { id: 3, name: '王五', email: 'wangwu@example.com' },
        { id: 4, name: '赵六', email: 'zhaoliu@example.com' },
        { id: 5, name: '张小明', email: 'xiaoming@example.com' },
        { id: 6, name: '李小红', email: 'xiaohong@example.com' },
        { id: 7, name: '王大锤', email: 'dachui@example.com' },
        { id: 8, name: '赵铁柱', email: 'tiezhu@example.com' }
      ]
    }
  },
  
  computed: {
    /**
     * 过滤后的用户列表
     * 根据 searchText 过滤 users
     * 
     * 依赖：searchText、users
     * 任一变化都会触发重新过滤
     */
    filteredUsers() {
      console.log('🔍 filteredUsers 被计算了')
      
      // 如果没有搜索关键词，返回全部
      if (!this.searchText.trim()) {
        return this.users
      }
      
      // 转小写以实现不区分大小写搜索
      const keyword = this.searchText.toLowerCase().trim()
      
      // 使用 filter 过滤
      return this.users.filter(user => {
        return (
          user.name.toLowerCase().includes(keyword) ||
          user.email.toLowerCase().includes(keyword)
        )
      })
    }
  },
  
  methods: {
    /**
     * 高亮匹配的文本
     * @param {string} text - 原始文本
     * @returns {string} - 高亮后的 HTML
     */
    highlightMatch(text) {
      if (!this.searchText.trim()) {
        return text
      }
      
      const keyword = this.searchText.trim()
      const regex = new RegExp(`(${keyword})`, 'gi')
      
      return text.replace(regex, '<span class="highlight">$1</span>')
    }
  }
})
