const { DataTypes } = require('sequelize');
const sequelize = require('../util/db');

const Session = sequelize.define('Session', {
  sid: {
    type: DataTypes.STRING(128),
    primaryKey: true,
  },
  expires: DataTypes.DATE,
  data: DataTypes.TEXT,
});

module.exports = Session;
