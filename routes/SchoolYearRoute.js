const express = require('express')
const router = express.Router()

const {
  addSchoolYear,
  getSchoolYear,
  updateSchoolYearStatus
} = require('../controllers/SchoolYearController')

router.route('/add').post(addSchoolYear)
router.route('/get').get(getSchoolYear)
router.route('/update/status').post(updateSchoolYearStatus)

module.exports = router
