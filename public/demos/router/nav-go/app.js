/**
 * go / back / forward 历史导航演示
 */

const createStep = (num) => ({
  template: `
    <div>
      <h4 style="color: #007aff;">📌 Step ${num}</h4>
      <p style="color: #86868b; margin-top: 8px;">这是第 ${num} 步</p>
      <p style="font-size: 13px; margin-top: 12px;">
        当前路径: <code>{{ $route.path }}</code>
      </p>
    </div>
  `
})

const routes = [
  { path: '/', redirect: '/step-1' },
  { path: '/step-1', component: createStep(1) },
  { path: '/step-2', component: createStep(2) },
  { path: '/step-3', component: createStep(3) },
  { path: '/step-4', component: createStep(4) }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router
})

/**
 * 历史导航方法：
 * 
 * $router.go(n)
 * - n > 0: 前进 n 步
 * - n < 0: 后退 n 步
 * - n = 0: 刷新当前页面
 * 
 * $router.back()
 * - 等于 $router.go(-1)
 * - 后退一步
 * 
 * $router.forward()
 * - 等于 $router.go(1)
 * - 前进一步
 * 
 * 注意：
 * - 如果历史记录不够，go() 会静默失败
 * - 这些方法类似浏览器的前进/后退按钮
 */
