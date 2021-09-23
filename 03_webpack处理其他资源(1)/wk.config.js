const path = require('path');

module.exports = {
  entry: './src/main.js', // 这里可以写相对路径
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build') // 这里必须写绝对路径
  },
  module: {
    rules: [
      {
        test: /\.css$/, //匹配资源
        use: [
          /**注意编写顺序  css-loader 要在 style-loader 后面*/
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 再引入前一个 loader 来对文件处理一次
            }
          },
          'postcss-loader' // 也可以新建 postcss.config.js 文件来对 postcss 的配置进行抽取
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 再引入前 2 个 loader 来对文件处理一次
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
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
    ]
  }
}
