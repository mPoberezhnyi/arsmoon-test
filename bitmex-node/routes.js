const {Router} = require('express')
const customRequest = require('./midlewares/request')

const router = Router()

router.get(
	'/instrument/active',
	customRequest,
	async (req, res) => {
		try {
			const { data } = req
			res.status(201).json(data)
		}
		catch (e) {
			res.status(501).json({message: 'Error'})
		}
	}
)

router.get(
	'/trade/bucketed',
	customRequest,
	async (req, res) => {
		try {
			const { data } = req
			res.status(201).json(data)
		}
		catch (e) {
			res.status(501).json({message: 'Error'})
		}
	}
)

router.post(
	'/order',
	customRequest,
	async (req, res) => {
		try {
			const { data } = req

			res.status(201).json(data)
		}
		catch (e) {
			res.status(501).json({message: 'Error'})
		}
	}
)

router.get(
	'/order',
	customRequest,
	async (req, res) => {
		try {
			const { data } = req
			res.status(201).json(data)
		}
		catch (e) {
			res.status(501).json({message: 'Error'})
		}
	}
)

router.get(
	'/user',
	customRequest,
	async (req, res) => {
		try {
			const { data } = req
			res.status(201).json(data)
		}
		catch (e) {
			res.status(501).json({message: 'Error'})
		}
	}
)

module.exports = router