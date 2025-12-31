<template>
  <!-- 
    AppSidebar.vue - 侧边栏导航
    包含章节目录树形结构
  -->
  <aside class="app-sidebar" :class="{ 'is-open': sidebarOpen }">
    <!-- 侧边栏标题 -->
    <div class="sidebar-header">
      <h3 class="sidebar-title">📖 学习目录</h3>
    </div>
    
    <!-- 导航菜单 -->
    <nav class="sidebar-nav">
      <!-- 遍历章节列表 -->
      <div 
        v-for="chapter in chapters" 
        :key="chapter.path"
        class="nav-group"
      >
        <!-- 章节标题 -->
        <router-link 
          :to="chapter.path" 
          class="nav-item"
          :class="{ 'is-active': isActive(chapter.path) }"
        >
          <span class="nav-icon">{{ chapter.icon }}</span>
          <span class="nav-text">{{ chapter.title }}</span>
          <span 
            v-if="chapter.badge" 
            class="nav-badge"
            :class="chapter.badge"
          >
            {{ chapter.badgeText }}
          </span>
        </router-link>
        
        <!-- 子菜单（如果有） -->
        <div 
          v-if="chapter.children && isActive(chapter.path)" 
          class="nav-children"
        >
          <router-link
            v-for="child in chapter.children"
            :key="child.path"
            :to="child.path"
            class="nav-child"
          >
            {{ child.title }}
          </router-link>
        </div>
      </div>
    </nav>
    
    <!-- 侧边栏底部 -->
    <div class="sidebar-footer">
      <a 
        href="https://v2.vuejs.org/" 
        target="_blank" 
        class="footer-link"
      >
        📚 Vue2 官方文档
      </a>
    </div>
  </aside>
</template>

<script>
/**
 * @description 侧边栏导航组件
 * 展示章节目录，支持路由高亮
 */
import { mapState } from 'vuex'

export default {
  name: 'AppSidebar',
  
  data() {
    return {
      // 章节列表配置
      chapters: [
        {
          path: '/',
          icon: '🏠',
          title: '首页'
        },
        {
          path: '/es6',
          icon: '📝',
          title: '第2章 ES6 基础',
          children: [
            { path: '/es6/const-let', title: 'const 与 let' },
            { path: '/es6/object-enhance', title: '对象增强写法' },
            { path: '/es6/higher-order', title: '高阶函数' },
            { path: '/es6/arrow-function', title: '箭头函数' },
            { path: '/es6/promise', title: 'Promise 异步' }
          ]
        },
        {
          path: '/lifecycle',
          icon: '🔄',
          title: '第3章 生命周期'
        },
        {
          path: '/directives',
          icon: '📌',
          title: '第4章 Vue 指令'
        },
        {
          path: '/computed-watch',
          icon: '🔍',
          title: '第5章 计算属性'
        },
        {
          path: '/custom-directives',
          icon: '🛠️',
          title: '第6章 自定义指令'
        },
        {
          path: '/components',
          icon: '🧩',
          title: '第7章 组件化',
          badge: 'core',
          badgeText: '核心'
        },
        {
          path: '/router',
          icon: '🛤️',
          title: '第8章 Vue-Router',
          badge: 'important',
          badgeText: '重要'
        },
        {
          path: '/vuex',
          icon: '📦',
          title: '第9章 Vuex',
          badge: 'important',
          badgeText: '重要'
        },
        {
          path: '/axios',
          icon: '🌐',
          title: '第10章 Axios',
          badge: 'important',
          badgeText: '重要'
        }
      ]
    }
  },
  
  computed: {
    // 从 Vuex 获取侧边栏状态
    ...mapState('app', ['sidebarOpen'])
  },
  
  methods: {
    /**
     * 判断当前路由是否激活
     * @param {String} path - 路由路径
     * @returns {Boolean} 是否激活
     */
    isActive(path) {
      if (path === '/') {
        return this.$route.path === '/'
      }
      return this.$route.path.startsWith(path)
    }
  }
}
</script>

<style lang="scss" scoped>
// 侧边栏容器
.app-sidebar {
  position: fixed;
  top: $header-height;
  left: 0;
  bottom: 0;
  width: $sidebar-width;
  background: $color-card;
  border-right: 1px solid $color-border;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 900;
  transition: transform $transition-base;
  
  // 移动端适配
  @media (max-width: $breakpoint-md) {
    transform: translateX(-100%);
    
    &.is-open {
      transform: translateX(0);
    }
  }
}

// 侧边栏标题
.sidebar-header {
  padding: $spacing-lg $spacing-md;
  border-bottom: 1px solid $color-border;
  
  .sidebar-title {
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-text;
    margin: 0;
  }
}

// 导航区域
.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: $spacing-md 0;
  @include custom-scrollbar;
}

// 导航组
.nav-group {
  margin-bottom: $spacing-xs;
}

// 导航项
.nav-item {
  display: flex;
  align-items: center;
  padding: $spacing-sm $spacing-md;
  color: $color-text-secondary;
  text-decoration: none;
  transition: all $transition-fast;
  border-left: 3px solid transparent;
  
  &:hover {
    background: rgba($color-primary, 0.05);
    color: $color-text;
  }
  
  &.is-active {
    background: rgba($color-primary, 0.1);
    color: $color-primary;
    border-left-color: $color-primary;
    
    .nav-icon {
      transform: scale(1.1);
    }
  }
  
  .nav-icon {
    font-size: $font-size-lg;
    margin-right: $spacing-sm;
    transition: transform $transition-fast;
  }
  
  .nav-text {
    flex: 1;
    font-size: $font-size-sm;
  }
  
  .nav-badge {
    font-size: $font-size-xs;
    padding: 2px 6px;
    border-radius: $radius-sm;
    font-weight: 500;
    
    &.core {
      background: rgba($color-error, 0.1);
      color: $color-error;
    }
    
    &.important {
      background: rgba($color-warning, 0.1);
      color: $color-warning;
    }
  }
}

// 子菜单
.nav-children {
  padding-left: $spacing-2xl;
  
  .nav-child {
    display: block;
    padding: $spacing-xs $spacing-md;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    text-decoration: none;
    transition: color $transition-fast;
    
    &:hover,
    &.router-link-active {
      color: $color-primary;
    }
    
    &.router-link-active {
      font-weight: 500;
    }
  }
}

// 侧边栏底部
.sidebar-footer {
  padding: $spacing-md;
  border-top: 1px solid $color-border;
  
  .footer-link {
    display: block;
    padding: $spacing-sm;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    text-align: center;
    text-decoration: none;
    border-radius: $radius-sm;
    transition: all $transition-fast;
    
    &:hover {
      background: rgba($color-primary, 0.05);
      color: $color-primary;
    }
  }
}
</style>
