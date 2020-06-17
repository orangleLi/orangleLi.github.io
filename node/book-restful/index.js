const express = require('express');
const router = require('./router.js');
const bodyParser = require('body-parser');
const app = express();

app.use('/www', express.static('public'));

// 处理请求参数
// 挂载参数处理中间件（post）
app.use(bodyParser.urlencoded({extended: false}));
// 处理json格式的参数
app.use(bodyParser.json())

app.use(router)


app.listen(3000, () => {
	console.log('running...')
})