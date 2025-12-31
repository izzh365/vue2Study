<template>
  <div class="chapter-index">
    <h1>🛠️ 第6章 自定义指令</h1>
    <p class="chapter-desc">当内置指令无法满足需求时，可以创建自定义指令。</p>
    <div class="section-list">
      <router-link to="/custom-directives/basic" class="section-item">
        <span class="section-icon">🛠️</span>
        <div class="section-info"><h3>6.1 自定义指令详解</h3><p>钩子函数、参数、实战案例</p></div>
      </router-link>
    </div>
  </div>
</template>
<script>export default { name: 'CustomDirectivesIndex' }</script>
<style lang="scss" scoped>.chapter-index { max-width: 800px; h1 { margin-bottom: $spacing-md; } .chapter-desc { color: $color-text-secondary; margin-bottom: $spacing-xl; } } .section-list { display: flex; flex-direction: column; gap: $spacing-md; } .section-item { @include card-base; display: flex; align-items: center; gap: $spacing-md; padding: $spacing-lg; text-decoration: none; transition: all $transition-base; &:hover { transform: translateX(8px); border-left: 3px solid $color-primary; } .section-icon { font-size: 28px; } .section-info { h3 { font-size: $font-size-base; color: $color-text; margin: 0 0 $spacing-xs; } p { font-size: $font-size-sm; color: $color-text-secondary; margin: 0; } } }</style>
