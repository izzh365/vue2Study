/**
 * v-for key 的作用示例
 *
 * key 的作用：
 * 1. 帮助 Vue 识别节点，提高 Diff 算法效率
 * 2. 正确复用和排序现有元素
 * 3. 避免渲染错误（尤其是有状态的组件或表单元素）
 *
 * key 的要求：
 * - 唯一性：在同级元素中必须唯一
 * - 稳定性：不应该随渲染改变
 *
 * 错误示例：
 * - 使用 index 作为 key（当列表会变化时）
 * - 使用 Math.random() 作为 key
 */

new Vue({
  el: '#app',

  data() {
    return {
      // 用于演示 index 问题的列表
      listWithIndex: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
      ],

      // 用于演示正确用法的列表
      listWithId: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' },
        { id: 3, name: '王五' }
      ],

      // 计数器，用于生成新 id
      nextId: 4
    }
  },

  methods: {
    /**
     * 在开头添加元素（使用 index 作为 key 的列表）
     */
    addToStartIndex() {
      this.listWithIndex.unshift({
        id: this.nextId,
        name: '新用户' + this.nextId
      })
      this.nextId++
    },

    /**
     * 在开头添加元素（使用 id 作为 key 的列表）
     */
    addToStartId() {
      this.listWithId.unshift({
        id: this.nextId,
        name: '新用户' + this.nextId
      })
      this.nextId++
    }
  }
})
