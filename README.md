# Vue2 学习项目 (vue2Study)

这是一个面向零基础学习者的 Vue 2 系统化学习项目。项目包含章节文档、示例 Demo、以及教学用的组件与样式示例。

## 目录结构（简要）

- `public/` - 静态资源与 demo
- `src/` - 源代码
  - `assets/` - 样式与图片
  - `components/` - 公共组件
  - `views/` - 页面视图与章节
  - `router/` - 路由配置
  - `store/` - Vuex 状态管理
  - `demos/` - Demo 源码
- `.izzh/tasks/` - 学习任务文档（章节索引）

## 快速开始

确保已安装 Node.js（建议 16+）和 npm：

```bash
# 安装依赖
npm install

# 本地开发
npm run serve

# 生产构建
npm run build
```

## 开发约定

- 使用 Vue 2.x（支持 Composition API）
- 样式使用 SCSS
- 代码风格通过 ESLint + Prettier 规范化

## 贡献

欢迎提交 issue 或 pull request。如果你要提交代码，请先运行：

```bash
npm run lint
npm test # 若项目包含测试
```

## 许可证

本项目采用 MIT 许可证，详见 `LICENSE` 文件。

---

仓库地址：https://github.com/izzh365/vue2Study
