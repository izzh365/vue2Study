<template>
  <div class="directive-page v-on-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🖱️ v-on 事件绑定</h1>
      <p class="page-desc">监听 DOM 事件，实现用户交互</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 v-on？">
      <p>
        <strong>v-on</strong> 指令用于监听 DOM 事件。
        用户点击按钮、输入文字、移动鼠标等操作都会触发事件，v-on 让我们可以响应这些事件。
      </p>
      <div class="analogy-box">
        <span class="analogy-icon">📱</span>
        <div>
          <strong>通俗比喻：</strong>就像手机的触屏一样，你点击哪里，手机就响应哪里。v-on 就是这个"触屏"机制
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <div class="syntax-table">
        <div class="syntax-row">
          <div class="syntax-label">完整写法</div>
          <div class="syntax-code"><code>v-on:事件="表达式"</code></div>
        </div>
        <div class="syntax-row highlight">
          <div class="syntax-label">简写（推荐）</div>
          <div class="syntax-code"><code>@事件="表达式"</code></div>
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
        <h4>Demo 1: 事件绑定基础</h4>
        <p class="demo-desc">基本点击事件和方法调用</p>
        <DemoBox 
          demoPath="directives/v-on-basic"
          title="v-on 基础用法"
          height="580px"
        />
      </div>

      <!-- Demo 2: 传递参数 -->
      <div class="demo-section">
        <h4>Demo 2: 传递参数</h4>
        <p class="demo-desc">向方法传递自定义参数</p>
        <DemoBox 
          demoPath="directives/v-on-params"
          title="v-on 传递参数"
          height="650px"
        />
      </div>

      <!-- Demo 3: $event 对象 -->
      <div class="demo-section">
        <h4>Demo 3: $event 事件对象</h4>
        <p class="demo-desc">获取原生 DOM 事件对象，追踪鼠标位置</p>
        <DemoBox 
          demoPath="directives/v-on-event"
          title="$event 事件对象"
          height="720px"
        />
      </div>

      <!-- Demo 4: 事件修饰符 -->
      <div class="demo-section">
        <h4>Demo 4: 事件修饰符</h4>
        <p class="demo-desc">.stop、.prevent、.once、按键修饰符等</p>
        <DemoBox 
          demoPath="directives/v-on-modifiers"
          title="事件修饰符"
          height="800px"
        />
      </div>
    </KnowledgeCard>

    <!-- 修饰符总结 -->
    <KnowledgeCard title="🎛️ 常用修饰符">
      <div class="modifier-grid">
        <div class="modifier-category">
          <h5>事件修饰符</h5>
          <div class="modifier-list">
            <span class="modifier-badge">.stop</span>
            <span class="modifier-desc">阻止事件冒泡</span>
          </div>
          <div class="modifier-list">
            <span class="modifier-badge">.prevent</span>
            <span class="modifier-desc">阻止默认行为</span>
          </div>
          <div class="modifier-list">
            <span class="modifier-badge">.once</span>
            <span class="modifier-desc">只触发一次</span>
          </div>
          <div class="modifier-list">
            <span class="modifier-badge">.self</span>
            <span class="modifier-desc">只当 target 是自身时触发</span>
          </div>
        </div>
        <div class="modifier-category">
          <h5>按键修饰符</h5>
          <div class="modifier-list">
            <span class="modifier-badge">.enter</span>
            <span class="modifier-badge">.tab</span>
            <span class="modifier-badge">.esc</span>
          </div>
          <div class="modifier-list">
            <span class="modifier-badge">.space</span>
            <span class="modifier-badge">.delete</span>
          </div>
          <div class="modifier-list">
            <span class="modifier-badge">.up</span>
            <span class="modifier-badge">.down</span>
            <span class="modifier-badge">.left</span>
            <span class="modifier-badge">.right</span>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="info" title="💡 使用技巧">
      <ul>
        <li>方法名后<strong>不加括号</strong>：事件对象自动作为第一个参数传入</li>
        <li>方法名后<strong>加括号</strong>：需要手动传递 <code>$event</code></li>
        <li>修饰符可以<strong>链式调用</strong>：<code>@click.stop.prevent</code></li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * v-on 事件绑定页面
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'

export default {
  name: 'VOn',

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },

  data() {
    return {
      syntaxCode: `<!-- 完整写法 -->
<button v-on:click="handleClick">点击</button>

<!-- 简写方式（推荐） -->
<button @click="handleClick">点击</button>

<!-- 内联表达式 -->
<button @click="count++">+1</button>

<!-- 传递参数 -->
<button @click="greet('Hello')">问候</button>

<!-- 传递事件对象 -->
<button @click="handleClick($event)">带事件</button>

<!-- 使用修饰符 -->
<form @submit.prevent="onSubmit">
<a @click.stop="onClick"></a>
<input @keyup.enter="onEnter">`
    }
  }
}
</script>

<style lang="scss" scoped>
.v-on-page {
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

  .modifier-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: $spacing-lg;

    .modifier-category {
      h5 {
        font-size: 14px;
        color: $color-text-secondary;
        margin-bottom: $spacing-sm;
      }

      .modifier-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: $spacing-xs;
        margin-bottom: $spacing-sm;

        .modifier-badge {
          display: inline-block;
          padding: 4px 10px;
          background: $color-primary;
          color: white;
          border-radius: 20px;
          font-size: 12px;
          font-family: $font-family-code;
        }

        .modifier-desc {
          font-size: 13px;
          color: $color-text-secondary;
        }
      }
    }
  }
}
</style>
