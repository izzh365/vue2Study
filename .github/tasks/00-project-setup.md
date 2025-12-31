# 任务 00：项目构建任务清单

> 📋 本文档定义了 Vue2 学习项目的初始化和构建任务
> 
> ⏱️ 预计用时：30-45 分钟
> 
> 🔧 前置条件：已安装 Node.js 和 npm

---

## 📌 任务概览

| 序号 | 任务名称 | 说明 | 状态 |
|------|----------|------|------|
| 0.1 | 初始化 Vue 2 项目 | 使用 Vue CLI 创建项目 | ⬜ |
| 0.2 | 安装项目依赖 | 安装核心依赖和开发依赖 | ⬜ |
| 0.3 | 配置项目结构 | 创建目录结构和基础文件 | ⬜ |
| 0.4 | 配置 Vue CLI | vue.config.js 配置 | ⬜ |
| 0.5 | 配置 ESLint | 代码规范配置 | ⬜ |

---

## 📝 任务详情

### 任务 0.1：初始化 Vue 2 项目

#### 🎯 目标
使用 Vue CLI 创建一个 Vue 2.x 项目

#### 📋 执行步骤

```bash
# 1. 确保 Vue CLI 已安装（如未安装则执行）
npm install -g @vue/cli

# 2. 在工作目录中初始化项目（选择 Vue 2 + 手动配置）
vue create . --preset vue2-preset

# 或者手动选择配置：
# - Vue version: 2.x
# - Babel: Yes
# - Router: Yes (history mode)
# - Vuex: Yes
# - CSS Pre-processors: Sass/SCSS
# - Linter: ESLint + Prettier
```

#### ⚙️ Vue CLI 手动配置选项

```
? Please pick a preset: Manually select features
? Check the features needed for your project:
  ◉ Babel
  ◯ TypeScript
  ◯ Progressive Web App (PWA) Support
  ◉ Router
  ◉ Vuex
  ◉ CSS Pre-processors
  ◉ Linter / Formatter
  ◯ Unit Testing
  ◯ E2E Testing

? Choose a version of Vue.js: 2.x
? Use history mode for router? Yes
? Pick a CSS pre-processor: Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: ESLint + Prettier
? Pick additional lint features: Lint on save
? Where do you prefer placing config: In dedicated config files
```

#### ✅ 验证标准
- [ ] 项目根目录存在 `package.json`
- [ ] 项目根目录存在 `src/` 目录
- [ ] `package.json` 中 vue 版本为 `^2.7.x`

---

### 任务 0.2：安装项目依赖

#### 🎯 目标
安装项目所需的核心依赖和开发依赖

#### 📋 核心依赖安装

```bash
# Axios - HTTP 请求库
npm install axios

# Prism.js - 代码语法高亮
npm install prismjs prism-themes

# normalize.css - CSS 重置
npm install normalize.css
```

#### 📋 开发依赖安装（如未自动安装）

```bash
# SCSS 相关
npm install -D sass sass-loader
```

#### 📦 最终 package.json 依赖清单

```json
{
  "dependencies": {
    "axios": "^1.6.x",
    "core-js": "^3.x",
    "normalize.css": "^8.0.1",
    "prism-themes": "^1.9.0",
    "prismjs": "^1.29.0",
    "vue": "^2.7.16",
    "vue-router": "^3.6.5",
    "vuex": "^3.6.2"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^5.0.8",
    "@vue/cli-plugin-eslint": "^5.0.8",
    "@vue/cli-plugin-router": "^5.0.8",
    "@vue/cli-plugin-vuex": "^5.0.8",
    "@vue/cli-service": "^5.0.8",
    "@vue/eslint-config-prettier": "^8.0.0",
    "eslint": "^8.x",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-vue": "^9.x",
    "prettier": "^3.0.0",
    "sass": "^1.69.x",
    "sass-loader": "^13.3.x",
    "vue-template-compiler": "^2.7.16"
  }
}
```

#### ✅ 验证标准
- [ ] `npm install` 无报错
- [ ] `node_modules` 目录存在
- [ ] `package-lock.json` 已生成

---

### 任务 0.3：配置项目结构

#### 🎯 目标
创建完整的项目目录结构

#### 📋 需要创建的目录

```bash
# 源码目录结构
src/
├── assets/
│   ├── styles/           # 样式文件
│   └── images/           # 图片资源
├── components/
│   ├── layout/           # 布局组件
│   ├── demo/             # Demo 组件
│   ├── content/          # 内容组件
│   └── common/           # 通用组件
├── views/
│   └── chapters/         # 章节页面
│       ├── es6/
│       ├── lifecycle/
│       ├── directives/
│       ├── computed-watch/
│       ├── custom-directives/
│       ├── components/
│       ├── router/
│       ├── vuex/
│       └── axios/
├── demos/                # Demo 源码
│   ├── es6/
│   ├── lifecycle/
│   ├── directives/
│   ├── computed-watch/
│   ├── custom-directives/
│   ├── components/
│   ├── router/
│   ├── vuex/
│   └── axios/
├── router/               # 路由配置
├── store/                # Vuex 配置
│   └── modules/
└── utils/                # 工具函数
```

#### 📋 创建目录的命令

```bash
# 在 src 目录下创建完整结构
cd src

# 创建 assets 子目录
mkdir -p assets/styles assets/images

# 创建 components 子目录
mkdir -p components/layout components/demo components/content components/common

# 创建 views 章节目录
mkdir -p views/chapters/es6
mkdir -p views/chapters/lifecycle
mkdir -p views/chapters/directives
mkdir -p views/chapters/computed-watch
mkdir -p views/chapters/custom-directives
mkdir -p views/chapters/components
mkdir -p views/chapters/router
mkdir -p views/chapters/vuex
mkdir -p views/chapters/axios

# 创建 demos 目录
mkdir -p demos/es6 demos/lifecycle demos/directives
mkdir -p demos/computed-watch demos/custom-directives
mkdir -p demos/components demos/router demos/vuex demos/axios

# 创建 store 模块目录
mkdir -p store/modules

# 创建 utils 目录
mkdir -p utils
```

#### ✅ 验证标准
- [ ] 所有目录结构已创建
- [ ] 目录结构符合主索引文档规范

---

### 任务 0.4：配置 Vue CLI

#### 🎯 目标
创建 `vue.config.js` 配置文件

#### 📋 配置文件内容

```javascript
// vue.config.js
// Vue CLI 配置文件
// 官方文档：https://cli.vuejs.org/config/

const path = require('path')

module.exports = {
  // 部署应用时的基本 URL
  // 如果部署在子路径，如 https://example.com/vue2-learning/
  // 则设置为 '/vue2-learning/'
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // 生产环境构建输出目录
  outputDir: 'dist',

  // 静态资源目录（相对于 outputDir）
  assetsDir: 'static',

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否为生产环境生成 source map
  // 关闭可加速生产环境构建
  productionSourceMap: false,

  // 开发服务器配置
  devServer: {
    // 端口号
    port: 8080,
    // 自动打开浏览器
    open: true,
    // 热更新
    hot: true,
    // 错误遮罩层
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    }
  },

  // CSS 相关配置
  css: {
    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
    extract: process.env.NODE_ENV === 'production',
    // 是否为 CSS 开启 source map
    sourceMap: false,
    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
      // 全局引入 SCSS 变量和 mixin
      scss: {
        additionalData: `
          @import "@/assets/styles/_variables.scss";
          @import "@/assets/styles/_mixins.scss";
        `
      }
    }
  },

  // Webpack 配置
  configureWebpack: {
    // 配置路径别名
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@demos': path.resolve(__dirname, 'src/demos')
      }
    }
  },

  // 链式 Webpack 配置
  chainWebpack: (config) => {
    // 配置 Prism.js 为 raw 加载 demo 文件
    config.module
      .rule('raw')
      .test(/\.demo\.(html|js)$/)
      .use('raw-loader')
      .loader('raw-loader')
      .end()
  }
}
```

#### ✅ 验证标准
- [ ] `vue.config.js` 文件已创建
- [ ] `npm run serve` 可正常启动
- [ ] 开发服务器在 8080 端口运行

---

### 任务 0.5：配置 ESLint

#### 🎯 目标
配置 ESLint 代码规范

#### 📋 配置文件内容

```javascript
// .eslintrc.js
// ESLint 配置文件
// 用于代码规范检查

module.exports = {
  // 指定运行环境
  env: {
    browser: true,    // 浏览器环境
    es2021: true,     // ES2021 语法
    node: true        // Node.js 环境
  },

  // 继承的规则配置
  extends: [
    'plugin:vue/essential',      // Vue 2 基础规则
    'eslint:recommended',         // ESLint 推荐规则
    '@vue/eslint-config-prettier' // Prettier 兼容
  ],

  // 解析器选项
  parserOptions: {
    ecmaVersion: 'latest',  // 使用最新 ECMAScript 版本
    sourceType: 'module'    // 使用 ES 模块
  },

  // Vue 专用规则
  plugins: ['vue'],

  // 自定义规则
  rules: {
    // ==================== Vue 相关规则 ====================
    
    // 组件名必须多单词（避免与 HTML 标签冲突）
    'vue/multi-word-component-names': 'off',
    
    // 允许 v-html（学习项目中需要）
    'vue/no-v-html': 'off',
    
    // ==================== 基础规则 ====================
    
    // 禁止使用 console（生产环境警告）
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    
    // 禁止使用 debugger（生产环境警告）
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    
    // 禁止未使用的变量
    'no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',  // 忽略以 _ 开头的参数
      varsIgnorePattern: '^_'   // 忽略以 _ 开头的变量
    }],
    
    // 禁止不必要的分号
    'semi': ['error', 'never'],
    
    // 使用单引号
    'quotes': ['error', 'single', { 
      avoidEscape: true,           // 允许字符串使用转义
      allowTemplateLiterals: true  // 允许模板字符串
    }],
    
    // 对象末尾逗号
    'comma-dangle': ['error', 'never'],
    
    // 箭头函数参数括号
    'arrow-parens': ['error', 'as-needed']
  },

  // 全局变量定义
  globals: {
    Prism: 'readonly'  // Prism.js 全局变量
  }
}
```

#### 📋 Prettier 配置

```javascript
// .prettierrc.js
// Prettier 配置文件
// 用于代码格式化

module.exports = {
  // 使用单引号
  singleQuote: true,
  
  // 不使用分号
  semi: false,
  
  // 缩进宽度
  tabWidth: 2,
  
  // 使用空格缩进
  useTabs: false,
  
  // 对象末尾不加逗号
  trailingComma: 'none',
  
  // 每行最大字符数
  printWidth: 100,
  
  // 箭头函数单参数不加括号
  arrowParens: 'avoid',
  
  // HTML 空格敏感度
  htmlWhitespaceSensitivity: 'ignore',
  
  // Vue 文件脚本和样式缩进
  vueIndentScriptAndStyle: false,
  
  // 行尾换行符
  endOfLine: 'auto'
}
```

#### ✅ 验证标准
- [ ] `.eslintrc.js` 文件已创建
- [ ] `.prettierrc.js` 文件已创建
- [ ] `npm run lint` 无错误

---

## 🔧 完整安装命令汇总

```bash
# 1. 进入项目目录
cd d:\www\webs\vue2\new2

# 2. 使用 Vue CLI 初始化项目（手动选择配置）
vue create . --force

# 3. 安装额外依赖
npm install axios prismjs prism-themes normalize.css

# 4. 创建目录结构
# （使用上述目录创建命令）

# 5. 创建配置文件
# （创建 vue.config.js、.eslintrc.js、.prettierrc.js）

# 6. 验证安装
npm run serve
```

---

## ✅ 任务完成检查清单

- [ ] Vue 2 项目初始化成功
- [ ] 所有依赖安装完成
- [ ] 目录结构创建完成
- [ ] vue.config.js 配置完成
- [ ] ESLint 配置完成
- [ ] `npm run serve` 正常启动
- [ ] 浏览器可访问 http://localhost:8080

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [下一步：公共模板任务](01-common-templates.md)
- [Vue CLI 官方文档](https://cli.vuejs.org/)

---

*任务状态：⬜ 待开始*
