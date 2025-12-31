<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🚀 高阶函数</h1>
      <p class="subtitle">filter、map、reduce 是数组处理的三剑客</p>
    </div>

    <!-- 1. 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <h4>🎯 通俗比喻</h4>
        <p>想象你有一筐苹果要处理：</p>
        <ul>
          <li><strong>filter（过滤）</strong>：挑出红苹果，扔掉坏的</li>
          <li><strong>map（映射）</strong>：把每个苹果削皮，变成苹果片</li>
          <li><strong>reduce（归约）</strong>：把所有苹果片放进榨汁机，变成一杯果汁</li>
        </ul>
        
        <h4>📚 官方定义</h4>
        <p><strong>高阶函数</strong>：接收函数作为参数，或返回一个函数的函数</p>
        
        <h4>🔥 核心三剑客</h4>
        <ul>
          <li><code>filter()</code>：过滤数组，返回满足条件的元素</li>
          <li><code>map()</code>：映射数组，对每个元素进行转换</li>
          <li><code>reduce()</code>：归约数组，将数组累积为单一值</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 2. 语法概览 -->
    <KnowledgeCard title="📝 语法概览">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <h2 class="section-title">🎯 实战演示</h2>

    <!-- Demo 1: filter 基础 -->
    <KnowledgeCard title="Demo 1：filter 过滤数组">
      <p class="demo-desc">filter 返回满足条件的元素组成的新数组，不修改原数组</p>
      <DemoBox 
        demoPath="es6/filter-basic"
        title="filter 基本用法"
        :height="320"
      />
    </KnowledgeCard>

    <!-- Demo 2: filter 进阶 -->
    <KnowledgeCard title="Demo 2：filter 进阶应用">
      <p class="demo-desc">过滤对象数组，实现搜索、筛选功能</p>
      <DemoBox 
        demoPath="es6/filter-advanced"
        title="filter 过滤对象数组"
        :height="360"
      />
    </KnowledgeCard>

    <!-- Demo 3: map 基础 -->
    <KnowledgeCard title="Demo 3：map 映射数组">
      <p class="demo-desc">map 对每个元素进行转换，返回新数组</p>
      <DemoBox 
        demoPath="es6/map-basic"
        title="map 基本用法"
        :height="320"
      />
    </KnowledgeCard>

    <!-- Demo 4: map 进阶 -->
    <KnowledgeCard title="Demo 4：map 进阶应用">
      <p class="demo-desc">提取对象属性、数据格式转换</p>
      <DemoBox 
        demoPath="es6/map-advanced"
        title="map 数据转换"
        :height="360"
      />
    </KnowledgeCard>

    <!-- Demo 5: reduce 基础 -->
    <KnowledgeCard title="Demo 5：reduce 归约数组">
      <p class="demo-desc">reduce 将数组累积为单一值，如求和、求积</p>
      <DemoBox 
        demoPath="es6/reduce-basic"
        title="reduce 基本用法"
        :height="340"
      />
    </KnowledgeCard>

    <!-- Demo 6: reduce 进阶 -->
    <KnowledgeCard title="Demo 6：reduce 进阶应用">
      <p class="demo-desc">数组去重、分组、扁平化等高级用法</p>
      <DemoBox 
        demoPath="es6/reduce-advanced"
        title="reduce 高级用法"
        :height="380"
      />
    </KnowledgeCard>

    <!-- Demo 7: 链式调用 -->
    <KnowledgeCard title="Demo 7：链式调用（重点！）">
      <p class="demo-desc">filter + map + reduce 组合使用，优雅处理复杂数据</p>
      <DemoBox 
        demoPath="es6/chain-methods"
        title="链式调用"
        :height="400"
      />
    </KnowledgeCard>

    <!-- Demo 8: 实战案例 -->
    <KnowledgeCard title="Demo 8：购物车计算实战">
      <p class="demo-desc">综合运用三个方法实现购物车价格计算</p>
      <DemoBox 
        demoPath="es6/practical-example"
        title="购物车实战"
        :height="420"
      />
    </KnowledgeCard>

    <!-- 对比表格 -->
    <KnowledgeCard title="📊 三大高阶函数对比">
      <table class="compare-table">
        <thead>
          <tr>
            <th>方法</th>
            <th>作用</th>
            <th>返回值</th>
            <th>常用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>filter()</code></td>
            <td>过滤筛选</td>
            <td>新数组（元素可能减少）</td>
            <td>搜索、筛选条件</td>
          </tr>
          <tr>
            <td><code>map()</code></td>
            <td>映射转换</td>
            <td>新数组（长度不变）</td>
            <td>数据格式化、提取字段</td>
          </tr>
          <tr>
            <td><code>reduce()</code></td>
            <td>归约累积</td>
            <td>单一值（任意类型）</td>
            <td>求和、统计、去重</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li>这三个方法都<strong>不会修改原数组</strong>，返回新数组/值</li>
        <li>回调函数中 return 是必须的，否则结果可能不符合预期</li>
        <li>reduce 的第二个参数（初始值）建议总是传递</li>
        <li>空数组调用 reduce 且没有初始值会报错</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * @description 高阶函数知识点页面
 * @author Vue2 Learning Project
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'HigherOrder',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      syntaxCode: `// ==================== filter 过滤 ====================
const numbers = [1, 2, 3, 4, 5, 6]

// 返回 true 的元素会被保留
const evenNumbers = numbers.filter(num => num % 2 === 0)
// 结果: [2, 4, 6]


// ==================== map 映射 ====================
const prices = [100, 200, 300]

// 每个元素都会被转换
const discounted = prices.map(price => price * 0.8)
// 结果: [80, 160, 240]


// ==================== reduce 归约 ====================
const scores = [85, 90, 78, 92]

// 累积计算
const total = scores.reduce((sum, score) => sum + score, 0)
// 结果: 345

// reduce 参数说明:
// reduce((累积值, 当前元素, 当前索引, 原数组) => 新累积值, 初始值)


// ==================== 链式调用 ====================
const products = [
  { name: '苹果', price: 5, count: 3 },
  { name: '香蕉', price: 3, count: 5 },
  { name: '橙子', price: 8, count: 2 }
]

// 计算价格 > 4 的商品总价
const total = products
  .filter(item => item.price > 4)        // 过滤: 苹果、橙子
  .map(item => item.price * item.count)  // 映射: [15, 16]
  .reduce((sum, n) => sum + n, 0)        // 归约: 31`
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

.concept-content {
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
    text-align: left;
    border: 1px solid $color-border;
  }
  
  th {
    background: $color-bg;
    font-weight: 600;
  }
  
  code {
    background: $color-code-bg;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: $font-family-code;
    color: $color-primary;
  }
}
</style>
