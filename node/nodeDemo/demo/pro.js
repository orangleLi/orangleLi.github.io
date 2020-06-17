const app = require('express')();

app.get('/', (req, res) => {
	res.send('ok');
}).listen(3000, () => {
	console.log('running...')
})
