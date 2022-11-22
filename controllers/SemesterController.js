const db = require('../configs/database')
const { currentDateAndTime } = require('../utils/DateTime')

const addSemester = async (req, res) => {
  const { semester } = req.body
  let date = await currentDateAndTime()
  try {
    const checkSemester = 'SELECT * FROM semester WHERE semester = ?'
    db.query(checkSemester, [semester], (err, result) => {
      if (err) return res.json(err.message)
      if (result.length > 0) {
        return res.status(400).json({
          msg: 'SEMESTER ALREADY EXIST IN DATABASE',
        })
      } else {
        const sqlQuery =
          'INSERT INTO semester (semester,date_created) VALUES (?,?)'
        db.query(sqlQuery, [semester, date], (err, result) => {
          if (err) return res.json({ msg: err.message })
          res.status(201).json({ msg: 'New Semester Successfully Created' })
        })
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getSemester = async (req, res) => {
  try {
    const sqlQuery = 'SELECT * FROM semester ORDER BY sem_id'
    db.query(sqlQuery, (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


module.exports = {
  addSemester,
  getSemester
}
