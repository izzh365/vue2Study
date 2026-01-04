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
          <!-- SVG 图标替代 emoji -->
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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

// 品牌链接
.brand-link {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  text-decoration: none;
  color: $color-text;
  font-family: $font-family-heading;
  font-weight: 600;
  transition: color $transition-base;
  cursor: pointer; // ✓ 添加 cursor-pointer
  
  &:hover {
    color: $color-primary;
  }
  
  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 4px;
    border-radius: 4px;
  }
}

// 品牌图标 (SVG)
.brand-icon {
  width: 28px;
  height: 28px;
  color: $color-primary;
  flex-shrink: 0;
}

// 品牌文字
.brand-text {
  font-size: $font-size-lg;
  
  @media (max-width: $breakpoint-sm) {
    display: none; // 移动端隐藏文字
  }
}

// 移动端菜单按钮
.menu-toggle {
  display: none;
  @include button-base;
  padding: $spacing-sm;
  background: transparent;
  cursor: pointer; // ✓ 添加 cursor-pointer
  
  @media (max-width: $breakpoint-md) {
    display: flex;
  }
  
  &:focus-visible {
    outline: 2px solid $color-primary;
    outline-offset: 2px;
    border-radius: 4px;
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

// 导航区域
.header-nav {
  display: flex;
  gap: $spacing-lg;
  
  @media (max-width: $breakpoint-md) {
    display: none;
  }
  
  .nav-link {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $color-text-secondary;
    text-decoration: none;
    padding: $spacing-sm 0;
    position: relative;
    transition: color $transition-fast;
    cursor: pointer; // ✓ 添加 cursor-pointer
    
    &:hover {
      color: $color-primary;
    }
    
    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 4px;
      border-radius: 4px;
    }
    
    &.router-link-active {
      color: $color-primary;
      
      &::after {
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
