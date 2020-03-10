const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development';
const config = require('./config')[isDev ? 'dev' : 'build'];
const path = require('path');

module.exports = {
	mode: isDev ? 'development' : 'production',
	entry: {
		index: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[hash:6].js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									'corejs': 3
								}
							]
						]
					}
				},
				exclude: /node_modules/ // 排除node_module目录
			},
			{
				test: /\.(le|c)ss$/,
				use: [
                    MiniCssExtractPlugin.loader,
					'css-loader', {
					loader: 'postcss-loader',
					options: {
						plugins: function () {
							return [
								require('autoprefixer')({
									"overrideBrowserslist": [
										">0.25%",
										"not dead"
									]
								})
							]
						}
					}
				}, 'less-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limie: 10240, // 10k
							esModule: false // esModule 设置为 false，否则，<img src={require('XXX.jpg')} /> 会出现 <img src=[Module Object] />
						}
					}
				]
			},
			// 处理img标签引用的图片
			{
		        test: /\.(htm|html)$/,
		        loader: 'html-withimg-loader'
		    }
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			filename: 'index.html', // 打包后的文件
			config: config.template,
			minify: {
				removeAttributeQuotes: false, // 是否删除属性的双引号
				collapseWhitespace: false, // 是否折叠空白
			},
			// hash: true // 是否加上hash,默认是false
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new CleanWebpackPlugin(),
		// new CopyWebpackPlugin([
		// 	{
		// 		from: './common/**/*',
		// 		to: path.resolve(__dirname, 'dist/common'),
		// 		flatten: true
		// 	}
		// ])
	]
}
