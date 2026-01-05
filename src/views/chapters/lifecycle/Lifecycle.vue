<template>
  <div class="lifecycle-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>🔄 Vue 生命周期</h1>
      <p class="subtitle">理解 Vue 实例从创建到销毁的完整过程</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是生命周期">
      <div class="concept-content">
        <div class="metaphor">
          <h4>🎭 通俗比喻：人的一生</h4>
          <p>Vue 实例的生命周期就像人的一生：</p>
          <div class="life-stages">
            <div class="stage">
              <span class="stage-icon">👶</span>
              <span class="stage-name">出生</span>
              <span class="stage-hook">created</span>
            </div>
            <div class="stage-arrow">→</div>
            <div class="stage">
              <span class="stage-icon">🏫</span>
              <span class="stage-name">上学</span>
              <span class="stage-hook">mounted</span>
            </div>
            <div class="stage-arrow">→</div>
            <div class="stage">
              <span class="stage-icon">💼</span>
              <span class="stage-name">工作更新</span>
              <span class="stage-hook">updated</span>
            </div>
            <div class="stage-arrow">→</div>
            <div class="stage">
              <span class="stage-icon">👴</span>
              <span class="stage-name">退休</span>
              <span class="stage-hook">destroyed</span>
            </div>
          </div>
        </div>
        
        <div class="definition">
          <h4>📚 官方定义</h4>
          <p>每个 Vue 实例在被创建时都要经过一系列的初始化过程——例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做<strong>生命周期钩子</strong>的函数，给用户在不同阶段添加自己代码的机会。</p>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 生命周期图示 -->
    <KnowledgeCard title="📊 生命周期图示">
      <div class="lifecycle-diagram">
        <!-- 创建阶段 -->
        <div class="phase-group">
          <div class="phase-title">🌱 创建阶段</div>
          <div class="hooks-row">
            <div class="hook-item hook-before">
              <div class="hook-name">beforeCreate</div>
              <div class="hook-desc">实例初始化后，data/methods 不可用</div>
            </div>
            <div class="hook-arrow">→</div>
            <div class="hook-item hook-after">
              <div class="hook-name">created</div>
              <div class="hook-desc">实例创建完成，可访问 data/methods</div>
              <div class="hook-tip">💡 适合发起 API 请求</div>
            </div>
          </div>
        </div>

        <!-- 挂载阶段 -->
        <div class="phase-group">
          <div class="phase-title">🏗️ 挂载阶段</div>
          <div class="hooks-row">
            <div class="hook-item hook-before">
              <div class="hook-name">beforeMount</div>
              <div class="hook-desc">模板编译完成，DOM 还未挂载</div>
            </div>
            <div class="hook-arrow">→</div>
            <div class="hook-item hook-after">
              <div class="hook-name">mounted</div>
              <div class="hook-desc">DOM 已挂载，可以访问 $el</div>
              <div class="hook-tip">💡 适合操作 DOM、初始化第三方库</div>
            </div>
          </div>
        </div>

        <!-- 更新阶段 -->
        <div class="phase-group">
          <div class="phase-title">🔄 更新阶段</div>
          <div class="hooks-row">
            <div class="hook-item hook-before">
              <div class="hook-name">beforeUpdate</div>
              <div class="hook-desc">数据变化，DOM 还是旧的</div>
            </div>
            <div class="hook-arrow">→</div>
            <div class="hook-item hook-after">
              <div class="hook-name">updated</div>
              <div class="hook-desc">DOM 已更新完成</div>
              <div class="hook-tip">⚠️ 避免在此修改 data</div>
            </div>
          </div>
        </div>

        <!-- 销毁阶段 -->
        <div class="phase-group">
          <div class="phase-title">💨 销毁阶段</div>
          <div class="hooks-row">
            <div class="hook-item hook-before">
              <div class="hook-name">beforeDestroy</div>
              <div class="hook-desc">实例销毁前，最后清理机会</div>
              <div class="hook-tip">💡 清除定时器、解绑事件</div>
            </div>
            <div class="hook-arrow">→</div>
            <div class="hook-item hook-after">
              <div class="hook-name">destroyed</div>
              <div class="hook-desc">实例已销毁，所有绑定解除</div>
            </div>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 8个生命周期钩子表格 -->
    <KnowledgeCard title="📋 8 个生命周期钩子详解">
      <div class="hooks-table">
        <table>
          <thead>
            <tr>
              <th>阶段</th>
              <th>钩子函数</th>
              <th>调用时机</th>
              <th>可访问</th>
              <th>常见用途</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="2" class="phase-cell phase-create">创建</td>
              <td><code>beforeCreate</code></td>
              <td>实例初始化之后</td>
              <td>❌ data/methods</td>
              <td>极少使用</td>
            </tr>
            <tr>
              <td><code>created</code></td>
              <td>实例创建完成</td>
              <td>✅ data/methods</td>
              <td>发起 API 请求</td>
            </tr>
            <tr>
              <td rowspan="2" class="phase-cell phase-mount">挂载</td>
              <td><code>beforeMount</code></td>
              <td>挂载开始之前</td>
              <td>❌ DOM</td>
              <td>极少使用</td>
            </tr>
            <tr>
              <td><code>mounted</code></td>
              <td>挂载完成</td>
              <td>✅ DOM</td>
              <td>操作 DOM、初始化库</td>
            </tr>
            <tr>
              <td rowspan="2" class="phase-cell phase-update">更新</td>
              <td><code>beforeUpdate</code></td>
              <td>数据更新时</td>
              <td>旧 DOM</td>
              <td>获取更新前状态</td>
            </tr>
            <tr>
              <td><code>updated</code></td>
              <td>DOM 更新完成</td>
              <td>新 DOM</td>
              <td>操作更新后 DOM</td>
            </tr>
            <tr>
              <td rowspan="2" class="phase-cell phase-destroy">销毁</td>
              <td><code>beforeDestroy</code></td>
              <td>实例销毁之前</td>
              <td>✅ 全部可用</td>
              <td>清理资源</td>
            </tr>
            <tr>
              <td><code>destroyed</code></td>
              <td>实例销毁完成</td>
              <td>❌ 已解绑</td>
              <td>极少使用</td>
            </tr>
          </tbody>
        </table>
      </div>
    </KnowledgeCard>

    <!-- Demo 1: 全部钩子执行顺序 -->
    <KnowledgeCard title="🎯 Demo 1：生命周期钩子执行顺序">
      <p class="demo-desc">观察 Vue 实例从创建到销毁的完整流程，包括父子组件交互</p>
      <DemoBox
        demoPath="lifecycle/all-hooks"
        title="生命周期完整流程演示"
        :height="600"
      />
    </KnowledgeCard>

    <!-- Demo 2: created 常见用法 -->
    <KnowledgeCard title="🎯 Demo 2：created 钩子常见用法">
      <p class="demo-desc">created 是最常用的钩子，适合发起 API 请求和初始化数据</p>
      <TipBox type="info" title="💡 为什么用 created 发请求？">
        <ul>
          <li>可以访问 data 和 methods</li>
          <li>比 mounted 更早执行，数据更快准备好</li>
          <li>在服务端渲染（SSR）中也会执行</li>
          <li>不依赖 DOM，适合纯数据操作</li>
        </ul>
      </TipBox>
      <DemoBox
        demoPath="lifecycle/created-usage"
        title="created 钩子实践"
        :height="550"
      />
    </KnowledgeCard>

    <!-- Demo 3: mounted 操作 DOM -->
    <KnowledgeCard title="🎯 Demo 3：mounted 钩子操作 DOM">
      <p class="demo-desc">mounted 是操作 DOM 的最佳时机，适合初始化第三方库</p>
      <TipBox type="info" title="💡 mounted 的典型用途">
        <ul>
          <li>自动聚焦输入框</li>
          <li>获取 DOM 元素尺寸</li>
          <li>初始化 ECharts、地图等第三方库</li>
          <li>添加全局事件监听（记得在 beforeDestroy 清理）</li>
        </ul>
      </TipBox>
      <DemoBox
        demoPath="lifecycle/mounted-dom"
        title="mounted 操作 DOM 演示"
        :height="650"
      />
    </KnowledgeCard>

    <!-- Demo 4: 更新周期 -->
    <KnowledgeCard title="🎯 Demo 4：更新周期演示">
      <p class="demo-desc">当响应式数据变化时，会触发 beforeUpdate → updated</p>
      <TipBox type="warning" title="⚠️ 注意事项">
        <p>避免在 updated 钩子中修改响应式数据，否则可能导致无限循环！如需在数据变化后执行操作，建议使用 <code>watch</code> 或 <code>$nextTick</code>。</p>
      </TipBox>
      <DemoBox
        demoPath="lifecycle/update-cycle"
        title="更新周期演示"
        :height="580"
      />
    </KnowledgeCard>

    <!-- Demo 5: 销毁清理 -->
    <KnowledgeCard title="🎯 Demo 5：销毁时清理资源">
      <p class="demo-desc">beforeDestroy 是清理资源的关键时机，防止内存泄漏</p>
      <TipBox type="error" title="❌ 必须清理的资源">
        <ul>
          <li><strong>定时器</strong>：clearInterval / clearTimeout</li>
          <li><strong>事件监听</strong>：window.removeEventListener</li>
          <li><strong>第三方库</strong>：chart.dispose() / editor.destroy()</li>
          <li><strong>WebSocket</strong>：socket.close()</li>
          <li><strong>订阅</strong>：取消 Vuex、EventBus 订阅</li>
        </ul>
      </TipBox>
      <DemoBox
        demoPath="lifecycle/destroy-cleanup"
        title="销毁清理演示"
        :height="650"
      />
    </KnowledgeCard>

    <!-- Demo 6: 父子组件生命周期 -->
    <KnowledgeCard title="🎯 Demo 6：父子组件生命周期顺序">
      <p class="demo-desc">理解父子组件生命周期的执行顺序对组件化开发很重要</p>
      <div class="order-summary">
        <div class="order-item">
          <span class="order-label">挂载顺序</span>
          <span class="order-flow">父 beforeCreate → 父 created → 父 beforeMount → <em>子完整周期</em> → 父 mounted</span>
        </div>
        <div class="order-item">
          <span class="order-label">更新顺序</span>
          <span class="order-flow">父 beforeUpdate → <em>子更新</em> → 父 updated</span>
        </div>
        <div class="order-item">
          <span class="order-label">销毁顺序</span>
          <span class="order-flow">父 beforeDestroy → <em>子销毁</em> → 父 destroyed</span>
        </div>
      </div>
      <DemoBox
        demoPath="lifecycle/parent-child"
        title="父子组件生命周期"
        :height="750"
      />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <KnowledgeCard title="✅ 最佳实践总结">
      <div class="best-practices">
        <div class="practice-item">
          <div class="practice-hook">created</div>
          <div class="practice-do">
            <span class="do-label">✓ 推荐</span>
            <span>发起 API 请求、初始化数据、设置事件总线监听</span>
          </div>
          <div class="practice-dont">
            <span class="dont-label">✗ 避免</span>
            <span>操作 DOM（此时 DOM 不存在）</span>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-hook">mounted</div>
          <div class="practice-do">
            <span class="do-label">✓ 推荐</span>
            <span>操作 DOM、初始化第三方库、添加事件监听</span>
          </div>
          <div class="practice-dont">
            <span class="dont-label">✗ 避免</span>
            <span>假设子组件已全部挂载（需用 $nextTick）</span>
          </div>
        </div>
        <div class="practice-item">
          <div class="practice-hook">beforeDestroy</div>
          <div class="practice-do">
            <span class="do-label">✓ 推荐</span>
            <span>清除定时器、移除事件监听、销毁第三方库实例</span>
          </div>
          <div class="practice-dont">
            <span class="dont-label">✗ 避免</span>
            <span>忘记清理（会导致内存泄漏）</span>
          </div>
        </div>
      </div>
    </KnowledgeCard>
  </div>
</template>

<script>
/**
 * Vue 生命周期章节页面
 * 
 * 本页面详细介绍 Vue 2 的 8 个生命周期钩子：
 * - beforeCreate / created（创建阶段）
 * - beforeMount / mounted（挂载阶段）
 * - beforeUpdate / updated（更新阶段）
 * - beforeDestroy / destroyed（销毁阶段）
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'Lifecycle',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    DemoBox
  },
  
  /**
   * 页面元信息
   */
  metaInfo: {
    title: 'Vue 生命周期 - Vue2 学习'
  }
}
</script>

<style lang="scss" scoped>
.lifecycle-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    font-size: 32px;
    color: $color-text;
    margin-bottom: 8px;
  }
  
  .subtitle {
    font-size: 16px;
    color: $color-text-secondary;
  }
}

// 通俗比喻
.concept-content {
  .metaphor {
    background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    
    h4 {
      margin-bottom: 12px;
      color: $color-text;
    }
    
    p {
      color: $color-text-secondary;
      margin-bottom: 16px;
    }
  }
  
  .life-stages {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .stage {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    .stage-icon {
      font-size: 32px;
      margin-bottom: 4px;
    }
    
    .stage-name {
      font-size: 14px;
      font-weight: 500;
      color: $color-text;
    }
    
    .stage-hook {
      font-size: 12px;
      color: $color-primary;
      font-family: $font-family-code;
    }
  }
  
  .stage-arrow {
    font-size: 20px;
    color: $color-text-secondary;
  }
  
  .definition {
    h4 {
      margin-bottom: 12px;
      color: $color-text;
    }
    
    p {
      color: $color-text-secondary;
      line-height: 1.8;
      
      strong {
        color: $color-primary;
      }
    }
  }
}

// 生命周期图示
.lifecycle-diagram {
  .phase-group {
    margin-bottom: 24px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .phase-title {
    font-size: 16px;
    font-weight: 600;
    color: $color-text;
    margin-bottom: 12px;
    padding-left: 8px;
    border-left: 3px solid $color-primary;
  }
  
  .hooks-row {
    display: flex;
    align-items: stretch;
    gap: 16px;
    
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
  
  .hook-arrow {
    display: flex;
    align-items: center;
    font-size: 24px;
    color: $color-text-secondary;
    
    @media (max-width: 600px) {
      justify-content: center;
      transform: rotate(90deg);
    }
  }
  
  .hook-item {
    flex: 1;
    padding: 16px;
    border-radius: 12px;
    
    &.hook-before {
      background: #fff3e0;
      border-left: 4px solid #FF9800;
    }
    
    &.hook-after {
      background: #e8f5e9;
      border-left: 4px solid #4CAF50;
    }
    
    .hook-name {
      font-family: $font-family-code;
      font-size: 15px;
      font-weight: 600;
      color: $color-text;
      margin-bottom: 6px;
    }
    
    .hook-desc {
      font-size: 13px;
      color: $color-text-secondary;
      margin-bottom: 6px;
    }
    
    .hook-tip {
      font-size: 12px;
      color: $color-primary;
    }
  }
}

// 钩子表格
.hooks-table {
  overflow-x: auto;
  
  table {
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
      color: $color-text;
    }
    
    code {
      background: #e3f2fd;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 13px;
    }
    
    .phase-cell {
      font-weight: 500;
      text-align: center;
      
      &.phase-create { background: #e3f2fd; color: #1565c0; }
      &.phase-mount { background: #e8f5e9; color: #2e7d32; }
      &.phase-update { background: #fff3e0; color: #e65100; }
      &.phase-destroy { background: #ffebee; color: #c62828; }
    }
  }
}

// Demo 描述
.demo-desc {
  color: $color-text-secondary;
  margin-bottom: 16px;
  font-size: 15px;
}

// 执行顺序总结
.order-summary {
  background: $color-bg;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  
  .order-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .order-label {
    flex-shrink: 0;
    width: 80px;
    font-weight: 600;
    color: $color-text;
    font-size: 14px;
  }
  
  .order-flow {
    font-size: 13px;
    color: $color-text-secondary;
    line-height: 1.6;
    
    em {
      color: $color-primary;
      font-style: normal;
      font-weight: 500;
    }
  }
}

// 最佳实践
.best-practices {
  .practice-item {
    background: $color-bg;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .practice-hook {
    font-family: $font-family-code;
    font-size: 16px;
    font-weight: 600;
    color: $color-primary;
    margin-bottom: 12px;
  }
  
  .practice-do,
  .practice-dont {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 8px;
    font-size: 14px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .do-label {
    flex-shrink: 0;
    background: #e8f5e9;
    color: #2e7d32;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .dont-label {
    flex-shrink: 0;
    background: #ffebee;
    color: #c62828;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }
}
</style>
