const path = require('path');
const glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 如果当前项目是webpack3.x版本，使用extract-text-webpack-plugin；
// 如果当前项目是webpack4.x版本（但已有extract-text-webpack-plugin配置），可以继续用extract-text-webpack-plugin，但必须用对应的beta版本，且这个beta版本不支持生成hash；
// 如果当前项目是webpack4.x版本且是新项目，使用mini-css-extract-plugin。
// 将css单独打包成单个文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var PAGE_PATH = path.resolve(__dirname, './src')
function getEntry () {
  let dirname, entries = {}
  let files = glob.sync(PAGE_PATH + '/*/*.js')
  files.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        entries[filename] = filePath;
  })
  // entries = JSON.stringify(entries)
  return entries
}
let dirname, htmlTemp = null
let pluginsArr = [];
function getHTMLWebpackPlugin () {
  let files = glob.sync(PAGE_PATH + '/*/*.html')
  files.forEach((filePath) => {
  		filePath = filePath.substring(filePath.lastIndexOf('src'))
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        htmlTemp = new HtmlWebpackPlugin({
          // 去掉 src/
	      filename: filePath.substring(filePath.lastIndexOf('src')+4),
	      template: filePath, //模板来源文件
	      inject: 'body',
	      chunks: [filename]
	    })
	    pluginsArr.push(htmlTemp)
  })
  setPlugins();
  return pluginsArr
}

function setPlugins(){
  pluginsArr.push(
  	new MiniCssExtractPlugin({
      filename: "[name]/[name].css",
    })
  );
  pluginsArr.push(
  	new CleanWebpackPlugin(['dist']),//实例化，参数为目录
  )
}

module.exports = {
	// entry: {
	// 	"cell": './src/cell/cell.js',
	// 	"pageOne": './src/pageOne/pageOne.js'
	// },
	entry: getEntry(),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name]/[name]-[chunkhash].js'
    },
    module:{
    	rules: [
    		{
				test: /\.js$/,
				include: __dirname + 'src',
				exclude: __dirname + 'node_modules',
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env']
				}

			},
    		{
				test: /\.css$/,
				use:[
					{
			            loader: MiniCssExtractPlugin.loader,
			        },
					"css-loader",
					// css-loader已经在新版本已经移除了minimize这个压缩选项，而推荐postcss-loader和cssnano的方式
			        "postcss-loader"
				]

			},
			// npm install less --save-dev
			// npm install less-loader --save-dev
			{
				test: /\.less$/,
				use: [
					{
			            loader: MiniCssExtractPlugin.loader,
			        },
			        "css-loader",
			        "postcss-loader",
			        "less-loader"
			    ]
			},
			// file-loader、url-loader不能处理html中的图片（如img的src属性引用的图片），
			// 如果要处理html中的图片，需要另外使用其它loader。
			{
				test: /\.(png|jpg|gif|svg)$/i,   //不区分大小写
				use: [
	                {
	                  loader: 'file-loader',
	                  options: {
	                    name: '[name].[ext]',
	                    // 代码引用url
	                    publicPath: '../images/',
	                    // 打包生成的文件路径
	                    outputPath:'/images/'
	                  }
	                }
	            ]
			},
			// 处理img标签引用的图片
			{
		        test: /\.(htm|html)$/i,
		        loader: 'html-withimg-loader'
		    }
    	]
    },
    // plugins:[
	   //  new HtmlWebpackPlugin({
	   //    filename: 'cell/cell.html',
	   //    template: "src/cell/cell.html", //模板来源文件
	   //    inject: 'body',
	   //    chunks: ['cell'],
	   //    title: htmlTemp,
	   //    date: new Date()
	   //    // dirnameStr: dirnameStr
	   //  }),
	   //  new HtmlWebpackPlugin({
	   //    filename: 'pageOne/pageOne.html',
	   //    template: "src/pageOne/pageOne.html", //模板来源文件
	   //    inject: 'body',
	   //    chunks: ['pageOne']	      
	   //  }),
	   //  new MiniCssExtractPlugin({
	   //    filename: "[name]/[name].css",
	   //  }),
	   //  new CleanWebpackPlugin(['dist']),//实例化，参数为目录
    // ],
    plugins: getHTMLWebpackPlugin()
}