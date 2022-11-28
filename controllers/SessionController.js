const db = require('../configs/database')
const  { formatAMPM, formattedDate }  = require('../utils/DateTime')

const createSession = async (req, res) => {
  const { user_id, class_id } = req.body

  const time_created = formatAMPM(new Date())
  const date_created = await formattedDate()
  try {
    const sqlQuery =
      'INSERT INTO class_session (user_id, class_id, time_created, date_created) VALUES (?,?,?,?)'
    db.query(sqlQuery, [user_id, class_id, time_created, date_created], (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(201).json({ msg: 'New Session Created' })
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getSession = async (req ,res) => {
    const { user_id } = req.body
    try {
        const sqlQuery = 'SELECT * FROM class_session WHERE user_id = ? AND closed != 1 ORDER BY session_id DESC LIMIT 1'
        db.query(sqlQuery, [user_id], (err, result) => {
          if (err) return res.json({ msg: err.message })
          res.status(200).json(result)
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const getAttendanceSession = async(req,res) => {
  const { session_id } = req.body
  const todayDate = await formattedDate()
  try {
    const sqlQuery = `SELECT DISTINCT CONCAT(st.fname,' ', st.lname ) AS fullname,
                      st.student_id, st.section, st.yr_lvl, at.time_in, at.status
                      FROM student AS st INNER JOIN attendance AS at ON st.student_id = at.student_id 
                      JOIN class_session AS cs ON cs.class_id = at.class_id  
                      WHERE cs.session_id = ? AND cs.closed = 0 `
    db.query(sqlQuery, [session_id], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const closeSession = async(req,res) => {
  const { session_id } = req.body
  try {
    const sqlQuery = "UPDATE class_session SET closed = 1 WHERE session_id = ?"
    db.query(sqlQuery, [session_id], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json("Session closed")
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const historySession = async(req,res) => {
  const { user_id } = req.body
  try {
    const sqlQuery = "SELECT DISTINCT subj.sub_name, subj.sub_desc, CONCAT(emp.fname,' ', emp.lname ) AS fullname, ses.date_created FROM class as cl RIGHT JOIN subject as subj ON cl.sub_id = subj.sub_id RIGHT JOIN employee as emp ON cl.user_id = emp.user_id INNER JOIN class_session as ses ON cl.class_id = ses.class_id WHERE cl.class_id IN (SELECT cs.class_id FROM class_session AS cs WHERE cs.user_id = ? AND cs.closed = 1)"
    db.query(sqlQuery, [user_id], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getHistoryDetails = async(req,res) => {
  const { date } = req.body
  try {
    const sqlQuery = `SELECT DISTINCT CONCAT(st.fname,' ', st.lname ) AS fullname, st.student_id, st.section, st.yr_lvl, at.time_in, at.status FROM student as st INNER JOIN attendance as at ON st.student_id = at.student_id INNER JOIN class as cl ON cl.class_id = at.class_id INNER JOIN class_session as ses ON cl.class_id = ses.class_id WHERE ses.date_created = ?`
    db.query(sqlQuery, [date], (err,result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


module.exports = {
    createSession,
    getSession,
    getAttendanceSession,
    closeSession,
    historySession,
    getHistoryDetails
}
