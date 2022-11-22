const express = require('express')
const router = express.Router()

const { addSubject, getSubject, getAllSubjectsByTeacher, updateSubject, deleteSubject } = require('../controllers/SubjectController')

router.route('/add').post(addSubject)
router.route('/update').post(updateSubject)
router.route('/delete').post(deleteSubject)
router.route('/get').get(getSubject)
router.route('/get-all-subjects-by-teacher').post(getAllSubjectsByTeacher)

module.exports = router
