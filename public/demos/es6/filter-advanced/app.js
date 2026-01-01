/**
 * filter 高阶函数 - 过滤对象数组
 *
 * 在 Vue 中，filter 常用于：
 * 1. 搜索功能
 * 2. 列表筛选
 * 3. 数据过滤展示
 *
 * 结合 computed 实现响应式过滤
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 搜索关键词
      searchQuery: '',
      // 当前过滤条件
      currentFilter: null,
      // 用户数据
      users: [
        { id: 1, name: '张三', age: 28, city: '北京', role: '开发' },
        { id: 2, name: '李四', age: 32, city: '上海', role: '设计' },
        { id: 3, name: '王五', age: 25, city: '广州', role: '开发' },
        { id: 4, name: '赵六', age: 35, city: '深圳', role: '产品' },
        { id: 5, name: '钱七', age: 29, city: '杭州', role: '开发' },
        { id: 6, name: '孙八', age: 31, city: '成都', role: '设计' }
      ]
    }
  },

  computed: {
    /**
     * 过滤后的用户列表
     * 使用 computed 实现响应式过滤
     * 当 searchQuery 或 currentFilter 变化时自动重新计算
     */
    filteredUsers() {
      let result = this.users

      // 1. 先按搜索关键词过滤
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(user => {
          // 搜索姓名或城市
          return user.name.toLowerCase().includes(query) || user.city.toLowerCase().includes(query)
        })
      }

      // 2. 再按额外条件过滤
      if (this.currentFilter) {
        result = result.filter(this.currentFilter)
      }

      return result
    }
  },

  methods: {
    /**
     * 按角色过滤
     * @param {string} role - 角色名称
     */
    filterByRole(role) {
      // 设置过滤函数
      this.currentFilter = user => user.role === role
      console.log(`过滤条件: role === '${role}'`)
    },

    /**
     * 按年龄过滤
     * @param {number} minAge - 最小年龄
     */
    filterByAge(minAge) {
      this.currentFilter = user => user.age >= minAge
      console.log(`过滤条件: age >= ${minAge}`)
    },

    /**
     * 重置过滤条件
     */
    resetFilter() {
      this.currentFilter = null
      this.searchQuery = ''
      console.log('已重置所有过滤条件')
    }
  }
})
