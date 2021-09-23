const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'img.js',
    path: path.resolve(__dirname, './img_build'),
    // assetModuleFilename: 'img/[name].[hash:6][ext]' //这里的 ext 占位符自带“.”
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader',},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,// 处理图片
        use: [
          {
            // loader: 'file-loader',
            loader: 'url-loader', // 用url处理就不需要file-loader, 没指定大小会将img的base64直接嵌入img.js中
            options: {
              name: 'img/[name].[hash:6][ext]', // ext默认前面有点
              // outputPath: 'img',
              limit: 200 * 1024  // 小于200kb
            }
          }
        ]
      }
    ]
  }
}
