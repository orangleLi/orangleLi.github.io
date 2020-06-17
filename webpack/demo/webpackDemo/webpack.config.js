const path = require('path');
const glob = require('glob');
const fs = require('fs')
// const srcDir = path.resolve(process.cwd(), 'src')
const srcDir = path.resolve(process.cwd(), '')
console.log(srcDir)
var HtmlWebpackPlugin = require('html-webpack-plugin'); //打包html的插件
// entry：配置入口文件的地址，可以是单一入口，也可以是多入口。

// output：配置出口文件的地址，在webpack2.X版本后，支持多出口配置。

// module：配置模块，主要是解析CSS和图片转换压缩等功能。

// plugins：配置插件，根据你的需要配置不同功能的插件。

// devServer：配置开发服务功能。

// 2.然后在终端输入：webpack    进行打包

function resolve(dir) {
  return path.join(__dirname, './', dir);
}

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
    });
    return files;
}
function htmlPlugin() {
    let entryHtml = glob.sync('/*/*.html')
    let arr = []
    entryHtml.forEach((filePath) => {
        let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        let conf = {
            // 模板来源
            template: filePath,
            // 文件名称
            filename: filename + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', filename],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {
            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}
module.exports = {
	// “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
	entry: {
		'index': __dirname + '/js/index/index.js',
		'page': __dirname + '/js/page/page.js'
	},
	// entry: getEntry(),
	//出口文件的配置项
    output:{
        //输出的路径，用了Node语法
        path:path.resolve(__dirname,'dist/js'),
        //输出的文件名称
        filename:'[name]/[name].js',
        publicPath: 'http://ening.com/'
    },
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
	//**关于filename补充两点：**
	// 1、filename配置的html文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
	// 2、指定生成的html文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。
    plugins:[
    	new HtmlWebpackPlugin({
	      inject: false,//注入位置'head','body',true,false
	      chunks: ['index'],//引入的模块，这里指定的是entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入,数组形式传入
	      template: "index/index.html", //模板来源文件
	      filename: '../index/index.html',// 生成的模板文件的名字 默认index.html
	      title: 'webpack is good',
	      date: new Date(),
	      //代码压缩
	  //     minify: {
			// removeComments: true,  //删除注释
			// collapseWhitespace: true//删除空格
	  //     }
	    }),
	    new HtmlWebpackPlugin({
	      inject: false,
	      chunks: ['page'],
	      template: "page/page.html", //模板来源文件
	      
	      filename: '../page/page.html'
	    })
    ],
    // plugins: htmlPlugin(),
    //配置webpack开发服务功能
    devServer:{}
}

