const db = require('./db.js');

// 查询全部
exports.selectAll = (callback) => {
	let sql = 'select id, name, author, category, desctiption from book';
	let data = null;

	db.base(sql, data, (results) => {
		callback && callback(results)
	});

}
// 通过id查询
exports.selectById = (id, callback) => {
	let sql = 'select id, name, author, category, desctiption from book where id = ?';
	let data = [id];

	db.base(sql, data, (results) => {
		callback && callback(results)
	});

}

exports.insertData = (info, callback) => {
	let sql = 'insert into book set ?';
	let data = {
		name: info.name,
		author: info.author,
		category: info.category,
		desctiption: info.desctiption
	}
	db.base(sql, data, (results) => {
		callback && callback(results)
	});
}

exports.updateById = (id, info, callback) => {
	let sql = 'update book set name=?, author=?, category=?,desctiption=? where id=?';
	let data = [info.name, info.author, info.category, info.desctiption, info.id];
	db.base(sql, data, (results) => {
		callback && callback(results)
	});

}

exports.deleteById = (id, callback) => {
	let sql = 'delete from book where id = ?';
	let data = [id];

	db.base(sql, data, (results) => {
		callback && callback(results)
	});
}