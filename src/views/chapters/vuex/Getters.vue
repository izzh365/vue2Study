<template>
  <div class="knowledge-page">
    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 Getters">
      <div class="concept-content">
        <div class="metaphor">
          <div class="metaphor-icon">🔍</div>
          <div class="metaphor-text">
            <strong>通俗比喻：</strong>Getters 就像<strong>超市的促销员</strong>。
            仓库（State）里有很多商品，促销员不改变商品，只是帮你<strong>筛选、计算、展示</strong>你需要的信息。
          </div>
        </div>
        
        <div class="definition-box">
          <h4>📚 官方定义</h4>
          <p><strong>Getters</strong> 是 Vuex 的计算属性。当需要从 state 中派生出一些状态时使用，例如对列表进行过滤、统计数量等。</p>
          <p>Getters 接收 state 作为第一个参数，返回处理后的数据。</p>
        </div>
        
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">⚡</span>
            <div>
              <strong>响应式缓存</strong>
              <p>只有依赖的 state 变化时才会重新计算</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📦</span>
            <div>
              <strong>可复用</strong>
              <p>在多个组件中共享同一个计算逻辑</p>
            </div>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🔗</span>
            <div>
              <strong>可组合</strong>
              <p>Getters 可以调用其他 getters</p>
            </div>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- Getters vs Computed -->
    <KnowledgeCard title="💡 Getters vs 组件 Computed">
      <div class="compare-section">
        <table class="compare-table">
          <thead>
            <tr>
              <th>特性</th>
              <th>组件 Computed</th>
              <th>Vuex Getters</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>作用范围</td>
              <td>仅当前组件</td>
              <td>全局可用</td>
            </tr>
            <tr>
              <td>数据来源</td>
              <td>组件 data、props</td>
              <td>Store state</td>
            </tr>
            <tr>
              <td>复用性</td>
              <td>需要在每个组件重复定义</td>
              <td>定义一次，处处使用</td>
            </tr>
            <tr>
              <td>缓存</td>
              <td>✅ 有缓存</td>
              <td>✅ 有缓存</td>
            </tr>
          </tbody>
        </table>
        
        <div class="tip-inline">
          💡 如果派生逻辑只在一个组件使用，用 computed；如果多个组件需要，用 getters！
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <div class="syntax-section">
        <h4>基本 Getter 定义</h4>
        <CodeBlock :code="basicSyntax" language="javascript" />
        
        <h4>访问其他 Getters</h4>
        <CodeBlock :code="accessOtherGetters" language="javascript" />
        
        <h4>返回函数（带参数）</h4>
        <CodeBlock :code="returnFunction" language="javascript" />
      </div>
    </KnowledgeCard>

    <!-- Demo: 基础用法 -->
    <KnowledgeCard title="🎯 Demo 1: Getters 基础用法">
      <DemoBox 
        demoPath="vuex/getters-basic"
        title="过滤已完成的待办事项"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- Demo: 接收其他 getters -->
    <KnowledgeCard title="🎯 Demo 2: Getter 访问其他 Getter">
      <DemoBox 
        demoPath="vuex/getters-compose"
        title="组合 Getters 实现复杂计算"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- Demo: 返回函数 -->
    <KnowledgeCard title="🎯 Demo 3: Getter 返回函数（带参数）">
      <DemoBox 
        demoPath="vuex/getters-method"
        title="通过 ID 查找 Todo"
        :height="'350px'"
      />
    </KnowledgeCard>

    <!-- Demo: mapGetters -->
    <KnowledgeCard title="🎯 Demo 4: mapGetters 辅助函数">
      <DemoBox 
        demoPath="vuex/getters-mapgetters"
        title="使用 mapGetters 简化代码"
        :height="'400px'"
      />
    </KnowledgeCard>

    <!-- Demo: 实战案例 -->
    <KnowledgeCard title="🎯 Demo 5: 购物车案例">
      <DemoBox 
        demoPath="vuex/getters-cart"
        title="购物车计算总价、总数"
        :height="'420px'"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>通过方法访问不缓存：</strong>当 getter 返回函数时（如 <code>getTodoById(id)</code>），每次调用都会执行，不会缓存</li>
        <li><strong>不要修改 state：</strong>Getters 只能读取 state，不能修改它</li>
        <li><strong>避免复杂逻辑：</strong>如果计算逻辑过于复杂，考虑在 actions 中预处理</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li>将常用的过滤、统计逻辑抽取为 getters</li>
        <li>使用 <code>mapGetters</code> 配合展开运算符简化组件代码</li>
        <li>为 getters 起有意义的名字，如 <code>completedTodos</code>、<code>totalPrice</code></li>
        <li>复杂 getters 可以组合使用简单 getters</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'VuexGetters',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      basicSyntax: `const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '学习 Vue', done: true },
      { id: 2, text: '学习 Vuex', done: false }
    ]
  },
  getters: {
    // Getter 接收 state 作为第一个参数
    doneTodos(state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// 访问 getter（属性访问方式，有缓存）
store.getters.doneTodos  // [{ id: 1, text: '学习 Vue', done: true }]`,

      accessOtherGetters: `getters: {
  doneTodos(state) {
    return state.todos.filter(todo => todo.done)
  },
  
  // 第二个参数 getters，可以访问其他 getter
  doneTodosCount(state, getters) {
    return getters.doneTodos.length
  }
}`,

      returnFunction: `getters: {
  // 返回一个函数，可以传递参数
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}

// 使用时传入参数（方法访问方式，不缓存）
store.getters.getTodoById(2)  // { id: 2, text: '学习 Vuex', done: false }`
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
  max-width: 1000px;
  margin: 0 auto;
}

.concept-content {
  .metaphor {
    display: flex;
    gap: 16px;
    padding: 16px;
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-radius: 12px;
    margin-bottom: 20px;
    
    .metaphor-icon {
      font-size: 32px;
    }
    
    .metaphor-text {
      font-size: 15px;
      line-height: 1.6;
    }
  }
  
  .definition-box {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    
    h4 {
      margin-bottom: 8px;
      color: #1d1d1f;
    }
    
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 8px;
      
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  
  .feature-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    
    .feature-item {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: #f0f0f5;
      border-radius: 8px;
      
      .feature-icon {
        font-size: 24px;
      }
      
      strong {
        display: block;
        margin-bottom: 4px;
        color: #1d1d1f;
      }
      
      p {
        font-size: 13px;
        color: #86868b;
        margin: 0;
      }
    }
  }
}

.compare-section {
  .compare-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
    
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e5e5ea;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #1d1d1f;
    }
    
    td {
      color: #666;
    }
    
    tr:last-child td {
      border-bottom: none;
    }
  }
  
  .tip-inline {
    background: #e3f2fd;
    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    color: #1976d2;
  }
}

.syntax-section {
  h4 {
    margin-bottom: 12px;
    color: #1d1d1f;
    font-size: 15px;
    
    &:not(:first-child) {
      margin-top: 24px;
    }
  }
}
</style>
