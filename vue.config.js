// vue.config.js
// Vue CLI 配置文件
// 官方文档：https://cli.vuejs.org/config/

const path = require('path')

module.exports = {
  // 部署应用时的基本 URL
  // 如果部署在子路径，如 https://example.com/vue2-learning/
  // 则设置为 '/vue2-learning/'
  publicPath: '/',

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
  chainWebpack: config => {
    // 配置 HTML 插件
    config.plugin('html').tap(args => {
      args[0].title = 'Vue2 零基础学习'
      return args
    })
  }
}
