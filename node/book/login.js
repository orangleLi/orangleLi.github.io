/*
	登录验证（前端+后端+数据库）
*/
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db.js');
const app = express();

// http://localhost:3000/login.html 此路径进行访问
// login.html要放在public文件夹下，并public文件配置为静态资源文件

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.post('/check', (req, res) => {
	let param = req.body;
	let sql = 'select count(*) as total from user where username=? and password=?';
	let data = [param.username, param.password];

	db.base(sql, data, (result) => {
		if (result[0].total === 1) {
			res.send('login success');
		} else {
			res.send('login fail')
		}
	})
})

app.listen(3000, () => {
	console.log('running...')
})