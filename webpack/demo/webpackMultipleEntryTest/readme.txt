html-webpack-plugin 打包html
clean-webpack-plugin 清除打包目录

extract-text-webpack-plugin  webpack3将css打包为单独的文件
mini-css-extract-plugin  webpack4将css打包为单独的文件
注：extract-text-webpack-plugin插件提取单独打包css文件时，报错，这个插件要依赖webpack3的版本。
webpack4得使用mini-css-extract-plugin这个插件来单独打包css。

npm install -D babel-loader @babel/core @babel/preset-env webpack ES6语法转换
css-loader 
postcss-loader
npm install less --save-dev
npm install less-loader --save-dev
npm install autoprefixer --save-dev   自动加浏览器前缀
file-loader 打包css样式中的图片
html-withimg-loader  打包img标签引用的图片