<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>拦截器</h1>
      <p class="subtitle">在请求发送前和响应返回后进行统一处理</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 概念说明">
      <p><strong>拦截器</strong>可以在请求发送前或响应返回后，对数据进行统一处理。</p>
      
      <div class="analogy-box">
        <h4>🎭 通俗比喻</h4>
        <p>拦截器就像机场的安检：</p>
        <ul>
          <li><strong>请求拦截器</strong> = 出发安检：检查证件、添加行李标签</li>
          <li><strong>响应拦截器</strong> = 到达检查：检查包裹、处理异常情况</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 拦截器流程 -->
    <KnowledgeCard title="🔄 拦截器执行流程">
      <div class="flow-diagram">
        <div class="flow-item">📤 发送请求</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item highlight">🔒 请求拦截器</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item">🌐 服务器处理</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item highlight">🔓 响应拦截器</div>
        <div class="flow-arrow">↓</div>
        <div class="flow-item">✅ 返回结果</div>
      </div>
    </KnowledgeCard>

    <!-- 请求拦截器 -->
    <KnowledgeCard title="📤 请求拦截器">
      <p>在请求发送前执行，常用于：</p>
      <ul>
        <li>添加认证 Token</li>
        <li>添加公共请求头</li>
        <li>显示 loading 状态</li>
        <li>请求数据格式化</li>
      </ul>
      <CodeBlock :code="requestInterceptorCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 1: 请求拦截器 -->
    <KnowledgeCard title="🎯 Demo 1: 请求拦截器 - 添加 Token">
      <p>自动为每个请求添加认证 Token：</p>
      <DemoBox 
        demoPath="axios/interceptor-request"
        title="请求拦截器演示"
        height="400px"
      />
    </KnowledgeCard>

    <!-- 响应拦截器 -->
    <KnowledgeCard title="📥 响应拦截器">
      <p>在响应返回后执行，常用于：</p>
      <ul>
        <li>统一处理响应数据格式</li>
        <li>统一错误处理</li>
        <li>关闭 loading 状态</li>
        <li>Token 过期自动刷新</li>
      </ul>
      <CodeBlock :code="responseInterceptorCode" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 2: 响应拦截器 -->
    <KnowledgeCard title="🎯 Demo 2: 响应拦截器 - 统一处理">
      <p>统一处理响应格式和错误：</p>
      <DemoBox 
        demoPath="axios/interceptor-response"
        title="响应拦截器演示"
        height="420px"
      />
    </KnowledgeCard>

    <!-- Demo 3: Loading 状态 -->
    <KnowledgeCard title="🎯 Demo 3: 全局 Loading 状态">
      <p>使用拦截器自动管理 loading 状态：</p>
      <DemoBox 
        demoPath="axios/interceptor-loading"
        title="Loading 状态管理"
        height="380px"
      />
    </KnowledgeCard>

    <!-- Demo 4: 移除拦截器 -->
    <KnowledgeCard title="🎯 Demo 4: 移除拦截器">
      <p>动态添加和移除拦截器：</p>
      <DemoBox 
        demoPath="axios/interceptor-eject"
        title="移除拦截器"
        height="400px"
      />
    </KnowledgeCard>

    <!-- Demo 5: 多个拦截器 -->
    <KnowledgeCard title="🎯 Demo 5: 多个拦截器执行顺序">
      <p>理解多个拦截器的执行顺序：</p>
      <DemoBox 
        demoPath="axios/interceptor-order"
        title="拦截器执行顺序"
        height="420px"
      />
    </KnowledgeCard>

    <!-- 执行顺序说明 -->
    <KnowledgeCard title="📋 多个拦截器执行顺序">
      <table class="info-table">
        <thead>
          <tr>
            <th>类型</th>
            <th>执行顺序</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>请求拦截器</td>
            <td>后添加先执行</td>
            <td>类似栈结构（LIFO）</td>
          </tr>
          <tr>
            <td>响应拦截器</td>
            <td>先添加先执行</td>
            <td>类似队列结构（FIFO）</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ol>
        <li><strong>请求拦截器添加 Token</strong>：统一处理认证</li>
        <li><strong>响应拦截器解包 data</strong>：直接返回 response.data</li>
        <li><strong>统一错误处理</strong>：根据状态码显示不同提示</li>
        <li><strong>Loading 状态管理</strong>：配合 Vuex 使用</li>
        <li><strong>Token 过期自动刷新</strong>：401 时刷新 token 重试</li>
      </ol>
    </TipBox>

    <!-- 常见错误 -->
    <TipBox type="error" title="❌ 常见错误">
      <div class="error-example">
        <p><strong>错误：忘记返回 config 或 response</strong></p>
        <CodeBlock :code="errorExample" language="javascript" />
        <p><strong>正确：必须返回处理后的 config 或 response</strong></p>
        <CodeBlock :code="correctExample" language="javascript" />
      </div>
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
  name: 'AxiosInterceptors',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      requestInterceptorCode: `// 请求拦截器
axios.interceptors.request.use(
  config => {
    // ✅ 在请求发送前做些什么
    
    // 1. 添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`
    }
    
    // 2. 显示 loading
    store.commit('SET_LOADING', true)
    
    // 必须返回 config
    return config
  },
  error => {
    // ❌ 请求错误处理
    return Promise.reject(error)
  }
)`,

      responseInterceptorCode: `// 响应拦截器
axios.interceptors.response.use(
  response => {
    // ✅ 响应成功处理
    
    // 1. 关闭 loading
    store.commit('SET_LOADING', false)
    
    // 2. 直接返回 data
    return response.data
  },
  error => {
    // ❌ 响应错误处理
    store.commit('SET_LOADING', false)
    
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Token 过期，跳转登录
          router.push('/login')
          break
        case 403:
          alert('没有权限')
          break
        case 500:
          alert('服务器错误')
          break
      }
    }
    
    return Promise.reject(error)
  }
)`,

      errorExample: `// ❌ 错误：没有返回 config
axios.interceptors.request.use(config => {
  config.headers.Token = 'xxx'
  // 忘记 return config 会导致请求失败！
})`,

      correctExample: `// ✅ 正确：必须返回 config
axios.interceptors.request.use(config => {
  config.headers.Token = 'xxx'
  return config  // 必须返回！
})`
    }
  }
}
</script>

<style lang="scss" scoped>
.knowledge-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
  
  h1 {
    font-size: 28px;
    color: #1d1d1f;
    margin-bottom: 8px;
  }
  
  .subtitle {
    color: #86868b;
    font-size: 16px;
  }
}

.analogy-box {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  
  h4 {
    margin-bottom: 8px;
    color: #9d174d;
  }
  
  p, ul {
    color: #831843;
    font-size: 14px;
  }
  
  ul {
    padding-left: 20px;
    margin-top: 8px;
  }
}

.flow-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  
  .flow-item {
    padding: 12px 24px;
    background: white;
    border: 2px solid #e5e5ea;
    border-radius: 8px;
    font-weight: 500;
    
    &.highlight {
      background: #dbeafe;
      border-color: #3b82f6;
      color: #1e40af;
    }
  }
  
  .flow-arrow {
    padding: 8px;
    color: #86868b;
    font-size: 18px;
  }
}

.info-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  
  th, td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e5e5ea;
  }
  
  th {
    background: #f5f5f7;
    font-weight: 600;
    color: #1d1d1f;
  }
}

.error-example {
  p {
    font-size: 14px;
    margin: 12px 0 8px;
  }
}
</style>
