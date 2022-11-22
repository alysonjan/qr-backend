const db = require('../configs/database')
const { currentDateAndTime } = require('../utils/DateTime')

const addSubject = async (req, res) => {
  const { sem_id, subject_name, subject_description } = req.body
  let date = await currentDateAndTime()
  try {
    const checkSubjectName = 'SELECT * FROM subject WHERE sub_name = ?'
    db.query(checkSubjectName, [subject_name], (err, result) => {
      if (err) return res.json(err.message)
      if (result.length > 0) {
        return res.status(400).json({
          msg: 'SUBJECT ALREADY EXIST IN DATABASE',
        })
      } else {
        const sqlQuery =
          'INSERT INTO subject (sem_id, sub_name, sub_desc, date_created) VALUES (?,?,?,?)'
        db.query(
          sqlQuery,
          [sem_id, subject_name, subject_description, date],
          (err, result) => {
            if (err) return res.json({ msg: err.message })
            res.status(201).json({ msg: 'New Subject Successfully Added' })
          }
        )
      }
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


const updateSubject = async (req, res) => {
  const { sub_id, subject_name, subject_description } = req.body
  try {
      const sqlQuery =
        'UPDATE subject SET sub_name = ?, sub_desc = ? WHERE sub_id = ?'
      db.query(sqlQuery,[subject_name, subject_description,sub_id],(err, result) => {
          if (err) return res.json({ msg: err.message })
          res.status(201).json({ msg: 'Subject Successfully Update' })
        }
      )
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const deleteSubject = async(req,res) => {
  const { sub_id } = req.body
  try {
    const sqlQuery = 'UPDATE subject SET deleted = ? WHERE sub_id = ?'
    db.query(sqlQuery, [1,sub_id], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json('Sucessfully Deleted')
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


const getSubject = async (req, res) => {
  try {
    const sqlQuery = 'SELECT * FROM subject WHERE deleted = 0 ORDER BY sub_id DESC'
    db.query(sqlQuery, (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getAllSubjectsByTeacher = async(req,res) => {
  try {
    const { teacherId } = req.body
    const sqlQuery = 'SELECT DISTINCT class.class_id, subj.sub_name, subj.sub_desc, subj.sub_id FROM class INNER JOIN subject as subj ON class.sub_id = subj.sub_id WHERE class.user_id = ?'
    db.query(sqlQuery, teacherId, (err,result) => {
      if(err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addSubject,
  updateSubject,
  deleteSubject,
  getSubject,
  getAllSubjectsByTeacher
}
