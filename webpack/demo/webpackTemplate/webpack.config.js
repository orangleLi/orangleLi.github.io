const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); 

module.exports = {
	entry: {
		"index": './src/app.js'
	},
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js'
    },
    module:{
    	rules: [
    		{
				test: /\.js$/,
				include: __dirname + 'src',
				exclude: __dirname + 'node_modules',
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-latest']
				}

			},
    		{
				test: /\.css$/,
				use: {
					loader: 'style-loader',
					loader: 'css-loader'
				}

			},
    		{
				test: /\.html$/,
				use: {
					loader: 'html-loader'
				}

			}
    	]
    },
    plugins:[
	    new HtmlWebpackPlugin({
	      filename: 'index.html',
	      template: "./index.html", //模板来源文件
	      inject: 'body',
	      chunks: ['index']	      
	    })
    ]
}