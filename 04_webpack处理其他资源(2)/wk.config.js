const path = require('path')

module.exports = {
  entry: './src/main.js', // 这里可以写相对路径
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'), // 这里必须写绝对路径
    // assetModuleFilename: 'img/[name].[hash:6][ext]' //这里的 ext 占位符自带“.”
  },
  module: {
    rules: [
      {
        //使用正则表达式
        test: /\.css$/, //匹配资源
        // loader: 'css-loader', // 直接写在 use 最外面，属于简写（只有一个 loader 的时候可以这样写）
        use: [
          /**注意编写顺序  css-loader 要在 style-loader 后面*/
          {
            loader: 'style-loader',
            // option: //给 loader 传值（自定义 laoder）
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1 // 再引入前一个 loader 来对文件处理一次
            }
          },
          // {
          //     loader: 'postcss-loader',
          //     options: {
          //         postcssOptions: {
          //             plugins: [
          //                 require('autoprefixer'),
          //                 require('postcss-preset-env')
          //             ]
          //         }
          //     }
          // }
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
              importLoaders: 2 // 再引入前 2 个 loader 来对文件处理一次
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // type: 'asset/resource', // 相当于 file-loader 效果
        // generator: {
        //     filename: 'img/[name].[hash:6][ext]'
        // }
        
        // type: 'asset/inline', // 相当于 url-loader 不限制大小
        
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024 // 100kb
          }
        }
      },
      {
        test: /\.ttf|eot|woff2?$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6][ext]'
        }
      }
    ]
  }
}
