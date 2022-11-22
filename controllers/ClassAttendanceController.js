const db = require('../configs/database')
const { currentDateAndTime } = require('../utils/DateTime')

const addClassAttendance = async (req, res) => {
  const { class_id, attendance_id } = req.body
  try {
    let date = await currentDateAndTime()
    const sqlQuery =
      'INSERT INTO class_attendance (class_id, attendance_id, date_created) VALUES (?,?,?)'
    db.query(sqlQuery, [class_id, attendance_id, date], (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(201).json({ msg: 'New Class Attendance Successfully Added' })
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addClassAttendance,
}
