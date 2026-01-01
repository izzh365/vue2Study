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
  {
    path: '/directives/v-bind',
    name: 'VBind',
    component: () => import('@/views/chapters/directives/VBind.vue'),
    meta: { title: 'v-bind 属性绑定', chapter: 4 }
  },
  {
    path: '/directives/v-on',
    name: 'VOn',
    component: () => import('@/views/chapters/directives/VOn.vue'),
    meta: { title: 'v-on 事件绑定', chapter: 4 }
  },
  {
    path: '/directives/v-model',
    name: 'VModel',
    component: () => import('@/views/chapters/directives/VModel.vue'),
    meta: { title: 'v-model 双向绑定', chapter: 4 }
  },
  {
    path: '/directives/v-if-show',
    name: 'VIfShow',
    component: () => import('@/views/chapters/directives/VIfShow.vue'),
    meta: { title: 'v-if / v-show 条件渲染', chapter: 4 }
  },
  {
    path: '/directives/v-for',
    name: 'VFor',
    component: () => import('@/views/chapters/directives/VFor.vue'),
    meta: { title: 'v-for 列表渲染', chapter: 4 }
  },

  // ==================== 计算属性章节 ====================
  {
    path: '/computed-watch',
    name: 'ComputedWatchIndex',
    component: () => import('@/views/chapters/computed-watch/Index.vue'),
    meta: { title: '计算属性与侦听器', chapter: 5 }
  },
  {
    path: '/computed-watch/computed',
    name: 'Computed',
    component: () => import('@/views/chapters/computed-watch/Computed.vue'),
    meta: { title: 'computed 计算属性', chapter: 5 }
  },
  {
    path: '/computed-watch/watch',
    name: 'Watch',
    component: () => import('@/views/chapters/computed-watch/Watch.vue'),
    meta: { title: 'watch 侦听器', chapter: 5 }
  },

  // ==================== 自定义指令章节 ====================
  {
    path: '/custom-directives',
    name: 'CustomDirectivesIndex',
    component: () => import('@/views/chapters/custom-directives/Index.vue'),
    meta: { title: '自定义指令', chapter: 6 }
  },
  {
    path: '/custom-directives/main',
    name: 'CustomDirectives',
    component: () => import('@/views/chapters/custom-directives/CustomDirectives.vue'),
    meta: { title: '自定义指令详解', chapter: 6 }
  },

  // ==================== 组件化章节 ====================
  {
    path: '/components',
    name: 'ComponentsIndex',
    component: () => import('@/views/chapters/components/Index.vue'),
    meta: { title: 'Vue 组件化', chapter: 7 }
  },
  {
    path: '/components/basic',
    name: 'ComponentBasic',
    component: () => import('@/views/chapters/components/ComponentBasic.vue'),
    meta: { title: '组件基础', chapter: 7 }
  },
  {
    path: '/components/props',
    name: 'ComponentProps',
    component: () => import('@/views/chapters/components/Props.vue'),
    meta: { title: 'Props 父传子', chapter: 7 }
  },
  {
    path: '/components/emit',
    name: 'ComponentEmit',
    component: () => import('@/views/chapters/components/Emit.vue'),
    meta: { title: '$emit 子传父', chapter: 7 }
  },
  {
    path: '/components/refs',
    name: 'ComponentRefs',
    component: () => import('@/views/chapters/components/Refs.vue'),
    meta: { title: '$refs 访问子组件', chapter: 7 }
  },
  {
    path: '/components/slot',
    name: 'ComponentSlot',
    component: () => import('@/views/chapters/components/Slot.vue'),
    meta: { title: 'Slot 插槽', chapter: 7 }
  },

  // ==================== 路由章节 ====================
  {
    path: '/router',
    name: 'RouterIndex',
    component: () => import('@/views/chapters/router/Index.vue'),
    meta: { title: 'Vue-Router', chapter: 8 }
  },
  {
    path: '/router/basic',
    name: 'RouterBasic',
    component: () => import('@/views/chapters/router/RouterBasic.vue'),
    meta: { title: '路由基础', chapter: 8 }
  },
  {
    path: '/router/dynamic',
    name: 'DynamicRoute',
    component: () => import('@/views/chapters/router/DynamicRoute.vue'),
    meta: { title: '动态路由', chapter: 8 }
  },
  {
    path: '/router/nested',
    name: 'NestedRoute',
    component: () => import('@/views/chapters/router/NestedRoute.vue'),
    meta: { title: '嵌套路由', chapter: 8 }
  },
  {
    path: '/router/programmatic',
    name: 'ProgrammaticNav',
    component: () => import('@/views/chapters/router/ProgrammaticNav.vue'),
    meta: { title: '编程式导航', chapter: 8 }
  },
  {
    path: '/router/guards',
    name: 'NavigationGuards',
    component: () => import('@/views/chapters/router/NavigationGuards.vue'),
    meta: { title: '导航守卫', chapter: 8 }
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
