<template>
  <div class="emit-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>⬆️ $emit 子传父</h1>
      <p class="subtitle">Custom Events - 子组件向父组件传递数据</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 $emit？">
      <div class="concept-content">
        <div class="analogy">
          <span class="emoji">📢</span>
          <div>
            <strong>通俗比喻：</strong>
            <code>$emit</code> 就像<strong>喊话器</strong>——子组件喊一声，父组件就能听到！
            子组件触发一个事件，父组件监听这个事件并响应。
          </div>
        </div>
        <p class="definition">
          <strong>官方定义：</strong>
          <code>$emit</code> 用于触发当前实例上的事件。
          父组件可以通过 <code>v-on</code> 监听子组件触发的自定义事件。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 通信流程 -->
    <KnowledgeCard title="🔄 $emit 通信流程">
      <div class="flow-diagram">
        <div class="flow-child">
          <span class="label">子组件</span>
          <code>this.$emit('update', value)</code>
        </div>
        <div class="flow-arrow">⬆️</div>
        <div class="flow-parent">
          <span class="label">父组件</span>
          <code>@update="handleUpdate"</code>
        </div>
      </div>
    </KnowledgeCard>

    <!-- Demo 1: 基础用法 -->
    <KnowledgeCard title="🎯 Demo 1：$emit 基础用法">
      <TipBox type="info">
        <p>子组件通过 <code>this.$emit('事件名')</code> 触发事件，父组件通过 <code>@事件名</code> 监听。</p>
      </TipBox>
      <DemoBox demoPath="components/emit-basic" title="$emit 基础用法" />
    </KnowledgeCard>

    <!-- Demo 2: 传递参数 -->
    <KnowledgeCard title="🎯 Demo 2：传递参数">
      <TipBox type="info">
        <p><code>$emit</code> 的第二个参数就是传递给父组件的数据（payload）。</p>
      </TipBox>
      <DemoBox demoPath="components/emit-params" title="传递参数" />
    </KnowledgeCard>

    <!-- Demo 3: .sync 修饰符 -->
    <KnowledgeCard title="🎯 Demo 3：.sync 修饰符">
      <TipBox type="info">
        <p><code>.sync</code> 是一个语法糖，用于实现"双向绑定"效果。子组件通过 <code>$emit('update:propName', value)</code> 触发更新。</p>
      </TipBox>
      <div class="sync-compare">
        <div class="compare-item">
          <strong>不使用 .sync</strong>
          <code>&lt;child :value="val" @update:value="val = $event"&gt;</code>
        </div>
        <div class="compare-item">
          <strong>使用 .sync</strong>
          <code>&lt;child :value.sync="val"&gt;</code>
        </div>
      </div>
      <DemoBox demoPath="components/emit-sync" title=".sync 修饰符" />
    </KnowledgeCard>

    <!-- Demo 4: v-model 语法糖 -->
    <KnowledgeCard title="🎯 Demo 4：v-model 语法糖">
      <TipBox type="info">
        <p>自定义组件的 <code>v-model</code> 默认使用 <code>value</code> prop 和 <code>input</code> 事件，可通过 <code>model</code> 选项自定义。</p>
      </TipBox>
      <DemoBox demoPath="components/emit-v-model" title="v-model 语法糖" />
    </KnowledgeCard>

    <!-- Demo 5: 综合案例 -->
    <KnowledgeCard title="🎯 Demo 5：综合案例 - 计数器">
      <TipBox type="success">
        <p>一个完整的计数器组件，展示 props 和 $emit 的配合使用。</p>
      </TipBox>
      <DemoBox demoPath="components/emit-counter" title="计数器组件" />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul class="practice-list">
        <li>事件名使用 <strong>kebab-case</strong>（短横线格式）</li>
        <li>事件命名要<strong>语义化</strong>，如 <code>item-selected</code>、<code>form-submitted</code></li>
        <li>使用 <code>.sync</code> 替代繁琐的 <code>v-bind</code> + <code>v-on</code></li>
        <li>表单组件优先使用 <code>v-model</code></li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'EmitPage',

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  }
}
</script>

<style lang="scss" scoped>
.emit-page {
  padding: 0 0 $spacing-2xl;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: $radius-lg;
  color: white;

  h1 {
    font-size: 28px;
    margin-bottom: $spacing-sm;
  }

  .subtitle {
    opacity: 0.9;
    font-size: $font-size-lg;
  }
}

.concept-content {
  .analogy {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-md;
    background: $color-bg;
    border-radius: $radius-md;
    margin-bottom: $spacing-md;

    .emoji {
      font-size: 32px;
    }
  }

  .definition {
    color: $color-text-secondary;
    line-height: 1.8;

    strong {
      color: $color-text;
    }

    code {
      background: $color-code-bg;
      padding: 2px 6px;
      border-radius: $radius-sm;
      font-family: $font-family-code;
    }
  }
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: $spacing-sm;
  padding: $spacing-lg;

  .flow-parent, .flow-child {
    padding: $spacing-md $spacing-lg;
    border-radius: $radius-md;
    text-align: center;

    .label {
      display: block;
      font-weight: 600;
      margin-bottom: $spacing-xs;
    }

    code {
      font-family: $font-family-code;
      font-size: $font-size-sm;
    }
  }

  .flow-child {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;

    code {
      background: rgba(255,255,255,0.2);
      padding: 4px 8px;
      border-radius: $radius-sm;
    }
  }

  .flow-arrow {
    font-size: 24px;
  }

  .flow-parent {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    code {
      background: rgba(255,255,255,0.2);
      padding: 4px 8px;
      border-radius: $radius-sm;
    }
  }
}

.sync-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-md;
  margin-bottom: $spacing-md;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .compare-item {
    padding: $spacing-md;
    background: $color-bg;
    border-radius: $radius-md;

    strong {
      display: block;
      margin-bottom: $spacing-sm;
      color: $color-text;
    }

    code {
      display: block;
      font-family: $font-family-code;
      font-size: $font-size-xs;
      color: $color-primary;
      word-break: break-all;
    }
  }
}

.practice-list {
  margin: 0;
  padding-left: $spacing-lg;

  li {
    margin-bottom: $spacing-sm;
    line-height: 1.6;

    &:last-child {
      margin-bottom: 0;
    }

    code {
      background: rgba(0,0,0,0.05);
      padding: 2px 6px;
      border-radius: $radius-sm;
      font-family: $font-family-code;
    }
  }
}
</style>
