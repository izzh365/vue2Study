<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>响应处理</h1>
      <p class="subtitle">理解 Axios 响应结构和错误处理机制</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 概念说明">
      <p>Axios 请求成功后返回一个<strong>响应对象（response）</strong>，包含了完整的响应信息：</p>
      <ul>
        <li><strong>data</strong>：服务器返回的数据（最常用）</li>
        <li><strong>status</strong>：HTTP 状态码（如 200、404、500）</li>
        <li><strong>statusText</strong>：状态文本描述</li>
        <li><strong>headers</strong>：响应头信息</li>
        <li><strong>config</strong>：请求配置信息</li>
        <li><strong>request</strong>：原始的 XMLHttpRequest 对象</li>
      </ul>
      
      <div class="analogy-box">
        <h4>🎭 通俗比喻</h4>
        <p>发送 HTTP 请求就像寄快递：</p>
        <ul>
          <li><strong>response.data</strong> = 快递里的物品（你最想要的）</li>
          <li><strong>response.status</strong> = 快递状态（签收/拒收/退回）</li>
          <li><strong>response.headers</strong> = 快递单信息（发件人、日期等）</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 响应结构 -->
    <KnowledgeCard title="📦 响应对象结构">
      <CodeBlock :code="responseStructure" language="javascript" />
    </KnowledgeCard>

    <!-- Demo 1: 响应结构解析 -->
    <KnowledgeCard title="🎯 Demo 1: 解析响应结构">
      <p>查看完整的响应对象结构：</p>
      <DemoBox 
        demoPath="axios/response-structure"
        title="响应结构解析"
        height="380px"
      />
    </KnowledgeCard>

    <!-- HTTP 状态码 -->
    <KnowledgeCard title="📊 HTTP 状态码">
      <table class="info-table">
        <thead>
          <tr>
            <th>状态码范围</th>
            <th>类别</th>
            <th>常见例子</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>1xx</code></td>
            <td>信息性</td>
            <td>100 Continue</td>
          </tr>
          <tr class="highlight-success">
            <td><code>2xx</code></td>
            <td>成功</td>
            <td>200 OK, 201 Created, 204 No Content</td>
          </tr>
          <tr>
            <td><code>3xx</code></td>
            <td>重定向</td>
            <td>301 永久重定向, 302 临时重定向</td>
          </tr>
          <tr class="highlight-warning">
            <td><code>4xx</code></td>
            <td>客户端错误</td>
            <td>400 Bad Request, 401 未授权, 404 Not Found</td>
          </tr>
          <tr class="highlight-error">
            <td><code>5xx</code></td>
            <td>服务器错误</td>
            <td>500 服务器错误, 502 Bad Gateway, 503 服务不可用</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- Demo 2: 状态码处理 -->
    <KnowledgeCard title="🎯 Demo 2: 状态码处理">
      <p>根据不同的状态码进行相应处理：</p>
      <DemoBox 
        demoPath="axios/status-codes"
        title="状态码处理"
        height="400px"
      />
    </KnowledgeCard>

    <!-- 错误处理 -->
    <KnowledgeCard title="⚠️ 错误处理">
      <p>Axios 请求失败时会抛出错误，需要使用 <code>try...catch</code> 或 <code>.catch()</code> 处理：</p>
      <CodeBlock :code="errorHandlingCode" language="javascript" />
      
      <div class="tip-box warning">
        <h4>💡 错误类型</h4>
        <ul>
          <li><strong>网络错误</strong>：无网络连接、DNS 解析失败</li>
          <li><strong>超时错误</strong>：请求超过设定的 timeout</li>
          <li><strong>HTTP 错误</strong>：4xx、5xx 状态码</li>
          <li><strong>取消请求</strong>：手动取消的请求</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- Demo 3: 错误捕获 -->
    <KnowledgeCard title="🎯 Demo 3: 错误捕获与分类">
      <p>区分不同类型的错误并进行相应处理：</p>
      <DemoBox 
        demoPath="axios/error-handling"
        title="错误捕获演示"
        height="420px"
      />
    </KnowledgeCard>

    <!-- Demo 4: 请求取消 -->
    <KnowledgeCard title="🎯 Demo 4: 取消请求">
      <p>使用 <code>AbortController</code> 或 <code>CancelToken</code> 取消进行中的请求：</p>
      <DemoBox 
        demoPath="axios/cancel-request"
        title="取消请求演示"
        height="380px"
      />
    </KnowledgeCard>

    <!-- Demo 5: 统一响应处理 -->
    <KnowledgeCard title="🎯 Demo 5: 统一响应处理">
      <p>封装统一的响应处理函数，简化业务代码：</p>
      <DemoBox 
        demoPath="axios/unified-response"
        title="统一响应处理"
        height="400px"
      />
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ol>
        <li><strong>始终使用 try...catch</strong>：避免未捕获的错误导致应用崩溃</li>
        <li><strong>只取 response.data</strong>：可以在拦截器中统一处理</li>
        <li><strong>区分错误类型</strong>：给用户不同的错误提示</li>
        <li><strong>设置合理的超时</strong>：避免请求无限等待</li>
        <li><strong>取消重复请求</strong>：避免竞态条件问题</li>
      </ol>
    </TipBox>

    <!-- 常见错误 -->
    <TipBox type="error" title="❌ 常见错误">
      <div class="error-example">
        <p><strong>错误写法：不处理错误</strong></p>
        <CodeBlock :code="errorExample1" language="javascript" />
        <p><strong>正确写法：始终捕获错误</strong></p>
        <CodeBlock :code="correctExample1" language="javascript" />
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
  name: 'AxiosResponse',
  
  mixins: [scrollTrackingMixin],
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      // 响应结构
      responseStructure: `// Axios 响应对象结构
const response = await axios.get('/api/users')

// response 对象包含：
{
  data: {},         // 🎯 服务器返回的数据（最常用）
  status: 200,      // HTTP 状态码
  statusText: 'OK', // 状态文本
  headers: {},      // 响应头
  config: {},       // 请求配置
  request: {}       // XMLHttpRequest 对象
}

// 通常只需要 data
const users = response.data`,

      // 错误处理代码
      errorHandlingCode: `try {
  const response = await axios.get('/api/data')
  // 处理成功响应
  console.log(response.data)
  
} catch (error) {
  if (error.response) {
    // 服务器返回了错误状态码（4xx、5xx）
    console.log('状态码:', error.response.status)
    console.log('错误数据:', error.response.data)
    
  } else if (error.request) {
    // 请求已发送，但没有收到响应（网络错误）
    console.log('网络错误，请检查连接')
    
  } else {
    // 请求配置出错
    console.log('请求配置错误:', error.message)
  }
}`,

      // 错误示例
      errorExample1: `// ❌ 不处理错误，可能导致应用崩溃
const data = await axios.get('/api/users')
console.log(data)`,

      // 正确示例
      correctExample1: `// ✅ 始终使用 try...catch
try {
  const { data } = await axios.get('/api/users')
  console.log(data)
} catch (err) {
  console.error('请求失败:', err.message)
  // 显示用户友好的错误提示
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

.analogy-box {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  
  h4 {
    margin-bottom: 8px;
    color: #92400e;
  }
  
  p, ul {
    color: #78350f;
    font-size: 14px;
  }
  
  ul {
    padding-left: 20px;
    margin-top: 8px;
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
  
  code {
    background: #e8e8ed;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
  
  .highlight-success {
    background: #ecfdf5;
  }
  
  .highlight-warning {
    background: #fffbeb;
  }
  
  .highlight-error {
    background: #fef2f2;
  }
}

.tip-box {
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  
  &.warning {
    background: #fffbeb;
    border-left: 4px solid #f59e0b;
  }
  
  h4 {
    margin-bottom: 8px;
  }
  
  ul {
    padding-left: 20px;
    font-size: 14px;
  }
}

.error-example {
  p {
    font-size: 14px;
    margin: 12px 0 8px;
  }
}
</style>
