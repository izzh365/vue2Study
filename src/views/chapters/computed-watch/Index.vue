<template>
  <div class="chapter-index">
    <h1>🔍 第5章 计算属性与侦听器</h1>
    <p class="chapter-desc">computed 和 watch 是 Vue 响应式系统的核心特性。</p>
    <div class="section-list">
      <router-link to="/computed-watch/computed" class="section-item">
        <span class="section-icon">📊</span>
        <div class="section-info"><h3>5.1 computed 计算属性</h3><p>缓存特性、getter/setter</p></div>
      </router-link>
      <router-link to="/computed-watch/watch" class="section-item">
        <span class="section-icon">👀</span>
        <div class="section-info"><h3>5.2 watch 侦听器</h3><p>监听数据变化、深度监听</p></div>
      </router-link>
    </div>
  </div>
</template>
<script>export default { name: 'ComputedWatchIndex' }</script>
<style lang="scss" scoped>.chapter-index { max-width: 800px; h1 { margin-bottom: $spacing-md; } .chapter-desc { color: $color-text-secondary; margin-bottom: $spacing-xl; } } .section-list { display: flex; flex-direction: column; gap: $spacing-md; } .section-item { @include card-base; display: flex; align-items: center; gap: $spacing-md; padding: $spacing-lg; text-decoration: none; transition: all $transition-base; &:hover { transform: translateX(8px); border-left: 3px solid $color-primary; } .section-icon { font-size: 28px; } .section-info { h3 { font-size: $font-size-base; color: $color-text; margin: 0 0 $spacing-xs; } p { font-size: $font-size-sm; color: $color-text-secondary; margin: 0; } } }</style>
