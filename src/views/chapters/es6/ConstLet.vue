<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>📦 const 与 let</h1>
      <p class="subtitle">ES6 变量声明的新方式，告别 var 的各种坑</p>
    </div>

    <!-- 1. 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <h4>🎯 通俗比喻</h4>
        <p>想象你有三种不同的盒子：</p>
        <ul>
          <li><strong>var 盒子</strong>：像一个到处乱跑的盒子，你放在房间里，它可能跑到客厅去</li>
          <li><strong>let 盒子</strong>：乖乖待在你放它的地方，不会乱跑</li>
          <li><strong>const 盒子</strong>：不仅不乱跑，而且锁死了，里面的东西不能换</li>
        </ul>
        
        <h4>📚 官方定义</h4>
        <ul>
          <li><code>let</code>：声明块级作用域的变量，可以重新赋值</li>
          <li><code>const</code>：声明块级作用域的常量，不可重新赋值</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 2. 为什么需要 -->
    <KnowledgeCard title="💡 为什么需要 let 和 const">
      <div class="why-content">
        <h4>😱 var 的问题</h4>
        <ul>
          <li><strong>变量提升</strong>：变量可以在声明前使用，容易造成困惑</li>
          <li><strong>没有块级作用域</strong>：在 if/for 中声明的变量会泄漏到外部</li>
          <li><strong>可以重复声明</strong>：容易不小心覆盖已有变量</li>
        </ul>
        
        <h4>✅ let/const 解决的问题</h4>
        <ul>
          <li>有块级作用域，变量不会泄漏</li>
          <li>不能重复声明，避免意外覆盖</li>
          <li>暂时性死区（TDZ），必须先声明后使用</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 3. 语法对比 -->
    <KnowledgeCard title="📝 语法对比">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <h2 class="section-title">🎯 实战演示</h2>

    <!-- Demo 1: var 变量提升 -->
    <KnowledgeCard title="Demo 1：var 变量提升问题">
      <p class="demo-desc">var 声明的变量会被提升到作用域顶部，可以在声明前访问（值为 undefined）</p>
      <DemoBox 
        demoPath="es6/var-hoisting"
        title="var 变量提升"
        :height="280"
      />
    </KnowledgeCard>

    <!-- Demo 2: let 块级作用域 -->
    <KnowledgeCard title="Demo 2：let 块级作用域">
      <p class="demo-desc">let 声明的变量只在当前代码块 {} 内有效</p>
      <DemoBox 
        demoPath="es6/let-block-scope"
        title="let 块级作用域"
        :height="280"
      />
    </KnowledgeCard>

    <!-- Demo 3: let 在循环中 -->
    <KnowledgeCard title="Demo 3：let 在 for 循环中（经典面试题）">
      <p class="demo-desc">这是一个经典的闭包问题，let 完美解决了 var 在循环中的问题</p>
      <DemoBox 
        demoPath="es6/let-loop"
        title="let 解决循环问题"
        :height="320"
      />
    </KnowledgeCard>

    <!-- Demo 4: const 基本用法 -->
    <KnowledgeCard title="Demo 4：const 常量声明">
      <p class="demo-desc">const 声明的常量必须初始化，且不能重新赋值</p>
      <DemoBox 
        demoPath="es6/const-basic"
        title="const 基本用法"
        :height="280"
      />
    </KnowledgeCard>

    <!-- Demo 5: const 引用类型 -->
    <KnowledgeCard title="Demo 5：const 与引用类型">
      <p class="demo-desc">const 锁定的是变量的引用地址，对象的属性仍可修改</p>
      <DemoBox 
        demoPath="es6/const-reference"
        title="const 引用类型"
        :height="300"
      />
    </KnowledgeCard>

    <!-- Demo 6: 暂时性死区 -->
    <KnowledgeCard title="Demo 6：暂时性死区（TDZ）">
      <p class="demo-desc">let/const 存在暂时性死区，在声明前访问会报错</p>
      <DemoBox 
        demoPath="es6/tdz"
        title="暂时性死区"
        :height="280"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 使用建议">
      <ul>
        <li><strong>优先使用 const</strong>：如果变量不需要重新赋值，用 const</li>
        <li><strong>需要改变时用 let</strong>：循环变量、累加器等需要改变的用 let</li>
        <li><strong>不要再用 var</strong>：ES6 项目中应该完全避免使用 var</li>
      </ul>
    </TipBox>

    <!-- 对比表格 -->
    <KnowledgeCard title="📊 var / let / const 对比">
      <table class="compare-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>var</th>
            <th>let</th>
            <th>const</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>作用域</td>
            <td>函数作用域</td>
            <td>块级作用域</td>
            <td>块级作用域</td>
          </tr>
          <tr>
            <td>变量提升</td>
            <td>✅ 有</td>
            <td>❌ 无（TDZ）</td>
            <td>❌ 无（TDZ）</td>
          </tr>
          <tr>
            <td>重复声明</td>
            <td>✅ 可以</td>
            <td>❌ 不可以</td>
            <td>❌ 不可以</td>
          </tr>
          <tr>
            <td>重新赋值</td>
            <td>✅ 可以</td>
            <td>✅ 可以</td>
            <td>❌ 不可以</td>
          </tr>
          <tr>
            <td>必须初始化</td>
            <td>❌ 不必须</td>
            <td>❌ 不必须</td>
            <td>✅ 必须</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>
  </div>
</template>

<script>
/**
 * @description const 与 let 知识点页面
 * @author Vue2 Learning Project
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'ConstLet',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      // 语法对比代码
      syntaxCode: `// ==================== var（不推荐）====================
var name = '张三'
var name = '李四'  // 可以重复声明
name = '王五'      // 可以重新赋值

// ==================== let（推荐用于可变变量）====================
let age = 18
// let age = 20    // ❌ 报错：不能重复声明
age = 20           // ✅ 可以重新赋值

// ==================== const（推荐用于常量）====================
const PI = 3.14159
// PI = 3.14       // ❌ 报错：不能重新赋值
// const EMPTY     // ❌ 报错：必须初始化

// const 对象的属性可以修改
const user = { name: '张三' }
user.name = '李四'  // ✅ 可以修改属性
// user = {}        // ❌ 不能重新赋值`
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: $spacing-xl;
  
  h1 {
    font-size: $font-size-3xl;
    margin-bottom: $spacing-sm;
  }
  
  .subtitle {
    color: $color-text-secondary;
    font-size: $font-size-lg;
  }
}

.section-title {
  font-size: $font-size-xl;
  margin: $spacing-xl 0 $spacing-lg;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $color-primary;
}

.demo-desc {
  color: $color-text-secondary;
  margin-bottom: $spacing-md;
}

.concept-content,
.why-content {
  h4 {
    color: $color-primary;
    margin: $spacing-md 0 $spacing-sm;
    
    &:first-child {
      margin-top: 0;
    }
  }
  
  ul {
    padding-left: $spacing-lg;
    
    li {
      margin-bottom: $spacing-xs;
      line-height: 1.8;
    }
  }
  
  code {
    background: $color-code-bg;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: $font-family-code;
    color: $color-primary;
  }
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: $spacing-sm $spacing-md;
    text-align: center;
    border: 1px solid $color-border;
  }
  
  th {
    background: $color-bg;
    font-weight: 600;
  }
  
  td:first-child {
    text-align: left;
    font-weight: 500;
  }
}
</style>
