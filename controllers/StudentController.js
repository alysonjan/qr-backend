const db = require('../configs/database')
const sendMailGun = require('../mailgun/mailgun')
const sendQrCodeMail = require('../sendgrid/sendMail')
const sendEmailToStudent = require('../sendinblue/sib')
const { currentDateAndTime } = require('../utils/DateTime')
const { generateQrCode } = require('../utils/qr')

const addStudent = async (req, res) => {
  const { student_id, firstname, lastname, section, year_level, email } = req.body
  let date = await currentDateAndTime()
  let status = 'active'
  let jsonData = {
    'firstname':firstname,
    'lastname':lastname,
    'student_id':student_id,
    'email':email,
    'year':year_level,
    'section':section,
  }
  try {
    const checkStudentID = 'SELECT * FROM student WHERE student_id = ?'
    db.query(checkStudentID, [student_id], (err, result) => {
      if (err) return res.json(err.message)
      if (result.length > 0) {
        return res.status(400).json({
          msg: 'STUDENT ALREADY EXIST IN DATABASE',
        })
      } else {
        const sqlQuery =
          'INSERT INTO student (student_id, fname, lname, section, yr_lvl, status, date_created,email) VALUES (?,?,?,?,?,?,?,?)'
        db.query(
          sqlQuery,
          [student_id, firstname, lastname, section, year_level, status, date, email],
          async(err, result) => {
            if (err) return res.json({ msg: err.message })
            let genQr = await generateQrCode(jsonData)

            if (genQr !== null){
              await sendQrCodeMail(email,genQr)
            }
            // if (genQr !== null){
            //   // sendMailGun(email,genQr)
            //   sendEmailToStudent(email,genQr)
            // }
            res.status(201).json({ msg: '1 student added to the masterlist' })
          }
        )
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getStudent = async (req, res) => {
  try {
    const sqlQuery =
      'SELECT CONCAT(lname, ", ", fname ) AS fullname, id, student_id,section,yr_lvl,status  FROM student ORDER BY lname ASC'
    db.query(sqlQuery, (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const studentDetails = async (req,res) => {
  const { student_id } = req.body
  try {
    const sqlQuery = "SELECT DISTINCT CONCAT(st.fname,' ', st.lname ) AS fullname, st.section, st.student_id, (SELECT COUNT(status) FROM attendance WHERE student_id = st.student_id )  AS 'totalClass' , (SELECT COUNT(status) FROM attendance WHERE status = 'present' AND student_id = st.student_id )  AS 'presentDays' , (SELECT COUNT(status) FROM attendance WHERE status = 'absent' AND student_id = st.student_id)AS 'absentDays' FROM student as st INNER JOIN class as cl ON st.student_id = cl.student_id INNER JOIN attendance as at ON st.student_id = at.student_id  WHERE st.student_id = ? "
    db.query(sqlQuery, [student_id], (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const studentSummary = async (req,res) => {
  const { student_id,sub_id } = req.body
  try {
      const sqlQuery = `SELECT DISTINCT CONCAT(st.fname,' ', st.lname ) AS fullname, 
      st.student_id, at.time_in, at.date, at.status FROM student as st
      INNER JOIN attendance AS at ON st.student_id = at.student_id 
      JOIN class AS cl ON at.class_id = cl.class_id 
      WHERE st.student_id = ? AND cl.sub_id = (SELECT sub_id FROM subject WHERE sub_id = ?)`
      db.query(sqlQuery, [student_id,sub_id], (err, result) => {
        if (err) return res.json({ msg: err.message })
        res.status(200).json(result)
      })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const updateStudent = async (req, res) => {
  const { id, student_id, section, year_level, status } = req.body
  try {
    const sqlQuery = 'UPDATE student SET student_id = ?, section = ?, yr_lvl = ?, status = ? WHERE id = ?'
    db.query(sqlQuery, [student_id, section, year_level, status, id ], (err, result) => {
      if (err) return res.json({ msg: err.message })
      return res.status(200).json('Sucessfully Update')
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


const deleteStudent = async(req,res) => {
  const { id } = req.body
  try {
    const sqlQuery = 'DELETE FROM student WHERE id = ?'
    db.query(sqlQuery, [id], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json('Sucessfully Deleted')
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
module.exports = {
  addStudent,
  getStudent,
  studentDetails,
  deleteStudent,
  updateStudent,
  studentSummary
};
