<template>
  <div class="directive-page v-bind-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔗 v-bind 属性绑定</h1>
      <p class="page-desc">动态绑定 HTML 属性，让数据驱动视图</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 v-bind？">
      <p>
        <strong>v-bind</strong> 指令用于动态绑定 HTML 元素的属性。
        想象一下，普通的 HTML 属性是"写死的"，而 v-bind 让属性值可以是"活的"——随数据变化而变化。
      </p>
      <div class="analogy-box">
        <span class="analogy-icon">🎯</span>
        <div>
          <strong>通俗比喻：</strong>就像遥控器控制电视一样，v-bind 让你用数据"遥控"HTML属性
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <div class="syntax-table">
        <div class="syntax-row">
          <div class="syntax-label">完整写法</div>
          <div class="syntax-code"><code>v-bind:属性="表达式"</code></div>
        </div>
        <div class="syntax-row highlight">
          <div class="syntax-label">简写（推荐）</div>
          <div class="syntax-code"><code>:属性="表达式"</code></div>
        </div>
      </div>
      <CodeBlock 
        :code="syntaxCode"
        language="html"
      />
    </KnowledgeCard>

    <!-- Demo 展示区 -->
    <KnowledgeCard title="🎯 实战示例">
      <!-- Demo 1: 基础用法 -->
      <div class="demo-section">
        <h4>Demo 1: 基础属性绑定</h4>
        <p class="demo-desc">绑定 href、title、disabled 等常用属性</p>
        <DemoBox 
          demoPath="directives/v-bind-basic"
          title="v-bind 基础用法"
          height="480px"
        />
      </div>

      <!-- Demo 2: class 对象语法 -->
      <div class="demo-section">
        <h4>Demo 2: 动态 class - 对象语法</h4>
        <p class="demo-desc">根据条件动态切换 CSS 类名</p>
        <DemoBox 
          demoPath="directives/v-bind-class-object"
          title="class 对象语法"
          height="580px"
        />
      </div>

      <!-- Demo 3: class 数组语法 -->
      <div class="demo-section">
        <h4>Demo 3: 动态 class - 数组语法</h4>
        <p class="demo-desc">使用数组语法绑定多个类名</p>
        <DemoBox 
          demoPath="directives/v-bind-class-array"
          title="class 数组语法"
          height="520px"
        />
      </div>

      <!-- Demo 4: style 对象语法 -->
      <div class="demo-section">
        <h4>Demo 4: 动态 style - 对象语法</h4>
        <p class="demo-desc">使用滑块和颜色选择器实时控制样式</p>
        <DemoBox 
          demoPath="directives/v-bind-style-object"
          title="style 对象语法"
          height="600px"
        />
      </div>
    </KnowledgeCard>

    <!-- 常用场景 -->
    <KnowledgeCard title="⚡ 常用场景">
      <div class="scene-grid">
        <div class="scene-item">
          <span class="scene-icon">🖼️</span>
          <div>
            <strong>图片 src</strong>
            <p>&lt;img :src="imageUrl"&gt;</p>
          </div>
        </div>
        <div class="scene-item">
          <span class="scene-icon">🔗</span>
          <div>
            <strong>链接 href</strong>
            <p>&lt;a :href="url"&gt;</p>
          </div>
        </div>
        <div class="scene-item">
          <span class="scene-icon">🎨</span>
          <div>
            <strong>动态 class</strong>
            <p>&lt;div :class="{ active: isActive }"&gt;</p>
          </div>
        </div>
        <div class="scene-item">
          <span class="scene-icon">✨</span>
          <div>
            <strong>动态 style</strong>
            <p>&lt;div :style="{ color: textColor }"&gt;</p>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li>v-bind 绑定的是<strong>表达式</strong>，而不是字符串</li>
        <li>class 和 style 绑定支持<strong>对象</strong>和<strong>数组</strong>两种语法</li>
        <li>style 的属性名使用<strong>驼峰命名</strong>（如 fontSize）或<strong>短横线加引号</strong>（如 'font-size'）</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * v-bind 属性绑定页面
 * 
 * 讲解 Vue 中最常用的属性绑定指令
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'

export default {
  name: 'VBind',

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },

  data() {
    return {
      syntaxCode: `<!-- 完整写法 -->
<a v-bind:href="url">链接</a>
<img v-bind:src="imageSrc">

<!-- 简写方式（推荐） -->
<a :href="url">链接</a>
<img :src="imageSrc">
<button :disabled="isLoading">提交</button>

<!-- 动态 class -->
<div :class="{ active: isActive, large: isLarge }"></div>
<div :class="[activeClass, errorClass]"></div>

<!-- 动态 style -->
<div :style="{ color: textColor, fontSize: size + 'px' }"></div>`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-bind-page {
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

  .syntax-table {
    margin-bottom: $spacing-md;

    .syntax-row {
      display: flex;
      align-items: center;
      padding: $spacing-sm $spacing-md;
      border-radius: $radius-sm;

      &.highlight {
        background: rgba($color-success, 0.1);
      }

      .syntax-label {
        width: 120px;
        color: $color-text-secondary;
        font-size: 14px;
      }

      .syntax-code {
        code {
          font-family: $font-family-code;
          font-size: 15px;
          color: $color-primary;
        }
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

  .scene-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: $spacing-md;

    .scene-item {
      display: flex;
      align-items: flex-start;
      gap: $spacing-sm;
      padding: $spacing-md;
      background: $color-bg;
      border-radius: $radius-md;

      .scene-icon {
        font-size: 24px;
      }

      strong {
        display: block;
        margin-bottom: 4px;
      }

      p {
        font-family: $font-family-code;
        font-size: 12px;
        color: $color-text-secondary;
        margin: 0;
      }
    }
  }
}
</style>
