const mysql2 = require('mysql2')
const pool = mysql2.createPool({
    host: 'localhost',
    database: 'hackathon',
    user: 'root',
    password: 'manager'
})