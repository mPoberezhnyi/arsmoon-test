var request = require('request');
var crypto = require('crypto');

const { API_KEY, API_SECRET, API_URL } = require('../constants')

const customRequest = (req, res, next) => {

	const {originalUrl, method, body} = req

	const postBody = method === 'POST' ? JSON.stringify(body) : ''

	const expires = Math.round(new Date().getTime() / 1000) + 60
	const signature = crypto
		.createHmac('sha256', API_SECRET)
		.update(`${method}${originalUrl}${expires}${postBody}`)
		.digest('hex');
	const headers = {
		'content-type': 'application/json',
		'Accept': 'application/json',
		'X-Requested-With': 'XMLHttpRequest',
		'api-expires': expires,
		'api-key': API_KEY,
		'api-signature': signature
	};
	const requestOptions = {
		headers: headers,
		json: true,
		url: `${API_URL}${originalUrl}`,
		method
	};

	request(postBody ? {
		...requestOptions,
		body: JSON.parse(postBody)
	} : requestOptions, function (error, response, body) {
		if (body.error) {
			return res.status(403).json({message: body.error.message})
		}

		req.data = body
		next()
	});
}

module.exports = customRequest
