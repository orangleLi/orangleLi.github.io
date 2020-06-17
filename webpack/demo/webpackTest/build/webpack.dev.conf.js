const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");

// 清除目录等
const cleanWebpackPlugin = require("clean-webpack-plugin");
//4.x之后用以压缩
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackConfigBase = require('./webpack.base.conf');
const extractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const srcDir = path.resolve(process.cwd(), 'src')
const webpackConfigDev = {
	mode: 'development', // 通过 mode 声明开发环境
	devtool: 'cheap-source-map',
	output: {
		path: path.resolve(__dirname, '../dist'),
		// 打包多出口文件
		// 生成 a.bundle.[hash].js  b.bundle.[hash].js
		filename: './js/[name].js',
		publicPath: './dist'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			sass: srcDir + "/sass/",
			css: srcDir + "/css/",
		}
	},

	devServer: {
		contentBase: path.join(__dirname, "../src"),
		publicPath:'/',
		host: "127.0.0.1",
		port: "8080",
		overlay: true, // 浏览器页面上显示错误
		// open: true, // 开启浏览器
		// stats: "errors-only", //stats: "errors-only"表示只打印错误：
		hot: true // 开启热更新
	},
	plugins: [
		//热更新
		new webpack.HotModuleReplacementPlugin(),
		// 分离css插件参数为提取出去的路径
		//删除dist目录
		new cleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../'), //根目录
			// verbose Write logs to console.
			verbose: true, //开启在控制台输出信息
			// dry Use boolean "true" to test/emulate delete. (will not remove files).
			// Default: false - remove files
			dry: false,
		}),
		// 分离css插件参数为提取出去的路径
		new extractTextPlugin({
			// filename: 'css/[name].[hash:8].min.css',
			filename: 'css/[name].css',
		}),
		//压缩css
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		}),
		//上线压缩 去除console等信息webpack4.x之后去除了webpack.optimize.UglifyJsPlugin
		//https://github.com/mishoo/UglifyJS2/tree/harmony#compress-options
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: {
					warnings: false,
					drop_debugger: false,
					drop_console: true
				}
			}
		}),
	],
	// devtool: "source-map",  // 开启调试模式
	module: {
		rules: []
	},
}
module.exports = merge(webpackConfigBase, webpackConfigDev);