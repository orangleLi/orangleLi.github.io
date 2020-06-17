const path = require('path');
const webpack = require("webpack");
const fs = require('fs')
const glob = require("glob");
// 分离css

//消除冗余的css
const purifyCssWebpack = require("purifycss-webpack");
// html模板

const uglifyjs = require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin = require("html-webpack-plugin");
//静态资源输出
const copyWebpackPlugin = require("copy-webpack-plugin");
const rules = require("./webpack.rules.conf.js");

const srcDir = path.resolve(process.cwd(), 'src')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}
// 获取html-webpack-plugin参数的方法
// var getHtmlConfig = function (name, chunks,html) {
// 	return {
// 		template: `./src/pages/${name}/${html}.html`,
// 		filename: `${html}.html`,
// 		// favicon: './favicon.ico',
// 		// title: title,
// 		inject: true,
// 		hash: true, //开启hash  ?[hash]
// 		chunks: chunks,
// 		minify: process.env.NODE_ENV === "development" ? false : {
// 			removeComments: true, //移除HTML中的注释
// 			collapseWhitespace: true, //折叠空白区域 也就是压缩代码
// 			removeAttributeQuotes: true, //去除属性引用
// 		},
// 	};
// };
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        } else {
			var dirss = fs.readdirSync(path.join(path.resolve(srcDir, 'js'), item))
            dirss.forEach(function (items) {
                matchs = items.match(/(.+)\.js$/);
                matchs[1] = item + '\\' + matchs[1];
                files[matchs[1]] = path.resolve(srcDir, 'js', item) + '\\' + matchs[0];
            });
		}
		// console.log(files[matchs[1]]+'555')
    });
    return files;
} 
module.exports = {
	entry: getEntry() ,
	module: {
		rules: [...rules]
	},
	//将外部变量或者模块加载进来
	externals: {
		// 'jquery': 'window.jQuery'
	},
	plugins: [
		// 全局暴露统一入口
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			'window.jQuery': 'jquery',
		}),
		//静态资源输出
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, "../src/lib"),
			to: './lib',
			ignore: ['.*']
		}]),
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, "../src/fonts"),
			to: './fonts',
			ignore: ['.*']
		}]),
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, "../src/html"),
			to: './html',
			ignore: ['.*']
		}]),
		new copyWebpackPlugin([{
			from: path.resolve(__dirname, "../src/sass/plugin"),
			to: './css/plugin',
			ignore: ['.*']
		}]),
		// 消除冗余的css代码
		new purifyCssWebpack({
			paths: glob.sync(path.join(__dirname, "../src/html/**/*.html"))
		}),
		// new htmlWebpackPlugin({
		// 	title: 'Custom template',
		// 	template: path.join(__dirname, "../src/html/**/*.html"), //指定要打包的html路径和文件名
		// 	filename: '../html/[name].html' //指定输出路径和文件名
		// })

	],
	// webpack4里面移除了commonChunksPulgin插件，放在了config.optimization里面,提取js， vendor名字可改
	// optimization: {
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				// test: /\.js$/,
	// 				test: path.resolve(__dirname, '../node_modules'),
	// 				chunks: "initial", //表示显示块的范围，有三个可选值：initial(初始块)、async(按需加载块)、all(全部块)，默认为all;
	// 				name: "vendor", //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；
	// 				minChunks: 1,
	// 				reuseExistingChunk: true,
	// 				enforce: true
	// 			}
	// 		}
	// 	}
	// },
}
//配置页面
// const htmlArray = [{
// 		folder: 'index',
// 		html:'index',
// 		title: '首页',
// 		chunks: [ 'index']
// 	},
// 	{
// 		folder: 'login',
// 		html: 'lindex',
// 		title: '登录',
// 		chunks: ['login']
// 	},
// 	{
// 		folder: 'login',
// 		html: 'lindex.1',
// 		title: '登录1',
// 		chunks: ['lindex.1']
// 	},
// ];

// //自动生成html模板
// htmlArray.forEach((element) => {
// 	module.exports.plugins.push(new htmlWebpackPlugin(getHtmlConfig(element.folder, element.chunks, element.html)));
// })