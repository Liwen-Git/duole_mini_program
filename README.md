# duole_mini_program

> A Mpvue project

## Build Setup

``` bash
# clone项目
git clone https://github.com/Liwen-Git/duole_mini_program.git
cd duole_mini_program

# 安装依赖
npm install

# 开发时构建
npm run dev

# 打包构建
npm run build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm run dev:wx
npm run dev:swan
npm run dev:tt
npm run dev:my

# 指定平台的打包构建
npm run build:wx
npm run build:swan
npm run build:tt
npm run build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
* 小程序框架： [mpvue](https://github.com/Meituan-Dianping/mpvue)
* 引入 [mpvue-entry](https://github.com/F-loat/mpvue-entry)：移除冗余的 main.js 文件
* 引入 [mpvue-router-pathc](https://github.com/F-loat/mpvue-router-patch)：支持使用类 vue-router 的 api
* 引入 [vant-weapp](https://youzan.github.io/vant-weapp)：全局配置原生组件库，快速搭建页面

## tips
1. `src/app.json` 中
    * `pages`为路由，其中首个路由为首页
    * `usingComponents`中组件的目录是编译后 `dist/wx` 中的vant组件目录
2. `dist`目录为编译生成目录，是生成的小程序相关代码