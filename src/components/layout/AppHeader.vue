<template>
  <!-- 
    AppHeader.vue - 页面头部导航
    包含 Logo、项目标题、快捷导航
  -->
  <header class="app-header">
    <div class="header-container">
      <!-- Logo 和标题 -->
      <div class="header-brand">
        <!-- 移动端菜单按钮 -->
        <button 
          class="menu-toggle"
          @click="toggleSidebar"
          aria-label="切换菜单"
        >
          <span class="menu-icon"></span>
        </button>
        
        <!-- Logo -->
        <router-link to="/" class="brand-link">
          <span class="brand-icon">📚</span>
          <span class="brand-text">Vue2 零基础学习</span>
        </router-link>
      </div>
      
      <!-- 导航链接 -->
      <nav class="header-nav">
        <router-link to="/" class="nav-link">首页</router-link>
        <router-link to="/es6" class="nav-link">ES6</router-link>
        <router-link to="/lifecycle" class="nav-link">生命周期</router-link>
        <router-link to="/directives" class="nav-link">指令</router-link>
        <router-link to="/components" class="nav-link">组件化</router-link>
      </nav>
      
      <!-- 进度指示 -->
      <div class="header-progress">
        <span class="progress-text">学习进度</span>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <span class="progress-value">{{ progressPercent }}%</span>
      </div>
    </div>
  </header>
</template>

<script>
/**
 * @description 页面头部组件
 * 包含 Logo、导航链接、学习进度
 */
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppHeader',
  
  computed: {
    // 从 Vuex 获取学习进度
    ...mapGetters('app', ['progressPercent'])
  },
  
  methods: {
    // 切换侧边栏
    ...mapActions('app', ['toggleSidebar'])
  }
}
</script>

<style lang="scss" scoped>
// 头部容器
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid $color-border;
  z-index: 1000;
}

// 内容容器
.header-container {
  @include flex-between;
  max-width: 100%;
  height: 100%;
  padding: 0 $spacing-lg;
}

// 品牌区域
.header-brand {
  display: flex;
  align-items: center;
  gap: $spacing-md;
}

// 移动端菜单按钮
.menu-toggle {
  display: none;
  @include button-base;
  padding: $spacing-sm;
  background: transparent;
  
  @media (max-width: $breakpoint-md) {
    display: flex;
  }
  
  .menu-icon {
    width: 20px;
    height: 2px;
    background: $color-text;
    position: relative;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: $color-text;
      left: 0;
    }
    
    &::before { top: -6px; }
    &::after { bottom: -6px; }
  }
}

// 品牌链接
.brand-link {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  
  .brand-icon {
    font-size: $font-size-xl;
  }
  
  .brand-text {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-text;
    
    @media (max-width: $breakpoint-sm) {
      display: none;
    }
  }
}

// 导航区域
.header-nav {
  display: flex;
  gap: $spacing-lg;
  
  @media (max-width: $breakpoint-md) {
    display: none;
  }
  
  .nav-link {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    text-decoration: none;
    padding: $spacing-sm 0;
    position: relative;
    transition: color $transition-fast;
    
    &:hover,
    &.router-link-active {
      color: $color-primary;
    }
    
    &.router-link-active::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: $color-primary;
      border-radius: 1px;
    }
  }
}

// 进度区域
.header-progress {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  
  @media (max-width: $breakpoint-sm) {
    display: none;
  }
  
  .progress-text {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }
  
  .progress-bar {
    width: 100px;
    height: 6px;
    background: $color-border;
    border-radius: 3px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $color-primary, $color-primary-light);
    border-radius: 3px;
    transition: width $transition-base;
  }
  
  .progress-value {
    font-size: $font-size-xs;
    font-weight: 600;
    color: $color-primary;
    min-width: 32px;
  }
}
</style>
