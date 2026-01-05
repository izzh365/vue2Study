<template>
  <div class="component-basic-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🏗️ 组件基础</h1>
      <p class="subtitle">Component Basics - Vue 组件化的起点</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是组件？">
      <div class="concept-content">
        <div class="analogy">
          <span class="emoji">🧱</span>
          <div>
            <strong>通俗比喻：</strong>
            想象搭积木——每块积木就是一个<strong>组件</strong>！
            组件是可以复用的 Vue 实例，像积木一样可以拼装成复杂的界面。
          </div>
        </div>
        <p class="definition">
          <strong>官方定义：</strong>
          组件是可复用的 Vue 实例，带有一个名字。每个组件拥有自己的模板、数据和逻辑。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 为什么需要组件化 -->
    <KnowledgeCard title="💡 为什么需要组件化？">
      <ul class="reason-list">
        <li>
          <span class="icon">🔄</span>
          <div>
            <strong>复用性</strong>
            <p>一次编写，多处使用，避免重复代码</p>
          </div>
        </li>
        <li>
          <span class="icon">📦</span>
          <div>
            <strong>可维护性</strong>
            <p>修改一处，处处生效，降低维护成本</p>
          </div>
        </li>
        <li>
          <span class="icon">🧩</span>
          <div>
            <strong>可组合性</strong>
            <p>小组件组合成大组件，大组件组合成页面</p>
          </div>
        </li>
      </ul>
    </KnowledgeCard>

    <!-- Demo 1: 全局注册 -->
    <KnowledgeCard title="🎯 Demo 1：全局注册组件">
      <TipBox type="info">
        <p><strong>全局注册</strong>：使用 <code>Vue.component()</code> 注册，可在任何 Vue 实例中使用。</p>
      </TipBox>
      <DemoBox demoPath="components/global-register" title="全局注册组件" />
    </KnowledgeCard>

    <!-- Demo 2: 局部注册 -->
    <KnowledgeCard title="🎯 Demo 2：局部注册组件">
      <TipBox type="info">
        <p><strong>局部注册</strong>：在组件的 <code>components</code> 选项中注册，只能在该组件内使用。</p>
      </TipBox>
      <DemoBox demoPath="components/local-register" title="局部注册组件" />
    </KnowledgeCard>

    <!-- Demo 3: data 必须是函数 -->
    <KnowledgeCard title="🎯 Demo 3：data 为什么必须是函数？">
      <TipBox type="warning">
        <p>组件的 <code>data</code> 必须是一个<strong>函数</strong>，返回一个对象。否则多个组件实例会共享数据！</p>
      </TipBox>
      <DemoBox demoPath="components/data-function" title="data 必须是函数" />
    </KnowledgeCard>

    <!-- Demo 4: 组件命名规范 -->
    <KnowledgeCard title="🎯 Demo 4：组件命名规范">
      <div class="naming-table">
        <table>
          <thead>
            <tr>
              <th>风格</th>
              <th>注册名</th>
              <th>使用方式</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>kebab-case</td>
              <td><code>'my-component'</code></td>
              <td><code>&lt;my-component&gt;</code></td>
            </tr>
            <tr>
              <td>PascalCase</td>
              <td><code>'MyComponent'</code></td>
              <td><code>&lt;MyComponent&gt;</code> 或 <code>&lt;my-component&gt;</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <DemoBox demoPath="components/component-naming" title="组件命名规范" />
    </KnowledgeCard>

    <!-- Demo 5: 单文件组件 -->
    <KnowledgeCard title="🎯 Demo 5：单文件组件 (SFC)">
      <TipBox type="info">
        <p>单文件组件 (<code>.vue</code> 文件) 将模板、脚本、样式放在一个文件中，是 Vue 项目的标准写法。</p>
      </TipBox>
      <DemoBox demoPath="components/sfc-structure" title="单文件组件结构" />
    </KnowledgeCard>

    <!-- Demo 6: 组件复用 -->
    <KnowledgeCard title="🎯 Demo 6：组件复用示例">
      <TipBox type="success">
        <p>组件的最大价值在于<strong>复用</strong>。同一个组件可以被多次使用，每个实例互不影响。</p>
      </TipBox>
      <DemoBox demoPath="components/component-reuse" title="组件复用" />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul class="practice-list">
        <li>优先使用<strong>局部注册</strong>，按需引入组件</li>
        <li>组件名使用 <strong>PascalCase</strong>（与 Vue 官方风格指南一致）</li>
        <li>基础组件加 <strong>Base</strong> 前缀，如 <code>BaseButton</code></li>
        <li>单文件组件文件名使用 <strong>PascalCase</strong></li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'ComponentBasic',

  mixins: [scrollTrackingMixin],

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  }
}
</script>

<style lang="scss" scoped>
.component-basic-page {
  padding: 0 0 $spacing-2xl;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  }
}

.reason-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: $spacing-md;

  li {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-md;
    background: $color-bg;
    border-radius: $radius-md;

    .icon {
      font-size: 24px;
    }

    strong {
      display: block;
      color: $color-text;
      margin-bottom: 4px;
    }

    p {
      color: $color-text-secondary;
      font-size: $font-size-sm;
      margin: 0;
    }
  }
}

.naming-table {
  margin-bottom: $spacing-md;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: $font-size-sm;

    th, td {
      padding: $spacing-sm $spacing-md;
      text-align: left;
      border-bottom: 1px solid $color-border;
    }

    th {
      background: $color-bg;
      font-weight: 600;
    }

    code {
      background: $color-code-bg;
      padding: 2px 6px;
      border-radius: $radius-sm;
      font-family: $font-family-code;
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
