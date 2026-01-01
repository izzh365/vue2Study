<template>
  <div class="knowledge-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>并发请求</h1>
      <p class="subtitle">同时发送多个请求并统一处理结果</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 概念说明">
      <p><strong>并发请求</strong>是指同时发送多个 HTTP 请求，等待所有请求完成后再统一处理结果。</p>
      
      <div class="analogy-box">
        <h4>🎭 通俗比喻</h4>
        <p>就像在餐厅点餐：</p>
        <ul>
          <li><strong>顺序请求</strong> = 点一道菜 → 等上菜 → 再点下一道（太慢！）</li>
          <li><strong>并发请求</strong> = 一次点所有菜 → 服务员同时去准备 → 一起上桌（更快！）</li>
        </ul>
      </div>
    </KnowledgeCard>

    <!-- 实现方式 -->
    <KnowledgeCard title="🔧 实现方式">
      <table class="info-table">
        <thead>
          <tr>
            <th>方式</th>
            <th>说明</th>
            <th>推荐</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Promise.all()</code></td>
            <td>原生 JS 方法，所有成功才成功</td>
            <td>⭐⭐⭐ 推荐</td>
          </tr>
          <tr>
            <td><code>Promise.allSettled()</code></td>
            <td>等待所有完成（无论成功失败）</td>
            <td>⭐⭐⭐ 推荐</td>
          </tr>
          <tr>
            <td><code>axios.all()</code></td>
            <td>Axios 封装的并发方法（已废弃）</td>
            <td>⭐ 不推荐</td>
          </tr>
          <tr>
            <td><code>Promise.race()</code></td>
            <td>返回最先完成的请求结果</td>
            <td>⭐⭐ 特殊场景</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- Demo 1: Promise.all 基础 -->
    <KnowledgeCard title="🎯 Demo 1: Promise.all 基础">
      <p>同时发送多个请求，全部成功后返回结果：</p>
      <DemoBox 
        demoPath="axios/promise-all-basic"
        title="Promise.all 并发请求"
        height="400px"
      />
    </KnowledgeCard>

    <!-- 语法说明 -->
    <KnowledgeCard title="📝 Promise.all 语法">
      <CodeBlock :code="promiseAllCode" language="javascript" />
      
      <TipBox type="warning" title="⚠️ 注意">
        <p>Promise.all 的特点是"全有或全无"：只要有一个请求失败，整体就会进入 catch。</p>
      </TipBox>
    </KnowledgeCard>

    <!-- Demo 2: Promise.allSettled -->
    <KnowledgeCard title="🎯 Demo 2: Promise.allSettled">
      <p>无论成功失败都返回结果，适合需要容错的场景：</p>
      <DemoBox 
        demoPath="axios/promise-all-settled"
        title="Promise.allSettled 容错处理"
        height="420px"
      />
    </KnowledgeCard>

    <!-- Demo 3: Promise.race -->
    <KnowledgeCard title="🎯 Demo 3: Promise.race">
      <p>只返回最先完成的请求结果：</p>
      <DemoBox 
        demoPath="axios/promise-race"
        title="Promise.race 竞速请求"
        height="380px"
      />
    </KnowledgeCard>

    <!-- Demo 4: 实战案例 -->
    <KnowledgeCard title="🎯 Demo 4: 实战案例 - 仪表盘数据加载">
      <p>典型应用场景：页面初始化时同时加载多个接口数据</p>
      <DemoBox 
        demoPath="axios/concurrent-dashboard"
        title="仪表盘数据并发加载"
        height="450px"
      />
    </KnowledgeCard>

    <!-- Demo 5: 批量请求 -->
    <KnowledgeCard title="🎯 Demo 5: 批量请求与限流">
      <p>处理大量请求时的分批策略：</p>
      <DemoBox 
        demoPath="axios/batch-requests"
        title="批量请求限流"
        height="400px"
      />
    </KnowledgeCard>

    <!-- 对比表格 -->
    <KnowledgeCard title="📊 方法对比">
      <table class="info-table">
        <thead>
          <tr>
            <th>特性</th>
            <th>Promise.all</th>
            <th>Promise.allSettled</th>
            <th>Promise.race</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>等待所有完成</td>
            <td>✅ 是</td>
            <td>✅ 是</td>
            <td>❌ 否</td>
          </tr>
          <tr>
            <td>一个失败的影响</td>
            <td>整体失败</td>
            <td>不影响其他</td>
            <td>如果最快的失败则失败</td>
          </tr>
          <tr>
            <td>返回格式</td>
            <td>结果数组</td>
            <td>{ status, value/reason }</td>
            <td>单个结果</td>
          </tr>
          <tr>
            <td>适用场景</td>
            <td>所有数据都必需</td>
            <td>部分失败可接受</td>
            <td>最快响应优先</td>
          </tr>
        </tbody>
      </table>
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <TipBox type="success" title="✅ 最佳实践">
      <ol>
        <li><strong>优先使用 Promise.all</strong>：语法简洁，性能好</li>
        <li><strong>需要容错用 allSettled</strong>：部分失败不影响整体</li>
        <li><strong>添加 loading 状态</strong>：告知用户正在加载</li>
        <li><strong>批量请求注意限流</strong>：避免同时发送过多请求</li>
        <li><strong>合理设置超时</strong>：防止单个请求阻塞整体</li>
      </ol>
    </TipBox>
  </div>
</template>

<script>
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'AxiosConcurrent',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      promiseAllCode: `// Promise.all 并发请求
async function fetchAllData() {
  try {
    // 同时发送多个请求
    const [users, posts, comments] = await Promise.all([
      axios.get('/api/users'),
      axios.get('/api/posts'),
      axios.get('/api/comments')
    ])
    
    // 所有请求都成功后执行
    console.log('用户:', users.data)
    console.log('文章:', posts.data)
    console.log('评论:', comments.data)
    
  } catch (error) {
    // 任一请求失败都会进入这里
    console.error('请求失败:', error)
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

.analogy-box {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  padding: 16px;
  border-radius: 8px;
  margin-top: 16px;
  
  h4 {
    margin-bottom: 8px;
    color: #1e40af;
  }
  
  p, ul {
    color: #1e3a8a;
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
}
</style>
