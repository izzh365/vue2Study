<template>
  <div class="slot-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>📦 Slot 插槽</h1>
      <p class="subtitle">Slots - 内容分发与组件定制</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是插槽？">
      <div class="concept-content">
        <div class="analogy">
          <span class="emoji">🎰</span>
          <div>
            <strong>通俗比喻：</strong>
            插槽就像<strong>老虎机</strong>的槽位——组件预留了"槽"，
            父组件可以往里面"塞"任何内容，实现高度定制！
          </div>
        </div>
        <p class="definition">
          <strong>官方定义：</strong>
          插槽是 Vue 的内容分发机制，允许父组件向子组件传递模板片段，
          让子组件在其模板中渲染这些内容。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 插槽类型 -->
    <KnowledgeCard title="📋 插槽类型">
      <div class="slot-types">
        <div class="slot-type">
          <span class="type-icon">📭</span>
          <div>
            <strong>默认插槽</strong>
            <code>&lt;slot&gt;&lt;/slot&gt;</code>
            <p>最基础的插槽，父组件内容直接填充</p>
          </div>
        </div>
        <div class="slot-type">
          <span class="type-icon">🏷️</span>
          <div>
            <strong>具名插槽</strong>
            <code>&lt;slot name="header"&gt;</code>
            <p>通过名称分发到不同位置</p>
          </div>
        </div>
        <div class="slot-type">
          <span class="type-icon">🔄</span>
          <div>
            <strong>作用域插槽</strong>
            <code>&lt;slot :data="item"&gt;</code>
            <p>子组件向父组件传递数据</p>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- Demo 1: 默认插槽 -->
    <KnowledgeCard title="🎯 Demo 1：默认插槽">
      <TipBox type="info">
        <p>子组件用 <code>&lt;slot&gt;</code> 定义插槽位置，父组件在子组件标签内写入内容。</p>
      </TipBox>
      <DemoBox demoPath="components/slot-default" title="默认插槽" />
    </KnowledgeCard>

    <!-- Demo 2: 具名插槽 -->
    <KnowledgeCard title="🎯 Demo 2：具名插槽">
      <TipBox type="info">
        <p>使用 <code>name</code> 属性给插槽命名，父组件用 <code>v-slot:name</code> 或 <code>#name</code> 指定内容。</p>
      </TipBox>
      <div class="syntax-compare">
        <div class="syntax-item">
          <strong>完整写法</strong>
          <code>&lt;template v-slot:header&gt;</code>
        </div>
        <div class="syntax-item">
          <strong>简写</strong>
          <code>&lt;template #header&gt;</code>
        </div>
      </div>
      <DemoBox demoPath="components/slot-named" title="具名插槽" />
    </KnowledgeCard>

    <!-- Demo 3: 作用域插槽 -->
    <KnowledgeCard title="🎯 Demo 3：作用域插槽">
      <TipBox type="info">
        <p>作用域插槽让父组件能访问子组件的数据。子组件通过 <code>:data="value"</code> 传递，父组件通过 <code>v-slot="slotProps"</code> 接收。</p>
      </TipBox>
      <div class="scope-diagram">
        <div class="scope-child">
          <strong>子组件</strong>
          <code>&lt;slot :user="userData"&gt;</code>
        </div>
        <div class="scope-arrow">➡️</div>
        <div class="scope-parent">
          <strong>父组件</strong>
          <code>v-slot="{ user }"</code>
        </div>
      </div>
      <DemoBox demoPath="components/slot-scope" title="作用域插槽" />
    </KnowledgeCard>

    <!-- Demo 4: 综合案例 -->
    <KnowledgeCard title="🎯 Demo 4：插槽综合案例">
      <TipBox type="success">
        <p>实际项目中的插槽应用：Tab 组件、折叠面板、模态框、列表组件等。</p>
      </TipBox>
      <DemoBox demoPath="components/slot-advanced" title="插槽综合案例" />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul class="warning-list">
        <li><code>v-slot</code> 只能添加在 <code>&lt;template&gt;</code> 或组件标签上</li>
        <li>默认插槽的内容可以作为<strong>后备内容</strong>，当父组件不传内容时显示</li>
        <li>作用域插槽的 props 可以使用<strong>解构</strong>语法简化</li>
        <li>Vue 2.6+ 推荐使用 <code>v-slot</code>，旧的 <code>slot</code> 和 <code>slot-scope</code> 已废弃</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul class="practice-list">
        <li>使用具名插槽<strong>清晰划分</strong>组件的可定制区域</li>
        <li>作用域插槽适合<strong>列表渲染</strong>场景，让父组件控制每项的展示</li>
        <li>为插槽提供<strong>默认内容</strong>作为后备方案</li>
        <li>使用 <code>#</code> 简写提高代码可读性</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'SlotPage',

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  }
}
</script>

<style lang="scss" scoped>
.slot-page {
  padding: 0 0 $spacing-2xl;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
  border-radius: $radius-lg;
  color: white;

  h1 {
    font-size: 28px;
    margin-bottom: $spacing-sm;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .subtitle {
    opacity: 0.95;
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
  }
}

.slot-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;

  .slot-type {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-md;
    background: $color-bg;
    border-radius: $radius-md;

    .type-icon {
      font-size: 24px;
    }

    strong {
      display: block;
      color: $color-text;
      margin-bottom: 4px;
    }

    code {
      display: block;
      font-family: $font-family-code;
      font-size: $font-size-xs;
      color: $color-primary;
      margin-bottom: 4px;
    }

    p {
      color: $color-text-secondary;
      font-size: $font-size-xs;
      margin: 0;
    }
  }
}

.syntax-compare, .scope-diagram {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-md;
  padding: $spacing-md;
  margin-bottom: $spacing-md;
  flex-wrap: wrap;
}

.syntax-compare {
  .syntax-item {
    padding: $spacing-md;
    background: $color-bg;
    border-radius: $radius-md;
    text-align: center;

    strong {
      display: block;
      margin-bottom: $spacing-sm;
      color: $color-text;
    }

    code {
      font-family: $font-family-code;
      font-size: $font-size-sm;
      color: $color-primary;
    }
  }
}

.scope-diagram {
  .scope-child, .scope-parent {
    padding: $spacing-md;
    border-radius: $radius-md;
    text-align: center;

    strong {
      display: block;
      margin-bottom: $spacing-sm;
    }

    code {
      font-family: $font-family-code;
      font-size: $font-size-sm;
    }
  }

  .scope-child {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    color: white;

    code {
      background: rgba(255,255,255,0.2);
      padding: 4px 8px;
      border-radius: $radius-sm;
    }
  }

  .scope-arrow {
    font-size: 24px;
  }

  .scope-parent {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    code {
      background: rgba(255,255,255,0.2);
      padding: 4px 8px;
      border-radius: $radius-sm;
    }
  }
}

.warning-list, .practice-list {
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
