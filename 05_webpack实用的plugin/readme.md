### 1. clean-webpack-plugin 
##### 重新打包时删除之前打包的文件，避免手动删除
安装
```
npm install clean-webpack-plugin -D
```
使用
```
plugins: [
  new CleanWebpackPlugin(),
]
```
##### 插件其实是一个类，使用时通过 new 关键字创建对象

### 2. html-webpack-plugin 
##### 该插件将为你生成一个 HTML5 文件， 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
安装
```
npm install --save-dev html-webpack-plugin
```
使用
```
plugins: [
  new HtmlWebpackPlugin({  // 通过 ejs 模板生成 html 文件
    title: 'zsn webpack', // 设置标题
    template: './public/index.html' // 设置打包 html 模板，该模板中存在一个全局常量 BASE_URL，会报错，使用 defin-plugin 解决
  }),
]
```

### 3. defin-plugin （已内置，无需安装）
##### 允许我们在编译时创建一个全局常量
```
new DefinePlugin({
  BASE_URL: "'./'"
})
```

### 4. copy-webpack-plugin
##### 复制文件到打包后的文件夹中
安装
```
npm install copy-webpack-plugin -D
```
配置
```
new CopyWebpackPlugin({
  patterns: [
    {
        from: 'public',
        // to: // 可以不写，默认会在 output 中查找
        globOptions: {
            ignore: [ // 忽略一些文件
                "**/index.html", // 要加上 **/
                "**/.DS.Store" // mac 自带的文件，要忽略
            ]
        }
    }
  ]
})
```