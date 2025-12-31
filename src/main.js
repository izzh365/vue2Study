// main.js
// Vue 应用入口文件

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入全局样式
import '@/assets/styles/main.scss'

// 导入 Prism.js 代码高亮
import Prism from 'prismjs'
// 导入 Prism 行号插件
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
// 导入常用语言支持
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup' // HTML

// 将 Prism 挂载到全局
Vue.prototype.$prism = Prism

// 关闭生产环境提示
Vue.config.productionTip = false

// 创建 Vue 实例
new Vue({
  // 路由
  router,
  // 状态管理
  store,
  // 渲染根组件
  render: h => h(App)
}).$mount('#app')
