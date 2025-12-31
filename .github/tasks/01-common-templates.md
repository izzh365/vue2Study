# 任务 01：公共模板任务清单

> 📋 本文档定义了项目公共组件、样式、工具函数的创建任务
> 
> ⏱️ 预计用时：2-3 小时
> 
> 🔧 前置条件：任务 00 已完成

---

## 📌 任务概览

| 序号 | 任务名称 | 说明 | 状态 |
|------|----------|------|------|
| 1.1 | SCSS 变量文件 | 颜色、字体、间距等变量定义 | ⬜ |
| 1.2 | SCSS 混入文件 | 常用样式混入 | ⬜ |
| 1.3 | 通用样式文件 | 全局通用样式 | ⬜ |
| 1.4 | Prism 主题样式 | 代码高亮主题（浅色+行号） | ⬜ |
| 1.5 | 布局组件 - AppHeader | 页面头部导航 | ⬜ |
| 1.6 | 布局组件 - AppSidebar | 侧边栏导航 | ⬜ |
| 1.7 | Demo 组件 - DemoBox | Demo 容器（Tab切换） | ⬜ |
| 1.8 | Demo 组件 - CodeBlock | 代码块（Prism高亮） | ⬜ |
| 1.9 | 内容组件 - KnowledgeCard | 知识点卡片 | ⬜ |
| 1.10 | 内容组件 - TipBox | 提示框组件 | ⬜ |
| 1.11 | 工具函数 | Prism配置、代码加载器 | ⬜ |
| 1.12 | 入口文件配置 | main.js 和 App.vue | ⬜ |

---

## 📝 任务 1.1：SCSS 变量文件

### 🎯 目标
创建 `src/assets/styles/_variables.scss`，定义项目所有设计变量

### 📋 文件内容

```scss
// _variables.scss
// 项目全局 SCSS 变量定义
// 苹果风设计规范

// ==================== 颜色变量 ====================

// 主色调
$color-primary: #007AFF;           // 主色调蓝
$color-primary-light: #5AC8FA;     // 浅蓝
$color-primary-dark: #0056b3;      // 深蓝

// 背景色
$color-bg: #F5F5F7;                // 页面背景
$color-card: #FFFFFF;              // 卡片背景
$color-code-bg: #F9FAFB;           // 代码块背景

// 文字颜色
$color-text: #1D1D1F;              // 主文字
$color-text-secondary: #86868B;    // 次要文字
$color-text-light: #AEAEB2;        // 浅色文字

// 边框颜色
$color-border: #E5E5EA;            // 边框
$color-border-light: #F2F2F7;      // 浅边框

// 状态颜色
$color-success: #34C759;           // 成功
$color-warning: #FF9500;           // 警告
$color-error: #FF3B30;             // 错误
$color-info: #5AC8FA;              // 信息

// ==================== 字体变量 ====================

$font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
              'Helvetica Neue', Arial, 'PingFang SC', 'Microsoft YaHei', sans-serif;

$font-family-code: 'SF Mono', SFMono-Regular, Consolas, 'Liberation Mono', 
                   Menlo, Courier, monospace;

// 字体大小
$font-size-xs: 12px;
$font-size-sm: 14px;
$font-size-base: 16px;
$font-size-lg: 18px;
$font-size-xl: 20px;
$font-size-2xl: 24px;
$font-size-3xl: 30px;

// 行高
$line-height-tight: 1.25;
$line-height-base: 1.5;
$line-height-relaxed: 1.75;

// ==================== 间距变量 ====================

$spacing-xs: 4px;
$spacing-sm: 8px;
$spacing-md: 16px;
$spacing-lg: 24px;
$spacing-xl: 32px;
$spacing-2xl: 48px;

// ==================== 圆角变量 ====================

$radius-sm: 6px;
$radius-md: 12px;
$radius-lg: 16px;
$radius-xl: 24px;
$radius-full: 9999px;

// ==================== 阴影变量 ====================

$shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 20px rgba(0, 0, 0, 0.08);
$shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);

// ==================== 动画变量 ====================

$transition-fast: 0.15s ease;
$transition-base: 0.3s ease;
$transition-slow: 0.5s ease;

// ==================== 布局变量 ====================

$sidebar-width: 260px;
$header-height: 60px;
$content-max-width: 1200px;

// ==================== 断点变量 ====================

$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

### ✅ 验证标准
- [ ] 文件路径正确：`src/assets/styles/_variables.scss`
- [ ] 变量命名规范，注释清晰

---

## 📝 任务 1.2：SCSS 混入文件

### 🎯 目标
创建 `src/assets/styles/_mixins.scss`，定义常用样式混入

### 📋 文件内容

```scss
// _mixins.scss
// 项目全局 SCSS 混入定义

// ==================== Flexbox 布局 ====================

// Flex 居中
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

// Flex 两端对齐
@mixin flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

// Flex 列布局
@mixin flex-column {
  display: flex;
  flex-direction: column;
}

// ==================== 文字处理 ====================

// 单行省略
@mixin text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 多行省略
@mixin text-clamp($lines: 2) {
  display: -webkit-box;
  -webkit-line-clamp: $lines;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// ==================== 卡片样式 ====================

// 基础卡片
@mixin card-base {
  background: $color-card;
  border-radius: $radius-md;
  box-shadow: $shadow-md;
}

// 玻璃效果卡片
@mixin card-glass {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: $radius-md;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

// ==================== 按钮样式 ====================

// 基础按钮
@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: $spacing-sm $spacing-md;
  border: none;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: 500;
  cursor: pointer;
  transition: all $transition-base;
  
  &:hover {
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
}

// 主要按钮
@mixin button-primary {
  @include button-base;
  background: $color-primary;
  color: white;
  
  &:hover {
    background: $color-primary-dark;
  }
}

// ==================== 响应式 ====================

// 移动端优先的媒体查询
@mixin media-sm {
  @media (min-width: $breakpoint-sm) {
    @content;
  }
}

@mixin media-md {
  @media (min-width: $breakpoint-md) {
    @content;
  }
}

@mixin media-lg {
  @media (min-width: $breakpoint-lg) {
    @content;
  }
}

// ==================== 滚动条样式 ====================

@mixin custom-scrollbar {
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: $color-border;
    border-radius: 3px;
    
    &:hover {
      background: $color-text-secondary;
    }
  }
}

// ==================== 代码块样式 ====================

@mixin code-block {
  background: $color-code-bg;
  border-radius: $radius-sm;
  font-family: $font-family-code;
  font-size: $font-size-sm;
  line-height: $line-height-relaxed;
}
```

### ✅ 验证标准
- [ ] 文件路径正确：`src/assets/styles/_mixins.scss`
- [ ] 混入可正常使用

---

## 📝 任务 1.3：通用样式文件

### 🎯 目标
创建 `src/assets/styles/_common.scss`，定义全局通用样式

### 📋 文件内容

```scss
// _common.scss
// 全局通用样式

// ==================== 重置样式 ====================

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: $font-family;
  font-size: $font-size-base;
  line-height: $line-height-base;
  color: $color-text;
  background-color: $color-bg;
}

a {
  color: $color-primary;
  text-decoration: none;
  transition: color $transition-fast;
  
  &:hover {
    color: $color-primary-dark;
  }
}

// ==================== 标题样式 ====================

h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: $line-height-tight;
  color: $color-text;
}

h1 { font-size: $font-size-3xl; }
h2 { font-size: $font-size-2xl; }
h3 { font-size: $font-size-xl; }
h4 { font-size: $font-size-lg; }

// ==================== 容器样式 ====================

.container {
  max-width: $content-max-width;
  margin: 0 auto;
  padding: 0 $spacing-md;
}

// ==================== 工具类 ====================

// 文字颜色
.text-primary { color: $color-primary; }
.text-secondary { color: $color-text-secondary; }
.text-success { color: $color-success; }
.text-warning { color: $color-warning; }
.text-error { color: $color-error; }

// 背景色
.bg-primary { background-color: $color-primary; }
.bg-card { background-color: $color-card; }

// 间距
.mt-sm { margin-top: $spacing-sm; }
.mt-md { margin-top: $spacing-md; }
.mt-lg { margin-top: $spacing-lg; }
.mb-sm { margin-bottom: $spacing-sm; }
.mb-md { margin-bottom: $spacing-md; }
.mb-lg { margin-bottom: $spacing-lg; }

// 隐藏
.hidden { display: none !important; }
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
```

---

## 📝 任务 1.4：Prism 主题样式

### 🎯 目标
创建 `src/assets/styles/_prism-theme.scss`，自定义 Prism 代码高亮主题（浅色 + 行号）

### 📋 文件内容

```scss
// _prism-theme.scss
// Prism.js 自定义浅色主题（带行号）

// ==================== 代码块容器 ====================

pre[class*="language-"] {
  background: $color-code-bg;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: 0;
  margin: $spacing-md 0;
  overflow: hidden;
  font-family: $font-family-code;
  font-size: 14px;
  line-height: 1.6;
}

code[class*="language-"] {
  display: block;
  padding: $spacing-md;
  overflow-x: auto;
  @include custom-scrollbar;
}

// ==================== 行号样式 ====================

.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: $spacing-md;
  left: 0;
  width: 3em;
  padding: 0;
  background: rgba(0, 0, 0, 0.02);
  border-right: 1px solid $color-border;
  font-size: inherit;
  line-height: inherit;
  letter-spacing: -1px;
  user-select: none;
  
  > span {
    display: block;
    padding-right: 0.8em;
    text-align: right;
    color: $color-text-light;
    
    &::before {
      content: counter(linenumber);
      counter-increment: linenumber;
    }
  }
}

.line-numbers code[class*="language-"] {
  padding-left: 4em;
}

// ==================== 语法高亮颜色 ====================

.token {
  &.comment,
  &.prolog,
  &.doctype,
  &.cdata {
    color: #6a737d;
    font-style: italic;
  }
  
  &.punctuation {
    color: #24292e;
  }
  
  &.property,
  &.tag,
  &.boolean,
  &.number,
  &.constant,
  &.symbol,
  &.deleted {
    color: #d73a49;
  }
  
  &.selector,
  &.attr-name,
  &.string,
  &.char,
  &.builtin,
  &.inserted {
    color: #22863a;
  }
  
  &.operator,
  &.entity,
  &.url {
    color: #d73a49;
  }
  
  &.atrule,
  &.attr-value,
  &.keyword {
    color: #d73a49;
  }
  
  &.function,
  &.class-name {
    color: #6f42c1;
  }
  
  &.regex,
  &.important,
  &.variable {
    color: #e36209;
  }
}
```

---

## 📝 任务 1.5：样式入口文件

### 🎯 目标
创建 `src/assets/styles/main.scss`，统一导入所有样式

### 📋 文件内容

```scss
// main.scss
// 样式入口文件

// 1. 变量定义（最先导入）
@import 'variables';

// 2. 混入定义
@import 'mixins';

// 3. 第三方库样式
@import 'normalize.css';

// 4. 通用样式
@import 'common';

// 5. Prism 代码高亮主题
@import 'prism-theme';
```

### ✅ 验证标准
- [ ] 所有样式文件已创建
- [ ] 样式可正常编译

---

## � 任务 1.6：布局组件 - AppHeader

### 🎯 目标
创建 `src/components/layout/AppHeader.vue`

### 📋 组件功能
- 显示项目 Logo 和标题
- 顶部导航链接
- 响应式适配

### 📋 组件代码要点

```vue
<template>
  <header class="app-header">
    <div class="header-logo">Vue2 学习</div>
    <nav class="header-nav">
      <router-link to="/">首页</router-link>
      <!-- 章节导航链接 -->
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>
```

---

## 📝 任务 1.7：布局组件 - AppSidebar

### 🎯 目标
创建 `src/components/layout/AppSidebar.vue`

### 📋 组件功能
- 章节目录树形导航
- 当前章节高亮
- 折叠/展开功能

---

## 📝 任务 1.8：Demo 组件 - DemoBox

### 🎯 目标
创建 `src/components/demo/DemoBox.vue`，实现 Tab 切换的 Demo 容器

### 📋 组件功能
- Tab 切换：效果 / HTML / JS
- iframe 预览效果
- 代码展示（Prism 高亮）
- 一键复制代码

### 📋 Props 定义

| Prop | 类型 | 说明 |
|------|------|------|
| demoPath | String | Demo 路径，如 'es6/var-hoisting' |
| title | String | Demo 标题 |
| height | String | iframe 高度，默认 '300px' |

---

## 📝 任务 1.9：Demo 组件 - CodeBlock

### 🎯 目标
创建 `src/components/demo/CodeBlock.vue`，封装 Prism 代码高亮

### 📋 组件功能
- 支持多种语言：html, javascript, css, vue
- 自动行号显示
- 复制按钮

### 📋 Props 定义

| Prop | 类型 | 说明 |
|------|------|------|
| code | String | 代码内容 |
| language | String | 语言类型 |
| showLineNumbers | Boolean | 是否显示行号 |

---

## 📝 任务 1.10：内容组件 - KnowledgeCard

### 🎯 目标
创建 `src/components/content/KnowledgeCard.vue`

### 📋 组件功能
- 知识点卡片容器
- 标题 + 内容插槽
- 苹果风卡片样式

---

## 📝 任务 1.11：内容组件 - TipBox

### 🎯 目标
创建 `src/components/content/TipBox.vue`

### 📋 组件功能
- 提示框：info / warning / error / success
- 图标 + 标题 + 内容
- 不同类型不同配色

### 📋 Props 定义

| Prop | 类型 | 说明 |
|------|------|------|
| type | String | 类型：info/warning/error/success |
| title | String | 标题 |

---

## 📝 任务 1.12：工具函数和入口文件

### 🎯 目标
配置 Prism.js 和创建工具函数

### 📋 需要创建的文件

1. `src/utils/prism.js` - Prism 配置
2. `src/utils/codeLoader.js` - 代码加载工具
3. `src/main.js` - 入口文件配置
4. `src/App.vue` - 根组件

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [上一步：项目构建](00-project-setup.md)
- [下一步：ES6 章节](02-es6-basics.md)

---

*任务状态：⬜ 待开始*
