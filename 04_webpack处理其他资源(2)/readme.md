#### 1. 从 webpack5 开始，可以直接使用“资源模块类型”（asset module type）来代替：file-loader、url-loader、raw-loader 等 loader。

## 2. asset module type 添加4种新的模块类型来替换相关 loader
#### 1）asset/resource 发送一个单独的文件并导出 URL。之前通过 file-loader 实现。
```
{
  test: /\.(png|jpe?g|gif|svg)$/,
  type: 'asset/resource'
}
```
##### 不需要单独安装相关 loader，直接使用 type 属性
如需把资源打包到 特定文件夹下，可以 output 属性中进行如下设置：
```
output: {
  assetModuleFilename: 'img/[name].[hash:6][ext]' // 这里的 ext 占位符自带“.”
},
```
但是上述做法会将所有的资源都打包到 img 文件夹下，如果我们需要把特定资源分别打包到不同文件夹下，需要在该资源匹配后面进行如下配置：
```
{
  test: /\.(png|jpe?g|gif|svg)$/,
  type: 'asset/resource',
  generator: {
      filename: 'img/[name].[hash:6][ext]' // 在 generator 属性的 filename 中进行配置
  }
}
```

#### 2）asset/inline 导出一个资源的 data URI。之前通过 url-loader 实现。
asset/inline 时不能设置 generator 属性，因为已经把资源进行 base64 编码了，不存在其他保留的资源了
```
type: 'asset/inline' // 相当于 url-loader 不限制大小
```

#### 3）asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
#### 4）asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前提供 url-loader，并配置体积大小限制实现。
```
type: 'asset', // 相当于 url-loader 限制大小
generator: {
    filename: 'img/[name].[hash:6][ext]'
},
parser: {
    dataUrlCondition: {
        maxSize: 100 * 1024 // 100kb
    }
}
```

## 3. webpack5 解析字体文件、图标，webpack5 以前用 file-loader 实现
```
{
  test: /\.ttf|eot|woff2?$/,
  type: 'asset/resource',
  generator: {
      filename: 'font/[name].[hash:6][ext]'
  }
}
```