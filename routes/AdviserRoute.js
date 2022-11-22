const express = require('express')
const router = express.Router()

const { addAdviser } = require('../controllers/AdviserController')

router.route('/add').post(addAdviser)

module.exports = router
