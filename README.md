# uniapp-ma-template

基于 vue-cli4.0 + Webpack 4 + thorui-uni + less + 请求 封装，构建手机端模板脚手架

### 在线文档

[在线文档]](https://wz930206.github.io/uniapp-ma-template/#/)

### Node 版本要求

本示例 Node.js 12.14.1

### 编辑器

建议使用vscode 配合 HBuilder


### 启动项目

```bash

git clone https://github.com/wz930206/uniapp-ma-template.git

cd uniapp-ma-template

npm install

Web端
npm run serve

小程序端
使用HBuilder
```

- √ Vue-cli4
- [√ 配置多环境变量](#env)
- [√ thorui 组件按需加载](#thorui)
- [√ Less 全局样式](#less)
- [√ Vuex 状态管理](#vuex)
- [√ Webpack 4 vue.config.js 基础配置](#base)
- [√ 配置 alias 别名](#alias)
- [√ 配置 proxy 跨域](#proxy)
- [√ 去掉 console.log ](#console)
- [√ Eslint+Stylelint+Pettier 统一开发规范 ](#pettier)


##### 配置介绍

&emsp;&emsp;以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问。  
&emsp;&emsp;比如,`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问。  
&emsp;&emsp;除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`

在项目根目录中新建`.env.*`

- .env.development 本地开发环境配置

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'development'

```

- .env.staging 测试环境配置

```bash
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'staging'
```

- .env.production 正式环境配置

```bash
 NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'production'
```

这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV `development` `staging` `production`  
变量我们统一在 `src/config/env.*.js` 里进行管理。


#### 使用组件
### <span id="thorui">✅ thorui 组件按需加载 </span>
项目在 `src/components/thorui` 下统一管理组件，可查看文档 [](https://thorui.cn/doc/docs/introduce.html)

[▲ 回顶部](#top)

### <span id="less">✅ Less 全局样式</span>

每个页面自己对应的样式都写在自己的 .vue 文件之中 `scoped` 它顾名思义给 css 加了一个域的概念。

```html
<style lang="less">
  /* global styles */
</style>

<style lang="less" scoped>
  /* local styles */
</style>
```

#### 目录结构

uniapp-ma-template 所有全局样式都在 `@/src/styles` 目录下设置

```bash
├── styles
│   │   ├── index.less               # 全局通用样式
│   │   ├── mixin.less               # 全局mixin
│   │   └── _variables.less           # 全局变量
```
[▲ 回顶部](#top)

### <span id="vuex">✅ Vuex 状态管理</span>

目录结构

```bash
├── store
│   ├── modules
│   │   └── user.js
│   ├── index.js
│   ├── getters.js
```

`main.js` 引入

```javascript
import Vue from 'vue'
import App from './App.vue'
import store from './store'
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
```

[▲ 回顶部](#top)

### <span id="alias">✅ 配置 alias 别名 </span>

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
```

[▲ 回顶部](#top)

### <span id="proxy">✅ 配置 proxy 跨域 </span>

如果你的项目需要跨域设置，你需要打来 `vue.config.js` `proxy` 注释 并且配置相应参数

```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      '/rest': {
        target: proxyTarget,       //后端接口测试环境地址  配nginx 时使用
        changeOrigin: true,//是否允许跨越
        pathRewrite: {
          '^/rest': '/rest',      //重写 不配nginx 时使用
        }
      }
    }
  }
}
```

使用 例如: `src/api/user.js`

[▲ 回顶部](#top)

### <span id="console">✅ 去掉 console.log </span>

保留了测试环境和本地环境的 `console.log`

在 vue.config.js 中配置

```javascript
// 获取 VUE_APP_ENV 非 NODE_ENV，测试环境依然 console
const IS_PROD = ['production'].includes(process.env.VUE_APP_ENV)

module.exports = {
  configureWebpack: config => {
  	config.optimization.minimizer[0].options.terserOptions.compress.drop_console = IS_PROD,
  }
}
```

[▲ 回顶部](#top)

### <span id="pettier">✅ Eslint + Stylelint + Pettier  统一开发规范 </span>
VScode （版本 1.47.3）安装 `eslint` `prettier` `vetur` 插件 `.vue` 文件使用 vetur 进行格式化，其他使用`prettier`

详细配置步骤可查看此博客 [csdn](https://blog.csdn.net/wz_coming/article/details/119996186)

## 交流

| 微信  |
| ------------- |
|<img src="https://ur-home.oss-cn-shanghai.aliyuncs.com/weixin/wx_code.jpg" width="300px"><div align="center"> 添加的时候备注上 `urhome`  </div>|