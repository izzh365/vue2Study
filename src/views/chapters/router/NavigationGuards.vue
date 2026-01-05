<template>
  <div class="knowledge-page">
    <h2>🛡️ 8.5 导航守卫</h2>
    <p class="page-desc">在路由导航过程中进行拦截和检查，实现权限控制等功能</p>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是导航守卫">
      <div class="concept-content">
        <div class="metaphor">
          <span class="icon">🚧</span>
          <div>
            <strong>通俗比喻：小区门卫</strong>
            <p>导航守卫就像小区门卫，在你进入（路由切换）之前会检查你的身份（权限），只有通过检查才能放行。</p>
          </div>
        </div>
        <div class="definition">
          <strong>官方定义：</strong>
          导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的、单个路由独享的、或者组件级的。
        </div>
      </div>
    </KnowledgeCard>

    <!-- 守卫类型 -->
    <KnowledgeCard title="🔧 守卫类型对比">
      <table class="guard-table">
        <thead>
          <tr>
            <th>类型</th>
            <th>守卫</th>
            <th>定义位置</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2"><strong>全局守卫</strong></td>
            <td><code>beforeEach</code></td>
            <td>router 实例</td>
          </tr>
          <tr>
            <td><code>afterEach</code></td>
            <td>router 实例</td>
          </tr>
          <tr>
            <td><strong>路由独享</strong></td>
            <td><code>beforeEnter</code></td>
            <td>路由配置</td>
          </tr>
          <tr>
            <td rowspan="3"><strong>组件内守卫</strong></td>
            <td><code>beforeRouteEnter</code></td>
            <td>组件选项</td>
          </tr>
          <tr>
            <td><code>beforeRouteUpdate</code></td>
            <td>组件选项</td>
          </tr>
          <tr>
            <td><code>beforeRouteLeave</code></td>
            <td>组件选项</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- next 参数 -->
    <KnowledgeCard title="📝 next 函数用法">
      <CodeBlock :code="nextSyntax" language="javascript" />
    </KnowledgeCard>

    <!-- Demo -->
    <KnowledgeCard title="🎯 Demo 演示">
      <DemoBox 
        demoPath="router/guard-before-each" 
        title="Demo 1: 全局前置守卫 beforeEach" 
        :height="480"
      />
      
      <DemoBox 
        demoPath="router/guard-after-each" 
        title="Demo 2: 全局后置钩子 afterEach" 
        :height="400"
      />
      
      <DemoBox 
        demoPath="router/guard-before-enter" 
        title="Demo 3: 路由独享守卫 beforeEnter" 
        :height="420"
      />
      
      <DemoBox 
        demoPath="router/guard-component" 
        title="Demo 4: 组件内守卫" 
        :height="500"
      />
      
      <DemoBox 
        demoPath="router/guard-login" 
        title="Demo 5: 实战-登录验证" 
        :height="520"
      />
      
      <DemoBox 
        demoPath="router/guard-order" 
        title="Demo 6: 守卫执行顺序" 
        :height="450"
      />
    </KnowledgeCard>

    <!-- 执行顺序 -->
    <KnowledgeCard title="⏱️ 完整导航解析流程">
      <div class="flow-steps">
        <div class="step">1. 导航被触发</div>
        <div class="step">2. 失活组件 <code>beforeRouteLeave</code></div>
        <div class="step">3. 全局 <code>beforeEach</code></div>
        <div class="step">4. 重用组件 <code>beforeRouteUpdate</code></div>
        <div class="step">5. 路由 <code>beforeEnter</code></div>
        <div class="step">6. 解析异步路由组件</div>
        <div class="step">7. 激活组件 <code>beforeRouteEnter</code></div>
        <div class="step">8. 全局 <code>afterEach</code></div>
        <div class="step">9. DOM 更新</div>
        <div class="step">10. <code>beforeRouteEnter</code> 的 next 回调</div>
      </div>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>必须调用 next()：</strong>在 beforeEach 等守卫中，必须调用 next() 才能继续导航</li>
        <li><strong>beforeRouteEnter 无 this：</strong>组件还未创建，可用 next(vm => {}) 回调</li>
        <li><strong>避免无限循环：</strong>next('/login') 时要注意条件判断，防止循环重定向</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 常见应用场景">
      <ul>
        <li>登录验证：未登录跳转登录页</li>
        <li>权限控制：无权限显示 403</li>
        <li>页面标题：根据路由动态设置 title</li>
        <li>页面加载进度条</li>
        <li>离开页面确认（表单未保存提示）</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'NavigationGuards',
  mixins: [scrollTrackingMixin],
  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },
  data() {
    return {
      nextSyntax: `// 放行，继续导航
next()

// 中断导航
next(false)

// 跳转到其他路由
next('/login')
next({ path: '/login' })
next({ name: 'login', query: { redirect: to.fullPath }})

// 传递 Error
next(new Error('导航失败'))

// beforeRouteEnter 中访问 vm
next(vm => {
  // 通过 vm 访问组件实例
  console.log(vm.someData)
})`
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
    background: linear-gradient(135deg, #fff3e0, #e8f5e9);
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

.guard-table {
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
  
  td[rowspan] {
    vertical-align: middle;
    background: #fafafa;
  }
  
  code {
    background: rgba(0, 122, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    color: $color-primary;
  }
}

.flow-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  .step {
    padding: 10px 16px;
    background: $color-bg;
    border-radius: 8px;
    font-size: 14px;
    position: relative;
    padding-left: 40px;
    
    &::before {
      content: '';
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 8px;
      height: 8px;
      background: $color-primary;
      border-radius: 50%;
    }
    
    code {
      background: rgba(0, 122, 255, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      color: $color-primary;
    }
  }
}
</style>
