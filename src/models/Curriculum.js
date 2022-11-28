const sequelize = require('../database/database.js');
const {DataTypes} = require('sequelize');

const Curriculum = sequelize.define('curriculum', {
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
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    portfolio: {
        type: DataTypes.STRING,
    },
    linkedin: {
        type: DataTypes.STRING,
    },
    github: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    aboutMe: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    timestamps: true
  });

  module.exports = Curriculum;