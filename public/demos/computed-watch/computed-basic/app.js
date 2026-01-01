/**
 * computed 基本用法示例
 * 
 * 【核心概念】
 * computed 计算属性 = 基于现有数据自动计算出的新数据
 * 
 * 【特点】
 * 1. 声明式：定义计算逻辑，Vue 自动追踪依赖
 * 2. 响应式：依赖变化时自动重新计算
 * 3. 像属性一样使用，不需要加 ()
 * 
 * 【通俗比喻】
 * 就像 Excel 表格的公式单元格：
 * - A1 = 姓（张）
 * - B1 = 名（三）
 * - C1 = A1 + B1 = 张三（自动计算！）
 * 修改 A1 或 B1，C1 会自动更新
 */
new Vue({
  el: '#app',
  
  data() {
    return {
      // 原始数据（就像 Excel 的普通单元格）
      firstName: '张',
      lastName: '三'
    }
  },
  
  // 计算属性（就像 Excel 的公式单元格）
  computed: {
    /**
     * 全名计算属性
     * 依赖：firstName、lastName
     * 返回：拼接后的全名
     * 
     * 特点：
     * - 不需要传参
     * - 在模板中像属性一样使用：{{ fullName }}
     * - firstName 或 lastName 任一变化，自动重新计算
     */
    fullName() {
      console.log('✨ fullName 被计算了')
      return this.firstName + this.lastName
    }
  }
})
