<template>
  <div class="chapter-index">
    <h1>📝 第2章 ES6 基础语法</h1>
    <p class="chapter-desc">掌握 ES6 语法是学习 Vue2 的前置条件，本章涵盖 Vue2 开发中最常用的 ES6 特性。</p>
    
    <div class="section-list">
      <router-link to="/es6/const-let" class="section-item">
        <span class="section-icon">📌</span>
        <div class="section-info">
          <h3>2.1 const 与 let</h3>
          <p>块级作用域、变量提升、暂时性死区</p>
        </div>
      </router-link>
      
      <router-link to="/es6/object-enhance" class="section-item">
        <span class="section-icon">🔧</span>
        <div class="section-info">
          <h3>2.2 对象增强写法</h3>
          <p>属性简写、方法简写、计算属性名</p>
        </div>
      </router-link>
      
      <router-link to="/es6/higher-order" class="section-item">
        <span class="section-icon">⚡</span>
        <div class="section-info">
          <h3>2.3 高阶函数</h3>
          <p>filter、map、reduce 链式调用</p>
        </div>
      </router-link>
      
      <router-link to="/es6/arrow-function" class="section-item">
        <span class="section-icon">➡️</span>
        <div class="section-info">
          <h3>2.4 箭头函数</h3>
          <p>简洁语法、this 指向</p>
        </div>
      </router-link>
      
      <router-link to="/es6/promise" class="section-item">
        <span class="section-icon">🔄</span>
        <div class="section-info">
          <h3>2.5 Promise 与异步</h3>
          <p>Promise 基础、链式调用、async/await</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ES6Index'
}
</script>

<style lang="scss" scoped>
.chapter-index {
  max-width: 800px;
  
  h1 {
    margin-bottom: $spacing-md;
  }
  
  .chapter-desc {
    color: $color-text-secondary;
    margin-bottom: $spacing-xl;
  }
}

.section-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.section-item {
  @include card-base;
  display: flex;
  align-items: center;
  gap: $spacing-md;
  padding: $spacing-lg;
  text-decoration: none;
  transition: all $transition-base;
  
  &:hover {
    transform: translateX(8px);
    border-left: 3px solid $color-primary;
  }
  
  .section-icon {
    font-size: 28px;
  }
  
  .section-info {
    h3 {
      font-size: $font-size-base;
      color: $color-text;
      margin: 0 0 $spacing-xs;
    }
    
    p {
      font-size: $font-size-sm;
      color: $color-text-secondary;
      margin: 0;
    }
  }
}
</style>
