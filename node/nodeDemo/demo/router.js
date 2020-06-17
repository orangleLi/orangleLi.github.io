/*
	路由（根据请求路径和请求方式进行路径分发处理）
	http的常用请求方式：
	post    添加
	get     查询
	put     更新
	delete  删除

	restful api （一种URL的格式）
*/
const app = require('express')();

// app.get('/', (req, res) => {
// 	res.send('get fun')
// })

// app.post('/', (req, res) => {
// 	res.send('post fun')
// })

// app.put('/', (req, res) => {
// 	res.send('put fun')
// })

// app.delete('/', (req, res) => {
// 	res.send('delete fun')
// })

// 直接使用use分发可以处理所有的路由
app.use('/', (req, res) => {
	res.send('ok')
})
app.listen(3000, (req, res) => {
	console.log('running...')
})