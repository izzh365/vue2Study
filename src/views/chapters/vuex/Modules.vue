<template>
  <div class="knowledge-page">
    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是 Modules">
      <div class="concept-content">
        <div class="metaphor">
          <div class="metaphor-icon">🏢</div>
          <div class="metaphor-text">
            <strong>通俗比喻：</strong>Modules 就像<strong>公司的部门</strong>。
            当公司规模变大后，不能所有事情都由总经理直接管理，需要分成研发部、市场部、财务部等。
            每个部门有自己的职责和人员（state），有自己的工作流程（mutations/actions）。
          </div>
        </div>
        
        <div class="definition-box">
          <h4>📚 官方定义</h4>
          <p>由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。</p>
          <p>为了解决这个问题，Vuex 允许我们将 store 分割成<strong>模块（module）</strong>。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。</p>
        </div>
        
        <div class="structure-box">
          <h4>🗂️ 模块化结构</h4>
          <div class="tree-structure">
            <pre>
store/
├── index.js          # 组装模块并导出 store
├── state.js          # 根级别状态
├── mutations.js      # 根级别 mutations
└── modules/
    ├── user.js       # 用户模块
    ├── cart.js       # 购物车模块
    └── product.js    # 商品模块</pre>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <div class="syntax-section">
        <h4>基础模块定义</h4>
        <CodeBlock :code="basicModule" language="javascript" />
        
        <h4>命名空间模块</h4>
        <CodeBlock :code="namespacedModule" language="javascript" />
        
        <h4>访问命名空间模块</h4>
        <CodeBlock :code="accessNamespaced" language="javascript" />
      </div>
    </KnowledgeCard>

    <!-- Demo: 基础模块 -->
    <KnowledgeCard title="🎯 Demo 1: 基础模块">
      <DemoBox 
        demoPath="vuex/modules-basic"
        title="分割 Store 为模块"
        :height="'400px'"
      />
    </KnowledgeCard>

    <!-- Demo: 命名空间 -->
    <KnowledgeCard title="🎯 Demo 2: 命名空间">
      <DemoBox 
        demoPath="vuex/modules-namespace"
        title="namespaced: true 的作用"
        :height="'420px'"
      />
    </KnowledgeCard>

    <!-- Demo: 访问根状态 -->
    <KnowledgeCard title="🎯 Demo 3: 访问根状态">
      <DemoBox 
        demoPath="vuex/modules-root"
        title="模块中访问 rootState 和 rootGetters"
        :height="'400px'"
      />
    </KnowledgeCard>

    <!-- Demo: mapState 与模块 -->
    <KnowledgeCard title="🎯 Demo 4: mapState 与模块">
      <DemoBox 
        demoPath="vuex/modules-map"
        title="在组件中使用模块化辅助函数"
        :height="'420px'"
      />
    </KnowledgeCard>

    <!-- Demo: 综合案例 -->
    <KnowledgeCard title="🎯 Demo 5: 综合案例 - 用户与购物车">
      <DemoBox 
        demoPath="vuex/modules-cart"
        title="多模块协作示例"
        :height="'480px'"
      />
    </KnowledgeCard>

    <!-- 命名空间说明 -->
    <TipBox type="info" title="💡 命名空间的作用">
      <p>设置 <code>namespaced: true</code> 后：</p>
      <ul>
        <li>getters、actions、mutations 会自动加上模块路径前缀</li>
        <li><code>getters['user/profile']</code> 替代 <code>getters.profile</code></li>
        <li><code>dispatch('user/login')</code> 替代 <code>dispatch('login')</code></li>
        <li>避免不同模块之间的命名冲突</li>
      </ul>
    </TipBox>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>模块的 state 必须是函数：</strong>返回对象，避免状态共享</li>
        <li><strong>命名空间模块访问根状态：</strong>使用 rootState 和 rootGetters</li>
        <li><strong>在模块中提交根 mutation：</strong>传入 <code>{ root: true }</code></li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li>按功能划分模块（用户、商品、购物车等）</li>
        <li>统一使用命名空间，便于维护</li>
        <li>使用 <code>createNamespacedHelpers</code> 简化组件代码</li>
        <li>保持模块独立，减少模块间的直接依赖</li>
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
  name: 'VuexModules',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      basicModule: `// store/modules/user.js
const userModule = {
  state: () => ({
    name: '',
    isLoggedIn: false
  }),
  
  mutations: {
    SET_NAME(state, name) {
      state.name = name
    },
    SET_LOGGED_IN(state, status) {
      state.isLoggedIn = status
    }
  },
  
  actions: {
    login({ commit }, username) {
      commit('SET_NAME', username)
      commit('SET_LOGGED_IN', true)
    }
  },
  
  getters: {
    displayName: state => state.name || '游客'
  }
}

// store/index.js
const store = new Vuex.Store({
  modules: {
    user: userModule  // 注册模块
  }
})

// 访问模块 state
store.state.user.name`,

      namespacedModule: `const userModule = {
  namespaced: true,  // 开启命名空间
  
  state: () => ({
    name: '',
    isLoggedIn: false
  }),
  
  mutations: {
    // 实际路径：'user/SET_NAME'
    SET_NAME(state, name) {
      state.name = name
    }
  },
  
  actions: {
    // 实际路径：'user/login'
    login({ commit }, username) {
      commit('SET_NAME', username)
    }
  },
  
  getters: {
    // 实际路径：'user/displayName'
    displayName: state => state.name || '游客'
  }
}`,

      accessNamespaced: `// 1. 在组件中访问命名空间模块
computed: {
  // 使用命名空间前缀
  ...mapState('user', ['name', 'isLoggedIn']),
  ...mapGetters('user', ['displayName'])
},
methods: {
  ...mapMutations('user', ['SET_NAME']),
  ...mapActions('user', ['login'])
}

// 2. 使用 createNamespacedHelpers
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('user')

export default {
  computed: {
    ...mapState(['name', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['login'])
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
  
  .structure-box {
    background: #f8f9fa;
    padding: 16px;
    border-radius: 8px;
    
    h4 {
      margin-bottom: 12px;
      color: #1d1d1f;
    }
    
    .tree-structure {
      background: #1e1e1e;
      border-radius: 8px;
      padding: 16px;
      
      pre {
        margin: 0;
        color: #d4d4d4;
        font-family: 'SF Mono', monospace;
        font-size: 13px;
        line-height: 1.5;
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
