/*
	测试通用api
*/
const db = require('./db.js');

// let sql = 'select name, author, category, desctiption from  book where id = ?'
// let data = [13];

// db.base(sql, data, (results) => {
// 	console.log(results)
// });

// let sql = 'insert into book set ?';
// let data = {
// 	name: '笑傲江湖',
// 	author: '金庸',
// 	category: '文学',
// 	desctiption: '武侠小说'
// }

// db.base(sql, data, (results) => {
// 	if (results.affectedRows === 1) {
// 	  	console.log('数据插入成功')
// 	  }
// });

// let sql = 'update book set name=?, author=?, category=?,desctiption=? where id=?;';
// let data = ['天龙八部', '金庸', '文学 ', '武侠小说', '14']

// db.base(sql, data, (results) => {
// 	if (results.affectedRows === 1) {
// 	  	console.log('数据更新成功')
// 	  }
// });

let sql = 'delete from book where id = ?';
let data = ['14']

db.base(sql, data, (results) => {
	if (results.affectedRows === 1) {
	  	console.log('数据删除成功')
	  }
});