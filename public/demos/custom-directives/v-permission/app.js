/**
 * v-permission 权限控制指令
 *
 * 📚 知识点：
 * 1. 根据权限决定元素显示/隐藏
 * 2. 移除 DOM 元素（而非隐藏）
 * 3. 结合全局状态管理
 *
 * 🎯 使用场景：
 * - 按钮级权限控制
 * - 菜单权限
 * - 功能入口控制
 */

// ==================== 权限配置 ====================
// 模拟权限系统
const permissionConfig = {
  // 角色对应的权限列表
  roles: {
    admin: ['view', 'edit', 'publish', 'delete', 'admin'],
    editor: ['view', 'edit', 'publish'],
    viewer: ['view']
  },
  // 当前角色（可以从 Vuex 获取）
  currentRole: 'viewer'
}

// 检查权限
function hasPermission(permission) {
  const role = permissionConfig.currentRole
  const permissions = permissionConfig.roles[role] || []
  return permissions.includes(permission)
}

// ==================== 全局指令：v-permission ====================
Vue.directive('permission', {
  /**
   * inserted 钩子
   * 检查权限，无权限则移除元素
   */
  inserted: function (el, binding, vnode) {
    const permission = binding.value

    if (!hasPermission(permission)) {
      // 保存父节点引用，用于后续恢复
      el._parentNode = el.parentNode
      el._nextSibling = el.nextSibling

      // 移除元素
      el.parentNode && el.parentNode.removeChild(el)
      console.log(`v-permission: 无权限 [${permission}]，元素已移除`)
    } else {
      console.log(`v-permission: 有权限 [${permission}]`)
    }
  },

  /**
   * update 钩子
   * 权限变化时重新检查（需配合 key 使用）
   */
  update: function (el, binding) {
    const permission = binding.value

    if (!hasPermission(permission)) {
      if (el.parentNode) {
        el._parentNode = el.parentNode
        el._nextSibling = el.nextSibling
        el.parentNode.removeChild(el)
      }
    } else {
      // 如果之前被移除，现在有权限了，恢复元素
      if (!el.parentNode && el._parentNode) {
        if (el._nextSibling) {
          el._parentNode.insertBefore(el, el._nextSibling)
        } else {
          el._parentNode.appendChild(el)
        }
      }
    }
  }
})

// ==================== Vue 实例 ====================
new Vue({
  el: '#app',

  data() {
    return {
      currentRole: 'viewer',
      roleNames: {
        admin: '管理员',
        editor: '编辑者',
        viewer: '访客'
      },
      // 用于强制刷新
      permissionKey: 0
    }
  },

  methods: {
    /**
     * 切换角色
     * 注意：切换角色后需要刷新页面或使用 key 强制重渲染
     */
    switchRole(role) {
      this.currentRole = role
      permissionConfig.currentRole = role

      console.log('切换角色为:', this.roleNames[role])

      // 强制刷新页面以重新渲染权限
      // 实际项目中可以使用 Vuex + 路由守卫处理
      location.reload()
    }
  },

  created() {
    // 从 URL 参数读取角色（演示用）
    const urlParams = new URLSearchParams(window.location.search)
    const role = urlParams.get('role')
    if (role && this.roleNames[role]) {
      this.currentRole = role
      permissionConfig.currentRole = role
    }
  }
})
