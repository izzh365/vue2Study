<template>
  <div class="custom-directives-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔧 自定义指令</h1>
      <p class="subtitle">Custom Directives - 扩展 Vue 的能力</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是自定义指令？">
      <div class="concept-content">
        <div class="analogy">
          <span class="emoji">🏠</span>
          <div>
            <strong>通俗比喻：</strong>
            想象你在装修房子，Vue 内置指令（v-if、v-for）就像标准家具，
            而<strong>自定义指令</strong>就像你请木工定制的家具——可以完全按照你的需求来！
          </div>
        </div>
        <p class="definition">
          <strong>官方定义：</strong>
          自定义指令是 Vue 提供的一种底层 DOM 操作的方式。
          当你需要对普通 DOM 元素进行直接操作时，可以使用自定义指令。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 为什么需要 -->
    <KnowledgeCard title="💡 为什么需要自定义指令？">
      <ul class="reason-list">
        <li>
          <span class="icon">🎯</span>
          <div>
            <strong>复用 DOM 操作逻辑</strong>
            <p>将常用的 DOM 操作封装成指令，多处复用</p>
          </div>
        </li>
        <li>
          <span class="icon">🔌</span>
          <div>
            <strong>与第三方库集成</strong>
            <p>如初始化 jQuery 插件、ECharts 图表等</p>
          </div>
        </li>
        <li>
          <span class="icon">⚡</span>
          <div>
            <strong>性能优化</strong>
            <p>直接操作 DOM 避免不必要的组件渲染</p>
          </div>
        </li>
      </ul>
    </KnowledgeCard>

    <!-- 钩子函数 -->
    <KnowledgeCard title="🪝 指令钩子函数">
      <div class="hooks-table">
        <table>
          <thead>
            <tr>
              <th>钩子函数</th>
              <th>调用时机</th>
              <th>常见用途</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>bind</code></td>
              <td>指令第一次绑定到元素时</td>
              <td>初始化设置、绑定事件</td>
            </tr>
            <tr>
              <td><code>inserted</code></td>
              <td>元素插入父节点时</td>
              <td>需要父节点的操作、自动聚焦</td>
            </tr>
            <tr>
              <td><code>update</code></td>
              <td>VNode 更新时</td>
              <td>根据新值更新 DOM</td>
            </tr>
            <tr>
              <td><code>componentUpdated</code></td>
              <td>VNode 及子 VNode 全部更新后</td>
              <td>需要等子组件更新完成的操作</td>
            </tr>
            <tr>
              <td><code>unbind</code></td>
              <td>指令与元素解绑时</td>
              <td>清理工作：移除事件、定时器</td>
            </tr>
          </tbody>
        </table>
      </div>
    </KnowledgeCard>

    <!-- 钩子参数 -->
    <KnowledgeCard title="📝 钩子函数参数">
      <div class="code-example">
        <CodeBlock :code="hookParamsCode" language="javascript" />
      </div>
      <div class="params-table">
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>el</code></td>
              <td>HTMLElement</td>
              <td>指令绑定的 DOM 元素</td>
            </tr>
            <tr>
              <td><code>binding.value</code></td>
              <td>any</td>
              <td>指令绑定的值</td>
            </tr>
            <tr>
              <td><code>binding.arg</code></td>
              <td>string</td>
              <td>指令参数，如 v-dir:arg 中的 arg</td>
            </tr>
            <tr>
              <td><code>binding.modifiers</code></td>
              <td>object</td>
              <td>修饰符对象，如 { foo: true }</td>
            </tr>
            <tr>
              <td><code>vnode</code></td>
              <td>VNode</td>
              <td>Vue 编译的虚拟节点</td>
            </tr>
          </tbody>
        </table>
      </div>
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <KnowledgeCard title="🎯 实战示例">
      <div class="demo-grid">
        <!-- Demo 1: v-focus -->
        <div class="demo-card">
          <div class="demo-icon">🎯</div>
          <h4>v-focus 自动聚焦</h4>
          <p>元素挂载后自动获取焦点</p>
          <DemoBox
            demoPath="custom-directives/v-focus"
            title="v-focus 自动聚焦指令"
            height="350px"
          />
        </div>

        <!-- Demo 2: v-color -->
        <div class="demo-card">
          <div class="demo-icon">🎨</div>
          <h4>v-color 文字颜色</h4>
          <p>动态设置元素颜色</p>
          <DemoBox
            demoPath="custom-directives/v-color"
            title="v-color 颜色指令"
            height="400px"
          />
        </div>

        <!-- Demo 3: v-copy -->
        <div class="demo-card">
          <div class="demo-icon">📋</div>
          <h4>v-copy 一键复制</h4>
          <p>点击复制文本到剪贴板</p>
          <DemoBox
            demoPath="custom-directives/v-copy"
            title="v-copy 复制指令"
            height="500px"
          />
        </div>

        <!-- Demo 4: v-loading -->
        <div class="demo-card">
          <div class="demo-icon">⏳</div>
          <h4>v-loading 加载状态</h4>
          <p>显示加载遮罩层</p>
          <DemoBox
            demoPath="custom-directives/v-loading"
            title="v-loading 加载指令"
            height="550px"
          />
        </div>

        <!-- Demo 5: v-lazy -->
        <div class="demo-card">
          <div class="demo-icon">🖼️</div>
          <h4>v-lazy 图片懒加载</h4>
          <p>进入可视区再加载图片</p>
          <DemoBox
            demoPath="custom-directives/v-lazy"
            title="v-lazy 懒加载指令"
            height="550px"
          />
        </div>

        <!-- Demo 6: v-permission -->
        <div class="demo-card">
          <div class="demo-icon">🔐</div>
          <h4>v-permission 权限控制</h4>
          <p>根据权限显示/隐藏元素</p>
          <DemoBox
            demoPath="custom-directives/v-permission"
            title="v-permission 权限指令"
            height="600px"
          />
        </div>

        <!-- Demo 7: v-click-outside -->
        <div class="demo-card">
          <div class="demo-icon">🖱️</div>
          <h4>v-click-outside 点击外部</h4>
          <p>检测点击元素外部</p>
          <DemoBox
            demoPath="custom-directives/v-click-outside"
            title="v-click-outside 指令"
            height="550px"
          />
        </div>

        <!-- Demo 8: directive-args -->
        <div class="demo-card">
          <div class="demo-icon">📝</div>
          <h4>参数与修饰符</h4>
          <p>指令的完整语法结构</p>
          <DemoBox
            demoPath="custom-directives/directive-args"
            title="指令参数与修饰符"
            height="750px"
          />
        </div>
      </div>
    </KnowledgeCard>

    <!-- 注册方式 -->
    <KnowledgeCard title="📋 指令注册方式">
      <div class="register-types">
        <div class="register-item">
          <h4>🌍 全局注册</h4>
          <CodeBlock :code="globalRegisterCode" language="javascript" />
          <p class="tip">在 main.js 中注册，所有组件可用</p>
        </div>
        <div class="register-item">
          <h4>📦 局部注册</h4>
          <CodeBlock :code="localRegisterCode" language="javascript" />
          <p class="tip">只在当前组件内可用</p>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>unbind 清理：</strong>在 unbind 中移除事件监听、定时器等，防止内存泄漏</li>
        <li><strong>避免操作响应式数据：</strong>指令主要用于 DOM 操作，复杂逻辑建议用组件</li>
        <li><strong>el 可能未渲染：</strong>在 bind 中 el 已插入文档，但父元素可能还不存在</li>
        <li><strong>vnode.context：</strong>可通过它访问 Vue 实例，但要谨慎使用</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li><strong>简单 DOM 操作：</strong>只做简单 DOM 操作，复杂逻辑用组件</li>
        <li><strong>函数简写：</strong>只需 bind 和 update 时，可用函数简写</li>
        <li><strong>命名规范：</strong>使用 kebab-case（如 v-my-directive）</li>
        <li><strong>及时清理：</strong>unbind 中清理所有副作用</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * @description 第六章：自定义指令学习页面
 * @author Vue2 Learning Project
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'

export default {
  name: 'CustomDirectives',

  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },

  data() {
    return {
      // 钩子参数示例代码
      hookParamsCode: `Vue.directive('my-directive', {
  bind(el, binding, vnode) {
    // el: 绑定的 DOM 元素
    // binding: 包含指令信息的对象
    //   - value: 绑定值
    //   - arg: 参数
    //   - modifiers: 修饰符对象
    // vnode: Vue 编译的虚拟节点
    
    console.log('参数:', binding.arg)         // v-dir:foo 中的 "foo"
    console.log('值:', binding.value)         // v-dir="123" 中的 123
    console.log('修饰符:', binding.modifiers) // v-dir.a.b 中的 { a: true, b: true }
  }
})`,

      // 全局注册示例
      globalRegisterCode: `// main.js
import Vue from 'vue'

// 全局注册自定义指令
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})`,

      // 局部注册示例
      localRegisterCode: `// MyComponent.vue
export default {
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
}`
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-directives-page {
  padding: $spacing-lg;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: $spacing-xl;

  h1 {
    font-size: 2.5rem;
    color: $color-text;
    margin-bottom: $spacing-sm;
  }

  .subtitle {
    color: $color-text-secondary;
    font-size: $font-size-lg;
  }
}

.concept-content {
  .analogy {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-md;
    background: linear-gradient(135deg, #fff5f5 0%, #fff0f5 100%);
    border-radius: $radius-md;
    margin-bottom: $spacing-md;

    .emoji {
      font-size: 2rem;
    }
  }

  .definition {
    padding: $spacing-md;
    background: $color-code-bg;
    border-radius: $radius-md;
    border-left: 4px solid $color-primary;
  }
}

.reason-list {
  list-style: none;

  li {
    display: flex;
    gap: $spacing-md;
    padding: $spacing-md;
    background: $color-code-bg;
    border-radius: $radius-md;
    margin-bottom: $spacing-sm;

    &:last-child {
      margin-bottom: 0;
    }

    .icon {
      font-size: 1.5rem;
    }

    p {
      color: $color-text-secondary;
      margin-top: $spacing-xs;
    }
  }
}

.hooks-table,
.params-table {
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: $spacing-sm $spacing-md;
      text-align: left;
      border-bottom: 1px solid $color-border;
    }

    th {
      background: $color-code-bg;
      font-weight: 600;
      color: $color-text-secondary;
      font-size: $font-size-sm;
    }

    code {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 2px 8px;
      border-radius: 4px;
      font-family: $font-family-code;
    }
  }
}

.demo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $spacing-lg;
}

.demo-card {
  background: $color-code-bg;
  border-radius: $radius-md;
  padding: $spacing-lg;

  .demo-icon {
    font-size: 2rem;
    margin-bottom: $spacing-sm;
  }

  h4 {
    color: $color-text;
    margin-bottom: $spacing-xs;
  }

  > p {
    color: $color-text-secondary;
    font-size: $font-size-sm;
    margin-bottom: $spacing-md;
  }
}

.register-types {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-lg;

  .register-item {
    h4 {
      color: $color-primary;
      margin-bottom: $spacing-sm;
    }

    .tip {
      margin-top: $spacing-sm;
      color: $color-text-secondary;
      font-size: $font-size-sm;
    }
  }
}

.code-example {
  margin-bottom: $spacing-md;
}
</style>
