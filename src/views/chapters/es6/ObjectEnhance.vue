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
        <p>想象你在填写一张表格：</p>
        <div class="analogy-box">
          <p>📝 <strong>传统方式（ES5）</strong>：姓名栏写"姓名：张三"，年龄栏写"年龄：18"</p>
          <p>✨ <strong>简洁方式（ES6）</strong>：姓名栏直接写"张三"，年龄栏直接写"18"（栏位名已经说明了）</p>
        </div>
        <p class="mt-md">代码对比：</p>
        <ul>
          <li>ES5 写法：<code>{ name: name, age: age }</code> → 重复写两遍变量名</li>
          <li>ES6 简写：<code>{ name, age }</code> → 变量名和属性名相同时，只写一个</li>
        </ul>
        
        <h4>📚 三种增强写法</h4>
        <div class="feature-grid">
          <div class="feature-item">
            <span class="feature-icon">1️⃣</span>
            <div>
              <strong>属性简写</strong>
              <p>变量名和属性名相同时，可以只写一个</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">2️⃣</span>
            <div>
              <strong>方法简写</strong>
              <p>省略 <code>function</code> 关键字，更简洁</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">3️⃣</span>
            <div>
              <strong>计算属性名</strong>
              <p>用 <code>[]</code> 包裹表达式动态设置属性名</p>
            </div>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 1.5 为什么需要 -->
    <KnowledgeCard title="💡 为什么需要对象增强写法">
      <div class="why-content">
        <h4>😤 ES5 的痛点</h4>
        <ul>
          <li><strong>重复代码多</strong>：<code>{ name: name, age: age }</code> 变量名要写两遍</li>
          <li><strong>方法定义繁琐</strong>：每次都要写 <code>function</code> 关键字</li>
          <li><strong>属性名不灵活</strong>：无法动态设置属性名</li>
        </ul>
        
        <h4>✅ ES6 解决方案</h4>
        <ul>
          <li>代码更简洁，减少重复</li>
          <li>Vue 组件中大量使用，必须掌握</li>
          <li>配合解构赋值，数据处理更方便</li>
        </ul>
        
        <h4>📊 实际效果对比</h4>
        <div class="compare-block">
          <div class="compare-item bad">
            <span class="label">❌ ES5 - 38个字符</span>
            <code>{ name: name, age: age, city: city }</code>
          </div>
          <div class="compare-item good">
            <span class="label">✅ ES6 - 18个字符</span>
            <code>{ name, age, city }</code>
          </div>
        </div>
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
    <TipBox type="info" title="💡 在 Vue 中的应用场景">
      <p>Vue 组件中几乎每处都在使用 ES6 对象增强写法：</p>
      <ul>
        <li><strong>data() 返回值</strong>：<code>return { username, level }</code> 属性简写</li>
        <li><strong>methods 定义</strong>：<code>handleClick() { ... }</code> 方法简写</li>
        <li><strong>computed 定义</strong>：<code>fullName() { return ... }</code> 方法简写</li>
        <li><strong>components 注册</strong>：<code>components: { Avatar, Button }</code> 属性简写</li>
        <li><strong>props 解构</strong>：<code>const { name, age } = this.user</code> 解构赋值</li>
      </ul>
    </TipBox>

    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>方法简写中的 this</strong>：方法简写和传统写法的 this 指向相同，都指向 Vue 实例</li>
        <li><strong>不要用箭头函数替代方法简写</strong>：箭头函数的 this 不会指向 Vue 实例</li>
        <li><strong>计算属性名的性能</strong>：复杂表达式作为属性名会影响可读性，适度使用</li>
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
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'ObjectEnhance',
  
  mixins: [scrollTrackingMixin],
  
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

      vueExampleCode: `// =====================================================
// Vue 组件中大量使用 ES6 增强写法 - 这是你每天都会写的代码！
// =====================================================

export default {
  name: 'UserProfile',
  
  // ✅ 组件注册 - 属性简写
  // 当导入的组件名和注册名相同时
  components: {
    Avatar,      // 等同于 Avatar: Avatar
    Button,      // 等同于 Button: Button
    UserCard     // 等同于 UserCard: UserCard
  },
  
  // ✅ data 函数 - 方法简写 + 属性简写
  data() {
    const username = '张三'
    const level = 5
    const isVip = true
    
    // 返回对象使用属性简写
    return { 
      username,  // 等同于 username: username
      level,     // 等同于 level: level
      isVip      // 等同于 isVip: isVip
    }
  },
  
  // ✅ computed - 方法简写
  computed: {
    // getter 方法简写
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    
    // getter + setter 完整写法
    displayName: {
      get() {
        return this.firstName + ' ' + this.lastName
      },
      set(newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    },
    
    // 过滤列表（Vue 官方示例）
    evenNumbers() {
      return this.numbers.filter(number => number % 2 === 0)
    }
  },
  
  // ✅ methods - 方法简写
  methods: {
    // 不需要写 function 关键字
    handleClick() {
      console.log('按钮被点击')
    },
    
    async fetchUserData() {
      const response = await fetch('/api/user')
      this.userData = await response.json()
    },
    
    // 带参数的方法
    updateProfile(name, age) {
      this.name = name
      this.age = age
    }
  },
  
  // ✅ watch - 方法简写
  watch: {
    username(newVal, oldVal) {
      console.log(\`用户名从 \${oldVal} 变为 \${newVal}\`)
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

// 比喻说明框
.analogy-box {
  background: linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%);
  border-radius: $radius-md;
  padding: $spacing-md;
  margin: $spacing-sm 0;
  
  p {
    margin: $spacing-xs 0;
    line-height: 1.8;
  }
}

// 特性网格
.feature-grid {
  display: grid;
  gap: $spacing-md;
  margin-top: $spacing-md;
  
  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: $spacing-sm;
    background: $color-card;
    border: 1px solid $color-border;
    border-radius: $radius-md;
    padding: $spacing-md;
    
    .feature-icon {
      font-size: 24px;
      flex-shrink: 0;
    }
    
    strong {
      display: block;
      color: $color-text;
      margin-bottom: 4px;
    }
    
    p {
      margin: 0;
      color: $color-text-secondary;
      font-size: $font-size-sm;
    }
  }
}

// 对比块
.compare-block {
  margin-top: $spacing-md;
  
  .compare-item {
    padding: $spacing-sm $spacing-md;
    border-radius: $radius-sm;
    margin-bottom: $spacing-sm;
    
    .label {
      display: block;
      font-size: $font-size-xs;
      margin-bottom: 4px;
    }
    
    code {
      background: rgba(255, 255, 255, 0.8);
      padding: 4px 8px;
      border-radius: 4px;
      font-family: $font-family-code;
      font-size: $font-size-sm;
    }
    
    &.bad {
      background: #ffebee;
      .label { color: $color-error; }
    }
    
    &.good {
      background: #e8f5e9;
      .label { color: $color-success; }
    }
  }
}

.mt-md {
  margin-top: $spacing-md;
}
</style>
