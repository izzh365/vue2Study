<template>
  <div class="knowledge-page">
    <!-- 章节导航 -->
    <div class="page-header">
      <router-link to="/axios" class="back-link">← 返回 Axios 章节</router-link>
      <h1>📡 10.1 基础请求</h1>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 概念说明">
      <div class="concept-content">
        <p class="analogy">
          <strong>通俗比喻</strong>
          ：Axios 就像<strong>快递员</strong>
          ——你告诉他要送什么（请求数据），送到哪里（URL），他帮你送货并带回回执（响应）。
        </p>
        <p class="definition">
          <strong>官方定义</strong>
          ：Axios 是一个基于 Promise 的 HTTP 客户端，可用于浏览器和 Node.js。
          它提供了简洁的 API 来发送各种类型的 HTTP 请求。
        </p>
      </div>
    </KnowledgeCard>

    <!-- 为什么使用 Axios -->
    <KnowledgeCard title="💡 为什么使用 Axios">
      <div class="why-content">
        <p>相比原生的 <code>fetch</code> 和 <code>XMLHttpRequest</code>，Axios 有以下优势：</p>
        <ul class="feature-list">
          <li><strong>自动转换 JSON</strong>：请求和响应数据自动序列化/反序列化</li>
          <li><strong>拦截器支持</strong>：可以在请求发送前和响应返回后进行统一处理</li>
          <li><strong>取消请求</strong>：支持取消正在进行的请求</li>
          <li><strong>超时设置</strong>：方便设置请求超时时间</li>
          <li><strong>XSRF 防护</strong>：内置 XSRF 防护机制</li>
          <li><strong>浏览器兼容</strong>：兼容 IE11+，无需 polyfill</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <CodeBlock :code="syntaxCode" language="javascript" />
      <div class="syntax-notes">
        <p><code>axios.get(url[, config])</code> - GET 请求</p>
        <p><code>axios.post(url[, data[, config]])</code> - POST 请求</p>
        <p><code>axios(config)</code> - 通用请求方法</p>
      </div>
    </KnowledgeCard>

    <!-- Demo 1: GET 请求 -->
    <KnowledgeCard title="🎯 Demo 1: GET 请求基础">
      <p class="demo-desc">使用 GET 请求获取数据，支持 params 参数传递。</p>
      <DemoBox demoPath="axios/get-basic" title="GET 请求示例" height="420px" />
    </KnowledgeCard>

    <!-- Demo 2: POST 请求 -->
    <KnowledgeCard title="🎯 Demo 2: POST 请求基础">
      <p class="demo-desc">使用 POST 请求发送数据，数据放在请求体中。</p>
      <DemoBox demoPath="axios/post-basic" title="POST 请求示例" height="450px" />
    </KnowledgeCard>

    <!-- Demo 3: 请求配置 -->
    <KnowledgeCard title="🎯 Demo 3: 请求配置详解">
      <p class="demo-desc">Axios 提供了丰富的配置选项，包括 headers、timeout、baseURL 等。</p>
      <DemoBox demoPath="axios/config-options" title="请求配置示例" height="500px" />
    </KnowledgeCard>

    <!-- Demo 4: 请求方法别名 -->
    <KnowledgeCard title="🎯 Demo 4: 其他请求方法">
      <p class="demo-desc">Axios 支持所有 HTTP 方法：PUT、DELETE、PATCH 等。</p>
      <DemoBox demoPath="axios/methods" title="HTTP 方法演示" height="450px" />
    </KnowledgeCard>

    <!-- Demo 5: 创建实例 -->
    <KnowledgeCard title="🎯 Demo 5: 创建 Axios 实例">
      <p class="demo-desc">使用 <code>axios.create()</code> 创建自定义实例，每个实例有独立配置。</p>
      <DemoBox demoPath="axios/create-instance" title="创建实例示例" height="480px" />
    </KnowledgeCard>

    <!-- 常用配置选项 -->
    <KnowledgeCard title="⚙️ 常用配置选项">
      <table class="config-table">
        <thead>
          <tr>
            <th>配置项</th>
            <th>类型</th>
            <th>说明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>url</code></td>
            <td>String</td>
            <td>请求地址（必填）</td>
          </tr>
          <tr>
            <td><code>method</code></td>
            <td>String</td>
            <td>请求方法，默认 'get'</td>
          </tr>
          <tr>
            <td><code>baseURL</code></td>
            <td>String</td>
            <td>基础 URL，会自动拼接在 url 前面</td>
          </tr>
          <tr>
            <td><code>params</code></td>
            <td>Object</td>
            <td>URL 参数（用于 GET 请求）</td>
          </tr>
          <tr>
            <td><code>data</code></td>
            <td>Object/String</td>
            <td>请求体数据（用于 POST/PUT/PATCH）</td>
          </tr>
          <tr>
            <td><code>headers</code></td>
            <td>Object</td>
            <td>自定义请求头</td>
          </tr>
          <tr>
            <td><code>timeout</code></td>
            <td>Number</td>
            <td>超时时间（毫秒），默认 0（不超时）</td>
          </tr>
          <tr>
            <td><code>responseType</code></td>
            <td>String</td>
            <td>响应类型：json/blob/text/arraybuffer</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul>
        <li><strong>GET 请求参数</strong>：使用 <code>params</code> 而不是 <code>data</code></li>
        <li><strong>POST 请求数据</strong>：默认会转为 JSON 格式发送</li>
        <li><strong>跨域问题</strong>：浏览器会有同源策略限制，需要服务端配置 CORS</li>
        <li><strong>HTTPS</strong>：生产环境建议使用 HTTPS 保证安全</li>
      </ul>
    </TipBox>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ul>
        <li>使用 <code>axios.create()</code> 创建实例，统一配置 baseURL</li>
        <li>设置合理的 <code>timeout</code> 避免请求长时间挂起</li>
        <li>使用 async/await 语法，代码更简洁</li>
        <li>统一处理错误，避免每个请求都写 try-catch</li>
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
  name: 'AxiosBasic',
  mixins: [scrollTrackingMixin],
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  data() {
    return {
      syntaxCode: `// 1. GET 请求
axios.get('/api/users', {
  params: { page: 1, limit: 10 }
})

// 2. POST 请求
axios.post('/api/users', {
  name: '张三',
  email: 'zhangsan@example.com'
})

// 3. 通用配置方式
axios({
  method: 'post',
  url: '/api/users',
  data: { name: '张三' },
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000
})`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';

.knowledge-page {
  max-width: 900px;
}

.page-header {
  margin-bottom: $spacing-xl;

  .back-link {
    display: inline-block;
    margin-bottom: $spacing-md;
    color: $color-primary;
    text-decoration: none;
    font-size: $font-size-sm;

    &:hover {
      text-decoration: underline;
    }
  }

  h1 {
    margin: 0;
    font-size: $font-size-2xl;
  }
}

.concept-content {
  .analogy {
    padding: $spacing-md;
    background: rgba($color-primary, 0.05);
    border-radius: $radius-md;
    margin-bottom: $spacing-md;
  }

  .definition {
    color: $color-text-secondary;
  }
}

.feature-list {
  margin: $spacing-md 0;
  padding-left: $spacing-lg;

  li {
    margin-bottom: $spacing-sm;
    line-height: 1.6;
  }
}

.syntax-notes {
  margin-top: $spacing-md;
  padding: $spacing-md;
  background: $color-bg;
  border-radius: $radius-md;

  p {
    margin: $spacing-xs 0;
    font-size: $font-size-sm;
  }
}

.demo-desc {
  color: $color-text-secondary;
  margin-bottom: $spacing-md;
}

.config-table {
  width: 100%;
  border-collapse: collapse;
  font-size: $font-size-sm;

  th, td {
    padding: $spacing-sm $spacing-md;
    text-align: left;
    border-bottom: 1px solid $color-border;
  }

  th {
    background: $color-bg;
    font-weight: 600;
  }

  code {
    background: rgba($color-primary, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 13px;
  }
}
</style>
