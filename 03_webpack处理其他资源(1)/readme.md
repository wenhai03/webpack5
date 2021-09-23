# file-loader
#### 1.使用 file-loader 处理 import/require() 方式引入的资源，并且会把它放到我们的输出文件夹中
```
npm install file-loader -D
```
##### 2.但是打包之后的文件时 hash 值，可能不太容易区分，可以只用 placeholder 占位符进行资源的重命名，如：
```
{
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
      {
          loader: 'file-loader',
          options: {
              name: '[name].[hash:6].[ext]'
          }
      }
  ]
}
```
file-loader 的 placeholder 相关文档地址
```
https://webpack.docschina.org/loaders/file-loader/#placeholders
```
##### 3.设置 outputPath 属性，使打包资源存放进相应文件夹
```
options: {
  name: '[name].[hash:6].[ext]',
  outputPath: 'img' // 存放到 img 文件夹下
}
```
也可以直接在 name 属性中拼接文件夹名称
```
options: {
  name: 'img/[name].[hash:6].[ext]',
}
```

# url-loader
工作方式和 file-loader 类似，但它把 较小 的文件转换为 base64 的 URI
```
npm install url-loader -D
```
##### 使用方式（如果使用了 url-loader，那就不需要再使用 file-loader 了）:
```
{
  loader: 'url-loader',
  options: {
      name: 'img/[name].[hash:6].[ext]',
  }
}
```
他的配置和使用方式和 file-loader 几乎一致
##### 但是经过 url-loader 打包处理后的文件会变成 base64 数据而被嵌入 js 文件中，不会像 file-loader 那样把他以原格式保存下来

## 总结：
##### 比较大的图片使用 file-loader 来进行处理，如果使用 url-loader 处理会使得打包后的 js 文件过于庞大
##### 比较小的图片使用 url-loader 来处理，可以减少 http 请求，打包后的 bundle.js 也不会太大
使用　limit　属性来判断是否打包成　base64 数据
```
options: {
  name: 'img/[name].[hash:6].[ext]',
  limit: 100 * 1024 // 100kb　以下文件 打包成 base64 数据
}

```