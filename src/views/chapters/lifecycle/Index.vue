<template>
  <div class="chapter-index">
    <h1>🔄 第3章 Vue 生命周期</h1>
    <p class="chapter-desc">Vue 实例从创建到销毁的完整过程，理解生命周期是掌握 Vue 的关键。</p>
    
    <div class="section-list">
      <router-link to="/lifecycle/hooks" class="section-item">
        <span class="section-icon">🔄</span>
        <div class="section-info">
          <h3>3.1 生命周期钩子详解</h3>
          <p>8 个钩子函数：beforeCreate → destroyed</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default { name: 'LifecycleIndex' }
</script>

<style lang="scss" scoped>
.chapter-index { max-width: 800px; h1 { margin-bottom: $spacing-md; } .chapter-desc { color: $color-text-secondary; margin-bottom: $spacing-xl; } }
.section-list { display: flex; flex-direction: column; gap: $spacing-md; }
.section-item { @include card-base; display: flex; align-items: center; gap: $spacing-md; padding: $spacing-lg; text-decoration: none; transition: all $transition-base; &:hover { transform: translateX(8px); border-left: 3px solid $color-primary; } .section-icon { font-size: 28px; } .section-info { h3 { font-size: $font-size-base; color: $color-text; margin: 0 0 $spacing-xs; } p { font-size: $font-size-sm; color: $color-text-secondary; margin: 0; } } }
</style>
