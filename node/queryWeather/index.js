const express = require('express');
const app = express();
const weather = require('./weather.js');

app.use('/www', express.static('public'));

app.get('/queryWeather/:id', (req, res) => {
	weather.queryWeather(req.params.id, (data) => {
		res.json(data.weatherinfo)
	})
})

app.get('/queryCityWeather/:id', (req, res) => {
	weather.queryCityWeather(req.params.id, (data) => {
		res.json(data.weatherinfo)
	})
})

app.listen(3000, () => {
	console.log('running...')
})