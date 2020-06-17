/*
	业务模块
*/
const path = require('path');
const fs = require('fs');

const dao = require('./dao.js');
// const data = require('./data.json');

// 自定生成图书编号（自增）
// let maxBookCode = () => {
// 	let arr = [];
// 	data.forEach((item) => {
// 		arr.push(item.id);
// 	});
// 	return Math.max.apply(null, arr);
// }

// // 修改数据
// let updataData = (res) => {
// 	// 把内存中的数据写入文件
// 	// JSON.stringify 4代表填充是添加4个空格
// 	fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
// 		if (err) {
// 			res.send('server error');
// 		}
// 		// 文件写入成功之后重新跳转到主页面
// 		res.redirect('/')
// 	})
// }


// 渲染主页面
exports.showIndex = (req, res) => {
	dao.selectAll((results) => {
		res.render('index', {list: results});
	});
}

// 跳转到添加图书的页面
exports.toAddBook = (req, res) => {
	res.render('addBook', {});
}

// 添加图书保存数据
exports.addBook = (req, res) => {
	// 获取表单数据
	let info = req.body;
	dao.insertData(info, (results) => {
		// 文件写入成功之后重新跳转到主页面
		res.redirect('/')
	})

	// let book = {};
	// for (let key in info)  {
	// 	book[key] = info[key];
	// }
	// book.id = maxBookCode() + 1 + '';
	// data.push(book);
	// updataData(res);
}

// 跳转到修改图书的页面
exports.toEditBook = (req, res) => {
	let id = req.query.id;
	dao.selectById(id, (results) => {
		res.render('editBook', results[0]);
	})
}

// 修改图书信息
exports.editBook = (req, res) => {
	let info = req.body;
	let id = info.id;
	console.log(info);
	dao.updateById(id, info, (results) => {
		// 文件写入成功之后重新跳转到主页面
		res.redirect('/')
	})
}

// 删除某个图书
exports.toDeleteBook = (req, res) => {
	let id = req.query.id;
	dao.deleteById(id, (results) => {
		// 文件写入成功之后重新跳转到主页面
		res.redirect('/')
	})
}
