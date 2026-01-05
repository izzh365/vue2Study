<template>
  <div class="refs-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔗 $refs 访问子组件</h1>
      <p class="subtitle">Refs - 直接访问 DOM 元素或子组件实例</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 $refs？">
      <div class="concept-content">
        <div class="analogy">
          <span class="emoji">🏷️</span>
          <div>
            <strong>通俗比喻：</strong>
            <code>ref</code> 就像给元素贴<strong>标签</strong>——通过这个标签可以直接找到它！
            类似于身份证号，有了它就能精确定位。
          </div>
        </div>
        <p class="definition">
          <strong>官方定义：</strong>
          <code>ref</code> 用于给元素或子组件注册引用信息。
          引用信息将被注册到父组件的 <code>$refs</code> 对象上。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 使用场景 -->
    <KnowledgeCard title="💡 $refs 使用场景">
      <ul class="scene-list">
        <li>
          <span class="icon">📝</span>
          <div>
            <strong>操作 DOM 元素</strong>
            <p>获取输入框焦点、操作 Canvas、测量元素尺寸</p>
          </div>
        </li>
        <li>
          <span class="icon">🎮</span>
          <div>
            <strong>调用子组件方法</strong>
            <p>如调用视频组件的 play()、表单组件的 validate()</p>
          </div>
        </li>
        <li>
          <span class="icon">📊</span>
          <div>
            <strong>访问子组件数据</strong>
            <p>在某些场景下需要读取子组件的状态</p>
          </div>
        </li>
      </ul>
    </KnowledgeCard>

    <!-- Demo 1: 访问 DOM -->
    <KnowledgeCard title="🎯 Demo 1：访问 DOM 元素">
      <TipBox type="info">
        <p>当 <code>ref</code> 用在普通 DOM 元素上时，<code>this.$refs.xxx</code> 获取的是 DOM 元素本身。</p>
      </TipBox>
      <DemoBox demoPath="components/refs-dom" title="访问 DOM 元素" />
    </KnowledgeCard>

    <!-- Demo 2: 访问子组件 -->
    <KnowledgeCard title="🎯 Demo 2：访问子组件实例">
      <TipBox type="info">
        <p>当 <code>ref</code> 用在子组件上时，<code>this.$refs.xxx</code> 获取的是组件实例，可以调用其方法和访问其数据。</p>
      </TipBox>
      <DemoBox demoPath="components/refs-component" title="访问子组件实例" />
    </KnowledgeCard>

    <!-- Demo 3: $parent 和 $children -->
    <KnowledgeCard title="🎯 Demo 3：$parent 和 $children">
      <TipBox type="warning">
        <p><code>$parent</code> 和 <code>$children</code> 可以访问父/子组件，但会造成<strong>强耦合</strong>，应谨慎使用！</p>
      </TipBox>
      <div class="compare-table">
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>说明</th>
              <th>注意事项</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>$parent</code></td>
              <td>访问父组件实例</td>
              <td>嵌套层级变化时会出问题</td>
            </tr>
            <tr>
              <td><code>$children</code></td>
              <td>访问子组件数组</td>
              <td>顺序不确定，Vue 3 已移除</td>
            </tr>
            <tr>
              <td><code>$root</code></td>
              <td>访问根组件实例</td>
              <td>不推荐用于组件通信</td>
            </tr>
          </tbody>
        </table>
      </div>
      <DemoBox demoPath="components/refs-parent-children" title="$parent 和 $children" />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul class="warning-list">
        <li><code>$refs</code> 只在组件渲染完成后才填充，在 <code>mounted</code> 之后才能访问</li>
        <li><code>$refs</code> 不是响应式的，不要在模板中使用</li>
        <li>避免在子组件内部通过 <code>$refs</code> 访问，这会破坏组件封装</li>
        <li><code>$parent</code>/<code>$children</code> 会导致组件耦合，优先使用 props 和 $emit</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul class="practice-list">
        <li>仅在需要<strong>直接操作 DOM</strong> 时使用 $refs</li>
        <li>子组件应该暴露<strong>清晰的方法接口</strong>，而不是让父组件直接访问内部数据</li>
        <li>使用 <code>props</code> 和 <code>$emit</code> 作为主要通信方式</li>
        <li>复杂场景考虑使用 <strong>Vuex</strong> 进行状态管理</li>
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
  name: 'RefsPage',

  mixins: [scrollTrackingMixin],

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  }
}
</script>

<style lang="scss" scoped>
.refs-page {
  padding: 0 0 $spacing-2xl;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  padding: $spacing-xl;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
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

.scene-list {
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

.compare-table {
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
