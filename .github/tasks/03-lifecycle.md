# 任务 03：Vue 生命周期章节

> 📋 Vue 生命周期是理解 Vue 运行机制的核心
> 
> ⏱️ 预计用时：2-3 小时
> 
> 📺 参考视频：coderwhy B站 Vue 框架视频

---

## 📌 任务概览

| 序号 | 知识点 | 页面文件 | Demo 数量 | 状态 |
|------|--------|----------|-----------|------|
| 3.1 | 生命周期详解 | Lifecycle.vue | 6 | ⬜ |

---

## 📝 任务 3.1：生命周期详解

### 🎯 知识要点

#### 📖 概念说明（通俗比喻）

**生命周期就像人的一生**：
- 出生前（beforeCreate）→ 出生（created）
- 上学前（beforeMount）→ 上学（mounted）
- 工作中更新（beforeUpdate → updated）
- 退休前（beforeDestroy）→ 去世（destroyed）

#### 📖 8 个生命周期钩子

| 阶段 | 钩子函数 | 时机 | 可访问 |
|------|----------|------|--------|
| 创建前 | beforeCreate | 实例初始化之后 | ❌ data、methods |
| 创建后 | created | 实例创建完成 | ✅ data、methods |
| 挂载前 | beforeMount | 挂载开始之前 | ❌ DOM |
| 挂载后 | mounted | 挂载完成 | ✅ DOM |
| 更新前 | beforeUpdate | 数据更新时 | 旧 DOM |
| 更新后 | updated | DOM 更新完成 | 新 DOM |
| 销毁前 | beforeDestroy | 实例销毁之前 | ✅ 全部可用 |
| 销毁后 | destroyed | 实例销毁完成 | ❌ 已解绑 |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/lifecycle/all-hooks/ | 全部钩子执行顺序 |
| 2 | demos/lifecycle/created-usage/ | created 常见用法 |
| 3 | demos/lifecycle/mounted-dom/ | mounted 操作 DOM |
| 4 | demos/lifecycle/update-cycle/ | 更新周期演示 |
| 5 | demos/lifecycle/destroy-cleanup/ | 销毁时清理 |
| 6 | demos/lifecycle/parent-child/ | 父子组件生命周期 |

### 📋 Demo 1：全部钩子执行顺序

```javascript
// demos/lifecycle/all-hooks/app.js

/**
 * Vue 生命周期钩子执行顺序演示
 * 观察控制台输出，理解执行顺序
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      message: 'Hello Vue!',
      logs: []  // 存储日志
    }
  },
  
  // ==================== 创建阶段 ====================
  
  /**
   * beforeCreate
   * 实例刚创建，data 和 methods 还不可用
   */
  beforeCreate() {
    console.log('1. beforeCreate')
    console.log('   data:', this.message)  // undefined
    // 此时不能访问 data 和 methods
  },
  
  /**
   * created
   * 实例创建完成，可以访问 data 和 methods
   * 常用于：发起 Ajax 请求、初始化数据
   */
  created() {
    console.log('2. created')
    console.log('   data:', this.message)  // 'Hello Vue!'
    this.logs.push('created: 可以访问 data')
    // 常见用法：this.fetchData()
  },
  
  // ==================== 挂载阶段 ====================
  
  /**
   * beforeMount
   * 模板编译完成，但还没挂载到 DOM
   */
  beforeMount() {
    console.log('3. beforeMount')
    console.log('   DOM:', document.getElementById('app'))
    this.logs.push('beforeMount: DOM 还是模板')
  },
  
  /**
   * mounted
   * 挂载完成，可以访问 DOM
   * 常用于：操作 DOM、初始化第三方库
   */
  mounted() {
    console.log('4. mounted')
    console.log('   DOM:', this.$el)
    this.logs.push('mounted: 可以访问真实 DOM')
    // 常见用法：this.$refs.xxx
  },
  
  // ==================== 更新阶段 ====================
  
  /**
   * beforeUpdate
   * 数据更新时调用，DOM 还没更新
   */
  beforeUpdate() {
    console.log('5. beforeUpdate')
    this.logs.push('beforeUpdate: 数据变了，DOM 还没更新')
  },
  
  /**
   * updated
   * DOM 更新完成
   * 注意：避免在这里修改 data，可能导致死循环
   */
  updated() {
    console.log('6. updated')
    // this.logs.push() // 不要在这里修改数据！
  },
  
  // ==================== 销毁阶段 ====================
  
  /**
   * beforeDestroy
   * 实例销毁前调用
   * 常用于：清除定时器、解绑事件
   */
  beforeDestroy() {
    console.log('7. beforeDestroy')
    // 清理工作：clearInterval、removeEventListener 等
  },
  
  /**
   * destroyed
   * 实例已销毁
   */
  destroyed() {
    console.log('8. destroyed')
  },
  
  methods: {
    /**
     * 更新数据，触发更新周期
     */
    updateMessage() {
      this.message = '数据已更新：' + new Date().toLocaleTimeString()
    }
  }
})
```

### 📋 Demo 2：created 常见用法

```javascript
// demos/lifecycle/created-usage/app.js

/**
 * created 钩子的常见用法
 * 最适合发起网络请求
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      userInfo: null,
      loading: true,
      error: null
    }
  },
  
  /**
   * created 钩子
   * 最佳实践：在这里发起初始化请求
   * 原因：
   * 1. 可以访问 data 和 methods
   * 2. 比 mounted 更早，数据先准备好
   * 3. SSR 中也会执行
   */
  created() {
    this.fetchUserInfo()
  },
  
  methods: {
    /**
     * 模拟获取用户信息
     */
    async fetchUserInfo() {
      this.loading = true
      
      try {
        // 模拟 API 请求
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.userInfo = {
          name: '张三',
          age: 25,
          email: 'zhangsan@example.com'
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
```

### 📋 Demo 3：mounted 操作 DOM

```javascript
// demos/lifecycle/mounted-dom/app.js

/**
 * mounted 钩子操作 DOM
 * 此时可以安全访问 DOM 元素
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      chartData: [30, 50, 80, 60, 90]
    }
  },
  
  /**
   * mounted 钩子
   * 最佳实践：
   * 1. 操作 DOM 元素
   * 2. 初始化第三方库（如 ECharts、地图等）
   * 3. 添加事件监听
   */
  mounted() {
    // 访问 DOM 元素
    const chartEl = this.$refs.chart
    console.log('图表容器:', chartEl)
    
    // 初始化图表（模拟）
    this.initChart()
    
    // 添加窗口事件
    window.addEventListener('resize', this.handleResize)
  },
  
  /**
   * beforeDestroy
   * 记得清理事件监听
   */
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  
  methods: {
    /**
     * 初始化图表
     */
    initChart() {
      // 这里可以初始化 ECharts 等第三方库
      console.log('图表初始化完成')
    },
    
    /**
     * 窗口大小变化处理
     */
    handleResize() {
      console.log('窗口大小变化，重绘图表')
    }
  }
})
```

### 📋 Demo 4：销毁时清理

```javascript
// demos/lifecycle/destroy-cleanup/app.js

/**
 * 组件销毁时的清理工作
 * 非常重要！避免内存泄漏
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      timer: null,
      count: 0
    }
  },
  
  /**
   * mounted 中启动定时器
   */
  mounted() {
    // 启动定时器
    this.timer = setInterval(() => {
      this.count++
      console.log('计数:', this.count)
    }, 1000)
  },
  
  /**
   * beforeDestroy 中清理
   * 必须清理：
   * 1. 定时器（setInterval、setTimeout）
   * 2. 事件监听（addEventListener）
   * 3. 第三方库实例
   * 4. WebSocket 连接
   */
  beforeDestroy() {
    // 清除定时器
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
      console.log('定时器已清理')
    }
  }
})
```

---

## ✅ 任务完成检查清单

- [ ] Lifecycle.vue 页面完成
- [ ] 包含生命周期图示
- [ ] 6 个 Demo 可正常运行
- [ ] 每个钩子都有详细注释

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [上一步：ES6 基础](02-es6-basics.md)
- [下一步：Vue 指令](04-directives.md)

---

*任务状态：⬜ 待开始*
