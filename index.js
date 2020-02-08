const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	// console.log(req.body);
	const crypto = req.body.crypto;
	const fiat = req.body.fiat;

	request(
		`https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=${crypto}&convert=${fiat}`,
		(error, response, body) => {
			const data = JSON.parse(body);
			// console.log(data[0].price);
			const price = data[0].price;
			const dollar = Number(price).toFixed(2);

			res.send(`<h1>The price of ${crypto} is ${dollar} ${fiat} </h1>`);
		}
	);
});

app.listen(3000, () => console.log('Server is running on port 3000'));
