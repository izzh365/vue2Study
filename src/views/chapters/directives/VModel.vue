<template>
  <div class="directive-page v-model-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔄 v-model 双向绑定</h1>
      <p class="page-desc">表单输入与数据的双向同步</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是双向绑定？">
      <p>
        <strong>双向绑定</strong> = 数据变化 → 视图更新 + 视图变化 → 数据更新
      </p>
      <div class="flow-diagram">
        <div class="flow-box">📊 data 数据</div>
        <div class="flow-arrow">⟷</div>
        <div class="flow-box">📝 表单输入</div>
      </div>
      <div class="analogy-box">
        <span class="analogy-icon">🪞</span>
        <div>
          <strong>通俗比喻：</strong>就像镜子一样，数据和视图互为镜像，一方变化，另一方立即同步
        </div>
      </div>
    </KnowledgeCard>

    <!-- 本质解析 -->
    <KnowledgeCard title="🔧 v-model 的本质">
      <p>v-model 其实是语法糖，本质是 v-bind + v-on 的组合：</p>
      <CodeBlock 
        :code="essenceCode"
        language="html"
      />
    </KnowledgeCard>

    <!-- Demo 展示区 -->
    <KnowledgeCard title="🎯 实战示例">
      <!-- Demo 1: 基础用法 -->
      <div class="demo-section">
        <h4>Demo 1: 文本输入框</h4>
        <p class="demo-desc">最基础的双向绑定演示</p>
        <DemoBox 
          demoPath="directives/v-model-basic"
          title="v-model 基础用法"
          height="650px"
        />
      </div>

      <!-- Demo 2: 复选框和单选框 -->
      <div class="demo-section">
        <h4>Demo 2: 复选框和单选框</h4>
        <p class="demo-desc">单个复选框绑定布尔值，多个绑定数组</p>
        <DemoBox 
          demoPath="directives/v-model-checkbox"
          title="复选框和单选框"
          height="720px"
        />
      </div>

      <!-- Demo 3: 下拉选择 -->
      <div class="demo-section">
        <h4>Demo 3: 下拉选择框</h4>
        <p class="demo-desc">单选和多选下拉框的使用</p>
        <DemoBox 
          demoPath="directives/v-model-select"
          title="下拉选择框"
          height="750px"
        />
      </div>

      <!-- Demo 4: 修饰符 -->
      <div class="demo-section">
        <h4>Demo 4: v-model 修饰符</h4>
        <p class="demo-desc">.lazy、.number、.trim 的使用</p>
        <DemoBox 
          demoPath="directives/v-model-modifiers"
          title="v-model 修饰符"
          height="800px"
        />
      </div>
    </KnowledgeCard>

    <!-- 绑定规则总结 -->
    <KnowledgeCard title="📊 不同表单元素的绑定">
      <div class="binding-table">
        <div class="binding-row header">
          <div class="binding-cell">表单元素</div>
          <div class="binding-cell">绑定的值</div>
          <div class="binding-cell">数据类型</div>
        </div>
        <div class="binding-row">
          <div class="binding-cell">input[text]</div>
          <div class="binding-cell">value</div>
          <div class="binding-cell">字符串</div>
        </div>
        <div class="binding-row">
          <div class="binding-cell">textarea</div>
          <div class="binding-cell">value</div>
          <div class="binding-cell">字符串</div>
        </div>
        <div class="binding-row">
          <div class="binding-cell">input[checkbox]（单个）</div>
          <div class="binding-cell">checked</div>
          <div class="binding-cell">布尔值</div>
        </div>
        <div class="binding-row">
          <div class="binding-cell">input[checkbox]（多个）</div>
          <div class="binding-cell">value</div>
          <div class="binding-cell">数组</div>
        </div>
        <div class="binding-row">
          <div class="binding-cell">input[radio]</div>
          <div class="binding-cell">value</div>
          <div class="binding-cell">字符串</div>
        </div>
        <div class="binding-row">
          <div class="binding-cell">select</div>
          <div class="binding-cell">value</div>
          <div class="binding-cell">字符串/对象</div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 修饰符 -->
    <TipBox type="info" title="💡 v-model 修饰符">
      <ul>
        <li><code>.lazy</code> - 在 change 事件而非 input 事件时更新</li>
        <li><code>.number</code> - 自动将输入转换为数字类型</li>
        <li><code>.trim</code> - 自动去除输入的首尾空格</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * v-model 双向绑定页面
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'VModel',

  mixins: [scrollTrackingMixin],

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },

  data() {
    return {
      essenceCode: `<!-- v-model 是语法糖 -->
<input v-model="message">

<!-- 等价于 -->
<input 
  :value="message" 
  @input="message = $event.target.value"
>`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-model-page {
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

  .flow-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-md;
    margin: $spacing-lg 0;

    .flow-box {
      padding: $spacing-md $spacing-lg;
      background: $color-bg;
      border-radius: $radius-md;
      font-weight: 600;
    }

    .flow-arrow {
      font-size: 24px;
      color: $color-primary;
    }
  }

  .analogy-box {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-md;
    background: rgba($color-primary, 0.05);
    border-radius: $radius-md;

    .analogy-icon {
      font-size: 24px;
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

  .binding-table {
    border-radius: $radius-md;
    overflow: hidden;
    border: 1px solid $color-border;

    .binding-row {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;

      &.header {
        background: $color-bg;
        font-weight: 600;
        font-size: 14px;
      }

      .binding-cell {
        padding: $spacing-sm $spacing-md;
        border-bottom: 1px solid $color-border;
        font-size: 14px;
      }

      &:last-child .binding-cell {
        border-bottom: none;
      }
    }
  }
}
</style>
