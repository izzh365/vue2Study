<template>
  <div class="knowledge-page">
    <h2>🔀 8.2 动态路由</h2>
    <p class="page-desc">动态路由允许我们使用动态参数匹配不同的路径，是构建详情页的核心技术</p>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是动态路由">
      <div class="concept-content">
        <div class="metaphor">
          <span class="icon">🏨</span>
          <div>
            <strong>通俗比喻：酒店房间号</strong>
            <p>就像酒店有很多房间（101、102、103...），我们不需要为每个房间单独设置路线。只需要一个模式：<code>/room/:id</code>，就能匹配所有房间！</p>
          </div>
        </div>
        <div class="definition">
          <strong>官方定义：</strong>
          动态路由参数以冒号 <code>:</code> 开头，匹配符合模式的路径。参数值会被设置到 <code>$route.params</code> 中。
        </div>
      </div>
    </KnowledgeCard>

    <!-- 核心语法 -->
    <KnowledgeCard title="📝 动态路由语法">
      <table class="syntax-table">
        <thead>
          <tr>
            <th>模式</th>
            <th>匹配路径</th>
            <th>$route.params</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>/user/:id</code></td>
            <td>/user/123</td>
            <td>{ id: '123' }</td>
          </tr>
          <tr>
            <td><code>/user/:id/post/:postId</code></td>
            <td>/user/123/post/456</td>
            <td>{ id: '123', postId: '456' }</td>
          </tr>
          <tr>
            <td><code>/category/:type?</code></td>
            <td>/category 或 /category/tech</td>
            <td>{ type: undefined 或 'tech' }</td>
          </tr>
          <tr>
            <td><code>/files/*</code></td>
            <td>/files/a/b/c</td>
            <td>{ pathMatch: 'a/b/c' }</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 获取参数的方式 -->
    <KnowledgeCard title="🔧 获取动态参数的方式">
      <CodeBlock :code="paramAccessCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 1 -->
    <KnowledgeCard title="🎯 Demo 演示">
      <DemoBox 
        demoPath="router/dynamic-basic" 
        title="Demo 1: 动态路由基础" 
        :height="420"
      />
      
      <DemoBox 
        demoPath="router/dynamic-multiple" 
        title="Demo 2: 多个动态参数" 
        :height="400"
      />
      
      <DemoBox 
        demoPath="router/dynamic-watch" 
        title="Demo 3: 响应路由参数变化" 
        :height="450"
      />
      
      <DemoBox 
        demoPath="router/dynamic-optional" 
        title="Demo 4: 可选参数与通配符" 
        :height="420"
      />
      
      <DemoBox 
        demoPath="router/dynamic-props" 
        title="Demo 5: Props 解耦" 
        :height="400"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 重要提示">
      <ul>
        <li><strong>组件复用问题：</strong>当路由参数变化时（如 /user/1 → /user/2），组件不会重新创建，需要用 watch 监听 $route 或使用 beforeRouteUpdate 钩子</li>
        <li><strong>参数都是字符串：</strong>$route.params.id 是字符串类型，需要时请转换为数字</li>
        <li><strong>通配符路由放最后：</strong>path: '*' 必须放在路由配置的最后，否则会拦截其他路由</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li>使用 props: true 将参数解耦，组件更易复用和测试</li>
        <li>对于数字类型的 ID，在组件中使用 parseInt 或 Number 转换</li>
        <li>善用 watch 监听 $route 变化，处理数据重新加载</li>
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
  name: 'DynamicRoute',
  mixins: [scrollTrackingMixin],
  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },
  data() {
    return {
      paramAccessCode: `// 方式1：在模板中直接使用
{{ $route.params.id }}

// 方式2：在组件中通过 this.$route 访问
export default {
  computed: {
    userId() {
      return this.$route.params.id
    }
  }
}

// 方式3：使用 props 解耦（推荐）
// 路由配置
{ path: '/user/:id', component: User, props: true }

// 组件中
export default {
  props: ['id'],  // 直接作为 prop 使用
  template: '<div>用户ID: {{ id }}</div>'
}`
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
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    border-radius: 12px;
    margin-bottom: 16px;
    
    .icon {
      font-size: 36px;
    }
    
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

.syntax-table {
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
