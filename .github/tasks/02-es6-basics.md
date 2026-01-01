# 任务 02：ES6 基础语法章节

> 📋 本章节是 Vue2 学习的前置知识，掌握 ES6 语法对理解 Vue2 至关重要
> 
> ⏱️ 预计用时：4-5 小时
> 
> 📺 参考视频：coderwhy B站 第 29、45、99、126-129 集

---

## 📌 任务概览

| 序号 | 知识点 | 页面文件 | Demo 数量 | 状态 |
|------|--------|----------|-----------|------|
| 2.1 | const 与 let | ConstLet.vue | 6 | ✅ |
| 2.2 | 对象增强写法 | ObjectEnhance.vue | 5 | ✅ |
| 2.3 | 高阶函数 | HigherOrder.vue | 8 | ✅ |
| 2.4 | 箭头函数 | ArrowFunction.vue | 6 | ⬜ |
| 2.5 | Promise 与异步 | PromiseAsync.vue | 8 | ⬜ |

---

## 📝 任务 2.1：const 与 let

### 🎯 知识要点

#### 📖 概念说明

**var 的问题：**
- 变量提升（hoisting）
- 没有块级作用域
- 可以重复声明

**let 的特点：**
- 块级作用域
- 不能重复声明
- 暂时性死区（TDZ）

**const 的特点：**
- 常量，声明后不能重新赋值
- 必须初始化
- 引用类型只是引用不可变，内容可变

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/es6/var-hoisting/ | var 变量提升问题 |
| 2 | demos/es6/let-block-scope/ | let 块级作用域 |
| 3 | demos/es6/let-loop/ | let 在 for 循环中的应用 |
| 4 | demos/es6/const-basic/ | const 基本用法 |
| 5 | demos/es6/const-reference/ | const 引用类型 |
| 6 | demos/es6/tdz/ | 暂时性死区 |

### 📋 Demo 1：var 变量提升

```javascript
// demos/es6/var-hoisting/app.js

/**
 * var 变量提升示例
 * 说明：var 声明的变量会被提升到作用域顶部
 */
new Vue({
  el: '#app',
  data() {
    return {
      // 存储执行结果
      results: []
    }
  },
  methods: {
    /**
     * 演示 var 变量提升
     * 变量可以在声明前使用，值为 undefined
     */
    testHoisting() {
      this.results = []
      
      // 这里可以访问 name，但值是 undefined
      this.results.push(`声明前访问: ${name}`)  // undefined
      
      var name = '张三'
      
      this.results.push(`声明后访问: ${name}`)  // 张三
    }
  }
})
```

### 📋 Demo 2：let 块级作用域

```javascript
// demos/es6/let-block-scope/app.js

/**
 * let 块级作用域示例
 * 说明：let 声明的变量只在当前代码块内有效
 */
new Vue({
  el: '#app',
  data() {
    return {
      results: []
    }
  },
  methods: {
    /**
     * 演示 let 的块级作用域
     */
    testBlockScope() {
      this.results = []
      
      // if 代码块
      if (true) {
        let blockVar = '我只在 if 块内有效'
        this.results.push(`if 块内: ${blockVar}`)
      }
      
      // 这里访问不到 blockVar
      // console.log(blockVar) // 报错！
      this.results.push('if 块外无法访问 blockVar')
    }
  }
})
```

### 📋 Demo 3：let 在 for 循环中

```javascript
// demos/es6/let-loop/app.js

/**
 * let 在 for 循环中的经典应用
 * 说明：解决 var 在循环中的闭包问题
 */
new Vue({
  el: '#app',
  data() {
    return {
      varResults: [],
      letResults: []
    }
  },
  methods: {
    /**
     * 使用 var 的问题
     * 点击按钮时，i 已经变成了 5
     */
    testVar() {
      this.varResults = []
      for (var i = 0; i < 5; i++) {
        setTimeout(() => {
          this.varResults.push(i)  // 全部是 5
        }, 100)
      }
    },
    
    /**
     * 使用 let 解决问题
     * 每次循环都有独立的 i
     */
    testLet() {
      this.letResults = []
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          this.letResults.push(i)  // 0, 1, 2, 3, 4
        }, 100)
      }
    }
  }
})
```

---

## 📝 任务 2.2：对象增强写法

### 🎯 知识要点

#### 📖 概念说明

ES6 提供了更简洁的对象字面量写法：

1. **属性简写**：变量名和属性名相同时可省略
2. **方法简写**：省略 function 关键字
3. **计算属性名**：用 `[]` 包裹表达式作为属性名

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/es6/property-shorthand/ | 属性简写 |
| 2 | demos/es6/method-shorthand/ | 方法简写 |
| 3 | demos/es6/computed-property/ | 计算属性名 |
| 4 | demos/es6/object-destructuring/ | 对象解构 |
| 5 | demos/es6/array-destructuring/ | 数组解构 |

### 📋 Demo 示例：属性简写

```javascript
// demos/es6/property-shorthand/app.js

/**
 * 对象属性简写示例
 */
new Vue({
  el: '#app',
  data() {
    return {
      name: '张三',
      age: 18,
      result: null
    }
  },
  methods: {
    /**
     * ES5 传统写法
     */
    es5Way() {
      var name = this.name
      var age = this.age
      
      // ES5 需要写两遍
      this.result = {
        name: name,
        age: age
      }
    },
    
    /**
     * ES6 简写方式
     * 当属性名和变量名相同时，可以省略
     */
    es6Way() {
      var name = this.name
      var age = this.age
      
      // ES6 简写
      this.result = { name, age }
    }
  }
})
```

---

## 📝 任务 2.3：高阶函数

### 🎯 知识要点

#### 📖 概念说明

高阶函数是指：
- 接收函数作为参数，或
- 返回一个函数

常用的数组高阶函数：
- `filter()` - 过滤
- `map()` - 映射
- `reduce()` - 归约

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/es6/filter-basic/ | filter 基本用法 |
| 2 | demos/es6/filter-advanced/ | filter 进阶 |
| 3 | demos/es6/map-basic/ | map 基本用法 |
| 4 | demos/es6/map-advanced/ | map 进阶 |
| 5 | demos/es6/reduce-basic/ | reduce 基本用法 |
| 6 | demos/es6/reduce-advanced/ | reduce 进阶 |
| 7 | demos/es6/chain-methods/ | 链式调用 |
| 8 | demos/es6/practical-example/ | 实战案例 |

### 📋 Demo 示例：filter 过滤

```javascript
// demos/es6/filter-basic/app.js

/**
 * filter 高阶函数示例
 * 作用：过滤数组，返回满足条件的元素组成的新数组
 */
new Vue({
  el: '#app',
  data() {
    return {
      // 原始数据
      numbers: [10, 25, 30, 45, 60, 75, 80, 95, 100],
      // 过滤结果
      filtered: []
    }
  },
  methods: {
    /**
     * 过滤出大于 50 的数字
     * filter 不会修改原数组，返回新数组
     */
    filterNumbers() {
      this.filtered = this.numbers.filter(num => {
        // 返回 true 的元素会被保留
        return num > 50
      })
    }
  }
})
```

### 📋 Demo 示例：链式调用

```javascript
// demos/es6/chain-methods/app.js

/**
 * 高阶函数链式调用
 * 实际开发中经常组合使用 filter + map + reduce
 */
new Vue({
  el: '#app',
  data() {
    return {
      products: [
        { name: '苹果', price: 5, count: 3 },
        { name: '香蕉', price: 3, count: 5 },
        { name: '橙子', price: 8, count: 2 },
        { name: '西瓜', price: 20, count: 1 }
      ],
      result: 0
    }
  },
  methods: {
    /**
     * 计算价格大于 5 的商品总价
     * 1. filter: 过滤价格 > 5 的商品
     * 2. map: 计算每个商品的小计
     * 3. reduce: 累加总价
     */
    calculateTotal() {
      this.result = this.products
        .filter(item => item.price > 5)           // 过滤
        .map(item => item.price * item.count)     // 映射为小计
        .reduce((sum, subtotal) => sum + subtotal, 0)  // 累加
    }
  }
})
```

---

## 📝 任务 2.4：箭头函数

### 🎯 知识要点

#### 📖 概念说明

箭头函数特点：
1. 更简洁的语法
2. **没有自己的 this**，继承外层作用域的 this
3. 不能作为构造函数
4. 没有 arguments 对象

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/es6/arrow-syntax/ | 箭头函数语法 |
| 2 | demos/es6/arrow-params/ | 参数简写规则 |
| 3 | demos/es6/arrow-return/ | 返回值简写 |
| 4 | demos/es6/arrow-this/ | this 指向问题 |
| 5 | demos/es6/arrow-vue/ | 在 Vue 中的应用 |
| 6 | demos/es6/arrow-caution/ | 注意事项 |

### 📋 Demo 示例：this 指向

```javascript
// demos/es6/arrow-this/app.js

/**
 * 箭头函数的 this 指向
 * 重点：箭头函数没有自己的 this，继承外层
 */
new Vue({
  el: '#app',
  data() {
    return {
      name: 'Vue 实例',
      results: []
    }
  },
  methods: {
    /**
     * 普通函数的 this 问题
     */
    normalFunction() {
      this.results = []
      
      // 在回调中使用普通函数，this 指向会改变
      setTimeout(function() {
        // 这里的 this 不是 Vue 实例！
        // this.results.push('普通函数') // 报错！
        console.log('普通函数中 this:', this)
      }, 100)
    },
    
    /**
     * 箭头函数解决 this 问题
     */
    arrowFunction() {
      this.results = []
      
      // 箭头函数继承外层的 this
      setTimeout(() => {
        // 这里的 this 就是 Vue 实例
        this.results.push('箭头函数正常访问')
      }, 100)
    }
  }
})
```

---

## 📝 任务 2.5：Promise 与异步

### 🎯 知识要点

#### 📖 概念说明

Promise 是异步编程的一种解决方案：
- **三种状态**：pending（进行中）、fulfilled（成功）、rejected（失败）
- **链式调用**：避免回调地狱
- **常用方法**：then、catch、finally、all、race

### 📋 需要创建的 Demo

| Demo | 路径 | 说明 |
|------|------|------|
| 1 | demos/es6/callback-hell/ | 回调地狱问题 |
| 2 | demos/es6/promise-basic/ | Promise 基本用法 |
| 3 | demos/es6/promise-chain/ | 链式调用 |
| 4 | demos/es6/promise-catch/ | 错误处理 |
| 5 | demos/es6/promise-all/ | Promise.all |
| 6 | demos/es6/promise-race/ | Promise.race |
| 7 | demos/es6/async-await/ | async/await 语法 |
| 8 | demos/es6/promise-vue/ | 在 Vue 中的应用 |

### 📋 Demo 示例：Promise 基本用法

```javascript
// demos/es6/promise-basic/app.js

/**
 * Promise 基本用法
 * 将异步操作封装成 Promise
 */
new Vue({
  el: '#app',
  data() {
    return {
      status: '未开始',
      result: ''
    }
  },
  methods: {
    /**
     * 模拟异步请求
     * @param {boolean} success - 是否成功
     * @returns {Promise}
     */
    fetchData(success) {
      this.status = '请求中...'
      
      return new Promise((resolve, reject) => {
        // 模拟网络延迟
        setTimeout(() => {
          if (success) {
            // 成功时调用 resolve
            resolve({ data: '请求成功的数据' })
          } else {
            // 失败时调用 reject
            reject(new Error('请求失败'))
          }
        }, 1000)
      })
    },
    
    /**
     * 测试成功情况
     */
    testSuccess() {
      this.fetchData(true)
        .then(res => {
          this.status = '成功'
          this.result = res.data
        })
        .catch(err => {
          this.status = '失败'
          this.result = err.message
        })
    },
    
    /**
     * 测试失败情况
     */
    testFail() {
      this.fetchData(false)
        .then(res => {
          this.status = '成功'
          this.result = res.data
        })
        .catch(err => {
          this.status = '失败'
          this.result = err.message
        })
    }
  }
})
```

---

## ✅ 任务完成检查清单

- [ ] ConstLet.vue 页面完成，包含 6 个 Demo
- [ ] ObjectEnhance.vue 页面完成，包含 5 个 Demo
- [ ] HigherOrder.vue 页面完成，包含 8 个 Demo
- [ ] ArrowFunction.vue 页面完成，包含 6 个 Demo
- [ ] PromiseAsync.vue 页面完成，包含 8 个 Demo
- [ ] 所有 Demo 可正常运行
- [ ] 代码注释详细

---

## 📎 相关文档

- [返回主索引](../copilot-instructions.md)
- [上一步：公共模板](01-common-templates.md)
- [下一步：生命周期](03-lifecycle.md)

---

*任务状态：⬜ 待开始*
