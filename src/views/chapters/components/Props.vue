<template>
  <div class="props-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>⬇️ Props 父传子</h1>
      <p class="subtitle">Props - 父组件向子组件传递数据</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 Props？">
      <div class="concept-content">
        <div class="analogy">
          <span class="emoji">📬</span>
          <div>
            <strong>通俗比喻：</strong>
            Props 就像<strong>快递包裹</strong>——父组件是发件人，子组件是收件人。
            父组件把数据"打包"发送，子组件"签收"后使用。
          </div>
        </div>
        <p class="definition">
          <strong>官方定义：</strong>
          Prop 是父组件用来传递数据给子组件的自定义属性。
          子组件通过 <code>props</code> 选项声明期望接收的数据。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 数据流向图 -->
    <KnowledgeCard title="🔄 Props 数据流向">
      <div class="flow-diagram">
        <div class="flow-parent">
          <span class="label">父组件</span>
          <code>:message="msg"</code>
        </div>
        <div class="flow-arrow">⬇️</div>
        <div class="flow-child">
          <span class="label">子组件</span>
          <code>props: ['message']</code>
        </div>
      </div>
      <TipBox type="warning">
        <p><strong>单向数据流</strong>：Props 是单向的，子组件不能直接修改 props，否则 Vue 会发出警告！</p>
      </TipBox>
    </KnowledgeCard>

    <!-- Demo 1: 基础用法 -->
    <KnowledgeCard title="🎯 Demo 1：Props 基础用法">
      <TipBox type="info">
        <p>使用 <code>props: ['propName']</code> 声明接收的属性，在模板中直接使用。</p>
      </TipBox>
      <DemoBox demoPath="components/props-basic" title="Props 基础用法" />
    </KnowledgeCard>

    <!-- Demo 2: 类型验证 -->
    <KnowledgeCard title="🎯 Demo 2：Props 类型验证">
      <div class="type-table">
        <table>
          <thead>
            <tr>
              <th>类型</th>
              <th>示例</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>String</code></td>
              <td><code>type: String</code></td>
            </tr>
            <tr>
              <td><code>Number</code></td>
              <td><code>type: Number</code></td>
            </tr>
            <tr>
              <td><code>Boolean</code></td>
              <td><code>type: Boolean</code></td>
            </tr>
            <tr>
              <td><code>Array</code></td>
              <td><code>type: Array</code></td>
            </tr>
            <tr>
              <td><code>Object</code></td>
              <td><code>type: Object</code></td>
            </tr>
            <tr>
              <td><code>Function</code></td>
              <td><code>type: Function</code></td>
            </tr>
            <tr>
              <td>多种类型</td>
              <td><code>type: [String, Number]</code></td>
            </tr>
          </tbody>
        </table>
      </div>
      <DemoBox demoPath="components/props-type" title="Props 类型验证" />
    </KnowledgeCard>

    <!-- Demo 3: 默认值和必填 -->
    <KnowledgeCard title="🎯 Demo 3：默认值与必填">
      <TipBox type="info">
        <p><code>default</code> 设置默认值，<code>required: true</code> 表示必填。注意：对象和数组的默认值必须用函数返回！</p>
      </TipBox>
      <DemoBox demoPath="components/props-default" title="默认值与必填" />
    </KnowledgeCard>

    <!-- Demo 4: 自定义验证 -->
    <KnowledgeCard title="🎯 Demo 4：自定义验证函数">
      <TipBox type="info">
        <p>使用 <code>validator</code> 函数进行复杂验证，返回 <code>true</code> 表示验证通过。</p>
      </TipBox>
      <DemoBox demoPath="components/props-validator" title="自定义验证函数" />
    </KnowledgeCard>

    <!-- Demo 5: 单向数据流 -->
    <KnowledgeCard title="🎯 Demo 5：单向数据流">
      <TipBox type="warning">
        <p>子组件不能直接修改 props！如需修改：</p>
        <ul>
          <li>用 <code>data</code> 接收 prop 作为初始值</li>
          <li>用 <code>computed</code> 基于 prop 计算新值</li>
          <li>用 <code>$emit</code> 通知父组件修改</li>
        </ul>
      </TipBox>
      <DemoBox demoPath="components/props-one-way" title="单向数据流" />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul class="practice-list">
        <li>始终为 props 添加<strong>类型验证</strong></li>
        <li>布尔类型 prop 使用 <code>is-</code> 或 <code>has-</code> 前缀</li>
        <li>复杂对象使用<strong>解构</strong>传递需要的属性</li>
        <li>避免在子组件中修改 prop，遵循单向数据流</li>
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
  name: 'PropsPage',

  mixins: [scrollTrackingMixin],

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  }
}
</script>

<style lang="scss" scoped>
.props-page {
  padding: 0 0 $spacing-2xl;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
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
  margin-bottom: $spacing-md;

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

  .flow-parent {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

  .flow-child {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;

    code {
      background: rgba(255,255,255,0.2);
      padding: 4px 8px;
      border-radius: $radius-sm;
    }
  }
}

.type-table {
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
