<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>➡️ 箭头函数</h1>
      <p class="subtitle">更简洁的函数写法，更重要的是解决了 this 问题</p>
    </div>

    <!-- 1. 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <h4>🎯 通俗比喻</h4>
        <p>箭头函数就像简化的说话方式：</p>
        <ul>
          <li>传统：<code>function(x) { return x * 2 }</code></li>
          <li>箭头：<code>x => x * 2</code></li>
        </ul>
        <p>像发短信时用缩写一样，意思不变但更简短！</p>
        
        <h4>📚 箭头函数特点</h4>
        <ul>
          <li><strong>语法更简洁</strong>：省略 function 关键字</li>
          <li><strong>没有自己的 this</strong>：继承外层作用域的 this（最重要！）</li>
          <li><strong>不能作为构造函数</strong>：不能用 new 调用</li>
          <li><strong>没有 arguments</strong>：使用 rest 参数代替</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 2. 语法说明 -->
    <KnowledgeCard title="📝 语法简写规则">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <h2 class="section-title">🎯 实战演示</h2>

    <!-- Demo 1: 基本语法 -->
    <KnowledgeCard title="Demo 1：箭头函数基本语法">
      <p class="demo-desc">了解箭头函数的各种写法</p>
      <DemoBox 
        demoPath="es6/arrow-syntax"
        title="基本语法"
        :height="320"
      />
    </KnowledgeCard>

    <!-- Demo 2: 参数简写 -->
    <KnowledgeCard title="Demo 2：参数简写规则">
      <p class="demo-desc">单参数可省略括号，无参数或多参数需要括号</p>
      <DemoBox 
        demoPath="es6/arrow-params"
        title="参数简写"
        :height="300"
      />
    </KnowledgeCard>

    <!-- Demo 3: 返回值简写 -->
    <KnowledgeCard title="Demo 3：返回值简写规则">
      <p class="demo-desc">单表达式可省略 {} 和 return，返回对象需要加括号</p>
      <DemoBox 
        demoPath="es6/arrow-return"
        title="返回值简写"
        :height="320"
      />
    </KnowledgeCard>

    <!-- Demo 4: this 指向 -->
    <KnowledgeCard title="Demo 4：this 指向问题（核心！）">
      <p class="demo-desc">箭头函数没有自己的 this，继承外层作用域</p>
      <DemoBox 
        demoPath="es6/arrow-this"
        title="this 指向"
        :height="400"
      />
    </KnowledgeCard>

    <!-- Demo 5: Vue 中应用 -->
    <KnowledgeCard title="Demo 5：在 Vue 中的应用">
      <p class="demo-desc">setTimeout、数组方法等场景中使用箭头函数</p>
      <DemoBox 
        demoPath="es6/arrow-vue"
        title="Vue 中应用"
        :height="380"
      />
    </KnowledgeCard>

    <!-- Demo 6: 注意事项 -->
    <KnowledgeCard title="Demo 6：使用注意事项">
      <p class="demo-desc">哪些场景不适合使用箭头函数</p>
      <DemoBox 
        demoPath="es6/arrow-caution"
        title="注意事项"
        :height="360"
      />
    </KnowledgeCard>

    <!-- this 对比 -->
    <KnowledgeCard title="📊 this 指向对比">
      <table class="compare-table">
        <thead>
          <tr>
            <th>场景</th>
            <th>普通函数 this</th>
            <th>箭头函数 this</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>对象方法</td>
            <td>调用该方法的对象</td>
            <td>外层作用域（通常是 window）</td>
          </tr>
          <tr>
            <td>setTimeout 回调</td>
            <td>window</td>
            <td>外层作用域</td>
          </tr>
          <tr>
            <td>事件监听器</td>
            <td>触发事件的元素</td>
            <td>外层作用域</td>
          </tr>
          <tr>
            <td>Vue methods</td>
            <td>Vue 实例</td>
            <td>❌ 不要使用箭头函数</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="error" title="❌ 不要在这些场景使用箭头函数">
      <ul>
        <li><strong>Vue 的 methods</strong>：需要 this 指向 Vue 实例</li>
        <li><strong>Vue 的 computed</strong>：同上</li>
        <li><strong>Vue 的生命周期钩子</strong>：同上</li>
        <li><strong>对象的方法</strong>：需要 this 指向对象本身</li>
        <li><strong>构造函数</strong>：箭头函数不能用 new</li>
      </ul>
    </TipBox>

    <TipBox type="success" title="✅ 推荐使用箭头函数的场景">
      <ul>
        <li><strong>回调函数</strong>：setTimeout、setInterval、Promise.then</li>
        <li><strong>数组方法</strong>：map、filter、reduce、forEach</li>
        <li><strong>Vue methods 中的回调</strong>：在方法内部使用的回调</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * @description 箭头函数知识点页面
 * @author Vue2 Learning Project
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'ArrowFunction',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      syntaxCode: `// ==================== 基本语法 ====================
// 传统写法
const add = function(a, b) {
  return a + b
}

// 箭头函数
const add = (a, b) => {
  return a + b
}


// ==================== 简写规则 ====================

// 1️⃣ 单参数：可以省略括号
const double = x => x * 2
// 等同于: const double = (x) => { return x * 2 }

// 2️⃣ 无参数或多参数：必须加括号
const sayHi = () => console.log('Hi')
const add = (a, b) => a + b

// 3️⃣ 单表达式：可以省略 {} 和 return
const square = x => x * x
// 等同于: const square = x => { return x * x }

// 4️⃣ 返回对象：必须用括号包裹
const getUser = () => ({ name: '张三', age: 18 })
// 如果不加括号，{} 会被当作函数体


// ==================== this 继承 ====================
const obj = {
  name: 'Vue',
  
  // ❌ 普通函数：setTimeout 中 this 是 window
  sayLater1() {
    setTimeout(function() {
      console.log(this.name)  // undefined
    }, 1000)
  },
  
  // ✅ 箭头函数：继承外层的 this
  sayLater2() {
    setTimeout(() => {
      console.log(this.name)  // 'Vue'
    }, 1000)
  }
}`
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
}
</style>
