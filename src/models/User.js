const sequelize = require('../database/database.js');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resetToken: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: null
    }
  }, {
    timestamps: true
  });

  module.exports = User;