/*
	处理请求路径的分发
	1、req对象是Class:http.IncomingMessage的实例对象
	2、res对象是Class:http.ServerResponse的实例对象
*/
// node handlePath.js 
// http://localhost:3000/index.html 显示 /index.html
// http://localhost:3000/about.html 显示 /about.html
const http = require('http');
http.createServer((req, res) => {
	// req.url可以获取URL中的路径（端口之后部分）
	if (req.url.startsWith('/index')) {
		res.end('index')
	} else if (req.url.startsWith('/about')) {
		res.end('about')
	} else {
		res.end('no content')
	}
}).listen(3000);