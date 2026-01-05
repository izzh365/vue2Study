<template>
  <div class="knowledge-page">
    <h1>📊 9.1 State 状态</h1>
    
    <!-- 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <p class="analogy">
          <strong>通俗比喻</strong>：State 就像<strong>仓库的货架</strong>——
          所有商品（数据）都整齐地摆放在货架上，任何员工（组件）都可以来查看库存。
        </p>
        <p class="definition">
          <strong>官方定义</strong>：Vuex 使用<strong>单一状态树</strong>（Single State Tree），
          用一个对象包含了全部的应用层级状态，作为"唯一数据源"（SSOT）存在。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 为什么需要 -->
    <KnowledgeCard title="💡 为什么需要 Vuex">
      <div class="why-content">
        <h4>😫 没有 Vuex 时的痛点：</h4>
        <ul>
          <li>多个组件共享状态时，需要层层传递 props</li>
          <li>兄弟组件通信需要借助父组件中转，代码复杂</li>
          <li>跨层级组件通信更加困难</li>
          <li>状态分散在各个组件中，难以追踪和调试</li>
        </ul>
        <h4>✅ 使用 Vuex 的好处：</h4>
        <ul>
          <li><strong>集中管理</strong>：所有状态存放在一个地方</li>
          <li><strong>可预测</strong>：状态变化可追踪、可调试</li>
          <li><strong>任意组件访问</strong>：不需要层层传递</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 基本语法">
      <CodeBlock :code="storeCode" language="javascript" />
      <p class="tip">State 必须是一个函数（在模块中），返回一个对象。这样每个模块实例都有独立的状态。</p>
    </KnowledgeCard>

    <!-- 访问 State -->
    <KnowledgeCard title="🔍 在组件中访问 State">
      <h4>方式一：直接访问</h4>
      <CodeBlock :code="accessCode1" language="javascript" />
      
      <h4>方式二：computed 计算属性</h4>
      <CodeBlock :code="accessCode2" language="javascript" />
      
      <h4>方式三：mapState 辅助函数（推荐）</h4>
      <CodeBlock :code="mapStateCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 展示 -->
    <KnowledgeCard title="🎯 交互演示">
      <DemoBox
        demoPath="vuex/state-basic"
        title="Demo 1: State 基础用法"
        :height="380"
      />
      <DemoBox
        demoPath="vuex/state-mapstate"
        title="Demo 2: mapState 辅助函数"
        :height="420"
      />
      <DemoBox
        demoPath="vuex/state-spread"
        title="Demo 3: 展开运算符混合本地计算属性"
        :height="400"
      />
      <DemoBox
        demoPath="vuex/state-module"
        title="Demo 4: 模块中的 State"
        :height="450"
      />
      <DemoBox
        demoPath="vuex/state-reactive"
        title="Demo 5: 响应式原理演示"
        :height="420"
      />
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>不要直接修改 State：</strong>必须通过 mutation 来修改，否则无法追踪状态变化</li>
        <li><strong>模块中 State 必须是函数：</strong>避免多个模块实例共享同一个对象</li>
        <li><strong>使用展开运算符：</strong>mapState 返回对象，需要用 ... 展开到 computed 中</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="info" title="💡 最佳实践">
      <ul>
        <li>优先使用 <code>mapState</code> 辅助函数，代码更简洁</li>
        <li>State 中只存放需要共享的数据，组件私有数据放在组件的 data 中</li>
        <li>复杂应用使用模块化组织 State</li>
        <li>使用 Vue DevTools 调试 Vuex 状态变化</li>
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
  name: 'VuexState',
  mixins: [scrollTrackingMixin],
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  data() {
    return {
      storeCode: `// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 这里定义共享状态
    count: 0,
    user: {
      name: '张三',
      age: 25
    },
    todos: [
      { id: 1, text: '学习 Vuex', done: true },
      { id: 2, text: '学习 Vue Router', done: false }
    ]
  }
})`,
      accessCode1: `// 方式一：直接访问（不推荐，代码冗长）
export default {
  computed: {
    count() {
      return this.$store.state.count
    }
  }
}`,
      accessCode2: `// 方式二：computed 计算属性
export default {
  computed: {
    count() {
      return this.$store.state.count
    },
    userName() {
      return this.$store.state.user.name
    }
  }
}`,
      mapStateCode: `// 方式三：mapState 辅助函数（推荐）
import { mapState } from 'vuex'

export default {
  computed: {
    // 使用对象展开运算符将 mapState 混入 computed
    ...mapState({
      // 箭头函数写法
      count: state => state.count,
      // 字符串写法，等同于 state => state.user
      user: 'user',
      // 普通函数，可以使用 this 访问本地数据
      countPlusLocal(state) {
        return state.count + this.localCount
      }
    }),
    
    // 数组写法：属性名与 state 键名相同时
    ...mapState(['count', 'user', 'todos'])
  }
}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';

.knowledge-page {
  max-width: 900px;
  
  h1 {
    font-size: $font-size-2xl;
    margin-bottom: $spacing-lg;
    .icon { font-size: 36px; }
  }
}

.concept-content {
  .analogy {
    background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-primary-light, 0.1));
    padding: $spacing-md;
    border-radius: $radius-md;
    margin-bottom: $spacing-md;
  }
  
  .definition {
    color: $color-text-secondary;
  }
}

.why-content {
  h4 {
    margin: $spacing-md 0 $spacing-sm;
    &:first-child { margin-top: 0; }
  }
  
  ul {
    padding-left: $spacing-lg;
    
    li {
      margin-bottom: $spacing-xs;
    }
  }
}

.tip {
  margin-top: $spacing-sm;
  padding: $spacing-sm;
  background: rgba($color-info, 0.1);
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: $color-text-secondary;
}
</style>
