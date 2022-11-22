const db = require('../configs/database')
const { currentDateAndTime, uid } = require('../utils/DateTime')

const addClass = async (req, res) => {
  const { sy_id, sub_id, employee_id, student_id, schedule, section } = req.body
  try {
    // let splitDays = days.toString()
    let date = await currentDateAndTime()
    let uniq_class_id = uid()
    student_id.forEach((ids) => {
      const sqlQuery =
        'INSERT INTO class (sy_id, class_id, sub_id, user_id, student_id, date_created, section) VALUES (?,?,?,?,?,?,?)'
      db.query(
        sqlQuery,
        [sy_id, uniq_class_id, sub_id, employee_id, ids, date, section],
        (err, result) => {
          if (err) return res.json({ msg: err.message })
        }
      )
    })
    schedule.forEach((sched) => {
      const sqlQuery =
        'INSERT INTO class_schedules (class_id, day, start_time, end_time) VALUES (?,?,?,?)'
      db.query(
        sqlQuery,
        [uniq_class_id, sched.day, sched.start_time, sched.end_time],
        (err, result1) => {
          if (err) return res.json({ msg: err.message })
        }
      )
    })

    res.status(201).json({ msg: 'New Class Successfully Added' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
const getClass = async (req, res) => {
  try {
    let { schoolYearID, semID } = req.params

    const sqlQuery = `SELECT DISTINCT class.sy_id, class.class_id, class.section, subject.sub_name, subject.sub_desc,subject.sem_id, CONCAT(employee.fname, ' ', employee.lname) AS fullname
    FROM class INNER JOIN subject ON class.sub_id = subject.sub_id INNER JOIN employee ON
    class.user_id = employee.user_id WHERE class.sy_id = ? AND subject.sem_id = ?`
    db.query(sqlQuery, [schoolYearID,semID], (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getClassList = async (req, res) => {
  try {
    //TEACHER  CLASS SCHED STUDENT NAME,STUDENT ID,YEAR. SECTION SUBJECT CODE AND NAME
    let { classID } = req.params
    const sqlQuery = `SELECT DISTINCT CONCAT(employee.fname, ' ', employee.lname) AS fullname,
    class_schedules.day, class_schedules.start_time, class_schedules.end_time,
    CONCAT(student.fname, ' ', student.lname) AS student_fullname,student.student_id, student.yr_lvl, student.section,
    subject.sub_id, subject.sub_name, subject.sub_desc FROM class
    INNER JOIN employee ON class.user_id = employee.user_id
    INNER JOIN class_schedules ON class.class_id = class_schedules.class_id
    INNER JOIN student ON class.student_id = student.student_id
    INNER JOIN subject ON class.sub_id = subject.sub_id WHERE class.class_id = ?`
    db.query(sqlQuery, classID, (err, result) => {
      if (err) return res.json({ msg: err.message })
      res.status(200).json(result)
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  addClass,
  getClass,
  getClassList,
}
