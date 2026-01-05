<template>
  <div class="knowledge-page">
    <h2>🪆 8.3 嵌套路由</h2>
    <p class="page-desc">嵌套路由允许在父组件中嵌入子路由视图，实现复杂的页面布局</p>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是嵌套路由">
      <div class="concept-content">
        <div class="metaphor">
          <span class="icon">🏢</span>
          <div>
            <strong>通俗比喻：大楼与楼层</strong>
            <p>就像一栋大楼（父路由）里有多个楼层（子路由）。进入大楼后，还可以选择去哪个楼层。每个楼层都在大楼内部展示，而不是离开大楼。</p>
          </div>
        </div>
        <div class="definition">
          <strong>官方定义：</strong>
          嵌套路由是指在一个路由组件内部再放置 <code>&lt;router-view&gt;</code>，配合 <code>children</code> 配置实现父子路由嵌套。
        </div>
      </div>
    </KnowledgeCard>

    <!-- 核心语法 -->
    <KnowledgeCard title="📝 嵌套路由配置">
      <CodeBlock :code="nestedConfig" language="javascript" />
    </KnowledgeCard>

    <!-- 结构图 -->
    <KnowledgeCard title="🏗️ 嵌套结构示意">
      <div class="structure-diagram">
        <div class="layout-box">
          <div class="header">App.vue（根组件）</div>
          <div class="router-view">
            <div class="inner-box">
              <div class="header parent">User.vue（父路由组件）</div>
              <div class="router-view child">
                <div class="child-box">Profile.vue / Posts.vue（子路由组件）</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- Demo -->
    <KnowledgeCard title="🎯 Demo 演示">
      <DemoBox 
        demoPath="router/nested-basic" 
        title="Demo 1: 嵌套路由基础" 
        :height="500"
      />
      
      <DemoBox 
        demoPath="router/nested-default" 
        title="Demo 2: 默认子路由" 
        :height="450"
      />
      
      <DemoBox 
        demoPath="router/nested-multi-level" 
        title="Demo 3: 多级嵌套" 
        :height="520"
      />
      
      <DemoBox 
        demoPath="router/nested-named-views" 
        title="Demo 4: 命名视图" 
        :height="500"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>子路由 path 不要以 / 开头：</strong>以 / 开头会被当作根路径</li>
        <li><strong>父组件需要 router-view：</strong>没有 router-view 子路由无法显示</li>
        <li><strong>默认子路由：</strong>path 为空字符串的子路由会作为默认子路由</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 应用场景">
      <ul>
        <li><strong>后台管理系统：</strong>侧边栏 + 主内容区布局</li>
        <li><strong>个人中心：</strong>用户信息 / 我的订单 / 设置等 Tab 页</li>
        <li><strong>文档网站：</strong>目录 + 文档内容</li>
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
  name: 'NestedRoute',
  mixins: [scrollTrackingMixin],
  components: {
    KnowledgeCard,
    TipBox,
    DemoBox,
    CodeBlock
  },
  data() {
    return {
      nestedConfig: `const routes = [
  {
    path: '/user/:id',
    component: User,
    // 子路由配置
    children: [
      // 默认子路由（path 为空）
      { path: '', component: UserHome },
      // 子路由 path 不要以 / 开头
      { path: 'profile', component: UserProfile },
      { path: 'posts', component: UserPosts }
    ]
  }
]

// 匹配结果：
// /user/123        → User + UserHome
// /user/123/profile → User + UserProfile
// /user/123/posts   → User + UserPosts`
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
    background: linear-gradient(135deg, #fff3e0, #fce4ec);
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

.structure-diagram {
  .layout-box {
    border: 2px solid $color-primary;
    border-radius: 12px;
    overflow: hidden;
    
    .header {
      background: $color-primary;
      color: white;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 500;
      
      &.parent {
        background: #34c759;
      }
    }
    
    .router-view {
      padding: 16px;
      background: rgba(0, 122, 255, 0.05);
      min-height: 80px;
      
      &.child {
        background: rgba(52, 199, 89, 0.1);
        border-radius: 8px;
      }
    }
    
    .inner-box {
      border: 2px solid #34c759;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .child-box {
      padding: 12px;
      background: white;
      text-align: center;
      color: $color-text-secondary;
      font-size: 14px;
      border-radius: 4px;
    }
  }
}
</style>
