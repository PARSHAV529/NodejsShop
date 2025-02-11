const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const User = sequelize.define('User',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,

    },
    // name:{
    //     type:Sequelize.STRING,
    //     allowNull: false,

    // },
    email:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
    }
})

module.exports=User

