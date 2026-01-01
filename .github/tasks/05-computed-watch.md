# 任务 05：计算属性与侦听器章节

> 📋 computed 和 watch 是 Vue 响应式系统的核心
> 
> ⏱️ 预计用时：2-3 小时

---

## 📌 任务概览

| 序号 | 知识点 | 页面文件 | Demo 数量 | 状态 |
|------|--------|----------|-----------|------|
| 5.1 | computed 计算属性 | Computed.vue | 6 | ✅ |
| 5.2 | watch 侦听器 | Watch.vue | 6 | ✅ |

---

## 📝 任务 5.1：computed 计算属性

### 🎯 知识要点

#### 📖 概念说明

**计算属性** = 基于现有数据计算出的新数据

**特点：**
- 有缓存：依赖不变时不会重新计算
- 像属性一样使用（不加括号）
- 支持 getter 和 setter

**vs methods：**
- methods：每次调用都会执行
- computed：有缓存，性能更好

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/computed-watch/computed-basic/ | 基本用法 |
| 2 | demos/computed-watch/computed-cache/ | 缓存特性对比 |
| 3 | demos/computed-watch/computed-setter/ | getter/setter |
| 4 | demos/computed-watch/computed-filter/ | 列表过滤 |
| 5 | demos/computed-watch/computed-sort/ | 列表排序 |
| 6 | demos/computed-watch/computed-style/ | 动态样式 |

### 📋 Demo 示例

```javascript
// demos/computed-watch/computed-basic/app.js

new Vue({
  el: '#app',
  data() {
    return {
      firstName: '张',
      lastName: '三'
    }
  },
  computed: {
    /**
     * 计算属性：fullName
     * 依赖 firstName 和 lastName
     * 只要依赖不变，就不会重新计算
     */
    fullName() {
      console.log('computed 执行了')
      return this.firstName + this.lastName
    }
  }
})
```

---

## 📝 任务 5.2：watch 侦听器

### 🎯 知识要点

#### 📖 概念说明

**侦听器** = 监听数据变化，执行副作用

**适用场景：**
- 异步操作（请求 API）
- 开销较大的操作
- 需要获取新旧值对比

**配置选项：**
- `immediate`: 立即执行
- `deep`: 深度监听

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/computed-watch/watch-basic/ | 基本用法 |
| 2 | demos/computed-watch/watch-newold/ | 新旧值对比 |
| 3 | demos/computed-watch/watch-immediate/ | 立即执行 |
| 4 | demos/computed-watch/watch-deep/ | 深度监听 |
| 5 | demos/computed-watch/watch-async/ | 异步请求 |
| 6 | demos/computed-watch/watch-unwatch/ | 取消监听 |

### 📋 Demo 示例

```javascript
// demos/computed-watch/watch-basic/app.js

new Vue({
  el: '#app',
  data() {
    return {
      keyword: '',
      searchResults: []
    }
  },
  watch: {
    /**
     * 监听 keyword 变化
     * @param {string} newVal - 新值
     * @param {string} oldVal - 旧值
     */
    keyword(newVal, oldVal) {
      console.log(`从 ${oldVal} 变为 ${newVal}`)
      this.search(newVal)
    }
  },
  methods: {
    search(keyword) {
      // 模拟搜索
      console.log('搜索:', keyword)
    }
  }
})
```

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [上一步：指令详解](04-directives.md)
- [下一步：自定义指令](06-custom-directives.md)

---

*任务状态：⬜ 待开始*
