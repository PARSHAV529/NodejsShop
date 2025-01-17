const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejsshop','root','neh59',{dialect:'mysql'})


module.exports = sequelize

// // using mysql2 manualy
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'nodejsshop',
//     password:'neh59'
// })

// module.exports = pool.promise()