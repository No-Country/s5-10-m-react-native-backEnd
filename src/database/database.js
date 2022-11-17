require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || "cv",
  process.env.DB_USERNAME || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    //   }
    // },
  }
);

module.exports = sequelize;