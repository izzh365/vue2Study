/**
 * $parent 和 $children 示例
 *
 * 知识点：
 * 1. $parent - 访问父组件实例
 * 2. $children - 访问子组件实例数组
 * 3. 不推荐在生产环境使用（强耦合）
 * 4. Vue 3 中 $children 已被移除
 */

// ==================== 子组件（访问 $parent） ====================
Vue.component('child-component', {
  name: 'ChildComponent',

  props: {
    name: {
      type: String,
      default: '子组件'
    }
  },

  data() {
    return {
      logs: []
    }
  },

  methods: {
    /**
     * 获取父组件信息
     */
    getParentInfo() {
      const parent = this.$parent
      
      // 访问父组件的数据
      const parentData = parent.parentData
      
      // 调用父组件的方法
      const message = parent.getParentMessage()
      
      this.logs.unshift(`父组件数据: ${parentData}`)
      this.logs.unshift(`父组件消息: ${message}`)
    },

    /**
     * 修改父组件数据（不推荐）
     */
    modifyParent() {
      // 直接修改父组件数据（强耦合，不推荐）
      this.$parent.parentData = '被子组件修改了'
      this.logs.unshift('已修改父组件数据')
    }
  },

  template: `
    <div class="component-box child">
      <div class="component-header">
        <span class="component-label">{{ name }}</span>
        <span class="component-badge badge-child">子组件</span>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="btn primary" @click="getParentInfo">获取父组件信息</button>
        <button class="btn secondary" @click="modifyParent">修改父组件数据</button>
      </div>
      <div class="log-box" v-if="logs.length">
        <div v-for="(log, i) in logs" :key="i" class="log-item">{{ log }}</div>
      </div>
    </div>
  `
})

// ==================== 父组件 ====================
Vue.component('parent-component', {
  name: 'ParentComponent',

  data() {
    return {
      parentData: '父组件的数据'
    }
  },

  methods: {
    getParentMessage() {
      return '来自父组件的消息：Hello!'
    }
  },

  template: `
    <div class="component-box parent">
      <div class="component-header">
        <span class="component-label">父组件</span>
        <span class="component-badge badge-parent">Parent</span>
      </div>
      <div class="data-display">parentData: {{ parentData }}</div>
      
      <child-component name="子组件 A"></child-component>
      <child-component name="子组件 B"></child-component>
    </div>
  `
})

// ==================== 可操作的子组件 ====================
Vue.component('operable-child', {
  name: 'OperableChild',

  props: {
    label: String
  },

  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      this.count++
    },
    reset() {
      this.count = 0
    }
  },

  template: `
    <div class="component-box child">
      <div class="component-header">
        <span class="component-label">{{ label }}</span>
        <span class="component-badge badge-child">{{ count }}</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn primary" @click="increment">+1</button>
        <button class="btn secondary" @click="reset">重置</button>
      </div>
    </div>
  `
})

// ==================== 父组件（访问 $children） ====================
Vue.component('parent-with-children', {
  name: 'ParentWithChildren',

  data() {
    return {
      childrenInfo: null
    }
  },

  methods: {
    /**
     * 获取所有子组件信息
     */
    getChildrenInfo() {
      const children = this.$children
      this.childrenInfo = children.map((child, index) => ({
        index,
        name: child.$options.name,
        label: child.label,
        count: child.count
      }))
    },

    /**
     * 重置所有子组件
     */
    resetAllChildren() {
      this.$children.forEach(child => {
        if (child.reset) {
          child.reset()
        }
      })
      this.getChildrenInfo()
    },

    /**
     * 增加所有子组件
     */
    incrementAllChildren() {
      this.$children.forEach(child => {
        if (child.increment) {
          child.increment()
        }
      })
      this.getChildrenInfo()
    }
  },

  mounted() {
    // mounted 时可以访问 $children
    console.log('子组件数量:', this.$children.length)
  },

  template: `
    <div class="component-box parent">
      <div class="component-header">
        <span class="component-label">父组件</span>
        <span class="component-badge badge-parent">Parent</span>
      </div>
      
      <div style="display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap;">
        <button class="btn primary" @click="getChildrenInfo">获取子组件信息</button>
        <button class="btn secondary" @click="resetAllChildren">重置所有</button>
        <button class="btn primary" @click="incrementAllChildren">全部 +1</button>
      </div>
      
      <div class="data-display" v-if="childrenInfo">
        <pre>{{ JSON.stringify(childrenInfo, null, 2) }}</pre>
      </div>
      
      <operable-child label="子组件 1"></operable-child>
      <operable-child label="子组件 2"></operable-child>
      <operable-child label="子组件 3"></operable-child>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  created() {
    console.log('=== $parent 和 $children ===')
    console.log('')
    console.log('📋 $parent:')
    console.log('  - 访问父组件实例')
    console.log('  - 可以读取/修改父组件数据')
    console.log('  - 可以调用父组件方法')
    console.log('')
    console.log('📋 $children:')
    console.log('  - 获取所有子组件实例（数组）')
    console.log('  - 顺序不保证')
    console.log('  - Vue 3 已移除')
    console.log('')
    console.log('⚠️ 不推荐使用，会导致强耦合')
  }
})
