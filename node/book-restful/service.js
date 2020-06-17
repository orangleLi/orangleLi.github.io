const db = require('./db.js');
const dao = require('./dao.js');

exports.allBooks = (req, res) => {
	dao.selectAll((results) => {
		res.json(results)
	})
}

exports.addBook = (req, res) => {
	let info = req.body;
	dao.insertData(info, (results) => {
		if (results.affectedRows === 1) {
			res.json({
				code: 0,
				msg: '插入成功'
			})
		} else {
			res.json({
				code: -1,
				msg: '插入失败'
			})
		}
	})
}

exports.getBookById = (req, res) => {
	let id = req.params.id;
	dao.selectById(id, (results) => {
		res.json(results[0]);
	})
}

exports.editBook = (req, res) => {
	let info = req.body;
	let id = info.id;
	dao.updateById(id, info, (results) => {
		if (results.affectedRows === 1) {
			res.json({
				code: 0,
				msg: '更新成功'
			})
		} else {
			res.json({
				code: -1,
				msg: '更新失败'
			})
		}
	})
}

exports.deleteBook = (req, res) => {
	let id = req.params.id;
	dao.deleteById(id, (results) => {
		if (results.affectedRows === 1) {
			res.json({
				code: 0,
				msg: '删除成功'
			})
		} else {
			res.json({
				code: -1,
				msg: '删除失败'
			})
		}
	})
}