##### 1.执行 webpack 命令（直接输入 webpack 使用的是全局的 webpack），会默认在 scr/main.js 查找文件
```
webpack
```
##### 2.使用 npm init 初始化 package.json 文件
```
npm init
```
#### 3.(1)使用局部 webpack，其实是执行 ./node_modules./bin/webpack 命令
##### (2)也可以使用 npx（直接执行 node_modules 下的命令）
```
npx webpack
```
##### (3)也可以在 package.json 文件中写脚本 scripts，他会优先在 node_modules 下寻找，所以他执行的也是局部的 webpack，接下来使用 npm run build 来打包
```
"scripts": {
    "build": "webpack"
  },
----------------------
npm run build // 打包
```
