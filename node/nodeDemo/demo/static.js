/*
	托管静态文件

	可以指定虚拟目录
	可以指定多个目录作为静态资源目录
*/

const express = require('express');
const app = express();

// // 实现静态资源服务
// // use方法得第一个参数可以指定一个虚拟路径

// // http://localhost:3000/index.html
// // let server = app.use(express.static('../public'));

// // http://localhost:3000/abc/index.html
// let server = app.use('/abc', express.static('../public'));

// // http://localhost:3000/hi/hello.html
// app.use('/hi', express.static('hello'))
// server.listen(3000, () => {
// 	console.log('running...');
// })

// -------------------------------------------------------------

app.use('/abc', express.static('../public'));
app.use('/hi', express.static('hello'))
app.listen(3000, () => {
	console.log('running...');
})