<template>
  <div class="chapter-index">
    <h1>📦 第9章 Vuex 状态管理 <span class="badge important">重要</span></h1>
    <p class="chapter-desc">Vuex 用于管理应用级别的共享状态。</p>
    <div class="section-list">
      <router-link to="/vuex/state" class="section-item"><span class="section-icon">📊</span><div class="section-info"><h3>9.1 State</h3><p>单一状态树、mapState</p></div></router-link>
      <router-link to="/vuex/getters" class="section-item"><span class="section-icon">🔍</span><div class="section-info"><h3>9.2 Getters</h3><p>计算属性、mapGetters</p></div></router-link>
      <router-link to="/vuex/mutations" class="section-item"><span class="section-icon">✏️</span><div class="section-info"><h3>9.3 Mutations</h3><p>同步修改、mapMutations</p></div></router-link>
      <router-link to="/vuex/actions" class="section-item"><span class="section-icon">⚡</span><div class="section-info"><h3>9.4 Actions</h3><p>异步操作、mapActions</p></div></router-link>
      <router-link to="/vuex/modules" class="section-item"><span class="section-icon">📁</span><div class="section-info"><h3>9.5 Modules</h3><p>模块化、命名空间</p></div></router-link>
    </div>
  </div>
</template>
<script>export default { name: 'VuexIndex' }</script>
<style lang="scss" scoped>.chapter-index { max-width: 800px; h1 { margin-bottom: $spacing-md; .badge { font-size: $font-size-xs; padding: 2px 8px; border-radius: $radius-sm; vertical-align: middle; &.important { background: rgba($color-warning, 0.1); color: $color-warning; } } } .chapter-desc { color: $color-text-secondary; margin-bottom: $spacing-xl; } } .section-list { display: flex; flex-direction: column; gap: $spacing-md; } .section-item { @include card-base; display: flex; align-items: center; gap: $spacing-md; padding: $spacing-lg; text-decoration: none; transition: all $transition-base; &:hover { transform: translateX(8px); border-left: 3px solid $color-primary; } .section-icon { font-size: 28px; } .section-info { h3 { font-size: $font-size-base; color: $color-text; margin: 0 0 $spacing-xs; } p { font-size: $font-size-sm; color: $color-text-secondary; margin: 0; } } }</style>
