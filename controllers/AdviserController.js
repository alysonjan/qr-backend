const db = require('../configs/database')
const { currentDateAndTime } = require('../utils/DateTime')

const addAdviser = async (req, res) => {
  const { schoolyear_id, student_id, employee_id } = req.body
  let date = await currentDateAndTime()
  try {
    const sqlQuery =
      'INSERT INTO adviser (sy_id, student_id, employee_id, date_created) VALUES (?,?,?,?)'
    db.query(
      sqlQuery,
      [schoolyear_id, student_id, employee_id, date],
      (err, result) => {
        if (err) return res.json({ msg: err.message })
        res.status(201).json({ msg: 'New Adviser Successfully Added' })
      }
    )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addAdviser,
}
