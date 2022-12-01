const Crypto = require('crypto')
const db = require('../configs/database')

const { encryptPassword, decryptPassword } = require('../utils/bcrypt')

const adminCreateUser = async (req, res) => {
  const { employee_id, firstname, lastname, username, password, position } =
    req.body

  try {
    const hashedPasword = await encryptPassword(password)

    const checkUsername =
      'SELECT * FROM employee WHERE employee_id = ? OR username = ?'
    db.query(checkUsername, [employee_id, username], (err, result) => {
      if (err) return res.json(err.message)
      if (result.length > 0) {
        return res.status(400).json({
          msg: 'USERNAME OR EMPLOYEE ID IS ALREADY TAKEN PLS TRY ANOTHER CREDENTIALS',
        })
      } else {
        const registerNewUserSql =
          'INSERT INTO employee (employee_id,fname,lname,username,password,position) VALUES (?,?,?,?,?,?)'
        db.query(
          registerNewUserSql,
          [employee_id, firstname, lastname, username, hashedPasword, position],
          (err, result) => {
            if (err) return res.json({ msg: err.message })
            res.status(201).json({ msg: 'New User Successfully Created' })
          }
        )
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const loginAsAdmin = async (req, res) => {
  const { username, password } = req.body

  try {
    const loginSql = 'SELECT * FROM employee WHERE username = ?'
    db.query(loginSql, username, async (err, result) => {
      if (err) return res.json({ msg: err.message })
      if (result.length > 0) {
        const checkPassword = await decryptPassword(
          password,
          result[0].password
        )
        if (!checkPassword) {
          return res.status(400).json({ msg: 'INVALID CREDENTIALS' })
        }
        if (result[0].position !== 'admin') {
          return res.status(400).json({ msg: 'UNAUTHORIZE TO LOGIN' })
        }
        return res.status(200).json(result)
      } else {
        return res.status(400).json({ message: 'INVALID CREDENTIALS' })
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const loginAsTeacher = async (req, res) => {
  const { username, password } = req.body

  try {
    const loginSql = 'SELECT * FROM employee WHERE username = ?'
    db.query(loginSql, username, async (err, result) => {
      if (err) return res.json({ msg: err.message })
      if (result.length > 0) {
        const checkPassword = await decryptPassword(
          password,
          result[0].password
        )
        if (!checkPassword) {
          return res.status(400).json({ msg: 'INVALID CREDENTIALS' })
        }
        if (result[0].position !== 'teacher') {
          return res.status(400).json({ msg: 'UNAUTHORIZE TO LOGIN' })
        }

        return res.status(200).json(result)
      } else {
        return res.status(400).json({ message: 'INVALID CREDENTIALS' })
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getTeacher = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM employee WHERE position = 'teacher' `
    db.query(sqlQuery, (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const sqlQuery = `SELECT * FROM employee WHERE deleted = ? ORDER BY user_id DESC `
    db.query(sqlQuery,[0], (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateUser = async(req,res) => {
  const { user_id, employee_id, firstname, lastname, username, position } = req.body
  try {
    const sqlQuery = 'UPDATE employee SET employee_id = ?, fname = ?, lname = ?, username = ?, position = ? WHERE user_id = ?'
    db.query(sqlQuery, [employee_id, firstname, lastname, username, position, user_id], (err, result) => {
      if (err) return res.json({ msg: err.message })
      return res.status(200).json('Sucessfully Updated')
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateUserPassword = async(req,res) => {
  const { user_id, new_password } = req.body
  try {
    const newHashedPasword = await encryptPassword(new_password)
    const sqlQuery = 'UPDATE employee SET password = ? WHERE user_id = ?'
    db.query(sqlQuery, [newHashedPasword, user_id], (err, result) => {
      if (err) return res.json({ msg: err.message })
      return res.status(200).json('Sucessfully Update Password')
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteUser = async(req,res) => {
  const { user_id } = req.body
  try {
    const sqlQuery = 'UPDATE employee SET deleted = ? WHERE user_id = ?'
    db.query(sqlQuery, [1,user_id], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json('Sucessfully Deleted')
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  adminCreateUser,
  loginAsAdmin,
  loginAsTeacher,
  getTeacher,
  getAllUsers,
  updateUser,
  deleteUser,
  updateUserPassword
}
