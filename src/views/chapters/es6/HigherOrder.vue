<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🚀 高阶函数</h1>
      <p class="subtitle">filter、map、reduce 是数组处理的三剑客，Vue 开发必备技能！</p>
    </div>

    <!-- 通俗比喻盒子 -->
    <div class="analogy-box">
      <div class="analogy-icon">🍎</div>
      <div class="analogy-content">
        <h4>苹果工厂流水线</h4>
        <p>想象你有一筐苹果要处理：</p>
        <div class="analogy-steps">
          <div class="step">
            <span class="step-icon">🔍</span>
            <div>
              <strong>filter（质检员）</strong>
              <span>挑出好苹果，淘汰坏的</span>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <span class="step-icon">✂️</span>
            <div>
              <strong>map（加工员）</strong>
              <span>把苹果削皮切片</span>
            </div>
          </div>
          <div class="step-arrow">→</div>
          <div class="step">
            <span class="step-icon">🧃</span>
            <div>
              <strong>reduce（榨汁机）</strong>
              <span>全部榨成一杯果汁</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 1. 概念说明 -->
    <KnowledgeCard title="📖 什么是高阶函数">
      <div class="concept-content">
        <h4>📚 官方定义</h4>
        <p><strong>高阶函数（Higher-Order Function）</strong>：满足以下任一条件的函数：</p>
        <ul>
          <li>接收一个或多个<strong>函数作为参数</strong></li>
          <li><strong>返回一个函数</strong></li>
        </ul>
        
        <div class="info-box">
          <span class="info-icon">💡</span>
          <p>JavaScript 中数组自带的 <code>filter</code>、<code>map</code>、<code>reduce</code> 就是高阶函数，因为它们都接收一个回调函数作为参数。</p>
        </div>

        <h4>🔥 核心三剑客</h4>
        <div class="method-grid">
          <div class="method-card filter">
            <div class="method-name">filter()</div>
            <div class="method-desc">过滤</div>
            <div class="method-detail">返回满足条件的元素</div>
          </div>
          <div class="method-card map">
            <div class="method-name">map()</div>
            <div class="method-desc">映射</div>
            <div class="method-detail">对每个元素进行转换</div>
          </div>
          <div class="method-card reduce">
            <div class="method-name">reduce()</div>
            <div class="method-desc">归约</div>
            <div class="method-detail">累积为单一值</div>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 2. 为什么在 Vue 中需要 -->
    <KnowledgeCard title="💡 为什么 Vue 开发需要高阶函数">
      <div class="concept-content">
        <h4>🎯 Vue 官方文档推荐</h4>
        <p>Vue 2 官方文档明确推荐使用 <code>filter</code>、<code>map</code> 等数组方法配合 computed 属性来处理列表数据：</p>
        
        <div class="code-example">
          <div class="code-title">📝 Vue 官方示例：使用 computed + filter 过滤列表</div>
          <CodeBlock :code="vueFilterExample" language="javascript" />
        </div>
        
        <h4>🌟 典型应用场景</h4>
        <ul>
          <li><strong>搜索过滤</strong>：v-for 配合 computed 过滤列表</li>
          <li><strong>数据格式化</strong>：将 API 返回的数据转换为组件需要的格式</li>
          <li><strong>购物车计算</strong>：选中商品数量、总价计算</li>
          <li><strong>权限过滤</strong>：根据用户角色过滤菜单</li>
          <li><strong>统计汇总</strong>：订单总金额、平均分等</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 3. 语法概览 -->
    <KnowledgeCard title="📝 语法格式">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <h2 class="section-title">🎯 实战演示</h2>

    <!-- Demo 1: filter 基础 -->
    <KnowledgeCard title="Demo 1：filter 过滤数组">
      <div class="demo-intro">
        <p><code>filter()</code> 遍历数组，回调返回 <code>true</code> 的元素会被保留到新数组中。</p>
        <div class="key-point">
          <span class="key-icon">🔑</span>
          <span>不修改原数组，返回新数组</span>
        </div>
      </div>
      <DemoBox 
        demoPath="es6/filter-basic"
        title="filter 基本用法"
        :height="350"
      />
    </KnowledgeCard>

    <!-- Demo 2: filter 进阶 -->
    <KnowledgeCard title="Demo 2：filter 进阶应用">
      <div class="demo-intro">
        <p>在 Vue 中，最常见的用法是配合 <code>computed</code> 实现搜索过滤功能：</p>
        <CodeBlock :code="vueFilterAdvanced" language="javascript" />
      </div>
      <DemoBox 
        demoPath="es6/filter-advanced"
        title="filter 过滤对象数组"
        :height="440"
      />
    </KnowledgeCard>

    <!-- Demo 3: map 基础 -->
    <KnowledgeCard title="Demo 3：map 映射数组">
      <div class="demo-intro">
        <p><code>map()</code> 对每个元素执行回调，返回值组成新数组。数组长度不变！</p>
        <div class="key-point">
          <span class="key-icon">🔑</span>
          <span>一对一转换，数组长度永远相等</span>
        </div>
      </div>
      <DemoBox 
        demoPath="es6/map-basic"
        title="map 基本用法"
        :height="350"
      />
    </KnowledgeCard>

    <!-- Demo 4: map 进阶 -->
    <KnowledgeCard title="Demo 4：map 进阶应用">
      <div class="demo-intro">
        <p>实际开发中，常用 map 处理 API 数据格式：</p>
        <CodeBlock :code="mapAdvancedCode" language="javascript" />
      </div>
      <DemoBox 
        demoPath="es6/map-advanced"
        title="map 数据转换"
        :height="380"
      />
    </KnowledgeCard>

    <!-- Demo 5: reduce 基础 -->
    <KnowledgeCard title="Demo 5：reduce 归约数组">
      <div class="demo-intro">
        <p><code>reduce()</code> 是最强大的数组方法，可以实现 filter 和 map 的功能！</p>
        <div class="key-point">
          <span class="key-icon">🔑</span>
          <span>初始值参数建议永远传递，避免空数组报错</span>
        </div>
      </div>
      <DemoBox 
        demoPath="es6/reduce-basic"
        title="reduce 基本用法"
        :height="420"
      />
    </KnowledgeCard>

    <!-- Demo 6: reduce 进阶 -->
    <KnowledgeCard title="Demo 6：reduce 进阶应用">
      <div class="demo-intro">
        <p>reduce 的高级用法：数组去重、分组统计、扁平化等</p>
      </div>
      <DemoBox 
        demoPath="es6/reduce-advanced"
        title="reduce 高级用法"
        :height="450"
      />
    </KnowledgeCard>

    <!-- Demo 7: 链式调用 -->
    <KnowledgeCard title="Demo 7：链式调用（重点！）">
      <div class="demo-intro">
        <p>因为 filter 和 map 都返回数组，所以可以<strong>链式调用</strong>，形成数据处理管道：</p>
        <div class="pipeline-visual">
          <span class="pipe-item data">原始数据</span>
          <span class="pipe-arrow">→</span>
          <span class="pipe-item filter">.filter()</span>
          <span class="pipe-arrow">→</span>
          <span class="pipe-item map">.map()</span>
          <span class="pipe-arrow">→</span>
          <span class="pipe-item reduce">.reduce()</span>
          <span class="pipe-arrow">→</span>
          <span class="pipe-item result">结果</span>
        </div>
      </div>
      <DemoBox 
        demoPath="es6/chain-methods"
        title="链式调用"
        :height="420"
      />
    </KnowledgeCard>

    <!-- Demo 8: 实战案例 -->
    <KnowledgeCard title="Demo 8：购物车计算实战">
      <div class="demo-intro">
        <p>综合运用高阶函数实现购物车功能，这是前端面试高频题！</p>
      </div>
      <DemoBox 
        demoPath="es6/practical-example"
        title="购物车实战"
        :height="520"
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
            <th>数组长度</th>
            <th>Vue 常用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>filter()</code></td>
            <td>过滤筛选</td>
            <td>新数组</td>
            <td>≤ 原长度</td>
            <td>搜索、权限过滤</td>
          </tr>
          <tr>
            <td><code>map()</code></td>
            <td>映射转换</td>
            <td>新数组</td>
            <td>= 原长度</td>
            <td>数据格式化</td>
          </tr>
          <tr>
            <td><code>reduce()</code></td>
            <td>归约累积</td>
            <td>任意类型</td>
            <td>变为单值</td>
            <td>求和、统计</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 在 Vue 中的最佳实践 -->
    <TipBox type="info" title="💡 Vue 2 中的最佳实践">
      <ul>
        <li>列表过滤/排序使用 <strong>computed 属性</strong>，自动缓存结果</li>
        <li>嵌套 v-for 中过滤数组可使用 <strong>methods 方法</strong></li>
        <li>避免在模板中直接调用 filter/map，影响性能</li>
        <li>使用非变异方法（filter、map）替换数组，Vue 能高效更新 DOM</li>
      </ul>
    </TipBox>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 常见错误">
      <ul>
        <li>❌ 忘记 return：回调函数必须返回值，否则 filter 全为 false，map 全为 undefined</li>
        <li>❌ reduce 不传初始值：空数组会报错 "Reduce of empty array with no initial value"</li>
        <li>❌ 误以为会修改原数组：这三个方法都返回新数组/值，原数组不变</li>
        <li>❌ 在模板中使用：<code v-pre>{{ items.filter(...) }}</code> 每次渲染都重新计算，应使用 computed</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * @description 高阶函数知识点页面（ES6 核心）
 * @author Vue2 Learning Project
 * 
 * 内容来源：Context7 Vue 2 官方文档
 * - 列表过滤使用 computed + filter
 * - 嵌套 v-for 使用 methods + filter
 * - 替换数组使用非变异方法，Vue 高效更新 DOM
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
      // Vue 官方推荐的 filter 用法
      vueFilterExample: `// Vue 2 官方文档推荐写法
// 使用 computed 属性实现列表过滤

data: {
  numbers: [1, 2, 3, 4, 5]
},

computed: {
  // 过滤出偶数
  evenNumbers() {
    return this.numbers.filter(num => num % 2 === 0)
  }
}

// 模板中使用
// <li v-for="n in evenNumbers">{{ n }}</li>`,

      // filter 进阶示例
      vueFilterAdvanced: `// Vue 中实现搜索功能
computed: {
  filteredUsers() {
    const query = this.searchQuery.toLowerCase()
    return this.users.filter(user => {
      return user.name.toLowerCase().includes(query)
    })
  }
}`,

      // map 进阶示例
      mapAdvancedCode: `// 处理 API 返回数据
const apiData = [
  { id: 1, user_name: 'Zhang San', created_at: '2024-01-01' },
  { id: 2, user_name: 'Li Si', created_at: '2024-01-02' }
]

// 转换为组件需要的格式
const formattedData = apiData.map(item => ({
  id: item.id,
  name: item.user_name,        // 字段重命名
  date: formatDate(item.created_at)  // 格式化
}))`,

      // 语法概览代码
      syntaxCode: `// ==================== filter 过滤 ====================
// 语法：array.filter(callback(element, index, array))
// 返回：满足条件的元素组成的新数组

const numbers = [1, 2, 3, 4, 5, 6]
const evenNumbers = numbers.filter(num => num % 2 === 0)
// 结果: [2, 4, 6]


// ==================== map 映射 ====================
// 语法：array.map(callback(element, index, array))
// 返回：每个元素转换后组成的新数组

const prices = [100, 200, 300]
const discounted = prices.map(price => price * 0.8)
// 结果: [80, 160, 240]


// ==================== reduce 归约 ====================
// 语法：array.reduce(callback(accumulator, current, index, array), initialValue)
// 返回：累积计算后的单一值

const scores = [85, 90, 78, 92]
const total = scores.reduce((sum, score) => sum + score, 0)
// 结果: 345

// 参数解释：
// accumulator - 累积器（上一次回调的返回值）
// current     - 当前元素
// initialValue - 初始值（强烈建议传递！）


// ==================== 链式调用（精华！）====================
const products = [
  { name: '苹果', price: 5, count: 3 },
  { name: '香蕉', price: 3, count: 5 },
  { name: '橙子', price: 8, count: 2 }
]

// 计算价格 > 4 的商品总价
const total = products
  .filter(item => item.price > 4)        // 过滤: [苹果, 橙子]
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

// 通俗比喻盒子
.analogy-box {
  display: flex;
  gap: $spacing-lg;
  padding: $spacing-lg;
  background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
  border-radius: $radius-lg;
  margin-bottom: $spacing-xl;
  border: 1px solid #ffe082;
  
  .analogy-icon {
    font-size: 48px;
  }
  
  .analogy-content {
    flex: 1;
    
    h4 {
      font-size: $font-size-lg;
      color: #f57c00;
      margin-bottom: $spacing-sm;
    }
    
    p {
      color: #e65100;
      margin-bottom: $spacing-md;
    }
  }
  
  .analogy-steps {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }
  
  .step {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    background: white;
    padding: $spacing-sm $spacing-md;
    border-radius: $radius-md;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    .step-icon {
      font-size: 24px;
    }
    
    strong {
      display: block;
      color: $color-text;
      font-size: $font-size-sm;
    }
    
    span {
      display: block;
      color: $color-text-secondary;
      font-size: $font-size-xs;
    }
  }
  
  .step-arrow {
    font-size: 20px;
    color: #ff9800;
    font-weight: bold;
  }
}

.section-title {
  font-size: $font-size-xl;
  margin: $spacing-xl 0 $spacing-lg;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $color-primary;
}

.demo-intro {
  margin-bottom: $spacing-md;
  
  p {
    color: $color-text-secondary;
    margin-bottom: $spacing-sm;
  }
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

// 信息盒子
.info-box {
  display: flex;
  align-items: flex-start;
  gap: $spacing-sm;
  padding: $spacing-md;
  background: #e3f2fd;
  border-radius: $radius-md;
  margin: $spacing-md 0;
  
  .info-icon {
    font-size: 20px;
  }
  
  p {
    margin: 0;
    color: #1565c0;
    line-height: 1.6;
  }
}

// 方法卡片网格
.method-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-md;
  margin-top: $spacing-md;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
}

.method-card {
  padding: $spacing-md;
  border-radius: $radius-md;
  text-align: center;
  
  &.filter {
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border: 1px solid #a5d6a7;
    
    .method-name { color: #2e7d32; }
  }
  
  &.map {
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
    border: 1px solid #90caf9;
    
    .method-name { color: #1565c0; }
  }
  
  &.reduce {
    background: linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%);
    border: 1px solid #f48fb1;
    
    .method-name { color: #c2185b; }
  }
  
  .method-name {
    font-family: $font-family-code;
    font-size: $font-size-lg;
    font-weight: 600;
  }
  
  .method-desc {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin: $spacing-xs 0;
  }
  
  .method-detail {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }
}

// 关键点提示
.key-point {
  display: inline-flex;
  align-items: center;
  gap: $spacing-xs;
  padding: $spacing-xs $spacing-md;
  background: #fff3e0;
  border-radius: $radius-full;
  font-size: $font-size-sm;
  color: #e65100;
  margin-top: $spacing-sm;
  
  .key-icon {
    font-size: 16px;
  }
}

// 代码示例盒子
.code-example {
  margin: $spacing-md 0;
  
  .code-title {
    font-size: $font-size-sm;
    color: $color-text-secondary;
    margin-bottom: $spacing-sm;
  }
}

// 管道可视化
.pipeline-visual {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: $spacing-xs;
  margin: $spacing-md 0;
  padding: $spacing-md;
  background: $color-bg;
  border-radius: $radius-md;
  
  .pipe-item {
    padding: $spacing-xs $spacing-md;
    border-radius: $radius-sm;
    font-family: $font-family-code;
    font-size: $font-size-sm;
    font-weight: 500;
    
    &.data { background: #e0e0e0; color: #424242; }
    &.filter { background: #c8e6c9; color: #2e7d32; }
    &.map { background: #bbdefb; color: #1565c0; }
    &.reduce { background: #f8bbd9; color: #c2185b; }
    &.result { background: #b9f6ca; color: #1b5e20; }
  }
  
  .pipe-arrow {
    color: $color-text-secondary;
    font-weight: bold;
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
