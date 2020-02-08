const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

require('dotenv').config();
const api_key = process.env.API_KEY;
console.log(process.env);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
	// console.log(req.body);
	const crypto = req.body.crypto;
	const fiat = req.body.fiat;

	// const URL = `https://api.nomics.com/v1/currencies/ticker?key=demo-26240835858194712a4f8cc0dc635c7a&ids=${crypto}&convert=${fiat}`;

	const options = {
		url: `https://api.nomics.com/v1/currencies/ticker?key=${api_key}`,
		method: 'GET',
		qs: {
			ids: crypto,
			convert: fiat
		}
	};

	request(options, (error, response, body) => {
		const data = JSON.parse(body);
		// console.log(data[0].price);
		const price = data[0].price;
		const dollar = Number(price).toFixed(2);

		const priceDate = data[0].price_date;

		res.write(`<p>The current date for the price is ${priceDate}</p>`);
		res.write(`<h1>The price of ${crypto} is ${dollar} ${fiat} </h1>`);

		res.send();
	});
});

app.listen(3000, () => console.log('Server is running on port 3000'));
