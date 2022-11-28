const sequelize = require('../database/database.js');
const { DataTypes } = require('sequelize');

const OtherRole = sequelize.define('otherRole', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = OtherRole;
