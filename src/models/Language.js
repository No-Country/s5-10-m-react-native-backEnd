const sequelize = require('../database/database.js');
const { DataTypes } = require('sequelize');

const Language = sequelize.define('language', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false
  },
  skill: {
    type: DataTypes.ENUM('basico', 'intermedio', 'avanzado'),
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = Language;