const express = require('express')
const router = express.Router()

const {
  addClass,
  getClass,
  getClassList,
} = require('../controllers/ClassController')

router.route('/add').post(addClass)
router.route('/get/:schoolYearID/:semID').get(getClass)
router.route('/get/class/list/:classID').get(getClassList)

module.exports = router
