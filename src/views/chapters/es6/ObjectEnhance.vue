<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>✨ 对象增强写法</h1>
      <p class="subtitle">ES6 让对象字面量写法更加简洁优雅</p>
    </div>

    <!-- 1. 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <h4>🎯 通俗比喻</h4>
        <p>就像说话时的省略一样：</p>
        <ul>
          <li>完整说法："我的名字是张三" → 简洁说法："我叫张三"</li>
          <li>ES5 写法：<code>{ name: name }</code> → ES6 简写：<code>{ name }</code></li>
        </ul>
        
        <h4>📚 三种增强写法</h4>
        <ul>
          <li><strong>属性简写</strong>：变量名和属性名相同时，可以只写一个</li>
          <li><strong>方法简写</strong>：省略 function 关键字</li>
          <li><strong>计算属性名</strong>：用 [] 包裹表达式作为属性名</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 2. 语法对比 -->
    <KnowledgeCard title="📝 语法对比">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <h2 class="section-title">🎯 实战演示</h2>

    <!-- Demo 1: 属性简写 -->
    <KnowledgeCard title="Demo 1：属性简写">
      <p class="demo-desc">当变量名和属性名相同时，可以省略冒号和值</p>
      <DemoBox 
        demoPath="es6/property-shorthand"
        title="属性简写"
        :height="300"
      />
    </KnowledgeCard>

    <!-- Demo 2: 方法简写 -->
    <KnowledgeCard title="Demo 2：方法简写">
      <p class="demo-desc">对象中的方法可以省略 function 关键字</p>
      <DemoBox 
        demoPath="es6/method-shorthand"
        title="方法简写"
        :height="300"
      />
    </KnowledgeCard>

    <!-- Demo 3: 计算属性名 -->
    <KnowledgeCard title="Demo 3：计算属性名">
      <p class="demo-desc">使用 [] 可以动态设置属性名</p>
      <DemoBox 
        demoPath="es6/computed-property"
        title="计算属性名"
        :height="320"
      />
    </KnowledgeCard>

    <!-- Demo 4: 对象解构 -->
    <KnowledgeCard title="Demo 4：对象解构赋值">
      <p class="demo-desc">快速从对象中提取属性到变量</p>
      <DemoBox 
        demoPath="es6/object-destructuring"
        title="对象解构"
        :height="340"
      />
    </KnowledgeCard>

    <!-- Demo 5: 数组解构 -->
    <KnowledgeCard title="Demo 5：数组解构赋值">
      <p class="demo-desc">快速从数组中提取元素到变量</p>
      <DemoBox 
        demoPath="es6/array-destructuring"
        title="数组解构"
        :height="320"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="info" title="💡 在 Vue 中的应用">
      <ul>
        <li><strong>data() 返回值</strong>：经常使用属性简写</li>
        <li><strong>methods</strong>：使用方法简写定义</li>
        <li><strong>computed</strong>：getter/setter 使用方法简写</li>
        <li><strong>组件导入</strong>：components: { MyComponent } 属性简写</li>
      </ul>
    </TipBox>

    <!-- Vue 实战 -->
    <KnowledgeCard title="📦 Vue 中的实际应用">
      <CodeBlock :code="vueExampleCode" language="javascript" />
    </KnowledgeCard>
  </div>
</template>

<script>
/**
 * @description 对象增强写法知识点页面
 * @author Vue2 Learning Project
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'ObjectEnhance',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      syntaxCode: `// ==================== ES5 传统写法 ====================
var name = '张三'
var age = 18

// 属性
var person = {
  name: name,
  age: age
}

// 方法
var obj = {
  sayHello: function() {
    console.log('Hello')
  }
}

// ==================== ES6 增强写法 ====================
const name = '张三'
const age = 18

// 1. 属性简写
const person = { name, age }

// 2. 方法简写
const obj = {
  sayHello() {
    console.log('Hello')
  }
}

// 3. 计算属性名
const key = 'dynamicKey'
const data = {
  [key]: 'value',              // { dynamicKey: 'value' }
  ['pre_' + key]: 'prefixed'   // { pre_dynamicKey: 'prefixed' }
}`,

      vueExampleCode: `// Vue 组件中大量使用 ES6 增强写法
export default {
  name: 'UserCard',
  
  // 组件注册 - 属性简写
  components: {
    Avatar,      // 等同于 Avatar: Avatar
    Button       // 等同于 Button: Button
  },
  
  data() {
    const username = '张三'
    const level = 5
    
    // 返回对象 - 属性简写
    return { username, level }
  },
  
  // 方法 - 方法简写（自动省略 function）
  methods: {
    handleClick() {
      console.log('clicked')
    },
    
    fetchData() {
      // ...
    }
  },
  
  // 计算属性 - 方法简写
  computed: {
    fullName() {
      return this.firstName + this.lastName
    }
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
</style>
