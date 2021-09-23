##### 1.执行以下命令，更改 webpack 打包的入口和出口文件，这里把默认的入口文件 main.js 改为了 main.js，把默认的出口 /dist 改为了 /build
```
npx webpack --entry ./src/main.js --output-path ./build111
```
##### 2.更改 package.json 文件的 build 命令为：
```
"scripts": {
    "build": "webpack --entry ./src/main.js --output-path ./build"
  }
```
这样在执行 npm run build 命令时，和标题1是同样效果
```
npm run build
```
但是这样存在一些问题，直接把相关命令写到 package.json 文件中的命令可能很长，这样是不利于阅读的，一般来说我们会单独建立一个 wk.config.js 文件来进行 webpack 配置
##### 3.接下来请阅读 wk.config.js 文件，有了 wk.config.js 配置文件后，需要把 package.json 文件改为
```
"scripts": {
    "build": "webpack"
  }
```
##### 4.指定 webpack 配置文件：默认会把 wk.config.js 当成 webpack 的配置文件，也可以通过相关命令更改，比如说我把 wk.config.js 改名为 wk.config.js，则需要在 package.json 文件中把 build 命令修改为
```
"scripts": {
    "build": "webpack --config wk.config.js"
  }
```
才能正常打包

##### 5. webpack 默认不能对 css 文件进行处理，需要安装 css-loader 才行
```
npm install css-loader -D // -D 是 --save-dev 的缩写，开发时依赖
```

##### 6. css-loader 使用的三种方式
(1) 内联方式: 在引入路径前面拼接 css-loader!
```
import 'css-loader!../css/index.css';
```

(2) CLI方式（webpack5不支持）；
```
```
(3) 配置方式（最推荐）=> 详情查看 wk.config.js, 在 module.rules 中配置多个 loader
```
module: {
  rules: []
}
```
rules 数组中存放多个 rule 对象
##### 7. css-loader 只负责解析 css 却无法把 css 插入到页面中，因此需要 style-loader 来把解析好的 css 插入到页面
```
// 安装 style-loader
npm install style-loader -D
```

##### 8. webpack 解析 loader 的默认顺序是从右往左，因此 css-loader 需要写到 style-loader 后面

##### 9. 要解析 less 文件为 css，需要安装 less 和 less-loader
```
npm install less less-loader -D
```
less-loader 不可以直接把 less 文件转换为 css 文件，它也只不过是 借助 less 来完成转换 

## 10.使用 browserslist 在不同前端工具之间共享目标浏览器 node.js 版本配置（浏览器兼容性）
##### 一般来说 browserslist 会被默认安装，因此无需再次安装
##### browserslist 使用的是 caniuse-lite（require('caniuse-lite....')） 这个工具来进行条件查询
部分前端工具：
```
AutoPrefixer
Babel
postcss-preset-env
eslint-plugin-compat
postcss-normalize
....
```
#### 10.1 browserslist 的一些属性
```
dead: 24个月内未被官方支持或更新的浏览器
5%: 通过全局使用情况统计信息选择浏览器版本
last 2 versions: 某个浏览器的最后两个版本
not ie <= 8: 排除先前查询选择的浏览器
...
```
#### 10.2 手动使用 browserslist 进行查询
```
npx browserslist ">1%, last 2 version, not dead"
或者
npx browserslist // 会默认读取 .browserslistrc 文件里面的条件
```
“,” 和 "or" 和 “换行”：表示并集；
“and” 表示交集；
“not” 表示取反  
#### 10.3 browserslist 配置可以直接写到 package.json 文件 外层 里面，如：
```
"browserslist": [
  ">1%",
  "last 2 version",
  "not dead"
]
```
#### 10.4  browserslist 配置也可以写到 .browserslistrc 文件里面：
```
>1%,
last 2 version,
not dead
```

### 11.PostCSS（用于CSS的转换和适配，比如添加浏览器前缀，CSS的样式重置等）
##### 使用步骤：（0）安装 PostCSS
```
npm install postcss -D
```
##### 使用步骤：（1）查找 postCSS 在构建工具的扩展，比如 webpack 的 postcss-loader;
##### 使用步骤：（2）选择需要的 PostCSS 插件；
##### 使用步骤：（3）如果要直接在命令行中使用，则需要安装 postcss-cli，以及相关插件
```
npm install postcss-cli -D
npm install autoprefixer -D // 安装 autoprefixer 插件用以添加浏览器前缀 
npx postcss --use autoprefixer -o result.css ./src/css/test.css // 执行
```

#### 11.1 使用 webpack 的 postcss-loader（autoprefixer 插件） 来增加浏览器前缀
```
npm install postcss-loader -D
```
postcss-loader 在 wk.config.js 文件中要写到 css-loader 后面，相关配置如下：
```
{
  loader: 'postcss-loader',
  options: {
      postcssOptions: {
          plugins: [
              require('autoprefixer'), // 这里使用了 autoprefixer 插件
          ]
      }
  }
}
```
#### 11.2 使用 PostCSS Preset Env 将现代 css 特性转换为通用 css 
```
npm install postcss-preset-env -D
```
webpack.config.js配置（和 autoprefixer 一样要写到 postcss-loader 配置里面）:
```
{
  loader: 'postcss-loader',
  options: {
      postcssOptions: {
          plugins: [
              require('autoprefixer'),
              require('postcss-preset-env')
          ]
      }
  }
}
```
但是 postcss-preset-env 本身也有 autoprefixer 的功能，因此可以不使用 autoprefixer
```
{
  loader: 'postcss-loader',
  options: {
      postcssOptions: {
          plugins: [
              require('postcss-preset-env') // 去掉 autoprefixer
          ]
      }
  }
}
```
##### 注意：也可以新建 postcss.config.js 文件来对 postcss 的配置进行抽取（方便重复使用）
##### 注意：如果在 css 文件中又引入了 另一个 css 文件，需要配置 importLoaders 属性来对该文件进行处理，否则 post-loader 可能不会对该文件进行处理
```
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
}
``` 
