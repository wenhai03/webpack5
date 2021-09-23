const path = require('path')

module.exports = {
  entry: './src/main.js', // 这里可以写相对路径
  output: {
    filename: '02_test.js',
    path: path.resolve(__dirname, './02_build') // 这里必须写绝对路径
  },
  module: {
    rules: [
      {
        // 使用正则表达式
        test: /\.css$/, //匹配资源
        use: [
          // {loader: 'css-loader'}, // 只有一个loader的时候可以这样写
          // 注意css-loader 要在 style-loader 后面/
          // 因为执行顺序 (module: 从下往上，从右往左，从后往前 )
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
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         'postcss-preset-env'
          //         // require('autoprefixer'), // postcss-preset-env里面已经有
          //         // require('postcss-preset-env') // 简写 'postcss-preset-env'
          //       ]
          //     }
          //   }
          // },
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
              importLoaders: 2 // 再引入前2个 loader 来对文件处理一次
            }
          },
          'postcss-loader', // 也需要作用在less，所以可以在外面定义个 postcss.config.js
          'less-loader'
        ]
      }
    ]
  }
}
