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
    ]
  }
}
