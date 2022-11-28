const sequelize = require('../database/database.js');
const {DataTypes} = require('sequelize');

const OtherSkill = sequelize.define('otherSkill', {
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

  module.exports = OtherSkill;