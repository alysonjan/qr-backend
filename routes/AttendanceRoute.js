const express = require('express')
const router = express.Router()

const { addAttendance, attendanceSetAbsent } = require('../controllers/AttendanceController')

router.route('/').post(addAttendance)
router.route('/update-absent').post(attendanceSetAbsent)

module.exports = router
