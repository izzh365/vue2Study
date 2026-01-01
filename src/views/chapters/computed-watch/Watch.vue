<template>
  <div class="knowledge-page watch-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>👁️ watch 侦听器</h1>
      <p class="page-desc">监听数据变化，执行异步操作或复杂逻辑</p>
    </div>

    <!-- 概念说明 -->
    <KnowledgeCard title="📖 什么是侦听器？">
      <p>
        <strong>watch</strong>（侦听器）用于观察某个数据的变化，并在变化时执行回调函数。
        它非常适合处理异步操作、复杂逻辑或需要对比新旧值的场景。
      </p>
      <div class="analogy-box">
        <span class="analogy-icon">👮</span>
        <div>
          <strong>通俗比喻：</strong>就像一个专注的保安，盯着特定的门口。
          一旦有人进出（数据变化），立即记录并汇报。
        </div>
      </div>
    </KnowledgeCard>

    <!-- computed vs watch -->
    <KnowledgeCard title="💡 computed vs watch 如何选择？">
      <div class="compare-table">
        <div class="compare-header">
          <div class="compare-col">场景</div>
          <div class="compare-col">computed</div>
          <div class="compare-col">watch</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">计算派生数据</div>
          <div class="compare-col highlight">✅ 优先使用</div>
          <div class="compare-col">可以但不推荐</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">异步请求</div>
          <div class="compare-col">❌ 不支持</div>
          <div class="compare-col highlight">✅ 适合</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">需要新旧值对比</div>
          <div class="compare-col">❌ 不支持</div>
          <div class="compare-col highlight">✅ 支持</div>
        </div>
        <div class="compare-row">
          <div class="compare-col">开销大的操作</div>
          <div class="compare-col">不推荐</div>
          <div class="compare-col highlight">✅ 适合</div>
        </div>
      </div>
      <TipBox type="info" title="选择口诀">
        <p>
          <strong>能用 computed 就用 computed</strong>，需要副作用（如请求、日志、修改其他数据）时用 watch。
        </p>
      </TipBox>
    </KnowledgeCard>

    <!-- 语法格式 -->
    <KnowledgeCard title="📝 语法格式">
      <CodeBlock 
        :code="syntaxCode"
        language="javascript"
      />
    </KnowledgeCard>

    <!-- 配置选项 -->
    <KnowledgeCard title="⚙️ watch 配置选项">
      <div class="option-list">
        <div class="option-item">
          <div class="option-name">immediate</div>
          <div class="option-desc">
            <code>true</code> 时，组件创建后立即执行一次回调
          </div>
        </div>
        <div class="option-item">
          <div class="option-name">deep</div>
          <div class="option-desc">
            <code>true</code> 时，深度监听对象内部属性的变化
          </div>
        </div>
        <div class="option-item">
          <div class="option-name">handler</div>
          <div class="option-desc">
            使用对象语法时，回调函数写在 handler 中
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- Demo 展示区 -->
    <KnowledgeCard title="🎯 实战示例">
      <!-- Demo 1: 基础用法 -->
      <div class="demo-section">
        <h4>Demo 1: watch 基础用法</h4>
        <p class="demo-desc">监听输入变化，记录日志</p>
        <DemoBox 
          demoPath="computed-watch/watch-basic"
          title="watch 基本用法"
          height="580px"
        />
      </div>

      <!-- Demo 2: 新旧值对比 -->
      <div class="demo-section">
        <h4>Demo 2: 新旧值对比</h4>
        <p class="demo-desc">计算分数变化量，显示涨跌趋势</p>
        <DemoBox 
          demoPath="computed-watch/watch-newold"
          title="watch 新旧值"
          height="650px"
        />
      </div>

      <!-- Demo 3: immediate 立即执行 -->
      <div class="demo-section">
        <h4>Demo 3: immediate 立即执行</h4>
        <p class="demo-desc">组件创建时立即执行一次回调</p>
        <DemoBox 
          demoPath="computed-watch/watch-immediate"
          title="watch immediate"
          height="700px"
        />
      </div>

      <!-- Demo 4: deep 深度监听 -->
      <div class="demo-section">
        <h4>Demo 4: deep 深度监听</h4>
        <p class="demo-desc">监听嵌套对象内部属性的变化</p>
        <DemoBox 
          demoPath="computed-watch/watch-deep"
          title="watch deep"
          height="850px"
        />
      </div>

      <!-- Demo 5: 异步请求 -->
      <div class="demo-section">
        <h4>Demo 5: 异步请求</h4>
        <p class="demo-desc">搜索框防抖 + API 请求</p>
        <DemoBox 
          demoPath="computed-watch/watch-async"
          title="watch 异步请求"
          height="650px"
        />
      </div>

      <!-- Demo 6: 动态监听与取消 -->
      <div class="demo-section">
        <h4>Demo 6: $watch 动态监听</h4>
        <p class="demo-desc">运行时创建/取消侦听器</p>
        <DemoBox 
          demoPath="computed-watch/watch-unwatch"
          title="$watch 动态监听"
          height="700px"
        />
      </div>
    </KnowledgeCard>

    <!-- 最佳实践 -->
    <KnowledgeCard title="✨ 最佳实践">
      <div class="practice-list">
        <div class="practice-item good">
          <span class="practice-icon">✅</span>
          <div>
            <strong>使用 immediate: true 减少重复代码</strong>
            <p>不需要在 created 中手动调用一次</p>
          </div>
        </div>
        <div class="practice-item good">
          <span class="practice-icon">✅</span>
          <div>
            <strong>监听具体路径而非整个对象</strong>
            <p>如 <code>'user.profile.name'</code>，性能更好且能获取准确新旧值</p>
          </div>
        </div>
        <div class="practice-item good">
          <span class="practice-icon">✅</span>
          <div>
            <strong>异步操作配合防抖</strong>
            <p>避免频繁触发 API 请求，提升性能和体验</p>
          </div>
        </div>
        <div class="practice-item bad">
          <span class="practice-icon">❌</span>
          <div>
            <strong>不要在 watch 中无限修改被监听的数据</strong>
            <p>会导致死循环</p>
          </div>
        </div>
      </div>
    </KnowledgeCard>

    <!-- 注意事项 -->
    <TipBox type="warning" title="⚠️ 注意事项">
      <ul class="warning-list">
        <li>
          <strong>深度监听对象时，新旧值是同一引用</strong>
          <p>因为对象是原地修改的，如需对比请提前深拷贝</p>
        </li>
        <li>
          <strong>组件销毁时 $watch 需要手动取消</strong>
          <p>在 beforeDestroy 中调用返回的取消函数</p>
        </li>
        <li>
          <strong>避免过度使用 deep: true</strong>
          <p>大对象深度监听有性能开销，优先监听具体路径</p>
        </li>
      </ul>
    </TipBox>
  </div>
</template>

<script>
/**
 * Watch 侦听器页面
 * 
 * @description 详细讲解 Vue watch 侦听器的用法和配置选项
 */
import KnowledgeCard from '@/components/content/KnowledgeCard.vue'
import TipBox from '@/components/content/TipBox.vue'
import CodeBlock from '@/components/demo/CodeBlock.vue'
import DemoBox from '@/components/demo/DemoBox.vue'

export default {
  name: 'WatchPage',
  
  components: {
    KnowledgeCard,
    TipBox,
    CodeBlock,
    DemoBox
  },
  
  data() {
    return {
      // 语法示例代码
      syntaxCode: `export default {
  data() {
    return {
      keyword: '',
      userInfo: { name: '张三', age: 25 }
    }
  },
  
  watch: {
    // 写法一：函数式（简写）
    keyword(newVal, oldVal) {
      console.log('从', oldVal, '变为', newVal)
      this.search(newVal)
    },
    
    // 写法二：对象式（完整配置）
    userInfo: {
      handler(newVal, oldVal) {
        console.log('用户信息变化:', newVal)
      },
      immediate: true,  // 立即执行一次
      deep: true        // 深度监听
    },
    
    // 写法三：监听嵌套路径
    'userInfo.name'(newName) {
      console.log('用户名变为:', newName)
    }
  }
}`
    }
  }
}
</script>

<style lang="scss" scoped>
.watch-page {
  .page-header {
    margin-bottom: $spacing-xl;
    
    h1 {
      font-size: $font-size-3xl;
      color: $color-text;
      margin-bottom: $spacing-sm;
    }
    
    .page-desc {
      font-size: $font-size-lg;
      color: $color-text-secondary;
    }
  }
  
  .analogy-box {
    display: flex;
    align-items: flex-start;
    gap: $spacing-md;
    padding: $spacing-md;
    background: linear-gradient(135deg, #fff3e0 0%, #fce4ec 100%);
    border-radius: $radius-md;
    margin-top: $spacing-md;
    
    .analogy-icon {
      font-size: 28px;
    }
  }
  
  // 对比表格
  .compare-table {
    border: 1px solid $color-border;
    border-radius: $radius-md;
    overflow: hidden;
    
    .compare-header,
    .compare-row {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      
      .compare-col {
        padding: $spacing-md;
        border-right: 1px solid $color-border;
        
        &:last-child {
          border-right: none;
        }
        
        &.highlight {
          background: #e8f5e9;
        }
      }
    }
    
    .compare-header {
      background: $color-code-bg;
      font-weight: 600;
    }
    
    .compare-row {
      border-top: 1px solid $color-border;
    }
  }
  
  // 配置选项列表
  .option-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    
    .option-item {
      display: flex;
      align-items: flex-start;
      gap: $spacing-lg;
      padding: $spacing-md;
      background: $color-code-bg;
      border-radius: $radius-md;
      
      .option-name {
        font-family: $font-family-code;
        font-weight: 600;
        color: $color-primary;
        min-width: 100px;
      }
      
      .option-desc {
        flex: 1;
        color: $color-text-secondary;
        
        code {
          background: rgba($color-primary, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          color: $color-primary;
        }
      }
    }
  }
  
  .demo-section {
    margin-bottom: $spacing-xl;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    h4 {
      font-size: $font-size-lg;
      color: $color-text;
      margin-bottom: $spacing-sm;
    }
    
    .demo-desc {
      color: $color-text-secondary;
      margin-bottom: $spacing-md;
    }
  }
  
  // 最佳实践列表
  .practice-list {
    display: flex;
    flex-direction: column;
    gap: $spacing-md;
    
    .practice-item {
      display: flex;
      align-items: flex-start;
      gap: $spacing-md;
      padding: $spacing-md;
      border-radius: $radius-md;
      
      &.good {
        background: #e8f5e9;
      }
      
      &.bad {
        background: #ffebee;
      }
      
      .practice-icon {
        font-size: 20px;
        flex-shrink: 0;
      }
      
      strong {
        display: block;
        margin-bottom: 4px;
        color: $color-text;
      }
      
      p {
        font-size: $font-size-sm;
        color: $color-text-secondary;
        margin: 0;
      }
      
      code {
        background: rgba(0, 0, 0, 0.05);
        padding: 2px 6px;
        border-radius: 4px;
      }
    }
  }
  
  // 警告列表
  .warning-list {
    margin: 0;
    padding-left: $spacing-lg;
    
    li {
      margin-bottom: $spacing-md;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      strong {
        display: block;
        color: $color-text;
      }
      
      p {
        margin: 4px 0 0;
        font-size: $font-size-sm;
        color: $color-text-secondary;
      }
    }
  }
}
</style>
