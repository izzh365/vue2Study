// router/index.js
// Vue Router 路由配置

import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册路由插件
Vue.use(VueRouter)

// ==================== 路由配置 ====================

const routes = [
  // 首页
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' }
  },

  // ==================== ES6 基础章节 ====================
  {
    path: '/es6',
    name: 'ES6Index',
    component: () => import('@/views/chapters/es6/Index.vue'),
    meta: { title: 'ES6 基础', chapter: 2 }
  },
  {
    path: '/es6/const-let',
    name: 'ConstLet',
    component: () => import('@/views/chapters/es6/ConstLet.vue'),
    meta: { title: 'const 与 let', chapter: 2 }
  },
  {
    path: '/es6/object-enhance',
    name: 'ObjectEnhance',
    component: () => import('@/views/chapters/es6/ObjectEnhance.vue'),
    meta: { title: '对象增强写法', chapter: 2 }
  },
  {
    path: '/es6/higher-order',
    name: 'HigherOrder',
    component: () => import('@/views/chapters/es6/HigherOrder.vue'),
    meta: { title: '高阶函数', chapter: 2 }
  },
  {
    path: '/es6/arrow-function',
    name: 'ArrowFunction',
    component: () => import('@/views/chapters/es6/ArrowFunction.vue'),
    meta: { title: '箭头函数', chapter: 2 }
  },
  {
    path: '/es6/promise-async',
    name: 'PromiseAsync',
    component: () => import('@/views/chapters/es6/PromiseAsync.vue'),
    meta: { title: 'Promise 与异步', chapter: 2 }
  },

  // ==================== 生命周期章节 ====================
  {
    path: '/lifecycle',
    name: 'LifecycleIndex',
    component: () => import('@/views/chapters/lifecycle/Index.vue'),
    meta: { title: 'Vue 生命周期', chapter: 3 }
  },
  {
    path: '/lifecycle/detail',
    name: 'Lifecycle',
    component: () => import('@/views/chapters/lifecycle/Lifecycle.vue'),
    meta: { title: '生命周期详解', chapter: 3 }
  },

  // ==================== 指令章节 ====================
  {
    path: '/directives',
    name: 'DirectivesIndex',
    component: () => import('@/views/chapters/directives/Index.vue'),
    meta: { title: 'Vue 指令', chapter: 4 }
  },

  // ==================== 计算属性章节 ====================
  {
    path: '/computed-watch',
    name: 'ComputedWatchIndex',
    component: () => import('@/views/chapters/computed-watch/Index.vue'),
    meta: { title: '计算属性与侦听器', chapter: 5 }
  },

  // ==================== 自定义指令章节 ====================
  {
    path: '/custom-directives',
    name: 'CustomDirectivesIndex',
    component: () => import('@/views/chapters/custom-directives/Index.vue'),
    meta: { title: '自定义指令', chapter: 6 }
  },

  // ==================== 组件化章节 ====================
  {
    path: '/components',
    name: 'ComponentsIndex',
    component: () => import('@/views/chapters/components/Index.vue'),
    meta: { title: 'Vue 组件化', chapter: 7 }
  },

  // ==================== 路由章节 ====================
  {
    path: '/router',
    name: 'RouterIndex',
    component: () => import('@/views/chapters/router/Index.vue'),
    meta: { title: 'Vue-Router', chapter: 8 }
  },

  // ==================== Vuex 章节 ====================
  {
    path: '/vuex',
    name: 'VuexIndex',
    component: () => import('@/views/chapters/vuex/Index.vue'),
    meta: { title: 'Vuex 状态管理', chapter: 9 }
  },

  // ==================== Axios 章节 ====================
  {
    path: '/axios',
    name: 'AxiosIndex',
    component: () => import('@/views/chapters/axios/Index.vue'),
    meta: { title: 'Axios 网络请求', chapter: 10 }
  },

  // 404 页面
  {
    path: '*',
    redirect: '/'
  }
]

// ==================== 创建路由实例 ====================

const router = new VueRouter({
  // 使用 history 模式
  mode: 'history',
  // 基础路径
  base: process.env.BASE_URL,
  // 路由配置
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// ==================== 全局前置守卫 ====================

router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} - Vue2 学习` : 'Vue2 零基础学习'
  next()
})

export default router
