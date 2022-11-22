const db = require('../configs/database')
const { currentDateAndTime } = require('../utils/DateTime')

const addSchoolYear = async (req, res) => {
  const { school_year } = req.body
  let date = await currentDateAndTime()
  try {
    const checkSchoolYear = 'SELECT * FROM school_year WHERE school_yr = ?'
    db.query(checkSchoolYear, [school_year], (err, result) => {
      if (err) return res.json(err.message)
      if (result.length > 0) {
        return res.status(400).json({
          msg: 'SCHOOL YEAR ALREADY EXIST IN DATABASE',
        })
      } else {
        const sqlQuery =
          'INSERT INTO school_year (school_yr,date_created) VALUES (?,?)'
        db.query(sqlQuery, [school_year, date], (err, result) => {
          if (err) return res.json({ msg: err.message })
          res.status(201).json({ msg: 'New School Year Successfully Created' })
        })
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getSchoolYear = async (req, res) => {
  try {
    const sqlQuery = 'SELECT * FROM school_year ORDER BY sy_id DESC'
    db.query(sqlQuery, (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
const updateSchoolYearStatus = async (req,res) => {
  const { syID, status } = req.body
  try {
    const stat = status === true ? 1 : status === false ? 0 : undefined
    const sqlQuery = 'UPDATE school_year SET disable = ? WHERE sy_id = ?'
    db.query(sqlQuery,[stat, syID], (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json({msg: 'successfully update!'})
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addSchoolYear,
  getSchoolYear,
  updateSchoolYearStatus
}
