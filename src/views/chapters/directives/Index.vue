<template>
  <div class="chapter-index">
    <h1>📌 第4章 Vue 指令</h1>
    <p class="chapter-desc">指令是 Vue 模板语法的核心，掌握各类指令是 Vue 开发的基础。</p>
    
    <div class="section-list">
      <router-link to="/directives/v-bind" class="section-item">
        <span class="section-icon">🔗</span>
        <div class="section-info">
          <h3>4.1 v-bind 属性绑定</h3>
          <p>动态绑定属性、class、style</p>
        </div>
      </router-link>
      
      <router-link to="/directives/v-on" class="section-item">
        <span class="section-icon">👆</span>
        <div class="section-info">
          <h3>4.2 v-on 事件绑定</h3>
          <p>事件监听、修饰符、传参</p>
        </div>
      </router-link>
      
      <router-link to="/directives/v-model" class="section-item">
        <span class="section-icon">🔄</span>
        <div class="section-info">
          <h3>4.3 v-model 双向绑定</h3>
          <p>表单输入绑定、修饰符</p>
        </div>
      </router-link>
      
      <router-link to="/directives/v-if-show" class="section-item">
        <span class="section-icon">👁️</span>
        <div class="section-info">
          <h3>4.4 v-if / v-show</h3>
          <p>条件渲染、区别与选择</p>
        </div>
      </router-link>
      
      <router-link to="/directives/v-for" class="section-item">
        <span class="section-icon">🔁</span>
        <div class="section-info">
          <h3>4.5 v-for 列表渲染</h3>
          <p>遍历数组/对象、key 的作用</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: 'DirectivesIndex' }
</script>

<style lang="scss" scoped>
.chapter-index { max-width: 800px; h1 { margin-bottom: $spacing-md; } .chapter-desc { color: $color-text-secondary; margin-bottom: $spacing-xl; } }
.section-list { display: flex; flex-direction: column; gap: $spacing-md; }
.section-item { @include card-base; display: flex; align-items: center; gap: $spacing-md; padding: $spacing-lg; text-decoration: none; transition: all $transition-base; &:hover { transform: translateX(8px); border-left: 3px solid $color-primary; } .section-icon { font-size: 28px; } .section-info { h3 { font-size: $font-size-base; color: $color-text; margin: 0 0 $spacing-xs; } p { font-size: $font-size-sm; color: $color-text-secondary; margin: 0; } } }
</style>
