require('dotenv').config()
const express = require('express')
const PORT = process.env.PORT || 8000
const cors = require('cors')
const app = express()

//INIT MIDDLEWARE
app.use(express.json({ extended: false }))
app.use(
  cors({
    origin: ['http://localhost:3000','http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
)
app.use(express.json())

app.get('/', (req, res) => res.send('Attendance System Server Running🔥⚡🚀'))

//ROUTES
app.use('/api/employee', require('./routes/EmployeeRoute'))
app.use('/api/school/year', require('./routes/SchoolYearRoute'))
app.use('/api/student', require('./routes/StudentRoute'))
app.use('/api/subject', require('./routes/SubjectRoute'))
app.use('/api/semester', require('./routes/SemesterRoute'))
app.use('/api/adviser', require('./routes/AdviserRoute'))

app.use('/api/attendance', require('./routes/AttendanceRoute'))

app.use('/api/class', require('./routes/ClassRoute'))
app.use('/api/class-attendance', require('./routes/ClassAttendanceRoute'))

app.use('/api/session', require('./routes/SessionRoute'))

app.listen(PORT, () => console.log(`Server started on port ${PORT} 🔥`))
