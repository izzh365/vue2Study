/**
 * v-lazy 图片懒加载指令
 * 
 * 📚 知识点：
 * 1. IntersectionObserver API 检测元素可见性
 * 2. 动态替换 src 属性
 * 3. 自定义事件触发
 * 
 * 🎯 使用场景：
 * - 图片列表
 * - 瀑布流
 * - 长页面图片优化
 */

// 创建全局 IntersectionObserver 实例
let lazyObserver = null

// 初始化观察器
function initObserver() {
  if (lazyObserver) return lazyObserver
  
  lazyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.dataset.src
          
          if (src) {
            // 加载图片
            img.src = src
            img.removeAttribute('data-src')
            
            // 图片加载完成
            img.onload = function() {
              img.classList.add('loaded')
              // 触发自定义事件
              const event = new CustomEvent('lazy-loaded', { 
                detail: { src } 
              })
              img.dispatchEvent(event)
            }
            
            // 停止观察
            lazyObserver.unobserve(img)
            console.log('v-lazy: 开始加载图片', src)
          }
        }
      })
    },
    {
      // 提前 100px 开始加载
      rootMargin: '100px',
      threshold: 0.1
    }
  )
  
  return lazyObserver
}

// ==================== 全局指令：v-lazy ====================
Vue.directive('lazy', {
  /**
   * bind 钩子
   * 设置占位，开始观察
   */
  bind: function(el, binding) {
    // 确保是 img 元素
    if (el.tagName !== 'IMG') {
      console.warn('v-lazy: 只能用于 <img> 元素')
      return
    }
    
    // 保存真实 src 到 data-src
    el.dataset.src = binding.value
    
    // 设置占位图（透明 1x1 像素）
    el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  },
  
  /**
   * inserted 钩子
   * 元素插入 DOM 后开始观察
   */
  inserted: function(el, binding) {
    if (el.tagName !== 'IMG') return
    
    // 初始化观察器并开始观察
    const observer = initObserver()
    observer.observe(el)
    
    console.log('v-lazy: 开始观察', binding.value)
  },
  
  /**
   * update 钩子
   * 图片地址变化时更新
   */
  update: function(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.dataset.src = binding.value
      el.classList.remove('loaded')
      
      // 重新观察
      if (lazyObserver) {
        lazyObserver.observe(el)
      }
    }
  },
  
  /**
   * unbind 钩子
   * 停止观察
   */
  unbind: function(el) {
    if (lazyObserver && el.tagName === 'IMG') {
      lazyObserver.unobserve(el)
    }
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',
  
  data() {
    return {
      // 使用 picsum.photos 随机图片服务
      images: [
        { src: 'https://picsum.photos/400/300?random=1', alt: '图片 1' },
        { src: 'https://picsum.photos/400/300?random=2', alt: '图片 2' },
        { src: 'https://picsum.photos/400/300?random=3', alt: '图片 3' },
        { src: 'https://picsum.photos/400/300?random=4', alt: '图片 4' },
        { src: 'https://picsum.photos/400/300?random=5', alt: '图片 5' },
        { src: 'https://picsum.photos/400/300?random=6', alt: '图片 6' }
      ],
      loadLogs: []
    }
  },
  
  methods: {
    /**
     * 图片加载完成回调
     */
    onImageLoaded(index) {
      const now = new Date()
      const time = now.toLocaleTimeString()
      
      this.loadLogs.unshift({
        time,
        message: `图片 ${index + 1} 加载完成`
      })
      
      // 只保留最近 10 条日志
      if (this.loadLogs.length > 10) {
        this.loadLogs.pop()
      }
    }
  }
})
