<template>
  <div class="knowledge-page">
    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 Mutations">
      <div class="concept-content">
        <div class="metaphor">
          <div class="metaphor-icon">🔧</div>
          <div class="metaphor-text">
            <strong>通俗比喻：</strong>Mutations 就像<strong>仓库管理员的操作记录本</strong>。
            每次修改仓库（State）的库存，都必须在本子上记录下来：谁、什么时间、做了什么操作。
            这样仓库的变化就有据可查了！
          </div>
        </div>
        
        <div class="definition-box">
          <h4>📚 官方定义</h4>
          <p><strong>Mutations</strong> 是更改 Vuex store 中 state 的<strong>唯一方法</strong>。</p>
          <p>每个 mutation 都有一个字符串类型的<strong>事件类型（type）</strong>和一个<strong>回调函数（handler）</strong>。</p>
        </div>
        
        <div class="key-rules">
          <h4>🔑 核心规则</h4>
          <div class="rule-grid">
            <div class="rule-item">
              <span class="rule-icon">1️⃣</span>
              <div>
                <strong>必须是同步函数</strong>
                <p>异步操作请使用 Actions</p>
              </div>
            </div>
            <div class="rule-item">
              <span class="rule-icon">2️⃣</span>
              <div>
                <strong>使用 commit 触发</strong>
                <p>不能直接调用 mutation 函数</p>
              </div>
            </div>
            <div class="rule-item">
              <span class="rule-icon">3️⃣</span>
              <div>
                <strong>可以携带 Payload</strong>
                <p>传递额外参数给 mutation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <div class="syntax-section">
        <h4>定义 Mutation</h4>
        <CodeBlock :code="defineMutation" language="javascript" />
        
        <h4>提交 Mutation</h4>
        <CodeBlock :code="commitMutation" language="javascript" />
        
        <h4>带 Payload 的 Mutation</h4>
        <CodeBlock :code="payloadMutation" language="javascript" />
        
        <h4>对象风格提交</h4>
        <CodeBlock :code="objectStyleCommit" language="javascript" />
      </div>
    </KnowledgeCard>

    <!-- Demo: 基础用法 -->
    <KnowledgeCard title="🎯 Demo 1: Mutations 基础用法">
      <DemoBox 
        demoPath="vuex/mutations-basic"
        title="计数器增减"
        :height="'350px'"
      />
    </KnowledgeCard>

    <!-- Demo: Payload -->
    <KnowledgeCard title="🎯 Demo 2: Payload 载荷">
      <DemoBox 
        demoPath="vuex/mutations-payload"
        title="带参数的 Mutation"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- Demo: 对象风格 -->
    <KnowledgeCard title="🎯 Demo 3: 对象风格提交">
      <DemoBox 
        demoPath="vuex/mutations-object"
        title="使用对象传递多个参数"
        :height="'350px'"
      />
    </KnowledgeCard>

    <!-- Demo: mapMutations -->
    <KnowledgeCard title="🎯 Demo 4: mapMutations 辅助函数">
      <DemoBox 
        demoPath="vuex/mutations-map"
        title="使用 mapMutations 简化代码"
        :height="'400px'"
      />
    </KnowledgeCard>

    <!-- Demo: 常量类型 -->
    <KnowledgeCard title="🎯 Demo 5: 使用常量定义 Mutation 类型">
      <DemoBox 
        demoPath="vuex/mutations-const"
        title="大型项目的最佳实践"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- 为什么必须同步 -->
    <TipBox type="info" title="💡 为什么 Mutation 必须是同步的？">
      <p>Vuex 的设计理念是<strong>可追踪的状态变化</strong>。DevTools 会在 mutation 触发时捕获状态快照。</p>
      <p>如果 mutation 中有异步操作，DevTools 无法知道状态何时变化，导致调试困难。</p>
      <p>异步操作应该放在 <strong>Actions</strong> 中处理！</p>
    </TipBox>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>不要在 mutation 中做异步操作：</strong>setTimeout、Ajax、Promise 等都不行</li>
        <li><strong>Payload 推荐使用对象：</strong>便于传递多个参数，也更易阅读</li>
        <li><strong>大型项目使用常量：</strong>避免拼写错误，便于搜索和替换</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li>mutation 命名使用大写 + 下划线：<code>SET_USER</code>、<code>ADD_TODO</code></li>
        <li>一个 mutation 只做一件事，保持简单</li>
        <li>使用 <code>mapMutations</code> 简化组件中的代码</li>
        <li>复杂逻辑放在 actions 中，mutation 只负责实际的状态修改</li>
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
  name: 'VuexMutations',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      defineMutation: `const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    // mutation 接收 state 作为第一个参数
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  }
})`,

      commitMutation: `// 方式1：在组件中提交
this.$store.commit('increment')

// 方式2：直接在 store 上提交
store.commit('increment')`,

      payloadMutation: `// 定义带 payload 的 mutation
mutations: {
  // payload 是第二个参数
  incrementBy(state, n) {
    state.count += n
  },
  // payload 推荐使用对象
  addTodo(state, payload) {
    state.todos.push({
      id: payload.id,
      text: payload.text,
      done: false
    })
  }
}

// 提交时传入 payload
this.$store.commit('incrementBy', 10)
this.$store.commit('addTodo', { id: 1, text: '学习 Vuex' })`,

      objectStyleCommit: `// 对象风格提交
// 整个对象作为 payload 传入
this.$store.commit({
  type: 'addTodo',
  id: 1,
  text: '学习 Vuex'
})

// mutation 中通过 payload.xxx 访问
mutations: {
  addTodo(state, payload) {
    state.todos.push({
      id: payload.id,    // 1
      text: payload.text // '学习 Vuex'
    })
  }
}`
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
    background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
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
  
  .key-rules {
    h4 {
      margin-bottom: 12px;
      color: #1d1d1f;
    }
    
    .rule-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    
    .rule-item {
      display: flex;
      gap: 12px;
      padding: 16px;
      background: #f0f0f5;
      border-radius: 8px;
      
      .rule-icon {
        font-size: 20px;
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
