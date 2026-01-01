/**
 * 多环境配置示例
 * 
 * Vue CLI 环境变量规范：
 * 1. 文件命名：.env / .env.development / .env.production
 * 2. 变量命名：必须以 VUE_APP_ 开头
 * 3. 使用方式：process.env.VUE_APP_XXX
 * 
 * 常见配置项：
 * - VUE_APP_API_URL：API 基础地址
 * - VUE_APP_TIMEOUT：请求超时时间
 * - VUE_APP_ENV_NAME：环境名称
 */

// ==================== 环境配置 ====================

const envConfigs = {
  development: {
    NODE_ENV: 'development',
    VUE_APP_API_URL: 'http://localhost:3000/api',
    VUE_APP_TIMEOUT: 30000,
    VUE_APP_ENV_NAME: '开发环境'
  },
  staging: {
    NODE_ENV: 'staging',
    VUE_APP_API_URL: 'https://staging-api.example.com',
    VUE_APP_TIMEOUT: 15000,
    VUE_APP_ENV_NAME: '测试环境'
  },
  production: {
    NODE_ENV: 'production',
    VUE_APP_API_URL: 'https://api.example.com',
    VUE_APP_TIMEOUT: 10000,
    VUE_APP_ENV_NAME: '生产环境'
  }
}

// 当前激活的配置
let activeConfig = envConfigs.development

// ==================== 创建 request 实例 ====================

function createRequest(config) {
  const instance = axios.create({
    // 使用环境配置
    baseURL: config.VUE_APP_API_URL,
    timeout: config.VUE_APP_TIMEOUT,
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  // 请求拦截器
  instance.interceptors.request.use(config => {
    console.log(`📤 [${activeConfig.VUE_APP_ENV_NAME}]`, config.url)
    return config
  })
  
  // 响应拦截器
  instance.interceptors.response.use(
    response => response.data,
    error => {
      console.error(`❌ [${activeConfig.VUE_APP_ENV_NAME}] 请求失败`)
      return Promise.reject(error)
    }
  )
  
  return instance
}

// 初始创建
let request = createRequest(activeConfig)

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      result: null,
      currentEnv: 'development',
      
      // 环境列表
      environments: [
        { key: 'development', name: '开发环境', label: 'localhost:3000', icon: '🔧' },
        { key: 'staging', name: '测试环境', label: 'staging-api', icon: '🧪' },
        { key: 'production', name: '生产环境', label: 'api.example.com', icon: '🚀' }
      ]
    }
  },
  
  computed: {
    /**
     * 获取当前环境配置
     */
    currentConfig() {
      return envConfigs[this.currentEnv]
    }
  },
  
  methods: {
    /**
     * 切换环境
     */
    switchEnv(envKey) {
      this.currentEnv = envKey
      activeConfig = envConfigs[envKey]
      
      // 重新创建 request 实例
      request = createRequest(activeConfig)
      
      this.result = null
      
      console.log(`🌍 已切换到 ${activeConfig.VUE_APP_ENV_NAME}`)
      console.log('   baseURL:', activeConfig.VUE_APP_API_URL)
      console.log('   timeout:', activeConfig.VUE_APP_TIMEOUT)
    },
    
    /**
     * 测试请求
     */
    async testRequest() {
      this.loading = true
      this.result = null
      
      const startTime = Date.now()
      
      try {
        // 使用真实的 API 进行测试
        // 注意：这里使用 jsonplaceholder 代替环境配置的 URL（因为是 demo）
        const testApi = axios.create({
          baseURL: 'https://jsonplaceholder.typicode.com',
          timeout: this.currentConfig.VUE_APP_TIMEOUT
        })
        
        const data = await testApi.get('/posts/1').then(res => res.data)
        const duration = Date.now() - startTime
        
        this.result = JSON.stringify({
          success: true,
          environment: this.currentConfig.VUE_APP_ENV_NAME,
          configuredBaseURL: this.currentConfig.VUE_APP_API_URL,
          timeout: this.currentConfig.VUE_APP_TIMEOUT,
          actualDuration: `${duration}ms`,
          data: {
            id: data.id,
            title: data.title.substring(0, 30) + '...'
          }
        }, null, 2)
        
      } catch (err) {
        this.result = JSON.stringify({
          success: false,
          environment: this.currentConfig.VUE_APP_ENV_NAME,
          error: err.message
        }, null, 2)
      } finally {
        this.loading = false
      }
    }
  }
})
