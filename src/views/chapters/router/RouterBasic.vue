<template>
  <div class="knowledge-page">
    <h1>🚀 8.1 路由基础</h1>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是前端路由">
      <p>
        <strong>通俗比喻</strong>：路由就像<strong>酒店前台</strong>——
        你说要去哪个房间（URL），前台就带你去对应的房间（组件）。
      </p>
      <div class="concept-box">
        <h4>🔄 前端路由 vs 后端路由</h4>
        <ul>
          <li><strong>后端路由</strong>：每次 URL 变化都向服务器请求新页面，整页刷新</li>
          <li><strong>前端路由</strong>：URL 变化时，JS 拦截请求，只更新局部组件，不刷新页面（SPA）</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- Vue Router 核心概念 -->
    <KnowledgeCard title="🧩 Vue Router 核心概念">
      <div class="concept-grid">
        <div class="concept-item">
          <span class="icon">🔗</span>
          <h4>&lt;router-link&gt;</h4>
          <p>导航组件，渲染为 &lt;a&gt; 标签，点击时切换路由</p>
        </div>
        <div class="concept-item">
          <span class="icon">📦</span>
          <h4>&lt;router-view&gt;</h4>
          <p>路由出口，匹配到的组件将渲染在这里</p>
        </div>
        <div class="concept-item">
          <span class="icon">⚙️</span>
          <h4>routes</h4>
          <p>路由配置数组，定义 path 和 component 的映射</p>
        </div>
        <div class="concept-item">
          <span class="icon">📍</span>
          <h4>$route</h4>
          <p>当前路由信息对象（params、query、path 等）</p>
        </div>
        <div class="concept-item">
          <span class="icon">🧭</span>
          <h4>$router</h4>
          <p>路由实例，用于编程式导航（push、replace、go）</p>
        </div>
        <div class="concept-item">
          <span class="icon">#️⃣</span>
          <h4>mode</h4>
          <p>路由模式：hash（默认）或 history</p>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 路由模式 -->
    <KnowledgeCard title="🔀 路由模式对比">
      <table class="compare-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>Hash 模式</th>
            <th>History 模式</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>URL 样式</td>
            <td><code>http://xxx.com/#/home</code></td>
            <td><code>http://xxx.com/home</code></td>
          </tr>
          <tr>
            <td>实现原理</td>
            <td>监听 hashchange 事件</td>
            <td>HTML5 History API</td>
          </tr>
          <tr>
            <td>服务器配置</td>
            <td>❌ 不需要</td>
            <td>✅ 需要配置回退</td>
          </tr>
          <tr>
            <td>兼容性</td>
            <td>✅ 支持所有浏览器</td>
            <td>⚠️ IE10+</td>
          </tr>
          <tr>
            <td>SEO</td>
            <td>❌ 不友好</td>
            <td>✅ 友好</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 基本语法 -->
    <KnowledgeCard title="📝 基本配置语法">
      <CodeBlock :code="syntaxCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 展示 -->
    <KnowledgeCard title="🎯 交互式演示">
      <DemoBox
        demoPath="router/router-basic"
        title="Demo 1: 基础路由配置"
        :height="450"
      />

      <DemoBox
        demoPath="router/router-link-usage"
        title="Demo 2: router-link 使用"
        :height="400"
      />

      <DemoBox
        demoPath="router/router-link-props"
        title="Demo 3: router-link 属性"
        :height="480"
      />

      <DemoBox
        demoPath="router/router-redirect"
        title="Demo 4: 路由重定向与别名"
        :height="420"
      />

      <DemoBox
        demoPath="router/router-mode"
        title="Demo 5: 路由模式对比"
        :height="400"
      />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="💡 最佳实践">
      <ul>
        <li>使用 <strong>命名路由</strong> 代替硬编码路径，便于维护</li>
        <li>生产环境推荐使用 <strong>History 模式</strong>，URL 更美观</li>
        <li>配置 <strong>默认路由</strong> 和 <strong>404 页面</strong></li>
        <li>使用 <strong>路由懒加载</strong> 优化首屏加载速度</li>
      </ul>
    </TipBox>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li>History 模式需要服务器配置，否则刷新会 404</li>
        <li><code>router-link</code> 的 <code>to</code> 要以 <code>/</code> 开头表示绝对路径</li>
        <li>不要在 <code>router-link</code> 内使用 <code>@click</code>，用 <code>@click.native</code></li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'RouterBasic',
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  data() {
    return {
      syntaxCode: `// 1. 定义路由组件
const Home = { template: '<div>首页</div>' }
const About = { template: '<div>关于</div>' }

// 2. 定义路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User },  // 动态路由
  { path: '*', redirect: '/' }              // 404 重定向
]

// 3. 创建路由实例
const router = new VueRouter({
  mode: 'history',  // 可选：'hash'(默认) 或 'history'
  routes
})

// 4. 挂载到 Vue 实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')`
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
  max-width: 900px;

  h1 {
    font-size: $font-size-2xl;
    margin-bottom: $spacing-xl;
    color: $color-text;
  }
}

.concept-box {
  background: rgba($color-primary, 0.05);
  border-radius: $radius-md;
  padding: $spacing-md;
  margin-top: $spacing-md;

  h4 {
    margin: 0 0 $spacing-sm;
    color: $color-primary;
  }

  ul {
    margin: 0;
    padding-left: $spacing-lg;

    li {
      margin-bottom: $spacing-xs;
    }
  }
}

.concept-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: $spacing-md;
  margin-top: $spacing-md;

  .concept-item {
    background: $color-bg;
    border-radius: $radius-md;
    padding: $spacing-md;
    text-align: center;

    .icon {
      font-size: 32px;
      display: block;
      margin-bottom: $spacing-xs;
    }

    h4 {
      margin: 0 0 $spacing-xs;
      font-size: $font-size-sm;
      color: $color-text;
      font-family: $font-family-code;
    }

    p {
      margin: 0;
      font-size: $font-size-xs;
      color: $color-text-secondary;
    }
  }
}

.compare-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: $spacing-md;

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
    background: rgba($color-primary, 0.1);
    padding: 2px 6px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
  }
}
</style>
