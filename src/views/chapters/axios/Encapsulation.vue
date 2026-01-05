<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>📦 Axios 封装实践</h1>
      <p class="subtitle">项目级别的请求封装与 API 管理最佳实践</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 概念说明（是什么）">
      <div class="concept-content">
        <p><strong>Axios 封装</strong> 就像建一个「快递驿站」：</p>
        <ul>
          <li>📮 <strong>统一入口</strong>：所有快递都从驿站发出，不用自己跑快递公司</li>
          <li>📋 <strong>标准化流程</strong>：寄件单格式统一、收费标准统一</li>
          <li>🔧 <strong>增值服务</strong>：自动包装、自动保价、异常处理</li>
          <li>📊 <strong>可追溯</strong>：所有记录都在驿站系统里</li>
        </ul>
        
        <div class="highlight-box">
          <h4>💡 为什么要封装？</h4>
          <p>直接用 axios 会导致：重复代码多、难以统一管理、修改成本高。</p>
          <p>封装后：一处修改、处处生效，代码整洁、易于维护。</p>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 封装架构 -->
    <KnowledgeCard title="🏗️ 封装架构">
      <div class="architecture-diagram">
        <pre class="structure-tree">
src/
├── api/                    # API 模块目录
│   ├── index.js           # 统一导出
│   ├── user.js            # 用户相关 API
│   ├── product.js         # 商品相关 API
│   └── order.js           # 订单相关 API
│
├── utils/
│   └── request.js         # Axios 实例封装
│
└── config/
    └── index.js           # 配置文件（baseURL 等）
        </pre>
      </div>
      
      <div class="layer-description">
        <div class="layer">
          <span class="layer-name">🔧 request.js</span>
          <span class="layer-desc">底层：创建 Axios 实例，配置拦截器</span>
        </div>
        <div class="layer">
          <span class="layer-name">📁 api/*.js</span>
          <span class="layer-desc">中层：按模块组织具体的 API 函数</span>
        </div>
        <div class="layer">
          <span class="layer-name">🖥️ 组件</span>
          <span class="layer-desc">上层：调用 API 函数，处理业务逻辑</span>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 核心封装代码 -->
    <KnowledgeCard title="📝 核心封装代码">
      <div class="code-section">
        <h4>1. request.js - Axios 实例</h4>
        <CodeBlock :code="requestCode" language="javascript" />
        
        <h4 class="mt-lg">2. api/user.js - 用户模块</h4>
        <CodeBlock :code="userApiCode" language="javascript" />
        
        <h4 class="mt-lg">3. 组件中使用</h4>
        <CodeBlock :code="usageCode" language="javascript" />
      </div>
    </KnowledgeCard>

    <!-- 基础示例 -->
    <KnowledgeCard title="🎯 基础示例">
      <DemoBox 
        demoPath="axios/encapsulation-basic"
        title="Demo 1: 基础封装结构"
        description="展示 request.js 的基本封装方式"
        height="420px"
      />
      
      <DemoBox 
        demoPath="axios/encapsulation-api"
        title="Demo 2: API 模块化"
        description="按业务模块组织 API 函数"
        height="400px"
      />
    </KnowledgeCard>

    <!-- 进阶封装 -->
    <KnowledgeCard title="⚡ 进阶封装">
      <DemoBox 
        demoPath="axios/encapsulation-error"
        title="Demo 3: 统一错误处理"
        description="全局错误提示、业务错误码处理"
        height="400px"
      />
      
      <DemoBox 
        demoPath="axios/encapsulation-env"
        title="Demo 4: 多环境配置"
        description="开发/测试/生产环境的 baseURL 切换"
        height="380px"
      />
    </KnowledgeCard>

    <!-- 完整封装 -->
    <KnowledgeCard title="🎨 完整封装模板">
      <DemoBox 
        demoPath="axios/encapsulation-full"
        title="Demo 5: 生产级完整封装"
        description="包含 Token、Loading、错误处理、请求取消等功能"
        height="500px"
      />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 封装最佳实践">
      <ul>
        <li><strong>单一职责</strong>：request.js 只负责请求配置，API 模块只负责定义接口</li>
        <li><strong>统一导出</strong>：通过 api/index.js 统一导出所有 API</li>
        <li><strong>环境隔离</strong>：使用环境变量管理不同环境的配置</li>
        <li><strong>类型注释</strong>：使用 JSDoc 注释参数和返回值类型</li>
        <li><strong>错误分类</strong>：区分网络错误、业务错误、权限错误</li>
      </ul>
    </TipBox>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li>不要在 request.js 中处理具体业务逻辑</li>
        <li>避免在拦截器中做太多事情，保持职责单一</li>
        <li>Token 刷新逻辑要处理好并发请求的情况</li>
        <li>生产环境要关闭 console.log 输出</li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * Encapsulation.vue
 * Axios 封装实践详解页面
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'
import scrollTrackingMixin from '@/utils/scrollTrackingMixin'

export default {
  name: 'AxiosEncapsulation',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      // request.js 封装代码
      requestCode: `// utils/request.js
import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 添加 Token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`
    }
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
  response => response.data,
  error => {
    // 统一错误处理
    const message = error.response?.data?.message || '请求失败'
    console.error(message)
    return Promise.reject(error)
  }
)

export default request`,

      // 用户 API 模块代码
      userApiCode: `// api/user.js
import request from '@/utils/request'

/**
 * 用户登录
 * @param {Object} data - 登录信息
 * @param {string} data.username - 用户名
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param {number} id - 用户 ID
 * @returns {Promise}
 */
export function getUserInfo(id) {
  return request({
    url: \`/user/\${id}\`,
    method: 'get'
  })
}

/**
 * 更新用户信息
 * @param {Object} data - 用户信息
 * @returns {Promise}
 */
export function updateUser(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}`,

      // 组件使用代码
      usageCode: `// 在 Vue 组件中使用
import { login, getUserInfo } from '@/api/user'

export default {
  methods: {
    async handleLogin() {
      try {
        const res = await login({
          username: 'admin',
          password: '123456'
        })
        // 保存 Token
        localStorage.setItem('token', res.token)
        // 获取用户信息
        const userInfo = await getUserInfo(res.userId)
        console.log('用户信息:', userInfo)
      } catch (err) {
        console.error('登录失败:', err)
      }
    }
  }
}`
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

.concept-content {
  p {
    margin-bottom: 16px;
    line-height: 1.8;
  }
  
  ul {
    margin: 16px 0;
    padding-left: 20px;
    
    li {
      margin-bottom: 12px;
      line-height: 1.6;
    }
  }
}

.highlight-box {
  background: #f0f9ff;
  border-left: 4px solid #007aff;
  padding: 16px;
  border-radius: 0 8px 8px 0;
  margin-top: 16px;
  
  h4 {
    color: #007aff;
    margin-bottom: 8px;
  }
  
  p {
    margin-bottom: 8px;
    font-size: 14px;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.architecture-diagram {
  margin-bottom: 20px;
}

.structure-tree {
  background: #1d1d1f;
  color: #e5e5ea;
  padding: 16px;
  border-radius: 8px;
  font-family: 'SF Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
}

.layer-description {
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  .layer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #f5f5f7;
    border-radius: 8px;
  }
  
  .layer-name {
    font-weight: 600;
    color: #1d1d1f;
    min-width: 120px;
  }
  
  .layer-desc {
    color: #86868b;
    font-size: 14px;
  }
}

.code-section {
  h4 {
    font-size: 14px;
    color: #1d1d1f;
    margin-bottom: 12px;
    
    &.mt-lg {
      margin-top: 24px;
    }
  }
}
</style>
