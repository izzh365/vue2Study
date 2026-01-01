/**
 * 单文件组件结构说明
 *
 * 知识点：
 * 1. 单文件组件 (.vue) 包含三个部分：template、script、style
 * 2. template：HTML 模板
 * 3. script：JavaScript 逻辑
 * 4. style：CSS 样式（可加 scoped 限定作用域）
 *
 * 注意：这个 Demo 主要是展示说明，因为 CDN 方式无法使用真正的 .vue 文件
 * 真正的单文件组件需要构建工具支持
 */

// 在非构建环境下，我们用对象来模拟组件结构
const UserCardComponent = {
  // 对应 .vue 文件中的 name
  name: 'UserCard',

  // 对应 .vue 文件中的 props
  props: {
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://via.placeholder.com/100'
    },
    bio: {
      type: String,
      default: '这个人很懒，什么都没写...'
    }
  },

  // 对应 .vue 文件中的 data()
  data() {
    return {
      isFollowed: false
    }
  },

  // 对应 .vue 文件中的 methods
  methods: {
    follow() {
      this.isFollowed = !this.isFollowed
      this.$emit('follow', {
        name: this.name,
        isFollowed: this.isFollowed
      })
    }
  },

  // 对应 .vue 文件中的 template
  // 在实际 .vue 文件中，模板是单独写在 <template> 标签内的
  template: `
    <div style="
      background: white;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      width: 200px;
    ">
      <img 
        :src="avatar" 
        :alt="name"
        style="
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 12px;
        "
      />
      <h3 style="margin: 0 0 8px 0; color: #1D1D1F;">{{ name }}</h3>
      <p style="margin: 0 0 12px 0; color: #86868B; font-size: 13px;">{{ bio }}</p>
      <button 
        @click="follow"
        :style="{
          background: isFollowed ? '#34C759' : '#007AFF',
          color: 'white',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500'
        }"
      >
        {{ isFollowed ? '✓ 已关注' : '+ 关注' }}
      </button>
    </div>
  `
}

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== 单文件组件结构 ===')
    console.log('')
    console.log('📦 三个核心部分：')
    console.log('  1. <template> - HTML 模板')
    console.log('  2. <script>   - JavaScript 逻辑')
    console.log('  3. <style>    - CSS 样式')
    console.log('')
    console.log('💡 需要构建工具（Vue CLI、Vite）才能使用 .vue 文件')
  }
})
