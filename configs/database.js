const { createConnection } = require('mysql')

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'qr_attendance_system',
})

module.exports = db
