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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
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
    },
    experiencies: [
        {
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
                allowNull: false
            },
        }
    ],
    projects: [
        {
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
        }
    ],
    skills: [
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }
    ],
    education: [
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            school: {
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
                allowNull: false
            },
        }
    ]

  }, {
    timestamps: true
  });

  module.exports = Curriculum;