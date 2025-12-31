<template>
  <!-- 
    DemoBox.vue - Demo 演示容器
    包含效果预览、HTML 代码、JS 代码的 Tab 切换
    支持 iframe 自适应高度
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
          v-if="iframeSrc"
          ref="previewIframe"
          :src="iframeSrc"
          class="preview-iframe"
          frameborder="0"
          @load="adjustIframeHeight"
        ></iframe>
        <div v-else-if="$slots.preview" class="preview-slot">
          <slot name="preview"></slot>
        </div>
        <div v-else class="preview-placeholder">
          <div class="loading-text" v-if="loading">加载中...</div>
          <div class="error-text" v-else-if="loadError">{{ loadError }}</div>
          <p class="empty-tip" v-else>暂无预览</p>
        </div>
      </div>
      
      <!-- HTML 代码 -->
      <div v-show="activeTab === 'html'" class="code-panel">
        <CodeBlock 
          v-if="loadedHtmlCode" 
          :code="loadedHtmlCode" 
          language="html" 
        />
        <p v-else class="empty-tip">{{ loading ? '加载中...' : '暂无 HTML 代码' }}</p>
      </div>
      
      <!-- JavaScript 代码 -->
      <div v-show="activeTab === 'js'" class="code-panel">
        <CodeBlock 
          v-if="loadedJsCode" 
          :code="loadedJsCode" 
          language="javascript" 
        />
        <p v-else class="empty-tip">{{ loading ? '加载中...' : '暂无 JavaScript 代码' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description Demo 演示容器组件
 * 支持效果预览、HTML/JS 代码切换展示
 * 
 * @example
 * <DemoBox 
 *   demoPath="es6/var-hoisting"
 *   title="Demo 1: 基础用法"
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
     */
    title: {
      type: String,
      default: 'Demo 演示'
    },
    
    /**
     * Demo 描述
     */
    description: {
      type: String,
      default: ''
    },
    
    /**
     * Demo 路径（相对于 public/demos/）
     * 格式：'es6/var-hoisting'
     */
    demoPath: {
      type: String,
      default: ''
    },
    
    /**
     * 直接传入的 HTML 代码
     */
    htmlCode: {
      type: String,
      default: ''
    },
    
    /**
     * 直接传入的 JS 代码
     */
    jsCode: {
      type: String,
      default: ''
    },
    
    /**
     * 最小高度（支持 Number 或 String）
     */
    minHeight: {
      type: [String, Number],
      default: 150
    },
    
    /**
     * 默认激活的 Tab
     */
    defaultTab: {
      type: String,
      default: 'preview'
    }
  },
  
  data() {
    return {
      activeTab: this.defaultTab,
      loading: false,
      loadError: '',
      loadedHtmlCode: '',
      loadedJsCode: '',
      iframeObserver: null,  // 用于监听 iframe 内容变化
      
      tabs: [
        { key: 'preview', label: '👁️ 效果' },
        { key: 'html', label: '📄 HTML' },
        { key: 'js', label: '⚡ JavaScript' }
      ]
    }
  },
  
  computed: {
    /**
     * iframe 源地址
     */
    iframeSrc() {
      if (!this.demoPath) return ''
      // 从 public/demos/ 目录加载
      return `/demos/${this.demoPath}/index.html`
    },
    
    /**
     * 最小高度样式值
     */
    minHeightStyle() {
      if (typeof this.minHeight === 'number') {
        return `${this.minHeight}px`
      }
      return this.minHeight
    }
  },
  
  watch: {
    demoPath: {
      immediate: true,
      handler(newPath) {
        if (newPath) {
          this.loadDemoCode()
        }
      }
    },
    
    htmlCode: {
      immediate: true,
      handler(val) {
        if (val) this.loadedHtmlCode = val
      }
    },
    
    jsCode: {
      immediate: true,
      handler(val) {
        if (val) this.loadedJsCode = val
      }
    }
  },
  
  methods: {
    /**
     * 加载 Demo 代码文件
     */
    async loadDemoCode() {
      if (!this.demoPath) return
      
      this.loading = true
      this.loadError = ''
      
      const basePath = `/demos/${this.demoPath}`
      
      try {
        // 并行加载 HTML 和 JS
        const [htmlRes, jsRes] = await Promise.allSettled([
          fetch(`${basePath}/index.html`).then(r => r.ok ? r.text() : Promise.reject('加载失败')),
          fetch(`${basePath}/app.js`).then(r => r.ok ? r.text() : Promise.reject('加载失败'))
        ])
        
        if (htmlRes.status === 'fulfilled') {
          // 只提取 #app 容器内容
          this.loadedHtmlCode = this.extractAppHtml(htmlRes.value)
        }
        
        if (jsRes.status === 'fulfilled') {
          this.loadedJsCode = jsRes.value
        }
        
        // 如果两个都失败了
        if (htmlRes.status === 'rejected' && jsRes.status === 'rejected') {
          this.loadError = 'Demo 文件加载失败'
        }
      } catch (err) {
        this.loadError = `加载错误: ${err.message}`
      } finally {
        this.loading = false
      }
    },
    
    /**
     * 提取 HTML 中的 #app 容器内容
     * @param {string} html - 完整 HTML
     * @returns {string} - 提取的 app 容器 HTML
     */
    extractAppHtml(html) {
      if (!html) return ''
      
      // 匹配 <div id="app" 开头的标签及其内容
      // 支持 id="app" 或 id='app' 或 id=app
      const regex = /<div[^>]*id=["']?app["']?[^>]*>[\s\S]*?<\/div>(?=\s*<script|\s*$)/i
      const match = html.match(regex)
      
      if (match) {
        // 格式化提取的内容
        let extracted = match[0]
        // 美化缩进
        extracted = this.formatHtml(extracted)
        return extracted
      }
      
      // 如果没找到，尝试更宽松的匹配
      const looseRegex = /<div[^>]*id=["']?app["']?[^>]*>[\s\S]*<\/div>/i
      const looseMatch = html.match(looseRegex)
      if (looseMatch) {
        return this.formatHtml(looseMatch[0])
      }
      
      // 都没找到则返回 body 内容
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i)
      return bodyMatch ? bodyMatch[1].trim() : html
    },
    
    /**
     * 简单格式化 HTML
     */
    formatHtml(html) {
      // 去除多余空行，保持基本格式
      return html
        .replace(/^\s+/gm, match => {
          // 减少缩进层级（假设原来缩进较多）
          const spaces = match.replace(/\t/g, '  ')
          const indent = Math.max(0, Math.floor(spaces.length / 2) - 2) * 2
          return ' '.repeat(indent)
        })
        .replace(/\n{3,}/g, '\n\n')
        .trim()
    },

    /**
     * 自适应调整 iframe 高度
     */
    adjustIframeHeight() {
      this.$nextTick(() => {
        try {
          const iframe = this.$refs.previewIframe
          if (iframe && iframe.contentWindow) {
            const doc = iframe.contentWindow.document
            const body = doc.body
            const html = doc.documentElement
            
            // 获取内容实际高度
            const height = Math.max(
              body.scrollHeight,
              body.offsetHeight,
              html.clientHeight,
              html.scrollHeight,
              html.offsetHeight
            )
            
            // 设置最小高度
            const minH = typeof this.minHeight === 'number' ? this.minHeight : parseInt(this.minHeight) || 150
            iframe.style.height = Math.max(height + 20, minH) + 'px'
            
            // 设置 MutationObserver 监听内容变化
            this.setupIframeObserver(iframe)
          }
        } catch (e) {
          // 跨域情况下无法访问 iframe 内容，使用默认高度
          const iframe = this.$refs.previewIframe
          if (iframe) {
            iframe.style.height = this.minHeightStyle
          }
        }
      })
    },
    
    /**
     * 设置 iframe 内容变化监听器
     */
    setupIframeObserver(iframe) {
      // 先清除旧的 observer
      if (this.iframeObserver) {
        this.iframeObserver.disconnect()
      }
      
      try {
        const doc = iframe.contentWindow.document
        const body = doc.body
        
        if (!body) return
        
        // 创建 MutationObserver 监听 DOM 变化
        this.iframeObserver = new MutationObserver(() => {
          // 内容变化时重新计算高度
          this.recalculateIframeHeight(iframe)
        })
        
        // 监听配置：子节点、属性、子树、字符数据
        this.iframeObserver.observe(body, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        })
      } catch (e) {
        // 跨域情况下无法设置 observer
        console.warn('无法监听 iframe 内容变化（可能是跨域限制）')
      }
    },
    
    /**
     * 重新计算 iframe 高度
     */
    recalculateIframeHeight(iframe) {
      try {
        if (!iframe || !iframe.contentWindow) return
        
        const doc = iframe.contentWindow.document
        const body = doc.body
        const html = doc.documentElement
        
        const height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        )
        
        const minH = typeof this.minHeight === 'number' ? this.minHeight : parseInt(this.minHeight) || 150
        const newHeight = Math.max(height + 20, minH)
        
        // 只有高度变化时才更新
        if (iframe.style.height !== newHeight + 'px') {
          iframe.style.height = newHeight + 'px'
        }
      } catch (e) {
        // 忽略跨域错误
      }
    }
  },
  
  /**
   * 组件销毁前清理 observer
   */
  beforeDestroy() {
    if (this.iframeObserver) {
      this.iframeObserver.disconnect()
      this.iframeObserver = null
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
  min-height: 150px;
}

// 预览面板
.preview-panel {
  padding: $spacing-md;
  
  .preview-iframe {
    width: 100%;
    min-height: 150px;
    border: 1px solid $color-border;
    border-radius: $radius-sm;
    background: white;
    transition: height 0.2s ease;
  }
  
  .preview-slot {
    min-height: 150px;
    padding: $spacing-md;
    background: $color-bg;
    border-radius: $radius-sm;
  }
  
  .preview-placeholder {
    min-height: 150px;
    @include flex-center;
    background: $color-bg;
    border-radius: $radius-sm;
  }
}

// 代码面板 - 高度自适应
.code-panel {
  padding: 0 $spacing-md $spacing-md;
  // 移除固定高度限制，自适应内容
  overflow-x: auto;
  @include custom-scrollbar;
}

// 提示文字
.empty-tip,
.loading-text,
.error-text {
  text-align: center;
  padding: $spacing-xl;
}

.empty-tip {
  color: $color-text-light;
}

.loading-text {
  color: $color-primary;
}

.error-text {
  color: $color-error;
}
</style>
