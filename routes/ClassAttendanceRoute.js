const express = require('express')
const router = express.Router()

const {
  addClassAttendance,
} = require('../controllers/ClassAttendanceController')

router.route('/add').post(addClassAttendance)

module.exports = router
