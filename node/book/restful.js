/*
	restful api 是从URL的格式来表述的
	get http://localhost:3000/books
	get http://localhost:3000/books/book
	post http://localhost:3000/books/book
	get http://localhost:3000/books//book/1
	put http://localhost:3000/books/book
	delete http://localhost:3000/books//book/2

	传统的URL风格
	http://localhost:3000/
	http://localhost:3000/toAddBook
	http://localhost:3000/addBook
	http://localhost:3000/toAddBook?id=1
	http://localhost:3000/editBook
	http://localhost:3000/deleteBook?id=1
*/

const express = require('express');
const db = require('./db.js');
const app = express();

// app.get('/books', (req, res) => {
// 	let sql = 'select * from book';
// 	let data = null;
// 	db.base(sql, data, (results) => {
// 		res.json(results);
// 	})
// })

app.get('/books/book/:id', (req, res) => {
	let id = req.params.id;
	let sql = 'select * from book where id = ?';
	let data = [id];
	db.base(sql, data, (results) => {
		res.json(results[0]);
	})
})

app.listen(3000, () => {
	console.log('running...')
})

