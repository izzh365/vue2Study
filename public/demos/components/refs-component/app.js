/**
 * ref 获取子组件实例示例
 *
 * 知识点：
 * 1. ref 可以获取子组件实例
 * 2. 通过实例可以访问子组件的 data 和 methods
 * 3. 适用于命令式调用场景
 * 4. 注意不要过度使用，优先考虑 props 和 events
 */

// ==================== 音乐播放器组件 ====================
Vue.component('audio-player', {
  data() {
    return {
      status: 'stopped',  // playing, paused, stopped
      currentSong: '周杰伦 - 晴天.mp3',
      volume: 80
    }
  },

  computed: {
    statusText() {
      const map = {
        playing: '正在播放 🎵',
        paused: '已暂停 ⏸',
        stopped: '已停止 ⏹'
      }
      return map[this.status]
    }
  },

  methods: {
    /**
     * 播放
     */
    play() {
      this.status = 'playing'
      console.log('[播放器] 开始播放:', this.currentSong)
    },

    /**
     * 暂停
     */
    pause() {
      this.status = 'paused'
      console.log('[播放器] 暂停播放')
    },

    /**
     * 停止
     */
    stop() {
      this.status = 'stopped'
      console.log('[播放器] 停止播放')
    },

    /**
     * 获取状态信息
     */
    getStatus() {
      return {
        status: this.status,
        song: this.currentSong,
        volume: this.volume
      }
    }
  },

  template: `
    <div class="player-box">
      <div class="player-title">{{ currentSong }}</div>
      <div class="player-status">{{ statusText }}</div>
      <div class="player-controls">
        <button class="player-btn play" @click="play" :disabled="status === 'playing'">▶</button>
        <button class="player-btn pause" @click="pause" :disabled="status !== 'playing'">⏸</button>
        <button class="player-btn stop" @click="stop" :disabled="status === 'stopped'">⏹</button>
      </div>
    </div>
  `
})

// ==================== 用户表单组件 ====================
Vue.component('user-form', {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        phone: ''
      }
    }
  },

  methods: {
    /**
     * 获取表单数据
     */
    getData() {
      return { ...this.formData }
    },

    /**
     * 设置表单数据
     */
    setData(data) {
      this.formData = { ...this.formData, ...data }
    },

    /**
     * 验证表单
     */
    validate() {
      const errors = []
      if (!this.formData.username) {
        errors.push('用户名不能为空')
      }
      if (!this.formData.email) {
        errors.push('邮箱不能为空')
      } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
        errors.push('邮箱格式不正确')
      }
      if (!this.formData.phone) {
        errors.push('手机号不能为空')
      }
      return {
        valid: errors.length === 0,
        errors
      }
    },

    /**
     * 重置表单
     */
    reset() {
      this.formData = {
        username: '',
        email: '',
        phone: ''
      }
    }
  },

  template: `
    <div class="form-box">
      <div class="form-group">
        <label class="form-label">用户名</label>
        <input v-model="formData.username" class="form-input" placeholder="请输入用户名">
      </div>
      <div class="form-group">
        <label class="form-label">邮箱</label>
        <input v-model="formData.email" class="form-input" placeholder="请输入邮箱">
      </div>
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label">手机号</label>
        <input v-model="formData.phone" class="form-input" placeholder="请输入手机号">
      </div>
    </div>
  `
})

// ==================== 计数器组件 ====================
Vue.component('counter-box', {
  props: {
    label: {
      type: String,
      default: '计数器'
    }
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
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    },
    getValue() {
      return this.count
    },
    setValue(val) {
      this.count = val
    }
  },

  template: `
    <div class="child-component">
      <div class="child-header">
        <span class="child-title">{{ label }}</span>
        <span class="child-badge">{{ count }}</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn danger" @click="decrement">-</button>
        <button class="btn success" @click="increment">+</button>
        <button class="btn warning" @click="reset" style="margin-left: auto;">重置</button>
      </div>
    </div>
  `
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      playerStatus: null,
      formResult: null,
      allCounterValues: null
    }
  },

  methods: {
    // ==================== 播放器控制 ====================
    
    parentPlay() {
      // 调用子组件的方法
      this.$refs.player.play()
    },

    parentPause() {
      this.$refs.player.pause()
    },

    parentStop() {
      this.$refs.player.stop()
    },

    getPlayerStatus() {
      // 调用子组件的方法获取数据
      const info = this.$refs.player.getStatus()
      this.playerStatus = JSON.stringify(info, null, 2)
    },

    // ==================== 表单控制 ====================
    
    getFormData() {
      const data = this.$refs.userForm.getData()
      this.formResult = JSON.stringify(data, null, 2)
    },

    validateForm() {
      const result = this.$refs.userForm.validate()
      if (result.valid) {
        this.formResult = '✅ 表单验证通过'
      } else {
        this.formResult = '❌ 验证失败：' + result.errors.join(', ')
      }
    },

    resetForm() {
      this.$refs.userForm.reset()
      this.formResult = '表单已重置'
    },

    fillForm() {
      this.$refs.userForm.setData({
        username: '张三',
        email: 'zhangsan@example.com',
        phone: '13800138000'
      })
      this.formResult = '已填充测试数据'
    },

    // ==================== 多计数器控制 ====================
    
    getAllValues() {
      const values = {
        counter1: this.$refs.counter1.getValue(),
        counter2: this.$refs.counter2.getValue(),
        counter3: this.$refs.counter3.getValue()
      }
      this.allCounterValues = JSON.stringify(values)
    },

    resetAll() {
      this.$refs.counter1.reset()
      this.$refs.counter2.reset()
      this.$refs.counter3.reset()
      this.allCounterValues = '已全部重置为 0'
    },

    incrementAll() {
      this.$refs.counter1.increment()
      this.$refs.counter2.increment()
      this.$refs.counter3.increment()
      this.getAllValues()
    }
  },

  created() {
    console.log('=== ref 获取子组件实例 ===')
    console.log('')
    console.log('📋 使用方式：')
    console.log('  <child-component ref="child"></child-component>')
    console.log('  this.$refs.child.method()')
    console.log('  this.$refs.child.data')
    console.log('')
    console.log('💡 适用场景：')
    console.log('  - 调用子组件方法（如 focus、reset）')
    console.log('  - 获取子组件内部状态')
    console.log('  - 集成第三方组件')
  }
})
