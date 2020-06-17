/*
	操作数据库基本步骤
*/
// 加载数据库驱动
const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost', // 数据库所在的服务器的域名或者IP地址
  user     : 'root', // 登录数据库的账号
  password : 'root', // 登录数据库的密码
  database : 'book' // 数据库的名称
});
// 执行连接操作
connection.connect();

// let sql = 'select name, author, category, desctiption from book'
// let data = null;

let sql = 'select name, author, category, desctiption from  book where id = ?'
let data = [13];
// 操作数据库
connection.query(sql, data, function (error, results, fields) {
  if (error) throw error;
  console.log(results[0].name);
});
// 关闭数据库
connection.end();