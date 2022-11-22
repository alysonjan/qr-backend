const db = require('../configs/database')
const  { formattedDate, getDayName, compareTime }  = require('../utils/DateTime')

const addAttendance = async (req, res) => {
  const { student_id, class_id } = req.body
  const time_in = new Date()
  const date = await formattedDate()
  const day = await getDayName()
  try {
    const checkIfStudentAlreadyScanned = 'SELECT * FROM attendance WHERE class_id = ? AND student_id = ? AND date ?'
    db.query(checkIfStudentAlreadyScanned,[class_id,student_id,date], (errX, resultX) => {
      if(errX){
        return res.json({ msg: errX.message }) 
      }
      if(resultX.length > 0){
        return res.status(400).json({ msg: 'You already have an existing attendance for today' }) 
      }else{
        const checkAttendanceStatusQuery = 'SELECT * FROM class_schedules WHERE class_id = ? AND day = ?'
        db.query(checkAttendanceStatusQuery, [class_id, day], async (err,result) => {
          if (err) {
            return res.json({ msg: err.message }) 
          }else{  
            let attendanceStatus = await compareTime(result[0]?.start_time,result[0]?.end_time, time_in)
            const sqlQuery =
              'INSERT INTO attendance (student_id, class_id, time_in, date, status) VALUES (?,?,?,?,?)'
            db.query(sqlQuery, [student_id, class_id, time_in, date, attendanceStatus], (err, result) => {
              if (err) return res.json({ msg: err.message })
              res.status(201).json({ msg: 'New Attendance Successfully Added' })
            })
          }
        }) 
      }
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const attendanceSetAbsent = async(req,res) => {
  try {
    let { classID } = req.body
    const todayDate = await formattedDate()
    // const todayDate = '2022-10-25'
    const sqlQuery = `SELECT DISTINCT CONCAT(employee.fname, ' ', employee.lname) AS fullname,
    class_schedules.day, class_schedules.start_time, class_schedules.end_time,
    CONCAT(student.fname, ' ', student.lname) AS student_fullname,student.student_id, student.yr_lvl, student.section,
    subject.sub_name, subject.sub_desc FROM class
    INNER JOIN employee ON class.user_id = employee.user_id
    INNER JOIN class_schedules ON class.class_id = class_schedules.class_id
    INNER JOIN student ON class.student_id = student.student_id
    INNER JOIN subject ON class.sub_id = subject.sub_id WHERE class.class_id = ?`
    db.query(sqlQuery, [classID], async(err, result) => {
      if (err) {
        res.status(400).json({ msg: err.message })
      }else{
          const sqlQuery2 = `SELECT CONCAT(st.fname,' ', st.lname ) AS fullname, 
          st.student_id, st.section, st.yr_lvl, at.status FROM student as st
          INNER JOIN attendance as at ON st.student_id = at.student_id WHERE at.class_id = ? AND at.date = ?`
          db.query(sqlQuery2,[classID,todayDate.toString()], (err2,result2) => {
            if (err2){
              res.status(400).json({ msg: err2.message })
            }
              // console.log('FIRST',result)
              // console.log('SECOND',result2)
              const filterAbsent = result?.filter(res1 => result2?.every(res2 => res2.student_id !== res1.student_id));
              // console.log(filterAbsent)
              // return res.json(filterAbsent)
              if(filterAbsent.length > 0){
                const sqlQuery3 = 'INSERT INTO attendance (student_id, class_id, time_in, date, status) VALUES (?,?,?,?,?)'
                filterAbsent.forEach(val => {
                db.query(sqlQuery3,[
                  val.student_id,
                  classID, 
                  "none", 
                  todayDate && todayDate.toString(), 
                  "absent"
                ],
                async(err3, result3) => {
                  })
                })
                res.status(200).json({ msg:'successfully set absent' })
              }else{
                res.status(200).json({ msg:'session is closed' })
              }
            })
      }
    })
  } catch (err) {
    res.status(500).json({ msg: err.message })
  }
}

module.exports = {
  addAttendance,
  attendanceSetAbsent
}

