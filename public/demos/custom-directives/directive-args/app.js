/**
 * 指令参数和修饰符详解
 *
 * 📚 知识点：
 * 1. binding.arg - 指令参数
 * 2. binding.modifiers - 修饰符对象
 * 3. binding.value / oldValue - 绑定值
 * 4. binding.expression - 表达式字符串
 *
 * 🎯 理解指令的完整语法结构
 */

// ==================== 指令 1：v-pin ====================
// 演示参数(arg)的使用
Vue.directive('pin', {
  bind: function (el, binding) {
    // binding.arg 获取参数，如 v-pin:left 中的 "left"
    const direction = binding.arg || 'top'
    // binding.value 获取值
    const value = binding.value + 'px'

    el.style.position = 'relative'
    el.style[direction] = value

    console.log('v-pin 参数:', {
      arg: binding.arg,
      value: binding.value
    })
  }
})

// ==================== 指令 2：v-border ====================
// 演示修饰符(modifiers)的使用
Vue.directive('border', {
  bind: function (el, binding) {
    const color = binding.value || '#333'

    // binding.modifiers 是一个对象
    // 如 v-border.dashed.thick 会得到 { dashed: true, thick: true }
    const modifiers = binding.modifiers

    // 根据修饰符设置边框样式
    let style = 'solid'
    let width = '2px'
    let radius = '4px'

    if (modifiers.dashed) {
      style = 'dashed'
    }

    if (modifiers.thick) {
      width = '4px'
    }

    if (modifiers.round) {
      radius = '20px'
    }

    el.style.border = `${width} ${style} ${color}`
    el.style.borderRadius = radius

    console.log('v-border 修饰符:', modifiers)
  }
})

// ==================== 指令 3：v-log ====================
// 综合演示参数、修饰符和值
Vue.directive('log', {
  bind: function (el, binding, vnode) {
    const eventType = binding.arg || 'click' // 参数：事件类型
    const modifiers = binding.modifiers // 修饰符
    const message = binding.value // 值：日志消息

    // 定义事件处理函数
    const handler = function (event) {
      let logText = `[${eventType}] ${message}`

      // 如果有 detail 修饰符，添加更多信息
      if (modifiers.detail) {
        logText += ` | 位置: (${event.clientX}, ${event.clientY})`
      }

      console.log(logText)

      // 通过 vnode.context 访问 Vue 实例
      if (vnode.context && vnode.context.logs) {
        vnode.context.logs.unshift(logText)
      }

      // 如果有 once 修饰符，只执行一次
      if (modifiers.once) {
        el.removeEventListener(eventType, handler)
        console.log('v-log: once 修饰符，已移除监听')
      }
    }

    el.addEventListener(eventType, handler)
    el._logHandler = handler
    el._logEvent = eventType

    console.log('v-log 绑定信息:', {
      arg: binding.arg,
      modifiers: binding.modifiers,
      value: binding.value,
      expression: binding.expression
    })
  },

  unbind: function (el) {
    if (el._logHandler) {
      el.removeEventListener(el._logEvent, el._logHandler)
    }
  }
})

// ==================== 指令 4：v-debug ====================
// 展示完整的 binding 对象
Vue.directive('debug', {
  bind: function (el, binding, vnode) {
    // 将 binding 信息保存到 Vue 实例
    if (vnode.context) {
      vnode.context.bindingInfo = {
        name: binding.name,
        value: binding.value,
        expression: binding.expression,
        arg: binding.arg,
        modifiers: binding.modifiers
      }
    }

    console.log('v-debug 完整 binding 对象:', binding)
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      logMessage: '用户点击了元素',
      debugValue: { foo: 'bar', num: 42 },
      logs: [],
      bindingInfo: null
    }
  }
})
