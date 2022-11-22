const express = require('express')
const router = express.Router()

const {
  adminCreateUser,
  loginAsAdmin,
  loginAsTeacher,
  getTeacher,
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserPassword
} = require('../controllers/EmployeeController')

router.route('/admin/create/user').post(adminCreateUser)
router.route('/login/admin').post(loginAsAdmin)
router.route('/login/teacher').post(loginAsTeacher)
router.route('/get/teacher').get(getTeacher)
router.route('/get/users').get(getAllUsers)
router.route('/user/update').post(updateUser)
router.route('/user/delete').post(deleteUser)
router.route('/user/update/password').post(updateUserPassword)

module.exports = router
