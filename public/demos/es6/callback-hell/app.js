/**
 * 回调地狱问题演示
 *
 * 什么是回调地狱？
 * - 多个异步操作需要按顺序执行
 * - 使用回调函数会导致代码不断嵌套
 * - 形成"金字塔"形状，难以阅读和维护
 *
 * 问题：
 * 1. 代码可读性差
 * 2. 错误处理困难
 * 3. 难以调试和维护
 */
new Vue({
  el: '#app',

  data() {
    return {
      logs: []
    }
  },

  methods: {
    /**
     * 添加日志
     */
    addLog(message, type = 'step') {
      const now = new Date()
      const time =
        now.toLocaleTimeString('zh-CN', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0')

      this.logs.push({ time, message, type })
    },

    /**
     * 模拟异步请求（回调方式）
     */
    mockRequest(name, data, callback, delay = 500) {
      setTimeout(() => {
        callback(data)
      }, delay)
    },

    /**
     * 模拟异步请求（Promise 方式）
     */
    mockRequestPromise(name, data, delay = 500) {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data)
        }, delay)
      })
    },

    /**
     * 演示回调地狱
     * 注意观察代码的嵌套层级
     */
    runCallbackHell() {
      this.logs = []
      this.addLog('🚀 开始执行回调地狱示例...', 'step')

      // 第一层：获取用户
      this.addLog('📍 第1层嵌套：请求用户数据...', 'step')
      this.mockRequest('getUser', { id: 1, name: '张三' }, user => {
        this.addLog(`✓ 获取用户成功: ${JSON.stringify(user)}`, 'data')

        // 第二层：获取订单
        this.addLog('📍 第2层嵌套：请求订单数据...', 'step')
        this.mockRequest('getOrders', [{ id: 101, product: '手机' }], orders => {
          this.addLog(`✓ 获取订单成功: ${JSON.stringify(orders)}`, 'data')

          // 第三层：获取商品
          this.addLog('📍 第3层嵌套：请求商品数据...', 'step')
          this.mockRequest('getProducts', { id: 'P001', name: 'iPhone 15' }, product => {
            this.addLog(`✓ 获取商品成功: ${JSON.stringify(product)}`, 'data')

            // 第四层：获取评价
            this.addLog('📍 第4层嵌套：请求评价数据...', 'step')
            this.mockRequest('getReviews', [{ score: 5, content: '很好！' }], reviews => {
              this.addLog(`✓ 获取评价成功: ${JSON.stringify(reviews)}`, 'data')
              this.addLog('🏁 回调地狱执行完成（共4层嵌套）', 'step')
              this.addLog('⚠️ 问题：代码嵌套太深，难以维护！', 'error')
            })
          })
        })
      })
    },

    /**
     * 演示 Promise 链式调用
     * 代码扁平化，更易读
     */
    runPromiseChain() {
      this.logs = []
      this.addLog('🚀 开始执行 Promise 链式调用...', 'step')

      this.addLog('📍 第1步：请求用户数据...', 'step')
      this.mockRequestPromise('getUser', { id: 1, name: '张三' })
        .then(user => {
          this.addLog(`✓ 获取用户成功: ${JSON.stringify(user)}`, 'data')
          this.addLog('📍 第2步：请求订单数据...', 'step')
          return this.mockRequestPromise('getOrders', [{ id: 101, product: '手机' }])
        })
        .then(orders => {
          this.addLog(`✓ 获取订单成功: ${JSON.stringify(orders)}`, 'data')
          this.addLog('📍 第3步：请求商品数据...', 'step')
          return this.mockRequestPromise('getProducts', { id: 'P001', name: 'iPhone 15' })
        })
        .then(product => {
          this.addLog(`✓ 获取商品成功: ${JSON.stringify(product)}`, 'data')
          this.addLog('📍 第4步：请求评价数据...', 'step')
          return this.mockRequestPromise('getReviews', [{ score: 5, content: '很好！' }])
        })
        .then(reviews => {
          this.addLog(`✓ 获取评价成功: ${JSON.stringify(reviews)}`, 'data')
          this.addLog('🏁 Promise 链执行完成（无嵌套！）', 'step')
          this.addLog('✅ 优点：代码扁平，清晰易读！', 'data')
        })
        .catch(err => {
          this.addLog(`❌ 错误: ${err.message}`, 'error')
        })
    }
  }
})
