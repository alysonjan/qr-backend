const express = require('express')
const router = express.Router()

const { addSemester, getSemester } = require('../controllers/SemesterController')

router.route('/add').post(addSemester)
router.route('/').get(getSemester)

module.exports = router
