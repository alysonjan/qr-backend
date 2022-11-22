const express = require('express')
const router = express.Router()

const { addStudent, getStudent, studentDetails, studentSummary, deleteStudent, updateStudent } = require('../controllers/StudentController')

router.route('/add').post(addStudent)
router.route('/get').get(getStudent)
router.route('/get-student-details').post(studentDetails)
router.route('/get-student-summary').post(studentSummary)
router.route('/delete-student').post(deleteStudent)
router.route('/update-student').post(updateStudent)

module.exports = router
