<template>
  <div class="knowledge-page">
    <h2>🧭 8.4 编程式导航</h2>
    <p class="page-desc">除了使用 &lt;router-link&gt;，我们还可以通过代码实现页面跳转</p>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是编程式导航">
      <div class="concept-content">
        <div class="metaphor">
          <span class="icon">🎮</span>
          <div>
            <strong>通俗比喻：游戏手柄 vs 遥控器</strong>
            <p>router-link 像电视遥控器上的按钮，点击就切换。而编程式导航像游戏手柄，可以通过代码逻辑控制何时、如何跳转。</p>
          </div>
        </div>
        <div class="definition">
          <strong>官方定义：</strong>
          编程式导航是通过 <code>this.$router</code> 的方法（push、replace、go）在 JavaScript 代码中实现路由跳转。
        </div>
      </div>
    </KnowledgeCard>

    <!-- 核心方法 -->
    <KnowledgeCard title="🔧 核心方法对比">
      <table class="method-table">
        <thead>
          <tr>
            <th>方法</th>
            <th>说明</th>
            <th>历史记录</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>$router.push()</code></td>
            <td>跳转到新页面</td>
            <td>✅ 添加记录</td>
          </tr>
          <tr>
            <td><code>$router.replace()</code></td>
            <td>替换当前页面</td>
            <td>❌ 不添加</td>
          </tr>
          <tr>
            <td><code>$router.go(n)</code></td>
            <td>前进/后退 n 步</td>
            <td>在历史中移动</td>
          </tr>
          <tr>
            <td><code>$router.back()</code></td>
            <td>后退一步</td>
            <td>= go(-1)</td>
          </tr>
          <tr>
            <td><code>$router.forward()</code></td>
            <td>前进一步</td>
            <td>= go(1)</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- push 语法 -->
    <KnowledgeCard title="📝 push 方法语法">
      <CodeBlock :code="pushSyntax" language="javascript" />
    </KnowledgeCard>

    <!-- Demo -->
    <KnowledgeCard title="🎯 Demo 演示">
      <DemoBox 
        demoPath="router/nav-push" 
        title="Demo 1: push 跳转" 
        :height="450"
      />
      
      <DemoBox 
        demoPath="router/nav-replace" 
        title="Demo 2: replace 替换" 
        :height="400"
      />
      
      <DemoBox 
        demoPath="router/nav-go" 
        title="Demo 3: go/back/forward" 
        :height="420"
      />
      
      <DemoBox 
        demoPath="router/nav-params" 
        title="Demo 4: 传递参数" 
        :height="480"
      />
      
      <DemoBox 
        demoPath="router/nav-practical" 
        title="Demo 5: 实战应用" 
        :height="500"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>$router vs $route：</strong>$router 是路由实例（用于导航），$route 是当前路由信息（用于获取参数）</li>
        <li><strong>命名路由更安全：</strong>使用 name 而非 path，避免 URL 变更导致跳转失败</li>
        <li><strong>push 返回 Promise：</strong>Vue Router 3.1+ 的 push 返回 Promise，可以处理导航结果</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 适用场景">
      <ul>
        <li>表单提交成功后跳转</li>
        <li>登录成功后重定向</li>
        <li>根据条件动态决定跳转目标</li>
        <li>需要传递复杂参数时</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'

export default {
  name: 'ProgrammaticNav',
  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },
  data() {
    return {
      pushSyntax: `// 字符串路径
this.$router.push('/user/123')

// 对象形式
this.$router.push({ path: '/user/123' })

// 命名路由 + params
this.$router.push({ 
  name: 'user', 
  params: { id: 123 } 
})

// 带 query 参数（URL: /search?keyword=vue）
this.$router.push({ 
  path: '/search', 
  query: { keyword: 'vue' } 
})

// 处理导航结果（Vue Router 3.1+）
this.$router.push('/user/123')
  .then(() => console.log('导航成功'))
  .catch(err => console.log('导航失败', err))`
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
  max-width: 900px;
  margin: 0 auto;
  
  h2 {
    font-size: 28px;
    margin-bottom: 8px;
  }
  
  .page-desc {
    color: $color-text-secondary;
    margin-bottom: 24px;
  }
}

.concept-content {
  .metaphor {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: linear-gradient(135deg, #e8f5e9, #e3f2fd);
    border-radius: 12px;
    margin-bottom: 16px;
    
    .icon { font-size: 36px; }
    
    strong {
      color: $color-text;
      display: block;
      margin-bottom: 4px;
    }
    
    p {
      color: $color-text-secondary;
      font-size: 14px;
      margin: 0;
    }
  }
  
  .definition {
    padding: 12px;
    background: $color-code-bg;
    border-radius: 8px;
    font-size: 14px;
  }
}

.method-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid $color-border;
  }
  
  th {
    background: $color-bg;
    font-weight: 600;
  }
  
  code {
    background: rgba(0, 122, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    color: $color-primary;
  }
}
</style>
