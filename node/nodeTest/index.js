/*
	动态网站开发

	成绩查询功能
*/

const http = require('http');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const scoreData = require('./scores.json');

http.createServer((req, res) => {
	// 路由（请求路径+请求方式）
	// 查询成绩的入口地址   /query
	if (req.url.startsWith('/query') && req.method === 'GET') {
		fs.readFile(path.join(__dirname, 'view', 'index.tpl'), 'utf8', (err, content) => {
			if (err) {
				res.writeHead(500, {
					'Content-type': 'text/plain; charset=utf8'
				});
				res.end('服务器错误，请与管理员联系')
			}
			res.end(content)
		})
	} else if (req.url.startsWith('/score') && req.method === 'POST') {
		// 获取成绩的结果  /score
		let pdata = '';
		// 接受参数
		req.on('data', (chunk) => {
			pdata += chunk;
		})
		req.on('end', () => {
			let obj = querystring.parse(pdata);
			console.log("-" + obj.code + "-")
			console.log("-" + obj.idNumber + "-")
			
			let result = scoreData[obj.code];
			fs.readFile(path.join(__dirname, 'view', 'result.tpl'), 'utf8', (err, content) => {
				if (err) {
					res.writeHead(500, {
						'Content-type': 'text/plain; charset=utf8'
					});
					res.end('服务器错误，请与管理员联系')
				}
				// 返回内容之前要进行数据渲染
				content = content.replace('$$chinese$$', result.chinese)
				content = content.replace('$$math$$', result.math)
				content = content.replace('$$english$$', result.english)
				content = content.replace('$$summary$$', result.summary)
				res.end(content)
			})
		})

	}

}).listen(3000, () => {
	console.log('running......')
})