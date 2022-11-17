require('dotenv').config();
const express = require('express');
const cors = require('cors')
// swagger
const swaggerUi = require('swagger-ui-express')
const { swaggerSetup } = require('./helpers/swagger.js')

const app = express();

// import routes

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// custom midddleware
app.use(
    '/api/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSetup)
  )

// routes


// export app
module.exports = app;