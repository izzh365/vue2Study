<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>⏳ Promise 与异步</h1>
      <p class="subtitle">优雅处理异步操作，告别回调地狱</p>
    </div>

    <!-- 1. 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <h4>🎯 通俗比喻</h4>
        <p>Promise 就像"外卖订单"：</p>
        <ul>
          <li><strong>pending（进行中）</strong>：外卖正在配送</li>
          <li><strong>fulfilled（成功）</strong>：外卖送到了，开吃！</li>
          <li><strong>rejected（失败）</strong>：外卖洒了，申请退款</li>
        </ul>
        <p>你下单后不用一直等着（异步），外卖到了会通知你（回调）</p>
        
        <h4>📚 为什么需要 Promise</h4>
        <p>解决回调地狱问题，让异步代码像同步一样清晰</p>
        
        <h4>🔥 Promise 三种状态</h4>
        <ul>
          <li><code>pending</code>：初始状态，进行中</li>
          <li><code>fulfilled</code>：操作成功完成</li>
          <li><code>rejected</code>：操作失败</li>
        </ul>
        <p>状态一旦改变就不可逆！</p>
      </div>
    </KnowledgeCard>

    <!-- 2. 语法说明 -->
    <KnowledgeCard title="📝 基本语法">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 列表 -->
    <h2 class="section-title">🎯 实战演示</h2>

    <!-- Demo 1: 回调地狱 -->
    <KnowledgeCard title="Demo 1：回调地狱问题">
      <p class="demo-desc">嵌套的回调让代码难以阅读和维护</p>
      <DemoBox 
        demoPath="es6/callback-hell"
        title="回调地狱"
        :height="360"
      />
    </KnowledgeCard>

    <!-- Demo 2: Promise 基本用法 -->
    <KnowledgeCard title="Demo 2：Promise 基本用法">
      <p class="demo-desc">创建和使用 Promise，理解 resolve 和 reject</p>
      <DemoBox 
        demoPath="es6/promise-basic"
        title="Promise 基础"
        :height="380"
      />
    </KnowledgeCard>

    <!-- Demo 3: 链式调用 -->
    <KnowledgeCard title="Demo 3：链式调用">
      <p class="demo-desc">then 返回新的 Promise，实现链式调用</p>
      <DemoBox 
        demoPath="es6/promise-chain"
        title="链式调用"
        :height="400"
      />
    </KnowledgeCard>

    <!-- Demo 4: 错误处理 -->
    <KnowledgeCard title="Demo 4：错误处理">
      <p class="demo-desc">catch 捕获错误，finally 无论成功失败都执行</p>
      <DemoBox 
        demoPath="es6/promise-catch"
        title="错误处理"
        :height="360"
      />
    </KnowledgeCard>

    <!-- Demo 5: Promise.all -->
    <KnowledgeCard title="Demo 5：Promise.all 并发请求">
      <p class="demo-desc">同时发起多个请求，全部成功才成功</p>
      <DemoBox 
        demoPath="es6/promise-all"
        title="Promise.all"
        :height="380"
      />
    </KnowledgeCard>

    <!-- Demo 6: Promise.race -->
    <KnowledgeCard title="Demo 6：Promise.race 竞速">
      <p class="demo-desc">多个请求，以最快完成的结果为准</p>
      <DemoBox 
        demoPath="es6/promise-race"
        title="Promise.race"
        :height="360"
      />
    </KnowledgeCard>

    <!-- Demo 7: async/await -->
    <KnowledgeCard title="Demo 7：async/await 语法糖">
      <p class="demo-desc">让异步代码看起来像同步代码</p>
      <DemoBox 
        demoPath="es6/async-await"
        title="async/await"
        :height="400"
      />
    </KnowledgeCard>

    <!-- Demo 8: Vue 中应用 -->
    <KnowledgeCard title="Demo 8：在 Vue 中的应用">
      <p class="demo-desc">在 created、methods 中处理异步请求</p>
      <DemoBox 
        demoPath="es6/promise-vue"
        title="Vue 中应用"
        :height="420"
      />
    </KnowledgeCard>

    <!-- API 对比 -->
    <KnowledgeCard title="📊 Promise 静态方法对比">
      <table class="compare-table">
        <thead>
          <tr>
            <th>方法</th>
            <th>说明</th>
            <th>使用场景</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Promise.all()</code></td>
            <td>全部成功才成功，一个失败就失败</td>
            <td>同时请求多个 API</td>
          </tr>
          <tr>
            <td><code>Promise.race()</code></td>
            <td>返回最先完成的结果</td>
            <td>超时处理、竞速</td>
          </tr>
          <tr>
            <td><code>Promise.allSettled()</code></td>
            <td>等待全部完成，不管成功失败</td>
            <td>批量操作统计结果</td>
          </tr>
          <tr>
            <td><code>Promise.any()</code></td>
            <td>任意一个成功就成功</td>
            <td>多源数据获取</td>
          </tr>
          <tr>
            <td><code>Promise.resolve()</code></td>
            <td>返回成功的 Promise</td>
            <td>快速创建成功状态</td>
          </tr>
          <tr>
            <td><code>Promise.reject()</code></td>
            <td>返回失败的 Promise</td>
            <td>快速创建失败状态</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="info" title="💡 async/await 使用技巧">
      <ul>
        <li><strong>async 函数总是返回 Promise</strong></li>
        <li><strong>await 只能在 async 函数中使用</strong></li>
        <li><strong>错误处理用 try...catch</strong></li>
        <li><strong>并发请求用 Promise.all + await</strong></li>
      </ul>
    </TipBox>

    <TipBox type="warning" title="⚠️ 常见错误">
      <ul>
        <li>忘记 return Promise 导致链式调用断开</li>
        <li>忘记处理 reject 导致 Uncaught Promise rejection</li>
        <li>在循环中用 await 导致串行请求（应该用 Promise.all）</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * @description Promise 与异步知识点页面
 * @author Vue2 Learning Project
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'PromiseAsync',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      syntaxCode: `// ==================== 创建 Promise ====================
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true
    
    if (success) {
      resolve('成功的数据')   // 状态变为 fulfilled
    } else {
      reject(new Error('失败原因'))  // 状态变为 rejected
    }
  }, 1000)
})


// ==================== 使用 Promise ====================
promise
  .then(data => {
    console.log('成功:', data)
    return '处理后的数据'      // 返回值传给下一个 then
  })
  .then(data => {
    console.log('第二步:', data)
  })
  .catch(error => {
    console.log('失败:', error.message)
  })
  .finally(() => {
    console.log('无论成功失败都执行')
  })


// ==================== async/await ====================
async function fetchData() {
  try {
    const response = await fetch('/api/users')
    const data = await response.json()
    console.log('数据:', data)
    return data
  } catch (error) {
    console.log('错误:', error)
  }
}

// 调用
fetchData().then(data => {
  console.log('最终数据:', data)
})`
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
