const path = require('path')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'asset_bundle.js',
    path: path.resolve(__dirname, './asset_build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
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
        test: /\.(png|jpe?g|gif|svg)$/,
        // type: 'asset/inline', // 直接在js中生成base64
        // type: 'asset/resource', // 如果没有设置generator,不知道放在哪里，会直接生成在根目录下
        type: 'asset', // 设置有的图片为base64 配合parser
        generator: {
          filename: 'img/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 110 * 1024
          }
        }
      },
      {
        test: /\.ttf|eot|woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      }
    ]
  }
}
