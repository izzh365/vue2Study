# 任务 04：Vue 指令详解章节

> 📋 指令是 Vue 最常用的功能，必须熟练掌握
> 
> ⏱️ 预计用时：5-6 小时
> 
> 📺 参考视频：coderwhy B站 Vue 框架视频

---

## 📌 任务概览

| 序号 | 知识点 | 页面文件 | Demo 数量 | 状态 |
|------|--------|----------|-----------|------|
| 4.1 | v-bind 属性绑定 | VBind.vue | 8 | ⬜ |
| 4.2 | v-on 事件绑定 | VOn.vue | 8 | ⬜ |
| 4.3 | v-model 双向绑定 | VModel.vue | 8 | ⬜ |
| 4.4 | v-if / v-show | VIfShow.vue | 6 | ⬜ |
| 4.5 | v-for 列表渲染 | VFor.vue | 8 | ⬜ |
| 4.6 | 其他指令 | OtherDirectives.vue | 4 | ⬜ |

---

## 📝 任务 4.1：v-bind 属性绑定

### 🎯 知识要点

| 语法 | 说明 |
|------|------|
| `v-bind:属性="表达式"` | 完整写法 |
| `:属性="表达式"` | 简写（推荐） |
| `:class="对象/数组"` | 动态 class |
| `:style="对象/数组"` | 动态 style |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/directives/v-bind-basic/ | 基本用法 |
| 2 | demos/directives/v-bind-src/ | 绑定图片 src |
| 3 | demos/directives/v-bind-class-object/ | class 对象语法 |
| 4 | demos/directives/v-bind-class-array/ | class 数组语法 |
| 5 | demos/directives/v-bind-style-object/ | style 对象语法 |
| 6 | demos/directives/v-bind-style-array/ | style 数组语法 |
| 7 | demos/directives/v-bind-props/ | 绑定组件 props |
| 8 | demos/directives/v-bind-all/ | 批量绑定属性 |

---

## 📝 任务 4.2：v-on 事件绑定

### 🎯 知识要点

| 语法 | 说明 |
|------|------|
| `v-on:事件="方法"` | 完整写法 |
| `@事件="方法"` | 简写（推荐） |
| `@click="handler"` | 无参数 |
| `@click="handler($event, arg)"` | 传参 |

#### 事件修饰符

| 修饰符 | 说明 |
|--------|------|
| `.stop` | 阻止冒泡 |
| `.prevent` | 阻止默认行为 |
| `.once` | 只触发一次 |
| `.enter` | 按键修饰符 |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/directives/v-on-basic/ | 基本用法 |
| 2 | demos/directives/v-on-params/ | 传递参数 |
| 3 | demos/directives/v-on-event/ | $event 对象 |
| 4 | demos/directives/v-on-stop/ | 阻止冒泡 |
| 5 | demos/directives/v-on-prevent/ | 阻止默认 |
| 6 | demos/directives/v-on-once/ | 只触发一次 |
| 7 | demos/directives/v-on-keyup/ | 按键修饰符 |
| 8 | demos/directives/v-on-multi/ | 多事件绑定 |

---

## 📝 任务 4.3：v-model 双向绑定

### 🎯 知识要点

| 元素 | v-model 绑定 |
|------|-------------|
| input[text] | value + input 事件 |
| input[checkbox] | checked + change 事件 |
| input[radio] | checked + change 事件 |
| select | value + change 事件 |
| textarea | value + input 事件 |

#### 修饰符

| 修饰符 | 说明 |
|--------|------|
| `.lazy` | change 时更新（而非 input） |
| `.number` | 转为数字 |
| `.trim` | 去除首尾空格 |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/directives/v-model-text/ | 文本输入框 |
| 2 | demos/directives/v-model-textarea/ | 多行文本 |
| 3 | demos/directives/v-model-checkbox/ | 复选框 |
| 4 | demos/directives/v-model-radio/ | 单选框 |
| 5 | demos/directives/v-model-select/ | 下拉选择 |
| 6 | demos/directives/v-model-lazy/ | .lazy 修饰符 |
| 7 | demos/directives/v-model-number/ | .number 修饰符 |
| 8 | demos/directives/v-model-trim/ | .trim 修饰符 |

---

## 📝 任务 4.4：v-if / v-show 条件渲染

### 🎯 知识要点

| 指令 | 说明 | 适用场景 |
|------|------|----------|
| v-if | 条件为假时不渲染 DOM | 条件很少改变 |
| v-else-if | 多条件判断 | 多分支 |
| v-else | 否则 | 默认分支 |
| v-show | 通过 CSS display 控制 | 频繁切换 |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/directives/v-if-basic/ | v-if 基本用法 |
| 2 | demos/directives/v-if-else/ | v-if-else |
| 3 | demos/directives/v-if-elseif/ | v-else-if 多分支 |
| 4 | demos/directives/v-show-basic/ | v-show 基本用法 |
| 5 | demos/directives/v-if-vs-show/ | v-if 和 v-show 对比 |
| 6 | demos/directives/v-if-template/ | template 上使用 v-if |

---

## 📝 任务 4.5：v-for 列表渲染

### 🎯 知识要点

| 语法 | 说明 |
|------|------|
| `v-for="item in items"` | 遍历数组 |
| `v-for="(item, index) in items"` | 带索引 |
| `v-for="value in object"` | 遍历对象 |
| `v-for="(value, key, index) in object"` | 对象完整语法 |
| `:key="item.id"` | 必须绑定唯一 key |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/directives/v-for-array/ | 遍历数组 |
| 2 | demos/directives/v-for-index/ | 带索引遍历 |
| 3 | demos/directives/v-for-object/ | 遍历对象 |
| 4 | demos/directives/v-for-key/ | key 的作用 |
| 5 | demos/directives/v-for-range/ | 遍历数字 |
| 6 | demos/directives/v-for-nested/ | 嵌套循环 |
| 7 | demos/directives/v-for-if/ | v-for 与 v-if |
| 8 | demos/directives/v-for-component/ | 组件上使用 v-for |

---

## 📝 任务 4.6：其他指令

### 🎯 知识要点

| 指令 | 说明 |
|------|------|
| v-text | 更新元素的 textContent |
| v-html | 更新元素的 innerHTML |
| v-pre | 跳过编译（显示原始 Mustache 标签） |
| v-cloak | 隐藏未编译的 Mustache 标签 |
| v-once | 只渲染一次，不响应更新 |

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/directives/v-text/ | v-text |
| 2 | demos/directives/v-html/ | v-html 及安全问题 |
| 3 | demos/directives/v-pre/ | v-pre 跳过编译 |
| 4 | demos/directives/v-once/ | v-once 优化 |

---

## ✅ 任务完成检查清单

- [ ] VBind.vue 完成，8 个 Demo
- [ ] VOn.vue 完成，8 个 Demo
- [ ] VModel.vue 完成，8 个 Demo
- [ ] VIfShow.vue 完成，6 个 Demo
- [ ] VFor.vue 完成，8 个 Demo
- [ ] OtherDirectives.vue 完成，4 个 Demo

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [上一步：生命周期](03-lifecycle.md)
- [下一步：计算属性](05-computed-watch.md)

---

*任务状态：⬜ 待开始*
