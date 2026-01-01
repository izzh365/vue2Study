/**
 * 组件内守卫演示
 * 
 * 三种组件内守卫：
 * 1. beforeRouteEnter - 进入组件前
 * 2. beforeRouteUpdate - 路由参数变化时
 * 3. beforeRouteLeave - 离开组件前
 */

const logs = Vue.observable([])

function addLog(message) {
  const time = new Date().toLocaleTimeString()
  logs.unshift(`[${time}] ${message}`)
  if (logs.length > 10) logs.pop()
}

// 首页组件
const Home = {
  template: '<div><h4>🏠 首页</h4><p style="color:#86868b">简单页面，无特殊守卫</p></div>'
}

// 表单组件 - 演示 beforeRouteLeave
const FormPage = {
  template: `
    <div class="form-demo">
      <h4>📝 表单页面</h4>
      <textarea 
        v-model="content" 
        rows="3" 
        placeholder="输入一些内容后离开..."
      ></textarea>
      <p>✏️ 修改内容后离开页面会触发确认</p>
    </div>
  `,
  data() {
    return {
      content: '',
      savedContent: ''
    }
  },
  /**
   * ⭐ beforeRouteEnter
   * 在渲染组件前调用
   * 注意：此时还没有 this！
   */
  beforeRouteEnter(to, from, next) {
    addLog('FormPage: beforeRouteEnter (无 this)')
    
    // 通过 next 回调访问组件实例
    next(vm => {
      addLog('  next(vm) 回调: 可以访问 vm')
      vm.savedContent = ''  // 初始化
    })
  },
  
  /**
   * ⭐ beforeRouteLeave
   * 离开组件前调用
   * 常用于：提示保存未保存的修改
   */
  beforeRouteLeave(to, from, next) {
    addLog('FormPage: beforeRouteLeave')
    
    if (this.content && this.content !== this.savedContent) {
      const answer = window.confirm('内容未保存，确定要离开吗？')
      if (answer) {
        addLog('  用户确认离开')
        next()
      } else {
        addLog('  用户取消离开')
        next(false)
      }
    } else {
      next()
    }
  }
}

// 用户详情组件 - 演示 beforeRouteUpdate
const UserDetail = {
  template: `
    <div>
      <h4>👤 用户详情</h4>
      <p style="color:#007aff">用户ID: {{ $route.params.id }}</p>
      <p style="color:#86868b;font-size:13px">切换用户时会触发 beforeRouteUpdate</p>
    </div>
  `,
  beforeRouteEnter(to, from, next) {
    addLog(`UserDetail: beforeRouteEnter (用户${to.params.id})`)
    next()
  },
  
  /**
   * ⭐ beforeRouteUpdate
   * 路由参数变化时调用（组件被复用）
   * 如 /user/1 -> /user/2
   */
  beforeRouteUpdate(to, from, next) {
    addLog(`UserDetail: beforeRouteUpdate`)
    addLog(`  用户 ${from.params.id} → 用户 ${to.params.id}`)
    // 可以在这里重新获取数据
    next()
  },
  
  beforeRouteLeave(to, from, next) {
    addLog(`UserDetail: beforeRouteLeave (用户${from.params.id})`)
    next()
  }
}

const routes = [
  { path: '/', component: Home },
  { path: '/form', component: FormPage },
  { path: '/user/:id', component: UserDetail }
]

const router = new VueRouter({ routes })

new Vue({
  el: '#app',
  router,
  data: { logs }
})

/**
 * 组件内守卫对比：
 * 
 * beforeRouteEnter:
 * - 组件创建前调用
 * - 无法访问 this
 * - 可用 next(vm => {}) 访问实例
 * 
 * beforeRouteUpdate:
 * - 组件复用时调用（参数变化）
 * - 可以访问 this
 * 
 * beforeRouteLeave:
 * - 离开组件前调用
 * - 可以访问 this
 * - 常用于表单未保存提示
 */
