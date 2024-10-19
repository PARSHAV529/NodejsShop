const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsshop',
    password:'neh59'
})

module.exports = pool.promise()