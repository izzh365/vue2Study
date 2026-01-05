<template>
  <div class="knowledge-page">
    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 Actions">
      <div class="concept-content">
        <div class="metaphor">
          <div class="metaphor-icon">📋</div>
          <div class="metaphor-text">
            <strong>通俗比喻：</strong>Actions 就像<strong>经理下达的工作指令</strong>。
            经理（Action）不会直接动手修改仓库，而是安排好工作计划后，
            让仓库管理员（Mutation）去执行实际操作。经理可以同时安排多个任务，也可以等一个任务完成后再安排下一个。
          </div>
        </div>
        
        <div class="definition-box">
          <h4>📚 官方定义</h4>
          <p><strong>Actions</strong> 类似于 mutations，但有两点不同：</p>
          <ul>
            <li>Action <strong>提交的是 mutation</strong>，而不是直接变更状态</li>
            <li>Action 可以包含任意<strong>异步操作</strong></li>
          </ul>
        </div>
        
        <div class="compare-table-section">
          <h4>⚖️ Actions vs Mutations</h4>
          <table class="compare-table">
            <thead>
              <tr>
                <th>特性</th>
                <th>Mutations</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>触发方式</td>
                <td><code>commit</code></td>
                <td><code>dispatch</code></td>
              </tr>
              <tr>
                <td>异步操作</td>
                <td>❌ 不可以</td>
                <td>✅ 可以</td>
              </tr>
              <tr>
                <td>修改 state</td>
                <td>✅ 直接修改</td>
                <td>❌ 通过 commit mutation</td>
              </tr>
              <tr>
                <td>返回值</td>
                <td>无</td>
                <td>可返回 Promise</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <div class="syntax-section">
        <h4>基本 Action 定义</h4>
        <CodeBlock :code="basicAction" language="javascript" />
        
        <h4>分发 Action</h4>
        <CodeBlock :code="dispatchAction" language="javascript" />
        
        <h4>异步 Action（返回 Promise）</h4>
        <CodeBlock :code="asyncAction" language="javascript" />
        
        <h4>组合 Actions</h4>
        <CodeBlock :code="composeActions" language="javascript" />
      </div>
    </KnowledgeCard>

    <!-- Demo: 基础用法 -->
    <KnowledgeCard title="🎯 Demo 1: Actions 基础用法">
      <DemoBox 
        demoPath="vuex/actions-basic"
        title="异步计数器"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- Demo: 异步请求 -->
    <KnowledgeCard title="🎯 Demo 2: 异步请求数据">
      <DemoBox 
        demoPath="vuex/actions-async"
        title="模拟 API 请求"
        :height="'420px'"
      />
    </KnowledgeCard>

    <!-- Demo: Promise 返回 -->
    <KnowledgeCard title="🎯 Demo 3: Action 返回 Promise">
      <DemoBox 
        demoPath="vuex/actions-promise"
        title="等待 Action 完成"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- Demo: mapActions -->
    <KnowledgeCard title="🎯 Demo 4: mapActions 辅助函数">
      <DemoBox 
        demoPath="vuex/actions-map"
        title="使用 mapActions 简化代码"
        :height="'380px'"
      />
    </KnowledgeCard>

    <!-- Demo: 组合 Actions -->
    <KnowledgeCard title="🎯 Demo 5: 组合 Actions">
      <DemoBox 
        demoPath="vuex/actions-compose"
        title="Action 中调用其他 Action"
        :height="'400px'"
      />
    </KnowledgeCard>

    <!-- Context 参数 -->
    <TipBox type="info" title="💡 Action 的 Context 参数">
      <p>Action 函数接收一个 <strong>context</strong> 对象，包含以下属性：</p>
      <ul>
        <li><code>commit</code> - 提交 mutation</li>
        <li><code>dispatch</code> - 分发其他 action</li>
        <li><code>state</code> - 当前模块的 state</li>
        <li><code>getters</code> - 当前模块的 getters</li>
        <li><code>rootState</code> - 根模块的 state（模块化时）</li>
        <li><code>rootGetters</code> - 根模块的 getters（模块化时）</li>
      </ul>
    </TipBox>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>不要在 Action 中直接修改 state：</strong>必须通过 commit mutation</li>
        <li><strong>Action 中的错误要妥善处理：</strong>使用 try-catch 或 Promise.catch</li>
        <li><strong>复杂逻辑放在 Action 中：</strong>保持 mutation 简单纯粹</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li>API 请求统一放在 actions 中处理</li>
        <li>Action 返回 Promise 便于调用方知道何时完成</li>
        <li>使用 async/await 使代码更清晰</li>
        <li>使用 <code>mapActions</code> 简化组件中的代码</li>
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
  name: 'VuexActions',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      basicAction: `const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    }
  },
  actions: {
    // Action 接收 context 对象
    // 通常使用解构获取 commit
    increment({ commit }) {
      commit('increment')
    },
    
    // 异步 Action
    incrementAsync({ commit }) {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})`,

      dispatchAction: `// 方式1：在组件中分发
this.$store.dispatch('increment')

// 方式2：带 payload
this.$store.dispatch('incrementAsync', { amount: 10 })

// 方式3：对象风格
this.$store.dispatch({
  type: 'incrementAsync',
  amount: 10
})`,

      asyncAction: `actions: {
  // 返回 Promise
  fetchUser({ commit }, userId) {
    return new Promise((resolve, reject) => {
      api.getUser(userId)
        .then(user => {
          commit('SET_USER', user)
          resolve(user)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  
  // 使用 async/await（推荐）
  async fetchUser({ commit }, userId) {
    try {
      const user = await api.getUser(userId)
      commit('SET_USER', user)
      return user
    } catch (error) {
      throw error
    }
  }
}`,

      composeActions: `actions: {
  // Action A
  actionA({ commit }) {
    return new Promise(resolve => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  },
  
  // Action B 等待 Action A 完成后执行
  async actionB({ dispatch, commit }) {
    await dispatch('actionA')
    commit('someOtherMutation')
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
    background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
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
    }
    
    ul {
      margin: 0;
      padding-left: 20px;
      color: #666;
      
      li {
        margin-bottom: 4px;
      }
    }
  }
  
  .compare-table-section {
    h4 {
      margin-bottom: 12px;
      color: #1d1d1f;
    }
    
    .compare-table {
      width: 100%;
      border-collapse: collapse;
      
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
      
      code {
        background: #f0f0f5;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 13px;
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
