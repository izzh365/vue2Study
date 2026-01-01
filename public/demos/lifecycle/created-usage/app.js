/**
 * created 钩子常见用法
 * 
 * created 是最常用的生命周期钩子之一
 * 
 * 为什么在 created 中发起请求？
 * 1. 可以访问 data 和 methods
 * 2. 比 mounted 更早执行，数据更快准备好
 * 3. 在服务端渲染（SSR）中也会执行
 * 4. 不依赖 DOM，适合纯数据操作
 */

new Vue({
  el: '#app',
  
  data() {
    return {
      // 用户信息
      userInfo: null,
      
      // 加载状态
      loading: true,
      
      // 错误信息
      error: null,
      
      // 格式化时间（在 created 中初始化）
      formattedTime: '',
      
      // 执行时间线
      timeline: []
    }
  },
  
  /**
   * created 钩子
   * 
   * 最佳实践：
   * 1. 发起 API 请求获取初始数据
   * 2. 初始化计算属性无法处理的复杂数据
   * 3. 设置事件总线监听
   * 4. 初始化第三方库（不依赖 DOM 的）
   */
  created() {
    // 记录时间线
    this.addTimeline('created 钩子开始执行')
    
    // 用例1：发起 API 请求
    this.fetchUserInfo()
    
    // 用例2：初始化计算数据
    this.initFormattedTime()
    
    // 用例3：设置事件监听（非 DOM 事件）
    this.setupEventListeners()
    
    this.addTimeline('created 钩子执行完毕')
  },
  
  /**
   * mounted 钩子
   * 对比：此时 DOM 已经可用
   */
  mounted() {
    this.addTimeline('mounted 钩子执行（DOM 已就绪）')
  },
  
  methods: {
    /**
     * 模拟获取用户信息
     * 实际项目中通常使用 axios
     */
    async fetchUserInfo() {
      this.loading = true
      this.error = null
      
      this.addTimeline('开始请求用户数据...')
      
      try {
        // 模拟网络延迟
        await this.delay(1500)
        
        // 模拟 API 返回的数据
        this.userInfo = {
          id: 1001,
          name: '张三',
          email: 'zhangsan@example.com',
          avatar: ''
        }
        
        this.addTimeline('用户数据获取成功 ✓')
        
      } catch (err) {
        this.error = '获取用户信息失败：' + err.message
        this.addTimeline('用户数据获取失败 ✗')
      } finally {
        this.loading = false
      }
    },
    
    /**
     * 初始化格式化时间
     * 演示在 created 中进行数据初始化
     */
    initFormattedTime() {
      const now = new Date()
      this.formattedTime = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      
      this.addTimeline('初始化时间戳完成')
    },
    
    /**
     * 设置事件监听
     * 演示非 DOM 相关的初始化
     */
    setupEventListeners() {
      // 例如：设置 Vuex 的 store 订阅
      // 或者设置 WebSocket 连接
      // 或者设置事件总线监听
      
      this.addTimeline('事件监听设置完成')
    },
    
    /**
     * 添加时间线记录
     */
    addTimeline(text) {
      const now = new Date()
      const time = now.toLocaleTimeString('zh-CN', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
      })
      
      this.timeline.push({ time, text })
    },
    
    /**
     * 延迟函数
     */
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    
    /**
     * 重新加载数据
     */
    refreshData() {
      this.timeline = []
      this.addTimeline('用户点击刷新按钮')
      this.fetchUserInfo()
    }
  }
})
