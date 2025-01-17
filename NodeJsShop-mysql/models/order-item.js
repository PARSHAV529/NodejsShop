const Sequelize = require('sequelize')
const sequelize = require('../util/db')

const OtderItem = sequelize.define('orderItem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    quantity:Sequelize.INTEGER,

})

module.exports = OtderItem