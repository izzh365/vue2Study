<template>
  <div class="knowledge-page computed-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🧮 computed 计算属性</h1>
      <p class="page-desc">基于现有数据自动计算新数据，自带缓存机制</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是计算属性？">
      <p>
        <strong>computed</strong>（计算属性）是 Vue 中用于声明"派生数据"的方式。
        它会根据依赖的数据自动计算并缓存结果，只有依赖变化时才重新计算。
      </p>
      <div class="analogy-box">
        <span class="analogy-icon">📊</span>
        <div>
          <strong>通俗比喻：</strong>就像 Excel 的公式单元格，C1 = A1 + B1。
          只要 A1 或 B1 变化，C1 自动更新。不变就直接用缓存结果。
        </div>
      </div>
    </KnowledgeCard>

    <!-- computed vs methods -->
    <KnowledgeCard title="💡 computed vs methods 的区别">
      <div class="compare-table">
        <div class="compare-header">
          <div class="compare-col">对比项</div>
          <div class="compare-col highlight">computed 计算属性</div>
          <div class="compare-col">methods 方法</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">缓存</div>
          <div class="compare-col highlight">✅ 有缓存</div>
          <div class="compare-col">❌ 无缓存</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">调用方式</div>
          <div class="compare-col highlight">当属性使用（不加括号）</div>
          <div class="compare-col">当函数调用（加括号）</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">重新计算</div>
          <div class="compare-col highlight">依赖变化时</div>
          <div class="compare-col">每次渲染时</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">性能</div>
          <div class="compare-col highlight">更好</div>
          <div class="compare-col">一般</div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <CodeBlock 
        :code="syntaxCode"
        language="javascript"
      />
      <TipBox type="info" title="使用方式">
        <p>计算属性像普通属性一样在模板中使用：<code v-pre>{{ fullName }}</code>，不需要加括号！</p>
      </TipBox>
    </KnowledgeCard>

    <!-- Demo 展示区 -->
    <KnowledgeCard title="🎯 实战示例">
      <!-- Demo 1: 基础用法 -->
      <div class="demo-section">
        <h4>Demo 1: 计算属性基础</h4>
        <p class="demo-desc">最常见的场景：拼接全名</p>
        <DemoBox 
          demoPath="computed-watch/computed-basic"
          title="computed 基本用法"
          height="520px"
        />
      </div>

      <!-- Demo 2: 缓存特性 -->
      <div class="demo-section">
        <h4>Demo 2: 缓存特性对比</h4>
        <p class="demo-desc">对比 computed 和 methods 的执行次数差异</p>
        <DemoBox 
          demoPath="computed-watch/computed-cache"
          title="computed 缓存机制"
          height="680px"
        />
      </div>

      <!-- Demo 3: getter/setter -->
      <div class="demo-section">
        <h4>Demo 3: getter 和 setter</h4>
        <p class="demo-desc">计算属性也可以双向绑定，通过 set 实现</p>
        <DemoBox 
          demoPath="computed-watch/computed-setter"
          title="computed getter/setter"
          height="550px"
        />
      </div>

      <!-- Demo 4: 过滤列表 -->
      <div class="demo-section">
        <h4>Demo 4: 过滤列表</h4>
        <p class="demo-desc">实现搜索筛选功能</p>
        <DemoBox 
          demoPath="computed-watch/computed-filter"
          title="computed 过滤列表"
          height="580px"
        />
      </div>

      <!-- Demo 5: 排序列表 -->
      <div class="demo-section">
        <h4>Demo 5: 排序列表</h4>
        <p class="demo-desc">多种排序方式切换</p>
        <DemoBox 
          demoPath="computed-watch/computed-sort"
          title="computed 排序列表"
          height="580px"
        />
      </div>

      <!-- Demo 6: 动态样式 -->
      <div class="demo-section">
        <h4>Demo 6: 计算动态样式</h4>
        <p class="demo-desc">多个数据组合成复杂样式对象</p>
        <DemoBox 
          demoPath="computed-watch/computed-style"
          title="computed 动态样式"
          height="750px"
        />
      </div>
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <KnowledgeCard title="✨ 最佳实践">
      <div class="practice-list">
        <div class="practice-item good">
          <span class="practice-icon">✅</span>
          <div>
            <strong>用于模板中需要复杂计算的场景</strong>
            <p>避免在模板中写复杂表达式，用 computed 封装</p>
          </div>
        </div>
        <div class="practice-item good">
          <span class="practice-icon">✅</span>
          <div>
            <strong>列表过滤、排序优先使用 computed</strong>
            <p>比在 v-for 中调用 methods 性能更好</p>
          </div>
        </div>
        <div class="practice-item good">
          <span class="practice-icon">✅</span>
          <div>
            <strong>computed 只做计算，不做副作用操作</strong>
            <p>如需异步请求或修改其他数据，请用 watch</p>
          </div>
        </div>
        <div class="practice-item bad">
          <span class="practice-icon">❌</span>
          <div>
            <strong>不要在 computed 中修改依赖的数据</strong>
            <p>可能导致无限循环</p>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 常见错误 -->
    <TipBox type="error" title="❌ 常见错误">
      <div class="error-item">
        <p><strong>错误：</strong>在模板中调用计算属性时加括号</p>
        <code class="error-code" v-pre>{{ fullName() }}</code>
        <p><strong>正确：</strong>像属性一样使用，不加括号</p>
        <code class="correct-code" v-pre>{{ fullName }}</code>
      </div>
    </TipBox>
  </div>
</template>

<script>
/**
 * Computed 计算属性页面
 * 
 * @description 详细讲解 Vue 计算属性的概念、用法和最佳实践
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'ComputedPage',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      // 语法示例代码
      syntaxCode: `export default {
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }
  },
  
  computed: {
    // 简写：只有 getter
    fullName() {
      return this.firstName + this.lastName
    },
    
    // 完整写法：getter + setter
    fullNameWithSetter: {
      get() {
        return this.firstName + this.lastName
      },
      set(newValue) {
        // 拆分全名
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[1] || ''
      }
    }
  }
}`
    }
  }
}
</script>

<style lang="scss" scoped>
.computed-page {
  .page-header {
    margin-bottom: $spacing-xl;
    
    h1 {
      font-size: $font-size-3xl;
      color: $color-text;
      margin-bottom: $spacing-sm;
    }
    
    .page-desc {
      font-size: $font-size-lg;
      color: $color-text-secondary;
    }
  }
  
  .analogy-box {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-md;
    background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
    border-radius: $radius-md;
    margin-top: $spacing-md;
    
    .analogy-icon {
      font-size: 28px;
    }
  }
  
  // 对比表格
  .compare-table {
    border: 1px solid $color-border;
    border-radius: $radius-md;
    overflow: hidden;
    
    .compare-header,
    .compare-row {
      display: grid;
      grid-template-columns: 1fr 1.5fr 1.5fr;
      
      .compare-col {
        padding: $spacing-md;
        border-right: 1px solid $color-border;
        
        &:last-child {
          border-right: none;
        }
        
        &.highlight {
          background: #e8f5e9;
        }
      }
    }
    
    .compare-header {
      background: $color-code-bg;
      font-weight: 600;
      
      .compare-col.highlight {
        background: #c8e6c9;
      }
    }
    
    .compare-row {
      border-top: 1px solid $color-border;
    }
  }
  
  .demo-section {
    margin-bottom: $spacing-xl;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      font-size: $font-size-lg;
      color: $color-text;
      margin-bottom: $spacing-sm;
    }
    
    .demo-desc {
      color: $color-text-secondary;
      margin-bottom: $spacing-md;
    }
  }
  
  // 最佳实践列表
  .practice-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    
    .practice-item {
      display: flex;
      align-items: flex-start;
      gap: $spacing-md;
      padding: $spacing-md;
      border-radius: $radius-md;
      
      &.good {
        background: #e8f5e9;
      }
      
      &.bad {
        background: #ffebee;
      }
      
      .practice-icon {
        font-size: 20px;
        flex-shrink: 0;
      }
      
      strong {
        display: block;
        margin-bottom: 4px;
        color: $color-text;
      }
      
      p {
        font-size: $font-size-sm;
        color: $color-text-secondary;
        margin: 0;
      }
    }
  }
  
  // 错误示例
  .error-item {
    .error-code {
      display: block;
      padding: $spacing-sm $spacing-md;
      background: #ffcdd2;
      border-radius: $radius-sm;
      margin: $spacing-sm 0;
      color: #c62828;
    }
    
    .correct-code {
      display: block;
      padding: $spacing-sm $spacing-md;
      background: #c8e6c9;
      border-radius: $radius-sm;
      margin: $spacing-sm 0;
      color: #2e7d32;
    }
  }
}
</style>
