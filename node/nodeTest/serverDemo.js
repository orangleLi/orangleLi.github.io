/*
	初步实现服务器功能
*/
// node serverDemo.js 启动，页面中http://localhost:3000/进行访问
const http = require('http');
// // 创建服务器实例对象
// let server = http.createServer();
// // 绑定请求事件
// server.on('request', (req, res) => {
// 	res.end('hello');
// })
// // 监听端口
// server.listen(3000)
// ------------------------------
// 上述代码的简写
// http.createServer((req, res) => {
// 	res.end('ok')
// }).listen(3000)


// ------------------------------
// 指定ip地址  访问http://192.168.5.197:3000/
http.createServer((req, res) => {
	res.end('ok')
}).listen(3000, '192.168.5.197', () => {
	console.log('running...')
})