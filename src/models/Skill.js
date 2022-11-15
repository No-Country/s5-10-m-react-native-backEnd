const sequelize = require('../database/database.js');
const {DataTypes} = require('sequelize');

const Skill = sequelize.define('skill', {
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

  module.exports = Skill;