<template>
  <!-- 
    CodeBlock.vue - 代码块组件
    使用 Prism.js 实现语法高亮，支持行号和复制功能
  -->
  <div class="code-block">
    <!-- 代码块头部 -->
    <div class="code-header">
      <span class="code-lang">{{ language }}</span>
      <button 
        class="copy-button"
        :class="{ copied: isCopied }"
        @click="copyCode"
      >
        {{ isCopied ? '✓ 已复制' : '📋 复制' }}
      </button>
    </div>
    
    <!-- 代码内容 -->
    <pre 
      class="line-numbers"
      :class="'language-' + language"
    ><code 
        ref="codeEl"
        :class="'language-' + language"
        v-html="highlightedCode"
      ></code></pre>
  </div>
</template>

<script>
/**
 * @description 代码块组件，支持语法高亮和复制
 * @example
 * <CodeBlock 
 *   :code="codeString" 
 *   language="javascript" 
 * />
 */
import Prism from 'prismjs'

export default {
  name: 'CodeBlock',
  
  props: {
    /**
     * 代码内容
     * @type {String}
     */
    code: {
      type: String,
      required: true
    },
    
    /**
     * 代码语言
     * @type {String}
     * @default 'javascript'
     */
    language: {
      type: String,
      default: 'javascript'
    }
  },
  
  data() {
    return {
      // 是否已复制
      isCopied: false
    }
  },
  
  computed: {
    /**
     * 使用 Prism 高亮后的代码
     * @returns {String} HTML 字符串
     */
    highlightedCode() {
      // 获取对应语言的语法
      const grammar = Prism.languages[this.language] || Prism.languages.javascript
      // 高亮代码
      return Prism.highlight(this.code.trim(), grammar, this.language)
    }
  },
  
  methods: {
    /**
     * 复制代码到剪贴板
     */
    async copyCode() {
      try {
        await navigator.clipboard.writeText(this.code.trim())
        this.isCopied = true
        
        // 2 秒后恢复按钮状态
        setTimeout(() => {
          this.isCopied = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.code-block {
  margin: $spacing-md 0;
  border-radius: $radius-md;
  overflow: hidden;
  border: 1px solid $color-border;
  background: $color-code-bg;
}

.code-header {
  @include flex-between;
  padding: $spacing-sm $spacing-md;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid $color-border;
}

.code-lang {
  font-size: $font-size-xs;
  color: $color-text-secondary;
  text-transform: uppercase;
  font-weight: 500;
}

.copy-button {
  @include button-base;
  padding: $spacing-xs $spacing-sm;
  font-size: $font-size-xs;
  background: transparent;
  color: $color-text-secondary;
  border: 1px solid $color-border;
  
  &:hover {
    background: $color-card;
    color: $color-primary;
    border-color: $color-primary;
  }
  
  &.copied {
    background: $color-success;
    color: white;
    border-color: $color-success;
  }
}

// 覆盖 Prism 默认样式
:deep(pre[class*="language-"]) {
  margin: 0;
  border: none;
  border-radius: 0;
}
</style>
