const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	// console.log(req.body.crypto);

	request('https://blockchain.info/ticker', (error, response, body) => {
		const data = JSON.parse(body);
		const price = data.USD.last;

		console.log(price);
	});
});

app.listen(3000, () => console.log('Server is running on port 3000'));
