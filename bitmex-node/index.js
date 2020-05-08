const express = require('express')
const { PORT, API_KEY, API_SECRET } = require('./constants')
const cors = require('cors')
const BitMEXClient = require('./bitmex')
const WebSocket = require('ws')

const app = express()

const client = new BitMEXClient({
	testnet: true,
	apiKeyID: API_KEY,
	apiKeySecret: API_SECRET,
	maxTableLen: 100
});

const webSocketServer = new WebSocket.Server({port: 5080})

app.use(cors());

app.use(express.json({ extended: true }))

app.use('/api/v1', require('./routes'))

const start = async () => {

	try {
		app.listen(PORT, () => { console.log(`App has been started on port ${PORT}`) })

		client.on('error', console.error);
		client.on('open', () => console.log('Connection opened.'));
		client.on('close', () => console.log('Connection closed.'));
		client.on('initialize', () => console.log('Client initialized, data is flowing.'));

		webSocketServer.on("connection", ws => {
			ws.on("message", message => {
				if (message === 'get orders') {
					client.addStream('XBTUSD', 'order', function(data) {

						const jsonData = JSON.stringify(data.slice(0, 100))

						ws.send(jsonData);
					});
				}
			});
		});

	} catch (e) {
		console.log('Server error ', e.message)
		process.exit(1)
	}
}

start()