<template>
  <!-- 
    TipBox.vue - 提示框组件
    支持 info/success/warning/error 四种类型
  -->
  <div class="tip-box" :class="'tip-' + type">
    <!-- 图标 -->
    <span class="tip-icon">{{ iconMap[type] }}</span>
    
    <!-- 内容区 -->
    <div class="tip-content">
      <!-- 标题 -->
      <h4 v-if="title" class="tip-title">{{ title }}</h4>
      <!-- 内容插槽 -->
      <div class="tip-body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @description 提示框组件
 * 用于显示各类提示信息
 * @example
 * <TipBox type="warning" title="注意事项">
 *   <p>这是警告内容...</p>
 * </TipBox>
 */
export default {
  name: 'TipBox',
  
  props: {
    /**
     * 提示类型
     * @type {String}
     * @values 'info', 'success', 'warning', 'error'
     */
    type: {
      type: String,
      default: 'info',
      validator: value => ['info', 'success', 'warning', 'error'].includes(value)
    },
    
    /**
     * 提示标题
     * @type {String}
     */
    title: {
      type: String,
      default: ''
    }
  },
  
  data() {
    return {
      // 类型对应的图标
      iconMap: {
        info: 'ℹ️',
        success: '✅',
        warning: '⚠️',
        error: '❌'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tip-box {
  display: flex;
  gap: $spacing-md;
  padding: $spacing-md $spacing-lg;
  border-radius: $radius-md;
  margin-bottom: $spacing-lg;
  border-left: 4px solid;
  
  // info 类型（蓝色）
  &.tip-info {
    background: rgba($color-info, 0.08);
    border-left-color: $color-info;
    
    .tip-title {
      color: darken($color-info, 20%);
    }
  }
  
  // success 类型（绿色）
  &.tip-success {
    background: rgba($color-success, 0.08);
    border-left-color: $color-success;
    
    .tip-title {
      color: darken($color-success, 10%);
    }
  }
  
  // warning 类型（橙色）
  &.tip-warning {
    background: rgba($color-warning, 0.08);
    border-left-color: $color-warning;
    
    .tip-title {
      color: darken($color-warning, 10%);
    }
  }
  
  // error 类型（红色）
  &.tip-error {
    background: rgba($color-error, 0.08);
    border-left-color: $color-error;
    
    .tip-title {
      color: $color-error;
    }
  }
}

.tip-icon {
  font-size: $font-size-xl;
  line-height: 1;
  flex-shrink: 0;
}

.tip-content {
  flex: 1;
  
  .tip-title {
    font-size: $font-size-base;
    font-weight: 600;
    margin: 0 0 $spacing-sm;
  }
  
  .tip-body {
    font-size: $font-size-sm;
    color: $color-text;
    line-height: $line-height-relaxed;
    
    :deep(p) {
      margin: 0;
      
      & + p {
        margin-top: $spacing-sm;
      }
    }
    
    :deep(ul) {
      margin: $spacing-sm 0 0;
      padding-left: $spacing-lg;
      list-style: disc;
      
      li {
        margin-bottom: $spacing-xs;
      }
    }
    
    :deep(code) {
      background: rgba(0, 0, 0, 0.05);
      padding: 2px 6px;
      border-radius: $radius-sm;
      font-family: $font-family-code;
      font-size: 0.9em;
    }
  }
}
</style>
