/**
 * reduce 高阶函数 - 高级用法
 *
 * reduce 不仅仅用于求和，它是最强大的数组方法
 * 可以实现：
 * 1. 数组去重
 * 2. 分组统计
 * 3. 数组扁平化
 * 4. 对象合并
 * 5. 实现 map 和 filter
 */
new Vue({
  el: '#app',

  data() {
    return {
      // 带重复的水果数组
      fruits: ['苹果', '香蕉', '苹果', '橙子', '香蕉', '苹果', '葡萄'],
      // 去重结果
      uniqueFruits: [],
      // 统计结果
      fruitCounts: null,
      // 嵌套数组
      nestedArray: [
        [1, 2],
        [3, 4],
        [5, 6]
      ],
      // 扁平化结果
      flatArray: []
    }
  },

  methods: {
    /**
     * 数组去重
     * 使用 reduce 和 includes 判断
     */
    removeDuplicates() {
      this.uniqueFruits = this.fruits.reduce((acc, current) => {
        // 如果累加器中不包含当前元素，就添加
        if (!acc.includes(current)) {
          acc.push(current)
        }
        return acc
      }, []) // 初始值是空数组

      console.log('原数组:', this.fruits)
      console.log('去重后:', this.uniqueFruits)
    },

    /**
     * 分组统计
     * 统计每种水果的数量
     */
    countFruits() {
      this.fruitCounts = this.fruits.reduce((acc, current) => {
        // 如果已有这个水果，数量 +1，否则初始化为 1
        acc[current] = (acc[current] || 0) + 1
        return acc
      }, {}) // 初始值是空对象

      console.log('统计结果:', this.fruitCounts)
    },

    /**
     * 数组扁平化
     * 将二维数组转为一维
     */
    flattenArray() {
      this.flatArray = this.nestedArray.reduce((acc, current) => {
        // concat 合并数组
        return acc.concat(current)
      }, [])

      // 更简洁的写法
      // this.flatArray = this.nestedArray.reduce((acc, curr) => [...acc, ...curr], [])

      console.log('原数组:', this.nestedArray)
      console.log('扁平化:', this.flatArray)
    }
  }
})
