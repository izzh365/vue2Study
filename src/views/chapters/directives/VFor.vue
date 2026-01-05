<template>
  <div class="directive-page v-for-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔁 v-for 列表渲染</h1>
      <p class="page-desc">遍历数组或对象，渲染列表数据</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是列表渲染？">
      <p>
        <strong>v-for</strong> 指令用于根据数组或对象的内容，循环渲染一组元素。
        这是前端开发中最常用的功能之一，如商品列表、用户列表、评论列表等都需要用到。
      </p>
      <div class="analogy-box">
        <span class="analogy-icon">📋</span>
        <div>
          <strong>通俗比喻：</strong>就像复印机一样，有多少份数据，就复制出多少个元素
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <CodeBlock 
        :code="syntaxCode"
        language="html"
      />
    </KnowledgeCard>

    <!-- Demo 展示区 -->
    <KnowledgeCard title="🎯 实战示例">
      <!-- Demo 1: 基础用法 -->
      <div class="demo-section">
        <h4>Demo 1: 遍历数组和对象</h4>
        <p class="demo-desc">v-for 的基本用法，遍历不同类型的数据</p>
        <DemoBox 
          demoPath="directives/v-for-basic"
          title="v-for 基础用法"
          height="750px"
        />
      </div>

      <!-- Demo 2: key 的作用 -->
      <div class="demo-section">
        <h4>Demo 2: key 的作用（重要！）</h4>
        <p class="demo-desc">理解为什么必须使用 key，以及如何正确使用</p>
        <DemoBox 
          demoPath="directives/v-for-key"
          title="key 的作用"
          height="720px"
        />
      </div>
    </KnowledgeCard>

    <!-- key 的重要性 -->
    <KnowledgeCard title="🔑 为什么需要 key？">
      <div class="key-explanation">
        <div class="key-point">
          <span class="key-icon">1️⃣</span>
          <div>
            <strong>帮助 Vue 识别节点</strong>
            <p>key 是每个节点的唯一标识，帮助 Vue 的虚拟 DOM 算法准确地找到对应节点</p>
          </div>
        </div>
        <div class="key-point">
          <span class="key-icon">2️⃣</span>
          <div>
            <strong>提高渲染效率</strong>
            <p>有了 key，Vue 可以复用现有元素，只更新必要的部分，而不是重新渲染整个列表</p>
          </div>
        </div>
        <div class="key-point">
          <span class="key-icon">3️⃣</span>
          <div>
            <strong>避免渲染错误</strong>
            <p>没有 key 或使用 index 作为 key，在列表变化时可能导致输入框内容错位等问题</p>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ key 的最佳实践">
      <ul>
        <li><strong>推荐：</strong>使用后端返回的唯一 ID（如 item.id）</li>
        <li><strong>推荐：</strong>使用 UUID 或其他唯一标识符</li>
        <li><strong>避免：</strong>使用数组索引 index（除非列表是静态不变的）</li>
        <li><strong>避免：</strong>使用 Math.random() 或时间戳（每次渲染都会变化）</li>
      </ul>
    </TipBox>

    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li>不推荐 v-for 和 v-if 同时用在一个元素上（v-for 优先级更高）</li>
        <li>如需过滤列表，请使用<strong>计算属性</strong>先过滤数据</li>
        <li>遍历对象时，顺序是 (value, key, index)</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * v-for 列表渲染页面
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'VFor',

  mixins: [scrollTrackingMixin],

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },

  data() {
    return {
      syntaxCode: `<!-- 遍历数组 -->
<li v-for="item in items" :key="item.id">
  {{ item.name }}
</li>

<!-- 带索引 -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index }}: {{ item.name }}
</li>

<!-- 遍历对象 -->
<div v-for="(value, key, index) in object" :key="key">
  {{ index }}. {{ key }}: {{ value }}
</div>

<!-- 遍历数字 -->
<span v-for="n in 10" :key="n">{{ n }}</span>`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-for-page {
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

  .analogy-box {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-md;
    background: rgba($color-primary, 0.05);
    border-radius: $radius-md;
    margin-top: $spacing-md;

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

  .key-explanation {
    .key-point {
      display: flex;
      align-items: flex-start;
      gap: $spacing-md;
      padding: $spacing-md;
      background: $color-bg;
      border-radius: $radius-md;
      margin-bottom: $spacing-sm;

      .key-icon {
        font-size: 20px;
      }

      strong {
        display: block;
        margin-bottom: 4px;
      }

      p {
        font-size: 14px;
        color: $color-text-secondary;
        margin: 0;
      }
    }
  }
}
</style>
