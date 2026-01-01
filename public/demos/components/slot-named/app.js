/**
 * 具名插槽示例
 *
 * 知识点：
 * 1. <slot name="xxx"> 定义具名插槽
 * 2. 父组件用 v-slot:xxx 或 #xxx 指定插槽
 * 3. 没有名字的 slot 是默认插槽 (name="default")
 * 4. v-slot 只能用在 <template> 或组件上
 */

// ==================== 页面布局组件 ====================
Vue.component('page-layout', {
  template: `
    <div class="layout-component">
      <!-- 头部插槽 -->
      <div class="layout-header">
        <slot name="header">默认头部</slot>
      </div>
      
      <div class="layout-main">
        <!-- 侧边栏插槽 -->
        <div class="layout-sidebar">
          <slot name="sidebar">默认侧边栏</slot>
        </div>
        
        <!-- 主内容区域（默认插槽） -->
        <div class="layout-content">
          <slot>默认内容</slot>
        </div>
      </div>
      
      <!-- 底部插槽 -->
      <div class="layout-footer">
        <slot name="footer">默认底部</slot>
      </div>
    </div>
  `
})

// ==================== 对话框组件 ====================
Vue.component('my-dialog', {
  template: `
    <div class="dialog-component">
      <!-- 对话框头部 -->
      <div class="dialog-header">
        <slot name="header">对话框标题</slot>
        <span style="cursor: pointer; font-size: 20px;">×</span>
      </div>
      
      <!-- 对话框内容 -->
      <div class="dialog-body">
        <slot></slot>
      </div>
      
      <!-- 对话框底部 -->
      <div class="dialog-footer">
        <slot name="footer">
          <button class="btn secondary">取消</button>
          <button class="btn primary">确定</button>
        </slot>
      </div>
    </div>
  `
})

// ==================== 文章卡片组件 ====================
Vue.component('article-card', {
  template: `
    <div class="article-component">
      <!-- 文章头部 -->
      <div class="article-header">
        <h3 style="margin: 0 0 8px 0;">
          <slot name="title">文章标题</slot>
        </h3>
        <div style="color: #86868B; font-size: 14px;">
          <slot name="meta">文章元信息</slot>
        </div>
      </div>
      
      <!-- 文章内容 -->
      <div class="article-body">
        <slot></slot>
      </div>
      
      <!-- 文章操作栏 -->
      <div class="article-footer">
        <slot name="actions">
          <button class="btn primary">阅读更多</button>
        </slot>
      </div>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== 具名插槽 ===')
    console.log('')
    console.log('📋 定义具名插槽：')
    console.log('  <slot name="header"></slot>')
    console.log('  <slot name="footer"></slot>')
    console.log('')
    console.log('📋 使用具名插槽：')
    console.log('  <template v-slot:header>内容</template>')
    console.log('  <template #header>内容</template>  (简写)')
    console.log('')
    console.log('💡 默认插槽：')
    console.log('  <slot></slot> 等价于 <slot name="default"></slot>')
  }
})
