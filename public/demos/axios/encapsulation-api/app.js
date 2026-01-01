/**
 * API 模块化封装示例
 * 
 * 目录结构建议：
 * src/
 * ├── api/
 * │   ├── index.js      # 统一导出
 * │   ├── user.js       # 用户模块
 * │   ├── post.js       # 文章模块
 * │   └── comment.js    # 评论模块
 * └── utils/
 *     └── request.js    # axios 实例
 * 
 * 优点：
 * 1. 按业务模块组织，结构清晰
 * 2. 方便维护和查找
 * 3. 支持按需导入
 * 4. 利于代码分割
 */

// ==================== 基础 request 封装 ====================

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000
})

request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

// ==================== 用户模块 API (api/user.js) ====================

const userApi = {
  /**
   * 获取用户列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  getList(params) {
    return request({
      url: '/users',
      method: 'get',
      params
    })
  },
  
  /**
   * 获取用户详情
   * @param {number} id - 用户 ID
   * @returns {Promise<Object>}
   */
  getById(id) {
    return request({
      url: `/users/${id}`,
      method: 'get'
    })
  },
  
  /**
   * 创建用户
   * @param {Object} data - 用户数据
   * @returns {Promise<Object>}
   */
  create(data) {
    return request({
      url: '/users',
      method: 'post',
      data
    })
  }
}

// ==================== 文章模块 API (api/post.js) ====================

const postApi = {
  /**
   * 获取文章列表
   * @param {Object} params - 查询参数
   * @returns {Promise<Array>}
   */
  getList(params) {
    return request({
      url: '/posts',
      method: 'get',
      params
    })
  },
  
  /**
   * 获取文章详情
   * @param {number} id - 文章 ID
   * @returns {Promise<Object>}
   */
  getById(id) {
    return request({
      url: `/posts/${id}`,
      method: 'get'
    })
  },
  
  /**
   * 更新文章
   * @param {number} id - 文章 ID
   * @param {Object} data - 更新数据
   * @returns {Promise<Object>}
   */
  update(id, data) {
    return request({
      url: `/posts/${id}`,
      method: 'put',
      data
    })
  },
  
  /**
   * 删除文章
   * @param {number} id - 文章 ID
   * @returns {Promise}
   */
  delete(id) {
    return request({
      url: `/posts/${id}`,
      method: 'delete'
    })
  }
}

// ==================== 评论模块 API (api/comment.js) ====================

const commentApi = {
  /**
   * 获取文章评论
   * @param {number} postId - 文章 ID
   * @returns {Promise<Array>}
   */
  getByPostId(postId) {
    return request({
      url: '/comments',
      method: 'get',
      params: { postId }
    })
  },
  
  /**
   * 创建评论
   * @param {Object} data - 评论数据
   * @returns {Promise<Object>}
   */
  create(data) {
    return request({
      url: '/comments',
      method: 'post',
      data
    })
  }
}

// ==================== Vue 应用 ====================

new Vue({
  el: '#app',
  
  data() {
    return {
      loading: false,
      result: null,
      currentModule: 'user',
      
      // 模块定义
      modules: [
        {
          name: 'user',
          label: '用户模块',
          icon: '👤',
          apis: [
            { name: 'getList', method: 'get', path: '/users', desc: '获取列表', handler: () => userApi.getList({ _limit: 3 }) },
            { name: 'getById', method: 'get', path: '/users/:id', desc: '获取详情', handler: () => userApi.getById(1) },
            { name: 'create', method: 'post', path: '/users', desc: '创建用户', handler: () => userApi.create({ name: 'Test', email: 'test@example.com' }) }
          ]
        },
        {
          name: 'post',
          label: '文章模块',
          icon: '📝',
          apis: [
            { name: 'getList', method: 'get', path: '/posts', desc: '获取列表', handler: () => postApi.getList({ _limit: 3 }) },
            { name: 'getById', method: 'get', path: '/posts/:id', desc: '获取详情', handler: () => postApi.getById(1) },
            { name: 'update', method: 'put', path: '/posts/:id', desc: '更新文章', handler: () => postApi.update(1, { title: 'Updated Title' }) },
            { name: 'delete', method: 'delete', path: '/posts/:id', desc: '删除文章', handler: () => postApi.delete(1) }
          ]
        },
        {
          name: 'comment',
          label: '评论模块',
          icon: '💬',
          apis: [
            { name: 'getByPostId', method: 'get', path: '/comments', desc: '获取评论', handler: () => commentApi.getByPostId(1) },
            { name: 'create', method: 'post', path: '/comments', desc: '创建评论', handler: () => commentApi.create({ postId: 1, body: 'Great!' }) }
          ]
        }
      ]
    }
  },
  
  computed: {
    currentApis() {
      const mod = this.modules.find(m => m.name === this.currentModule)
      return mod ? mod.apis : []
    }
  },
  
  methods: {
    async callApi(api) {
      this.loading = true
      this.result = null
      
      try {
        const data = await api.handler()
        this.result = JSON.stringify(data, null, 2)
      } catch (err) {
        this.result = `错误: ${err.message}`
      } finally {
        this.loading = false
      }
    }
  }
})
