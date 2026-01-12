<template>
  <!-- 
    App.vue - 根组件
    包含页面整体布局：头部 + 侧边栏 + 内容区
  -->
  <div id="app" class="app-container" :class="{ 'clean-mode': cleanMode }">
    <!-- 页面头部 -->
    <AppHeader />
    
    <!-- 主体区域 -->
    <div class="app-main">
      <!-- 侧边栏导航 -->
      <AppSidebar />
      
      <!-- 内容区域 -->
      <main class="app-content">
        <!-- 路由视图：根据路由显示对应页面 -->
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
/**
 * @description 根组件，定义整体布局结构
 */
import { mapState } from 'vuex'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppSidebar from '@/components/layout/AppSidebar.vue'

export default {
  name: 'App',
  
  // 注册布局组件
  components: {
    AppHeader,
    AppSidebar
  },

  computed: {
    ...mapState('app', ['cleanMode'])
  }
}
</script>

<style lang="scss">
// 应用容器
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

// 主体区域（侧边栏 + 内容）
.app-main {
  display: flex;
  flex: 1;
  padding-top: $header-height;
}

// 内容区域
.app-content {
  flex: 1;
  margin-left: $sidebar-width;
  padding: $spacing-xl;
  min-height: calc(100vh - #{$header-height});
  overflow-x: hidden;
  transition: margin-left $transition-base;
  
  // 移动端适配
  @media (max-width: $breakpoint-md) {
    margin-left: 0;
    padding: $spacing-md;
  }
}

// 专注模式样式
.app-container.clean-mode {
  .app-content {
    margin-left: 0;
    padding: $spacing-xl calc((100% - #{$content-max-width}) / 2); // 居中显示但保持左对齐视觉
    
    @media (max-width: $content-max-width) {
       padding: $spacing-xl;
    }
  }
}
</style>
