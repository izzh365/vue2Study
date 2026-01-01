/**
 * 作用域插槽示例
 *
 * 知识点：
 * 1. 子组件通过 <slot :data="value"> 暴露数据
 * 2. 父组件通过 v-slot="slotProps" 接收数据
 * 3. 可以使用解构语法简化
 * 4. 适用于列表渲染、表格自定义列等场景
 */

// ==================== 当前用户组件 ====================
Vue.component('current-user', {
  data() {
    return {
      userData: {
        name: '张三',
        email: 'zhangsan@example.com',
        role: 'admin'
      }
    }
  },

  template: `
    <div style="background: #F9FAFB; padding: 16px; border-radius: 12px;">
      <!-- 通过 slot 属性暴露数据给父组件 -->
      <slot :user="userData"></slot>
    </div>
  `
})

// ==================== 用户列表组件 ====================
Vue.component('user-list', {
  props: {
    users: {
      type: Array,
      required: true
    }
  },

  template: `
    <div class="list-component">
      <div v-for="(user, index) in users" :key="user.id" class="list-item">
        <!-- 暴露 user 和 index 给父组件 -->
        <slot :user="user" :index="index"></slot>
      </div>
    </div>
  `
})

// ==================== 数据表格组件 ====================
Vue.component('data-table', {
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },

  template: `
    <table class="table-component">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" :key="row.id">
          <td v-for="col in columns" :key="col.key">
            <!-- 动态具名插槽 + 作用域插槽 -->
            <slot :name="'column-' + col.key" :row="row">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  `
})

// ==================== Todo 列表组件 ====================
Vue.component('todo-list', {
  props: {
    todos: {
      type: Array,
      required: true
    }
  },

  template: `
    <div style="background: #F9FAFB; border-radius: 12px; overflow: hidden;">
      <div v-for="(todo, index) in todos" :key="todo.id">
        <slot :todo="todo" :index="index" :isFirst="index === 0"></slot>
      </div>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      users: [
        { id: 1, name: '张三', email: 'zhangsan@example.com', role: 'admin' },
        { id: 2, name: '李四', email: 'lisi@example.com', role: 'user' },
        { id: 3, name: '王五', email: 'wangwu@example.com', role: 'guest' }
      ],
      products: [
        { id: 1, name: 'MacBook Pro', price: 14999, tags: ['电子', '笔记本'] },
        { id: 2, name: 'iPhone 15', price: 6999, tags: ['电子', '手机'] },
        { id: 3, name: 'AirPods Pro', price: 1999, tags: ['电子', '配件'] }
      ],
      columns: [
        { key: 'name', title: '商品名称' },
        { key: 'price', title: '价格' },
        { key: 'tags', title: '标签' },
        { key: 'actions', title: '操作' }
      ],
      todos: [
        { id: 1, text: '学习 Vue 基础', done: true },
        { id: 2, text: '学习组件化', done: true },
        { id: 3, text: '学习插槽', done: false },
        { id: 4, text: '学习 Vue Router', done: false }
      ]
    }
  },

  methods: {
    getTagClass(tag) {
      if (['电子', '笔记本', '手机'].includes(tag)) {
        return 'tech'
      }
      if (['设计', '配件'].includes(tag)) {
        return 'design'
      }
      return 'other'
    },

    edit(row) {
      alert('编辑: ' + row.name)
    },

    remove(row) {
      alert('删除: ' + row.name)
    }
  },

  created() {
    console.log('=== 作用域插槽 ===')
    console.log('')
    console.log('📋 子组件暴露数据：')
    console.log('  <slot :user="userData"></slot>')
    console.log('')
    console.log('📋 父组件接收数据：')
    console.log('  <template v-slot="slotProps">')
    console.log('    {{ slotProps.user }}')
    console.log('  </template>')
    console.log('')
    console.log('📋 解构语法：')
    console.log('  <template v-slot="{ user, index }">')
    console.log('    {{ user.name }}')
    console.log('  </template>')
  }
})
