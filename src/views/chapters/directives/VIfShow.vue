<template>
  <div class="directive-page v-if-show-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔀 v-if / v-show 条件渲染</h1>
      <p class="page-desc">根据条件控制元素的显示与隐藏</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 条件渲染是什么？">
      <p>
        条件渲染让我们可以根据数据的真假值来控制元素是否显示。
        Vue 提供了两种方式：<strong>v-if</strong> 和 <strong>v-show</strong>。
      </p>
      <div class="compare-cards">
        <div class="compare-card if-card">
          <h4>v-if</h4>
          <p>真正的条件渲染</p>
          <p>条件为 false 时，元素<strong>不存在于 DOM</strong></p>
        </div>
        <div class="compare-card show-card">
          <h4>v-show</h4>
          <p>CSS 显隐控制</p>
          <p>条件为 false 时，元素仍在 DOM，只是 <strong>display: none</strong></p>
        </div>
      </div>
    </KnowledgeCard>

    <!-- Demo 展示区 -->
    <KnowledgeCard title="🎯 实战示例">
      <!-- Demo 1: v-if 基础 -->
      <div class="demo-section">
        <h4>Demo 1: v-if / v-else-if / v-else</h4>
        <p class="demo-desc">条件分支渲染，根据条件显示不同内容</p>
        <DemoBox 
          demoPath="directives/v-if-basic"
          title="v-if 条件渲染"
          height="720px"
        />
      </div>

      <!-- Demo 2: v-if vs v-show -->
      <div class="demo-section">
        <h4>Demo 2: v-if vs v-show 对比</h4>
        <p class="demo-desc">观察 DOM 变化，理解两者的核心区别</p>
        <DemoBox 
          demoPath="directives/v-if-vs-show"
          title="v-if vs v-show"
          height="680px"
        />
      </div>
    </KnowledgeCard>

    <!-- 对比表格 -->
    <KnowledgeCard title="📊 v-if vs v-show 对比">
      <div class="compare-table">
        <div class="compare-row header">
          <div class="compare-cell"></div>
          <div class="compare-cell if">v-if</div>
          <div class="compare-cell show">v-show</div>
        </div>
        <div class="compare-row">
          <div class="compare-cell label">渲染方式</div>
          <div class="compare-cell">条件假时不渲染 DOM</div>
          <div class="compare-cell">始终渲染，用 CSS 隐藏</div>
        </div>
        <div class="compare-row">
          <div class="compare-cell label">切换开销</div>
          <div class="compare-cell">较高（销毁/重建 DOM）</div>
          <div class="compare-cell">较低（CSS 切换）</div>
        </div>
        <div class="compare-row">
          <div class="compare-cell label">初始开销</div>
          <div class="compare-cell">条件假时无开销</div>
          <div class="compare-cell">始终有渲染开销</div>
        </div>
        <div class="compare-row">
          <div class="compare-cell label">适用场景</div>
          <div class="compare-cell">条件很少改变</div>
          <div class="compare-cell">频繁切换</div>
        </div>
        <div class="compare-row">
          <div class="compare-cell label">支持 v-else</div>
          <div class="compare-cell">✓ 支持</div>
          <div class="compare-cell">✗ 不支持</div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 使用建议 -->
    <TipBox type="success" title="✅ 如何选择？">
      <ul>
        <li><strong>使用 v-if：</strong>条件很少改变、需要 v-else 分支、初始条件为 false 时</li>
        <li><strong>使用 v-show：</strong>需要频繁切换显示状态、Tab 切换、折叠面板等</li>
      </ul>
    </TipBox>

    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li>v-if 可以用在 <code>&lt;template&gt;</code> 上，v-show 不行</li>
        <li>v-else、v-else-if 必须紧跟在 v-if 后面</li>
        <li>不推荐 v-if 和 v-for 同时用在同一个元素上</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * v-if / v-show 条件渲染页面
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'VIfShow',

  mixins: [scrollTrackingMixin],

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  }
}
</script>

<style lang="scss" scoped>
.v-if-show-page {
  .page-header {
    margin-bottom: $spacing-xl;
    
    h1 {
      font-size: 28px;
      margin-bottom: $spacing-sm;
    }
    
    .page-desc {
      color: $color-text-secondary;
      font-size: 16px;
    }
  }

  .compare-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-md;
    margin-top: $spacing-lg;

    .compare-card {
      padding: $spacing-lg;
      border-radius: $radius-md;
      text-align: center;

      h4 {
        font-size: 18px;
        margin-bottom: $spacing-sm;
      }

      p {
        font-size: 14px;
        margin: 4px 0;
        color: $color-text-secondary;
      }

      &.if-card {
        background: rgba($color-primary, 0.1);
        border: 2px solid $color-primary;

        h4 { color: $color-primary; }
      }

      &.show-card {
        background: rgba($color-success, 0.1);
        border: 2px solid $color-success;

        h4 { color: $color-success; }
      }
    }
  }

  .demo-section {
    margin-bottom: $spacing-xl;

    h4 {
      font-size: 16px;
      margin-bottom: $spacing-xs;
    }

    .demo-desc {
      color: $color-text-secondary;
      font-size: 14px;
      margin-bottom: $spacing-md;
    }
  }

  .compare-table {
    border-radius: $radius-md;
    overflow: hidden;
    border: 1px solid $color-border;

    .compare-row {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1.5fr;

      &.header {
        background: $color-bg;

        .compare-cell {
          font-weight: 600;
          font-size: 15px;

          &.if { color: $color-primary; }
          &.show { color: $color-success; }
        }
      }

      .compare-cell {
        padding: $spacing-sm $spacing-md;
        border-bottom: 1px solid $color-border;
        font-size: 14px;

        &.label {
          background: $color-bg;
          font-weight: 500;
          color: $color-text-secondary;
        }
      }

      &:last-child .compare-cell {
        border-bottom: none;
      }
    }
  }
}
</style>
