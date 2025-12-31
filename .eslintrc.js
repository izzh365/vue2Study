// .eslintrc.js
// ESLint 配置文件
// 用于代码规范检查

module.exports = {
  // 标识为根配置
  root: true,

  // 指定运行环境
  env: {
    browser: true, // 浏览器环境
    es2021: true, // ES2021 语法
    node: true // Node.js 环境
  },

  // 继承的规则配置
  extends: [
    'plugin:vue/essential', // Vue 2 基础规则
    'eslint:recommended', // ESLint 推荐规则
    '@vue/eslint-config-prettier' // Prettier 兼容
  ],

  // 解析器选项
  parserOptions: {
    ecmaVersion: 'latest', // 使用最新 ECMAScript 版本
    sourceType: 'module' // 使用 ES 模块
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
    'no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_', // 忽略以 _ 开头的参数
        varsIgnorePattern: '^_' // 忽略以 _ 开头的变量
      }
    ]
  },

  // 全局变量定义
  globals: {
    Prism: 'readonly' // Prism.js 全局变量
  }
}
