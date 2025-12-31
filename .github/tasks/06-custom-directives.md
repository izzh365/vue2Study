# 任务 06：自定义指令章节

> 📋 当内置指令不能满足需求时，可以创建自定义指令
> 
> ⏱️ 预计用时：1-2 小时

---

## 📌 任务概览

| 序号 | 知识点 | 页面文件 | Demo 数量 | 状态 |
|------|--------|----------|-----------|------|
| 6.1 | 自定义指令详解 | CustomDirectives.vue | 8 | ⬜ |

---

## 📝 任务 6.1：自定义指令详解

### 🎯 知识要点

#### 📖 钩子函数

| 钩子 | 调用时机 |
|------|----------|
| bind | 指令第一次绑定到元素时 |
| inserted | 元素插入父节点时 |
| update | VNode 更新时 |
| componentUpdated | VNode 及子 VNode 更新后 |
| unbind | 指令解绑时 |

#### 📖 钩子参数

| 参数 | 说明 |
|------|------|
| el | 绑定的元素 |
| binding | 包含 value、arg、modifiers 等 |
| vnode | Vue 编译的虚拟节点 |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/custom-directives/v-focus/ | 自动聚焦 |
| 2 | demos/custom-directives/v-color/ | 文字颜色 |
| 3 | demos/custom-directives/v-copy/ | 一键复制 |
| 4 | demos/custom-directives/v-loading/ | 加载状态 |
| 5 | demos/custom-directives/v-lazy/ | 图片懒加载 |
| 6 | demos/custom-directives/v-permission/ | 权限控制 |
| 7 | demos/custom-directives/v-click-outside/ | 点击外部 |
| 8 | demos/custom-directives/directive-args/ | 参数和修饰符 |

### 📋 Demo 示例

```javascript
// 全局注册自定义指令
Vue.directive('focus', {
  // 元素插入 DOM 时
  inserted(el) {
    // 自动聚焦
    el.focus()
  }
})

// 使用
// <input v-focus />
```

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [上一步：计算属性](05-computed-watch.md)
- [下一步：组件化](07-components.md)

---

*任务状态：⬜ 待开始*
