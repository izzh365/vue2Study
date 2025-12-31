<template>
  <!-- 
    Home.vue - 首页
    学习导航入口，展示所有章节
  -->
  <div class="home-page">
    <!-- 欢迎区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">🎯 Vue2 零基础学习</h1>
        <p class="hero-desc">
          从零开始系统学习 Vue2，打造详细、通俗易懂、可交互的学习资料库
        </p>
        <div class="hero-tags">
          <span class="tag">Vue 2.7.x</span>
          <span class="tag">Vue Router 3.x</span>
          <span class="tag">Vuex 3.x</span>
          <span class="tag">Axios</span>
        </div>
      </div>
    </section>
    
    <!-- 学习进度 -->
    <section class="progress-section">
      <div class="progress-card">
        <div class="progress-info">
          <span class="progress-label">📊 学习进度</span>
          <span class="progress-value">{{ progressPercent }}%</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: progressPercent + '%' }"
          ></div>
        </div>
        <p class="progress-tip">
          已完成 {{ completedCount }} / {{ totalChapters }} 个章节
        </p>
      </div>
    </section>
    
    <!-- 章节列表 -->
    <section class="chapters-section">
      <h2 class="section-title">📚 学习章节</h2>
      
      <div class="chapters-grid">
        <router-link
          v-for="chapter in chapters"
          :key="chapter.path"
          :to="chapter.path"
          class="chapter-card"
          :class="{ completed: chapter.completed }"
        >
          <span class="chapter-icon">{{ chapter.icon }}</span>
          <div class="chapter-info">
            <h3 class="chapter-title">{{ chapter.title }}</h3>
            <p class="chapter-desc">{{ chapter.desc }}</p>
          </div>
          <span 
            v-if="chapter.badge"
            class="chapter-badge"
            :class="chapter.badge"
          >
            {{ chapter.badgeText }}
          </span>
        </router-link>
      </div>
    </section>
    
    <!-- 学习路径 -->
    <section class="path-section">
      <h2 class="section-title">🛤️ 推荐学习路径</h2>
      <div class="path-content">
        <div class="path-step">
          <span class="step-num">1</span>
          <span class="step-text">ES6 基础语法</span>
        </div>
        <span class="path-arrow">→</span>
        <div class="path-step">
          <span class="step-num">2</span>
          <span class="step-text">Vue 核心基础</span>
        </div>
        <span class="path-arrow">→</span>
        <div class="path-step highlight">
          <span class="step-num">3</span>
          <span class="step-text">组件化开发</span>
        </div>
        <span class="path-arrow">→</span>
        <div class="path-step">
          <span class="step-num">4</span>
          <span class="step-text">Vue 生态</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/**
 * @description 首页组件
 * 展示学习进度和章节导航
 */
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  
  data() {
    return {
      // 章节配置
      chapters: [
        {
          path: '/es6',
          icon: '📝',
          title: '第2章 ES6 基础',
          desc: 'const/let、箭头函数、Promise 等',
          completed: false
        },
        {
          path: '/lifecycle',
          icon: '🔄',
          title: '第3章 生命周期',
          desc: '8 个生命周期钩子详解',
          completed: false
        },
        {
          path: '/directives',
          icon: '📌',
          title: '第4章 Vue 指令',
          desc: 'v-bind/v-on/v-model/v-for 等',
          completed: false
        },
        {
          path: '/computed-watch',
          icon: '🔍',
          title: '第5章 计算属性',
          desc: 'computed 和 watch 详解',
          completed: false
        },
        {
          path: '/custom-directives',
          icon: '🛠️',
          title: '第6章 自定义指令',
          desc: '自定义指令钩子函数与实战',
          completed: false
        },
        {
          path: '/components',
          icon: '🧩',
          title: '第7章 组件化',
          desc: 'props/emit/refs/slot',
          badge: 'core',
          badgeText: '核心',
          completed: false
        },
        {
          path: '/router',
          icon: '🛤️',
          title: '第8章 Vue-Router',
          desc: '路由配置、导航守卫',
          badge: 'important',
          badgeText: '重要',
          completed: false
        },
        {
          path: '/vuex',
          icon: '📦',
          title: '第9章 Vuex',
          desc: 'state/mutations/actions',
          badge: 'important',
          badgeText: '重要',
          completed: false
        },
        {
          path: '/axios',
          icon: '🌐',
          title: '第10章 Axios',
          desc: '请求封装、拦截器',
          badge: 'important',
          badgeText: '重要',
          completed: false
        }
      ]
    }
  },
  
  computed: {
    ...mapGetters('app', ['progressPercent', 'completedCount', 'totalChapters'])
  }
}
</script>

<style lang="scss" scoped>
.home-page {
  max-width: 1000px;
  margin: 0 auto;
}

// 英雄区域
.hero-section {
  text-align: center;
  padding: $spacing-2xl 0;
  
  .hero-title {
    font-size: 36px;
    font-weight: 700;
    color: $color-text;
    margin-bottom: $spacing-md;
  }
  
  .hero-desc {
    font-size: $font-size-lg;
    color: $color-text-secondary;
    margin-bottom: $spacing-lg;
  }
  
  .hero-tags {
    display: flex;
    justify-content: center;
    gap: $spacing-sm;
    flex-wrap: wrap;
    
    .tag {
      padding: $spacing-xs $spacing-md;
      background: rgba($color-primary, 0.1);
      color: $color-primary;
      border-radius: $radius-full;
      font-size: $font-size-sm;
      font-weight: 500;
    }
  }
}

// 进度区域
.progress-section {
  margin-bottom: $spacing-2xl;
  
  .progress-card {
    @include card-base;
    padding: $spacing-lg;
  }
  
  .progress-info {
    @include flex-between;
    margin-bottom: $spacing-sm;
    
    .progress-label {
      font-weight: 500;
      color: $color-text;
    }
    
    .progress-value {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $color-primary;
    }
  }
  
  .progress-bar {
    height: 8px;
    background: $color-border;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: $spacing-sm;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, $color-primary, $color-primary-light);
    border-radius: 4px;
    transition: width $transition-base;
  }
  
  .progress-tip {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin: 0;
  }
}

// 章节区域
.chapters-section {
  margin-bottom: $spacing-2xl;
  
  .section-title {
    font-size: $font-size-xl;
    margin-bottom: $spacing-lg;
  }
}

.chapters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: $spacing-md;
}

.chapter-card {
  @include card-base;
  display: flex;
  align-items: flex-start;
  gap: $spacing-md;
  padding: $spacing-lg;
  text-decoration: none;
  transition: all $transition-base;
  position: relative;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-lg;
  }
  
  &.completed {
    border: 2px solid $color-success;
    
    &::after {
      content: '✓';
      position: absolute;
      top: $spacing-sm;
      right: $spacing-sm;
      width: 24px;
      height: 24px;
      background: $color-success;
      color: white;
      border-radius: 50%;
      @include flex-center;
      font-size: $font-size-sm;
    }
  }
  
  .chapter-icon {
    font-size: 32px;
    flex-shrink: 0;
  }
  
  .chapter-info {
    flex: 1;
    
    .chapter-title {
      font-size: $font-size-base;
      font-weight: 600;
      color: $color-text;
      margin: 0 0 $spacing-xs;
    }
    
    .chapter-desc {
      font-size: $font-size-sm;
      color: $color-text-secondary;
      margin: 0;
    }
  }
  
  .chapter-badge {
    position: absolute;
    top: $spacing-sm;
    right: $spacing-sm;
    font-size: $font-size-xs;
    padding: 2px 8px;
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

// 学习路径
.path-section {
  .section-title {
    font-size: $font-size-xl;
    margin-bottom: $spacing-lg;
  }
  
  .path-content {
    @include card-base;
    padding: $spacing-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    flex-wrap: wrap;
  }
  
  .path-step {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    padding: $spacing-sm $spacing-md;
    background: $color-bg;
    border-radius: $radius-md;
    
    &.highlight {
      background: rgba($color-primary, 0.1);
      
      .step-num {
        background: $color-primary;
      }
      
      .step-text {
        color: $color-primary;
        font-weight: 600;
      }
    }
    
    .step-num {
      width: 24px;
      height: 24px;
      background: $color-text-secondary;
      color: white;
      border-radius: 50%;
      @include flex-center;
      font-size: $font-size-sm;
      font-weight: 600;
    }
    
    .step-text {
      font-size: $font-size-sm;
      color: $color-text;
    }
  }
  
  .path-arrow {
    color: $color-text-light;
    font-size: $font-size-lg;
  }
}
</style>
