/**
 * v-model 下拉选择框示例
 *
 * select 元素的 v-model 绑定规则：
 *
 * 1. 单选（默认）→ 字符串/任意值
 *    选中哪个 option，v-model 就等于那个 option 的 value
 *
 * 2. 多选（multiple）→ 数组
 *    选中的 option 的 value 组成数组
 *
 * 💡 小技巧：
 * - option 的 :value 可以绑定对象
 * - 使用 disabled 的空 option 作为占位提示
 */

new Vue({
  el: '#app',

  data() {
    return {
      // 城市选项
      cities: [
        { value: 'beijing', label: '北京' },
        { value: 'shanghai', label: '上海' },
        { value: 'guangzhou', label: '广州' },
        { value: 'shenzhen', label: '深圳' },
        { value: 'hangzhou', label: '杭州' }
      ],
      selectedCity: '',

      // 技能列表
      skills: ['JavaScript', 'Vue.js', 'React', 'Node.js', 'Python', 'Java', 'Go'],
      selectedSkills: [],

      // 产品列表
      products: [
        { id: 1, name: 'iPhone 15', price: 6999 },
        { id: 2, name: 'iPad Pro', price: 8999 },
        { id: 3, name: 'MacBook Pro', price: 14999 },
        { id: 4, name: 'AirPods Pro', price: 1899 }
      ],

      // 颜色选项
      colors: ['银色', '深空灰', '金色', '蓝色'],

      // 订单
      order: {
        product: null,
        color: '',
        quantity: 1
      }
    }
  }
})
