<template>
  <!-- 
    DemoBox.vue - Demo 演示容器
    包含效果预览、HTML 代码、JS 代码的 Tab 切换
  -->
  <div class="demo-box">
    <!-- Demo 标题 -->
    <div class="demo-header">
      <h4 class="demo-title">{{ title }}</h4>
      <span v-if="description" class="demo-desc">{{ description }}</span>
    </div>
    
    <!-- Tab 切换栏 -->
    <div class="demo-tabs">
      <button 
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <!-- Tab 内容区 -->
    <div class="demo-content">
      <!-- 效果预览 -->
      <div v-show="activeTab === 'preview'" class="preview-panel">
        <iframe
          v-if="demoUrl"
          :src="demoUrl"
          :style="{ height: height }"
          class="preview-iframe"
          frameborder="0"
        ></iframe>
        <div v-else class="preview-slot">
          <slot name="preview">
            <p class="empty-tip">暂无预览</p>
          </slot>
        </div>
      </div>
      
      <!-- HTML 代码 -->
      <div v-show="activeTab === 'html'" class="code-panel">
        <CodeBlock 
          v-if="htmlCode" 
          :code="htmlCode" 
          language="html" 
        />
        <p v-else class="empty-tip">暂无 HTML 代码</p>
      </div>
      
      <!-- JavaScript 代码 -->
      <div v-show="activeTab === 'js'" class="code-panel">
        <CodeBlock 
          v-if="jsCode" 
          :code="jsCode" 
          language="javascript" 
        />
        <p v-else class="empty-tip">暂无 JavaScript 代码</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description Demo 演示容器组件
 * 支持效果预览、HTML/JS 代码切换展示
 * @example
 * <DemoBox 
 *   title="Demo 1: 基础用法"
 *   :htmlCode="htmlString"
 *   :jsCode="jsString"
 * />
 */
import CodeBlock from './CodeBlock.vue'

export default {
  name: 'DemoBox',
  
  components: {
    CodeBlock
  },
  
  props: {
    /**
     * Demo 标题
     * @type {String}
     */
    title: {
      type: String,
      default: 'Demo 演示'
    },
    
    /**
     * Demo 描述
     * @type {String}
     */
    description: {
      type: String,
      default: ''
    },
    
    /**
     * Demo 路径（用于 iframe 加载）
     * 格式：'es6/var-hoisting'
     * @type {String}
     */
    demoPath: {
      type: String,
      default: ''
    },
    
    /**
     * HTML 代码字符串
     * @type {String}
     */
    htmlCode: {
      type: String,
      default: ''
    },
    
    /**
     * JavaScript 代码字符串
     * @type {String}
     */
    jsCode: {
      type: String,
      default: ''
    },
    
    /**
     * iframe 高度
     * @type {String}
     */
    height: {
      type: String,
      default: '300px'
    },
    
    /**
     * 默认激活的 Tab
     * @type {String}
     */
    defaultTab: {
      type: String,
      default: 'preview'
    }
  },
  
  data() {
    return {
      // 当前激活的 Tab
      activeTab: this.defaultTab,
      
      // Tab 配置
      tabs: [
        { key: 'preview', label: '👁️ 效果' },
        { key: 'html', label: '📄 HTML' },
        { key: 'js', label: '⚡ JavaScript' }
      ]
    }
  },
  
  computed: {
    /**
     * Demo iframe URL
     * @returns {String} 完整 URL
     */
    demoUrl() {
      if (!this.demoPath) return ''
      return `/demos/${this.demoPath}/index.html`
    }
  }
}
</script>

<style lang="scss" scoped>
.demo-box {
  @include card-base;
  margin: $spacing-lg 0;
  overflow: hidden;
}

// Demo 头部
.demo-header {
  padding: $spacing-md $spacing-lg;
  border-bottom: 1px solid $color-border;
  
  .demo-title {
    font-size: $font-size-base;
    font-weight: 600;
    color: $color-text;
    margin: 0;
  }
  
  .demo-desc {
    display: block;
    margin-top: $spacing-xs;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}

// Tab 切换栏
.demo-tabs {
  display: flex;
  border-bottom: 1px solid $color-border;
  background: rgba(0, 0, 0, 0.01);
  
  .tab-item {
    padding: $spacing-sm $spacing-lg;
    font-size: $font-size-sm;
    color: $color-text-secondary;
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all $transition-fast;
    position: relative;
    
    &:hover {
      color: $color-primary;
      background: rgba($color-primary, 0.05);
    }
    
    &.active {
      color: $color-primary;
      font-weight: 500;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: $color-primary;
      }
    }
  }
}

// 内容区
.demo-content {
  min-height: 200px;
}

// 预览面板
.preview-panel {
  padding: $spacing-md;
  
  .preview-iframe {
    width: 100%;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    background: white;
  }
  
  .preview-slot {
    min-height: 150px;
    @include flex-center;
    background: $color-bg;
    border-radius: $radius-sm;
  }
}

// 代码面板
.code-panel {
  padding: 0 $spacing-md $spacing-md;
}

// 空提示
.empty-tip {
  text-align: center;
  color: $color-text-light;
  padding: $spacing-xl;
}
</style>
