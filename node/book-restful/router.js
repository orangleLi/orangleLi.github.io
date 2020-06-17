const express = require('express');
const app = express();
const router = express.Router();
const service = require('./service.js');

// 提供所有的图书信息
router.get('/books', service.allBooks);

// 跳转到添加图书页面
router.get('/toAddBook', function (req, res) {
  res.redirect('/www/addBook.html')
})

// 添加图书信息时提交数据
router.post('/books/book', service.addBook)


// 编辑图书时根据id查询相应信息
router.get('/books/book/:id', service.getBookById);

// 提交编辑的数据
router.put('/books/book', service.editBook)

// 删除图书信息
router.delete('/books/book/:id', service.deleteBook)

module.exports = router