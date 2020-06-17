/*
	模板引擎整合
*/
const express = require('express');
const path = require('path');
const template = require('art-template');
const app = express();

// 设置模板的路径 
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎（后缀）
app.set('view engine', 'art');

// 使express兼容art-template模板引擎
app.engine('art', require('express-art-template'));

app.get('/list', (req, res) => {
	let data = {
		title: '水果',
		list: ['apple', 'orange', 'banana']
	}
	// 参数一：模板名称；参数二：渲染模板的数据
	res.render('list', data)
})

app.listen(3000, (req, res) => {
	console.log('running...')
})