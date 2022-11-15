require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express();

// import routes

// settings
app.set('PORT', process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// custom midddleware

// routes


// export app
module.exports = app;