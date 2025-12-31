<template>
  <!-- 
    KnowledgeCard.vue - 知识点卡片
    用于展示各类知识点内容
  -->
  <div class="knowledge-card">
    <!-- 卡片标题 -->
    <div class="card-header">
      <h3 class="card-title">{{ title }}</h3>
    </div>
    
    <!-- 卡片内容（插槽） -->
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * @description 知识点卡片组件
 * 用于包裹各类知识点内容，提供统一的卡片样式
 * @example
 * <KnowledgeCard title="📖 概念说明">
 *   <p>这是知识点内容...</p>
 * </KnowledgeCard>
 */
export default {
  name: 'KnowledgeCard',
  
  props: {
    /**
     * 卡片标题
     * @type {String}
     */
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-card {
  @include card-base;
  margin-bottom: $spacing-lg;
  overflow: hidden;
}

.card-header {
  padding: $spacing-md $spacing-lg;
  background: linear-gradient(135deg, rgba($color-primary, 0.05), rgba($color-primary-light, 0.05));
  border-bottom: 1px solid $color-border;
  
  .card-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $color-text;
    margin: 0;
  }
}

.card-body {
  padding: $spacing-lg;
  
  // 段落样式
  :deep(p) {
    margin-bottom: $spacing-md;
    line-height: $line-height-relaxed;
    color: $color-text;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  // 列表样式
  :deep(ul),
  :deep(ol) {
    margin-bottom: $spacing-md;
    padding-left: $spacing-lg;
    
    li {
      margin-bottom: $spacing-sm;
      line-height: $line-height-relaxed;
      color: $color-text;
    }
  }
  
  :deep(ul) {
    list-style: disc;
  }
  
  :deep(ol) {
    list-style: decimal;
  }
  
  // 强调文字
  :deep(strong) {
    color: $color-primary;
    font-weight: 600;
  }
  
  // 行内代码
  :deep(code) {
    background: rgba($color-primary, 0.1);
    color: $color-primary-dark;
    padding: 2px 6px;
    border-radius: $radius-sm;
    font-family: $font-family-code;
    font-size: 0.9em;
  }
}
</style>
