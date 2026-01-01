/**
 * map 高阶函数 - 数据转换
 *
 * 在实际项目中，map 常用于：
 * 1. API 返回数据转换为前端需要的格式
 * 2. 添加计算字段（如折扣价、状态等）
 * 3. 数据格式化（如日期、金额）
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 原始商品数据（模拟 API 返回）
      products: [
        { id: 1, name: 'iPhone 15', price: 6999, stock: 50 },
        { id: 2, name: 'MacBook Pro', price: 12999, stock: 5 },
        { id: 3, name: 'AirPods Pro', price: 1899, stock: 200 },
        { id: 4, name: 'iPad Air', price: 4799, stock: 0 },
        { id: 5, name: 'Apple Watch', price: 2999, stock: 30 }
      ],
      // 转换后的商品数据
      transformedProducts: []
    }
  },

  methods: {
    /**
     * 转换商品数据
     * 添加计算字段、格式化数据
     */
    transformProducts() {
      this.transformedProducts = this.products.map(product => {
        // 计算折扣价（8折）
        const discount = 0.8
        const discountPrice = Math.floor(product.price * discount)

        // 判断库存状态
        let stockStatus = ''
        if (product.stock === 0) {
          stockStatus = '已售罄'
        } else if (product.stock < 10) {
          stockStatus = '库存紧张'
        } else {
          stockStatus = '库存充足'
        }

        // 判断是否热销（库存 > 30）
        const isHot = product.stock > 30

        // 返回新对象，包含原有属性和新增属性
        return {
          ...product, // 展开原对象的所有属性
          originalPrice: `¥${product.price}`, // 格式化原价
          discountPrice: `¥${discountPrice}`, // 计算并格式化折扣价
          stockStatus, // 库存状态文字
          isHot // 是否热销标记
        }
      })

      console.log('原始数据:', this.products)
      console.log('转换后:', this.transformedProducts)
    }
  }
})
