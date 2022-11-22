const express = require('express')
const router = express.Router()

const {
  createSession,
  getSession,
  getAttendanceSession,
  closeSession,
  historySession,
  getHistoryDetails
} = require('../controllers/SessionController')

router.route('/create').post(createSession)
router.route('/get').post(getSession)
router.route('/get-attendance').post(getAttendanceSession)
router.route('/close').post(closeSession)
router.route('/history').post(historySession)
router.route('/history-details').post(getHistoryDetails)


module.exports = router
