/**
 * 响应式原理演示
 * 展示 Vuex state 的响应式特性
 */

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++
    },
    decrement(state) {
      state.count--
    }
  }
})

// 多个组件都依赖同一个 state
Vue.component('component-a', {
  template: `
    <div class="component-box">
      <div class="component-title">组件 A</div>
      <div class="component-value">{{ count }}</div>
    </div>
  `,
  computed: {
    count() {
      return this.$store.state.count
    }
  }
})

Vue.component('component-b', {
  template: `
    <div class="component-box">
      <div class="component-title">组件 B (×2)</div>
      <div class="component-value">{{ doubled }}</div>
    </div>
  `,
  computed: {
    doubled() {
      return this.$store.state.count * 2
    }
  }
})

Vue.component('component-c', {
  template: `
    <div class="component-box">
      <div class="component-title">组件 C (×10)</div>
      <div class="component-value">{{ times10 }}</div>
    </div>
  `,
  computed: {
    times10() {
      return this.$store.state.count * 10
    }
  }
})

Vue.component('component-d', {
  template: `
    <div class="component-box">
      <div class="component-title">组件 D (²)</div>
      <div class="component-value">{{ squared }}</div>
    </div>
  `,
  computed: {
    squared() {
      return this.$store.state.count ** 2
    }
  }
})

new Vue({
  el: '#app',
  store,
  computed: {
    count() {
      return this.$store.state.count
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    }
  }
})
