<template>
  <div class="chapter-index">
    <h1>🌐 第10章 Axios 网络请求 <span class="badge important">重要</span></h1>
    <p class="chapter-desc">Axios 是 Vue 推荐的 HTTP 请求库。</p>
    <div class="section-list">
      <router-link to="/axios/basic" class="section-item"><span class="section-icon">📡</span><div class="section-info"><h3>10.1 基础请求</h3><p>GET、POST、配置参数</p></div></router-link>
      <router-link to="/axios/response" class="section-item"><span class="section-icon">📥</span><div class="section-info"><h3>10.2 响应处理</h3><p>响应结构、错误处理</p></div></router-link>
      <router-link to="/axios/concurrent" class="section-item"><span class="section-icon">🔀</span><div class="section-info"><h3>10.3 并发请求</h3><p>all、spread</p></div></router-link>
      <router-link to="/axios/interceptors" class="section-item"><span class="section-icon">🔧</span><div class="section-info"><h3>10.4 拦截器</h3><p>请求/响应拦截</p></div></router-link>
      <router-link to="/axios/encapsulation" class="section-item"><span class="section-icon">📦</span><div class="section-info"><h3>10.5 封装实践</h3><p>统一封装、模块化</p></div></router-link>
    </div>
  </div>
</template>
<script>export default { name: 'AxiosIndex' }</script>
<style lang="scss" scoped>.chapter-index { max-width: 800px; h1 { margin-bottom: $spacing-md; .badge { font-size: $font-size-xs; padding: 2px 8px; border-radius: $radius-sm; vertical-align: middle; &.important { background: rgba($color-warning, 0.1); color: $color-warning; } } } .chapter-desc { color: $color-text-secondary; margin-bottom: $spacing-xl; } } .section-list { display: flex; flex-direction: column; gap: $spacing-md; } .section-item { @include card-base; display: flex; align-items: center; gap: $spacing-md; padding: $spacing-lg; text-decoration: none; transition: all $transition-base; &:hover { transform: translateX(8px); border-left: 3px solid $color-primary; } .section-icon { font-size: 28px; } .section-info { h3 { font-size: $font-size-base; color: $color-text; margin: 0 0 $spacing-xs; } p { font-size: $font-size-sm; color: $color-text-secondary; margin: 0; } } }</style>
