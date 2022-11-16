const sequelize = require('../database/database.js');
const {DataTypes} = require('sequelize');

const Project = sequelize.define('project', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startYear: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endYear: {
        type: DataTypes.DATE,
    },
  }, {
    timestamps: true
  });

  module.exports = Project;