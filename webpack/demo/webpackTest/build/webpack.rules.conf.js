const extractTextPlugin = require("extract-text-webpack-plugin");
const rules = [{
		test: /\.(css|scss|sass)$/,
		// 不分离的写法
		// use: ["style-loader", "css-loader",sass-loader"]
		// 使用postcss不分离的写法
		// use: ["style-loader", "css-loader", "sass-loader","postcss-loader"]
		// 此处为分离css的写法
		/*use: extractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "sass-loader"],
			// css中的基础路径
			publicPath: "../"
		})*/
		// 区别开发环境和生成环境
		use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader", "postcss-loader"] : extractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "sass-loader", "postcss-loader"],
			// css中的基础路径
			publicPath: "../"

		})
	},
	{
		test: /\.js$/,
		use: ["babel-loader"],
		// 不检查node_modules下的js文件
		// exclude: "/node_modules/"
	}, {
		test: /\.(gif|png|jpe?g|svg)$/i,
		use: [{
			// 需要下载file-loader和url-loader
			loader: "url-loader",
			options: {
				limit: 1, //小于这个时将会已base64位图片打包处理
				name: '[path][name].[ext]',
				context:'src',
				// 图片文件输出的文件夹
				// publicPath:'/home/newbfyj/',
				publicPath:'../../',
				outputPath: "./"
			}
		}]
	},
	{
    test: /\.(eot|otf|ttf|woff|woff2)\w*/,
		loader: 'url-loader',
		options: {
			limit: 1,
			name: '[path][name].[ext]',
			publicPath:'../../',
			context:'src',
		}, 
	},
	{
		test: /\.html$/,
		// html中的img标签
		use: ["html-withimg-loader"]
	}, {
		test: /\.sass$/,
		// 三个loader的顺序不能变
		// 不分离的写法
		// use: ["style-loader", "css-loader", "sass-loader"]
		// 区别开发环境和生成环境
		use: process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "sass-loader"] : extractTextPlugin.extract({
			fallback: "style-loader",
			use: ["css-loader", "sass-loader"],
			// css中的基础路径
			publicPath: "../"
		})
	},
];
module.exports = rules;